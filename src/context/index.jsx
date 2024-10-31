// src/context/index.jsx

import { useState, createContext, useContext } from 'react';

// Create a Context
const AppContext = createContext();

// Create a Provider Component
export function AuthWrapper({ children }) {
    const [sharedState, setsharedState] = useState({
        name: '',
        profileImg: '',
        username: '',
        about: '',
        _id: '',
        planType: "free"
    });

    return (
        <AppContext.Provider value={{ sharedState, setsharedState }}>
            {children}
        </AppContext.Provider>
    );
}

// Custom Hook to use the Context
export function useAppContext() {
    return useContext(AppContext);
}

