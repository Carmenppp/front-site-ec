import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from "../axios/axios.js"

export const useUserStore = defineStore('user', () => {
    const token = ref(null);
    const register = async (data) => {
      if (!data.username || !data.email || !data.password) {
        console.error('Email or password is missing');
        return;
    }
        try {
          const res = await api.post('/users/register', {
            username: data.username,
            email: data.email,
            password: data.password,
            roleId: data.roleId,
            addressId: data.addressId,
            cityId: data.cityId
          });
          console.log(' successful:', res.data);
          localStorage.setItem('token', res.data.token)
          token.value = res.data.token;
        } catch (error) {
          if (error.response && error.response.data) {
            console.log(data)
            console.error('Register failed:', error.response.data);
          } else {
            console.error('An unexpected error occurred:', error.message || error);
          }
        }
    }
    
    const acces = async (email, password) => {
      if (!email || !password) {
        console.error('Email or password is missing');
        return;
    }
        try {
          const res = await api.post('/users/login', {
            email: email,
            password: password
          });

          localStorage.setItem('token', res.data.token)
          token.value = res.data.token;
        } catch (error) {
          if (error.response && error.response.data) {
            console.error('Login failed:', error.response.data);
          } else {
            console.error('An unexpected error occurred:', error.message || error);
          }
        }
    }

    const logOut = () => {
      token.value = null;
      localStorage.removeItem('token');
      console.log('User logged out');
    };
  
    return {
        token,
        register,
        acces,
        logOut
    }
})