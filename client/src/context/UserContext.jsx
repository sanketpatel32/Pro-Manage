import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const jsonString = localStorage.getItem('currentUser');
        if (jsonString !== null) {
            const retrievedObject = JSON.parse(jsonString);
            setUserDetails(retrievedObject);
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <UserContext.Provider value={{ userDetails, setUserDetails, isLoggedIn, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;