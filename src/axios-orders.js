import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-d2362.firebaseio.com/'
});

export default instance;