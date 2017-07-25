import axios from 'axios';

const userToken = localStorage.getItem('userToken');
console.log('Token '+userToken);

const customAxios = axios.create({
  baseURL: 'http://localhost:3001/api/',
  headers: {
  	'Content-Type': 'application/json',
  	'Authorization': 'Token '+userToken
  }
});

export default customAxios;