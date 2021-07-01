import axios from 'axios';

export const authRequest = axios.create({
  baseURL: 'https://github.com/login/oauth'
})

export const autheticatedRequest = axios.create({
  baseURL: 'https://api.github.com/'
})