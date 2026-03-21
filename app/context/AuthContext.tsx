import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";
type AuthContextType ={
    userToken: string | null;
    loading: boolean;
    login: (token:string)=> Promise<void>;
    logout:()=> Promise<void>;
};
type Props ={
    children: ReactNode;
}
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider =({children}: Props) => {
    const [userToken, setUserToken]=useState<string | null>(null)
    const [loading, setLoading]= useState<boolean>(true);

    useEffect(()=>{

        const loadToken = async ()=>{
            const token = await AsyncStorage.getItem("userToken");
            setUserToken(token);
            setLoading(false)

        };
        loadToken();


    },[]);
    const login = async (token:string)=> {
        await AsyncStorage.setItem("userToken", token);
        setUserToken(token);
    }
    const logout = async ()=>{
        await AsyncStorage.removeItem("userToken");
        setUserToken(null)
    }
    return(
        <AuthContext.Provider value ={{ userToken, loading , login , logout }}>
        {children}
        
        </AuthContext.Provider>
    )
}