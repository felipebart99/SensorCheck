import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Home } from '../components/Home.js';
import { auth } from '../../App.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
//mudou

export function Login({ handleClose, email, senha }) {
  const [inputEmail, setEmail] = useState(email);
  const [inputSenha, setSenha] = useState(senha);
  const [homeVisible, setHomeVisible] = useState(false);

  const entrar = async () => {
    try {
      await signInWithEmailAndPassword(auth, inputEmail, inputSenha);
      setHomeVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image style={{ width: 150, height: 150 }} source={require('../../../telacadastro/assets/sensorCheck.jpeg')} />

      <TextInput placeholder={'Email...'} style={styles.textInput} onChangeText={text => setEmail(text)} value={inputEmail} />
      <TextInput secureTextEntry={true} placeholder='Senha...' style={styles.textInput} onChangeText={text => setSenha(text)} value={inputSenha} />

      <View style={styles.buttonArea}>
        <TouchableOpacity style={styles.button} onPress={handleClose}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonEntrar]} onPress={entrar}>
          <Text>Entrar</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={homeVisible}>
        <Home />
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
    padding: 20
  },
  textInput: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10
  },
  btnCadastro: {
    width: '100%',
    height: 40,
    backgroundColor: '#23CF5C',
    borderRadius: 20,
    justifyContent: 'center'
  },
  buttonArea: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    flex: 1,
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 14,
    padding: 8
  },
  buttonEntrar: {
    backgroundColor: '#23CF5C',
    borderRadius: 8,
  }
});
