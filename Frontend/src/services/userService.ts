import axios from 'axios';
interface details {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export const userService = {
    login :async (email: string, password: string) => {
        try {
        const response = await axios.post('http://localhost:3000/user/login', { email, password });
        return response.data;
        } catch (error) {
        throw new Error('Login failed');
        }
    },
    
    signUp : async (userData: details) => {
        try {
        const response = await axios.post('http://localhost:3000/user/signup', userData);
        return response.data;
        } catch (error) {
        throw new Error('Registration failed');
        }
    }
} 