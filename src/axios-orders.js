import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-e338b.firebaseio.com/'
});

export default instance;