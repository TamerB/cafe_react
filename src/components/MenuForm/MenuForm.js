import React, { useRef } from 'react';

import classes from './MenuForm.module.css';

function MenuForm (props) {
  const inputFile = useRef(null);

  const onButtonClick = (event) => {
    event.preventDefault();
    inputFile.current.click();
    props.validatePhoto();
    console.log(props.submitHandler);
  }

  return (
    <div className={classes.Container}>
      <div className={classes.Wrapper}>
        <form onSubmit={props.submitHandler}>
          <label>Type</label>
          <select name="type" value={props.formValues.type} onChange={(event) => props.changed(event, 'type')} required >
            <option value=""></option>
            <option value="Main Course">Main Course</option>
            <option value="Side">Side</option>
          </select>
          <label>Name</label>
          <input name="name" type="text" value={props.formValues.name} onChange={(event) => props.changed(event, 'name') } required />
          <label>Price</label>
          <input name="price" type="text" value={props.formValues.price} onChange={(event) => props.changed(event, 'price')} required />
          <label htmlFor="photo-upload" className={classes.PhotoLabel}><div>Photo</div>
            <button type="file" className={classes.UploadFile + ' ' + classes[props.formValues.photo[1]]} onClick={onButtonClick}>Choose Photo</button>
          </label>
          <input name="photo" id="photoUpload" ref={inputFile} type="file" onChange={(event) => props.changed(event, 'photo') } required  />
          <input type="submit" onClick={props.validatePhoto} value="Save Item" />
        </form>
      </div>
    </div>
  );
}

export default MenuForm;