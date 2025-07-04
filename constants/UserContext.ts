import { createContext } from 'react';

export const UserContext = createContext({
  user: { fullName: '', email: '' },
  setUser: (user: { fullName: string; email: string }) => {},
}); 