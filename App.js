
import React,{useEffect} from "react";
import {Text,View, StyleSheet} from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import {MyContextControllerProvider} from "./src/context";
import Router from "./src/screens/Router";
import { NavigationContainer } from "@react-navigation/native";



const initial = async()=>{
  const USERS = firestore().collection('USERS');
  const admin = {
    name: 'Hiep',
    phone: '0326319810',
    address: 'Binh Dinh',
    email: 'hiep1234@gmail.com',
    password: '123456',
    role: 'admin',
  };
  try {
    const userDoc = USERS.doc(admin.email);
    const userSnapshot = await userDoc.get();

    if (!userSnapshot.exists) {
      await auth().createUserWithEmailAndPassword(admin.email, admin.password);
      await userDoc.set(admin);
      console.log("Add new user admin!");
    }
  } catch (error) {
    console.error("Error during initial setup:", error);
  }
}
const Appp =() =>{
  useEffect(()=>{
    initial();
  },[])
  return (
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </MyContextControllerProvider>
  );
};
export default Appp;