import { createContext, useEffect, useRef, useState } from "react";

export const UserContext = createContext({
    setUserData: () => {},
    userData: null
});

export const UserProvider = ({children}) => {
    const userData = useRef(null);

    const setUserData = (newUserData) => {
        userData.current = newUserData;
        sessionStorage.setItem("userData", JSON.stringify(userData.current));
    }

    useEffect(() => {
        console.log("session storage udata ");
        const u = sessionStorage.getItem("userData");

        if (u) {
            userData.current = JSON.parse(sessionStorage.getItem("userData"));
        }
        console.log(userData.current);
    }, [userData.current]);

    const value = {
        setUserData,
        userData
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};