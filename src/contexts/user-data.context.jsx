import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const UserContext = createContext({
    setUserData: () => {},
    userData: null,
    profile: null
});

export const UserProvider = ({children}) => {
    const userData = useRef(null);
    const profile = useRef(null);

    const setUserData = (newUserData) => {
        userData.current = newUserData;
        sessionStorage.setItem("userData", JSON.stringify(userData.current));
        if (!userData.current) {
            sessionStorage.setItem("profileData", null);
            profile.current = null;
        }
    }

    const updateProfile = () => {
        userData.current = JSON.parse(sessionStorage.getItem("userData"));
        profile.current = JSON.parse(sessionStorage.getItem("profileData"));

        /*if (userData.current) {
            axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userData.current.access_token}`, {
                headers: {
                    Authorization: `Bearer ${userData.current.access_token}`,
                    Accept: 'application/json'
                }
            })
            .then((res) => {
                console.log(res.data);
                profile.current = res.data;
            })
            .catch((err) => console.log(err));

            console.log(profile);
        }*/
    }

    useEffect(() => {
        console.log("session storage udata ");
        const u = sessionStorage.getItem("userData");

        if (u) {
            updateProfile();
        }
        //console.log(userData.current);
    }, []);

    const value = {
        setUserData,
        userData,
        profile
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};