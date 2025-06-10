import { atom } from 'recoil';
export interface User {

  id: string;   // Unique identifier for the user    
  name: string; // Name of the user
  email: string; // Email address of the user
  password: string; // Password of the user
  phoneNumber: string; // Phone number of the user
  address: string; // Address of the user

  }

const userAtom = atom<User>({
  key: 'userAtom',  // unique ID (with respect to other atoms/selectors)
  default: {
    id: '',
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
  },
});

export default userAtom;