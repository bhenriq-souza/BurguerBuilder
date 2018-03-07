import axios from 'axios';

const ordersServer = axios.create({
    baseURL: 'https://burguer-builder-f7634.firebaseio.com/'
});

export default ordersServer;