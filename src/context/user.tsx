import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../dtos/types";
import Cookie from 'js-cookie';

interface UserContextData {
    user: User;
    setUser(user: User): void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

interface UserProviderProps {
    children: ReactNode;
    parsedUser:User;
}

export function UserProvider({ children, parsedUser }: UserProviderProps) {

    const [user, setUser] = useState<User>(parsedUser);

    useEffect(() => {
        Cookie.set('user', user);
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser(): UserContextData {
    const context = useContext(UserContext);
    return context;
}