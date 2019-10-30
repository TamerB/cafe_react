import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cafe-react-b3f0a.firebaseio.com/'
});

export default instance;