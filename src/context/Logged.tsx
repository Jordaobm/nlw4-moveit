import { create } from "domain";
import { createContext, ReactNode, useContext, useState } from "react";


interface LoggedContextData {
    isLogged: boolean;
    setIsLogged(isLogged: boolean): void;
}

const LoggedContext = createContext<LoggedContextData>({} as LoggedContextData)

interface LoggedProviderProps {
    children: ReactNode;
}

export function LoggedProvider({ children }: LoggedProviderProps) {
    const [isLogged, setIsLogged] = useState(false);

    return (
        <LoggedContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </LoggedContext.Provider>
    )
}

export function useContextLogged(): LoggedContextData {
    const context = useContext(LoggedContext);
    return context;
}