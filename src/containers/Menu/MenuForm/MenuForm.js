import React, { useState, useEffect, useRef } from 'react';
import { Route, withRouter } from 'react-router-dom';

import axios from '../../../axios-orders';
import Spinner from '../../../components/Spinner/Spinner';

import classes from './MenuForm.module.css';

function MenuForm (props) {
  const [id, setid] = useState(null);
  const [type, settype] = useState('');
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [photo, setphoto] = useState('');
  const [photoClass, setphotoClass] = useState('blue');
  const [loading, setLoading] = useState(true);

  const inputFile = useRef(null);

  useEffect(() => {
    props.showAddButton();
    try {
      setid(props.match.params.id);
      getItem();
    } catch(e) {
      setForm(null);
    }
  }, []);

  const getItem = () => {
    setLoading(true);
    axios.get('/menu_items/' + props.match.params.id + '/.json')
      .then(response => {
        setForm(response.data || {});
        props.setErrorMessage('');
        setLoading(false);
      })
      .catch(error => {
        props.setErrorMessage('Something went wrong');
      });
  }

  const setForm = (values) => {
    if (values) {
      settype(values.type);
      setname(values.name);
      setprice(values.price);
      setphoto(values.photo);
      setphotoClass('blue');
    }
  }


  const updateItem = (submitted) => {
    setLoading(true);
    axios.put('/menu_items/' + id + '.json', submitted)
    .then(response => {
      props.setErrorMessage('');
      props.history.push('/');
    })
    .catch(error => {
      props.setErrorMessage('Something went wrong');
      setLoading(false);
    });
  }

  const newItem = () => {
    setid(null);
    settype('');
    setname('');
    setprice('');
    setphoto('');
    setphotoClass('blue');
  }

  const addItem = (submitted) => {
    setLoading(true);
    axios.post('/menu_items.json', submitted)
    .then(response => {
      props.setErrorMessage('');
      props.history.push('/');
    })
    .catch(error => {
      props.setErrorMessage('Something went wrong');
      setLoading(false);
    });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    let submitted = {type: type, name: name, price: price, photo: photo[0].name};
    if (isValid(submitted)) {
      eval(props.submitFunction)(submitted);
    }
  }

  const validatePhoto = () => {
    setphotoClass(photo === undefined || photo[0].name === undefined ||photo[0].name === '' ? 'red' : 'blue');
  }

  const isValid = (temp) => {
    return eval(temp) !== '';
  }

  const onButtonClick = (event) => {
    event.preventDefault();
    inputFile.current.click();
    validatePhoto();
  }

  const changeFormValue = (event, tagType) => {
    if (tagType === 'photo') {
      let temp = /[png|PNG|jpg|JPG|jpeg|JPEG]$/.test(event.target.files[0].name) ? event.target.file[0] : '';
      setphoto(temp);
      setphotoClass(event.target.value === '' ? 'red' : 'blue');
    } else if (tagType === 'price') {
      setprice(Number(event.target.value) || '');
    } else {
      eval('set' + tagType)(event.target.value);
    }
  }

  return (
    loading ? <Spinner /> : <div className={classes.Container}>
      <div className={classes.Wrapper}>
        <form onSubmit={submitHandler}>
          <label>Type</label>
          <select name="type" value={type} onChange={(event) => settype(event.target.value)} required >
            <option value=""></option>
            <option value="Main Course">Main Course</option>
            <option value="Side">Side</option>
          </select>
          <label>Name</label>
          <input name="name" type="text" value={name} onChange={(event) => setname(event.target.value) } required />
          <label>Price</label>
          <input name="price" type="text" value={price} onChange={(event) => setprice(Number(event.target.value))} required />
          <label htmlFor="photo-upload" className={classes.PhotoLabel}><div>Photo</div>
            <button type="file" className={classes.UploadFile + ' ' + classes[photoClass]} onClick={onButtonClick}>Choose Photo</button>
          </label>
          <input name="photo" id="photoUpload" ref={inputFile} type="file" onChange={(event) => setphoto(event.target.files) } required  />
          <input type="submit" onClick={validatePhoto} value="Save Item" />
        </form>
      </div>
    </div>
  );
}

export default withRouter(MenuForm);