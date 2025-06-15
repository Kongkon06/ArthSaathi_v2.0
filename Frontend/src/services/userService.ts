import axios from 'axios';
interface details {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

export default function ({userDetails, type}: {userDetails: details, type: string}) {
    const login = async (email: string, password: string) => {
        try {
        const response = await axios.post('https://arthsaathi-v2-0.onrender.com/user/login', { email, password });
        return response.data;
        } catch (error) {
        throw new Error('Login failed');
        }
    };
    
    const register = async (userData: { name: string; email: string; password: string }) => {
        try {
        const response = await axios.post('https://arthsaathi-v2-0.onrender.com/user/signup', userData);
        return response.data;
        } catch (error) {
        throw new Error('Registration failed');
        }
    };
    
    switch (type) {
        case "SignUp":
            return register({name: userDetails.firstName, email: userDetails.email, password: userDetails.password });
            break;
        case "Login":
            return login(userDetails.email, userDetails.password);
            break;
        default:
            throw new Error('Invalid authentication type');     
    }
} 