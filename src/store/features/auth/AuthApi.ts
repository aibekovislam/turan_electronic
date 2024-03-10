import axios from "axios";

export const authApi = {
    register: (data: any) => axios.post("/users/", data),
    login: (data: any) => axios.post('/authlogin', data),
    logout: () => axios.post('/authlogout'),
}