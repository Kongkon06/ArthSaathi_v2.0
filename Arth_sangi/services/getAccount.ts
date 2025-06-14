import axios from 'axios';
interface AccountDetails {
    id: string;
    FirstName: string;
    LastName: string;
    Age: number;
    Dependents: number;
    CurrentBalance: string;
    AccountType: string;
    MonthlyIncome: string;
    DisposableIncome: string;
    DesiredSavings: string;
}
import { useUser } from '../atoms/UserContext'

export default function ({ accountDetails, type }: { accountDetails: AccountDetails, type: string }) {
    const { user } = useUser();
    const getAccount = async () => {
        try {
            const response = await axios.post('https://arthsaathi-v2-0.onrender.com/account', {}, {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Replace with your actual token
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Account creation failed');
        }
    };

    const register = async (accountData: AccountDetails) => {
        try {
            const response = await axios.post('https://arthsaathi-v2-0.onrender.com/user/signup', accountData, {
                headers: {
                    Authorization: `Bearer ${user.token}`, // Replace with your actual token
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Registration failed');
        }
    };

    switch (type) {
        case "Create":
            return register(accountDetails);
            break;
        case "GetAccount":
            return getAccount();
            break;
        default:
            throw new Error('Invalid authentication type');
    }
} 