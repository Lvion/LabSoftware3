// UserContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface User {
    id: number;
    nome: string;
    email: string;
    userType: string;
    token: string;
    saldoMoedas: number;
}

interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => { },
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const storedUser = localStorage.getItem('user');
    const initialUserState = storedUser ? JSON.parse(storedUser) : null;
    const [user, setUserState] = useState<User | null>(initialUserState);

    const setUser = (user: User | null) => {
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
