import { AuthContext } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { useContext } from "react";


export default function Index() {
  const {userToken}= useContext(AuthContext)
  if (userToken){
    return<Redirect href='/dashboard'/>
  }
  return (
    <Redirect href='/login'/>
  );
}
