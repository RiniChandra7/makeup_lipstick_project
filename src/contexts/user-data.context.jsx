import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
    userData: null,
    setUserData: () => {}
});

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState(null);//try useRef or sessionStorage as the userdata is getting lost on refresh

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const value = {
        userData,
        setUserData
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};