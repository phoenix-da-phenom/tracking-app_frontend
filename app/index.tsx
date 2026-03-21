import { Redirect } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


export default function Index() {
  const {userToken}= useContext(AuthContext)
  if (userToken){
    return<Redirect href='/dashboard'/>
  }
  return (
    <Redirect href='/login'/>
  );
}
