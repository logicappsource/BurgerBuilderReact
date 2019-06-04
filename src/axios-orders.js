import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-e3885.firebaseio.com/'
});

export default instance; 
