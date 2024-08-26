import React, { createContext, useState, ReactNode, useContext } from 'react';

interface User {
                id: string;
                username: string;
                email: string;
                firstName: string;
                lastName: string;
                isBusiness: boolean;
}

interface UserContextType {
                        user: User | null;
                        setUser: (user: User | null) => void;
                        loading: boolean;
                        setLoading: (loading: boolean) => void;
                        error: string | null;
                        setError: (error: string | null) => void;
                        }

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser, loading, setLoading, error, setError }}>
        {children}
        </UserContext.Provider>
    );
    };

    export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
    };
