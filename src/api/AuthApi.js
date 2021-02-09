import axios from './axios'

export default class AuthApi {
    static login(username, password) {
        return axios.post(`login`,
          {
            username, password
          }
        );
      }
    
      static register(formData) {
        return axios.post(`register`, formData);
      }
}