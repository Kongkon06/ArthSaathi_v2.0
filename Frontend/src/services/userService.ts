import axios from 'axios';
interface details {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    }

export const userService = {
    login :async (email: string, password: string) => {
        try {
        const response = await axios.post('https://arthsaathi-v2-0.onrender.com/user/login', { email, password });
        return response.data;
        } catch (error) {
        throw new Error('Login failed');
        }
    },
    
    signUp : async (userData: details) => {
        try {
        const response = await axios.post('https://arthsaathi-v2-0.onrender.com/user/signup', userData);
        return response.data;
        } catch (error) {
        throw new Error('Registration failed');
        }
    }
} 
