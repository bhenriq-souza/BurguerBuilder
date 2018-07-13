import axios from 'axios';

const API_KEY = 'AIzaSyCiD8bJZyT_2kkDqmhthz1mr-7nUCmZ2oI';

const authServer = axios.create({
    baseURL: `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`
});

export default authServer;