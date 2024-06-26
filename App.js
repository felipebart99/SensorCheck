import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import {Login} from '../telacadastro/src/components/Login';
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWBH39O4OFWBcFOf7QM4vD-sP5fuP9H_g",
  authDomain: "sensorcheck-96479.firebaseapp.com",
  projectId: "sensorcheck-96479",
  storageBucket: "sensorcheck-96479.appspot.com",
  messagingSenderId: "287029654916",
  appId: "1:287029654916:web:edd1b7042145f3465a59d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default function App() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loginVisible, setLoginVisible] = useState(false);

  const cadastro = () => {
    createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      //signed in
      const user = userCredential.user;

      console.log(user);
      setUser(user);
    })
    .catch((error) => {
      const errorCode = errorCode;
      const errorMessage = errorMessage;

      console.log(errorMessage);
    })
  }
  
  


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image style={{width:150, height:150}} source={require('./assets/sensorCheck.jpeg')} />

    <TextInput placeholder='Nome...' style={styles.textInput} onChangeText={text=>setNome(text)}/>
    <TextInput placeholder='Email...' style={styles.textInput} onChangeText={text=>setEmail(text)}/>
    <TextInput secureTextEntry={true} placeholder='Senha...' style={styles.textInput} onChangeText={text=>setSenha(text)}/>

    <TouchableOpacity style={styles.btnCadastro} onPress={() => {
    setLoginVisible(true); // Altera a visibilidade
    cadastro(); // Chama a função cadastro
  }}>
      <Text style={{color:'white',textAlign:'center'}} >Cadastrar</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.btnLogin} onPress={() => {
    setLoginVisible(true); // Altera a visibilidade
  }}>
      <Text style={{color:'white',textAlign:'center'}} >Login</Text>
    </TouchableOpacity>

    <Modal visible={loginVisible} animationType='fade'>
  <Login handleClose={() => setLoginVisible(false)} email={email} senha={senha} />
</Modal>


    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#297FB8',
    alignItems: 'center',
    justifyContent: 'center',
    padding:20
  },
  textInput: {
    width:'100%',
    height:40,
    backgroundColor:'white',
    borderRadius:20,
    paddingLeft:10,
    marginBottom:10

  },
  btnCadastro: {
    width:'100%',
    height:40,
    backgroundColor:'#23CF5C',
    borderRadius:20,
    justifyContent:'center'
  },
  btnLogin:{
    width:'50%',
    height:40,
    backgroundColor:'#808080',
    borderRadius:20,
    justifyContent:'center',
    marginTop:14
  }
});
