// UserContext.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Student } from '../types/Student';
import { Enterprise } from '../types/Enterprise';


interface UserContextProps {
    user: Student | Enterprise | null;
    setUser: (user: Student | Enterprise | null) => void;
}

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const storedUser = localStorage.getItem('user');
    const initialUserState = storedUser ? JSON.parse(storedUser) : null;
    const [user, setUserState] = useState<Student | Enterprise | null>(initialUserState);

    const setUser = (user: Student | Enterprise | null) => {
        setUserState(user);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
