import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert, ImageBackground } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import auth from "@react-native-firebase/auth";
import { LoginProps } from '../navigation/HomeNavigator';

const TelaLogin = ({ navigation, route }: LoginProps) => {
    const [email, setEmail] = useState(''); 
    const [senha, setSenha] = useState(''); 

    function logar() {
        if (verificaCampos()) {

            auth()
                .signInWithEmailAndPassword(email, senha)
                .then(() => { Alert.alert('Logado com sucesso'), navigation.navigate('TelaPrincipal') })
                .catch((error) => tratarErros( String(error) ))
        }
    }

    function verificaCampos(){
        if (email == ''){
            Alert.alert("Email em branco", "Digite um email")
            return false;
        }
        if (senha == ''){
            Alert.alert("Senha em branco", "Digite uma senha")
            return false;
        }

        return true;
    }

    function tratarErros(erro: string){
        console.log(erro);
        if(erro.includes("[auth/invalid-email]")){
            Alert.alert("Email inválido", "Digite um email válido")
        } else if(erro.includes("[ INVALID_LOGIN_CREDENTIALS ]")){
            Alert.alert("Login ou senha incorretos", "")
        } else if(erro.includes("[auth/invalid-credential]")){
            Alert.alert("Login ou senha incorretos", "")
        }else{
            Alert.alert("Erro", erro)
        }
    }

    function redefinirSenha(){
        if (email == ''){
            Alert.alert("Email em branco", "Preencha o email")
            return
        }

        auth()
            .sendPasswordResetEmail(email)
            .then(() => Alert.alert("Redefinir senha", "Enviamos um email para você redefinir sua senha"))
            .catch((error) => console.log(error))
    }

    return (

      <ImageBackground source={require ("../imagens/Iphone.jpg")} style={styles.container}>
            
             <View style={styles.container_login}>
               <Text
                    style={styles.titulo_caixa_texto}>
                    Login
                </Text>
                
                <TextInput
                    style={styles.caixa_texto} 
                    onChangeText={(text) => {setEmail(text)}} placeholder='Email'/>

                <Text
                    style={styles.titulo_caixa_texto}>
                    Senha
                </Text>
                <TextInput
                    style={styles.caixa_texto} secureTextEntry = {true}
                    onChangeText={(text) => {setSenha(text)}} placeholder='Senha'/>

                    
                <Pressable
                    style={(state) => [styles.botao1, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => logar()}>
                    <Text style={styles.desc_botao}>Entrar</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao2, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={(redefinirSenha)}>
                    <Text style={styles.desc_botao}>Esqueceu sua senha?</Text>
                </Pressable>

            </View>
        </ImageBackground>
    );
}

export default TelaLogin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_login: {
        flex: 2,
        marginTop: 130,
        alignItems: 'center',
        gap: 5
    },
    titulo_caixa_texto:{
        left: -120,
        fontFamily: 'Jacquard',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    caixa_texto: {
        elevation: 8,
        width: '75%',
        color: 'black',
        fontWeight: '600',
        borderWidth: 3,
        margin: 3,
        backgroundColor: 'white'
    },
    botao1: {
        elevation: 8,
        justifyContent: 'center',
        backgroundColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 120,
        marginTop: 40,
    },
    botao2: {
        elevation: 8,
        justifyContent: 'center',
        backgroundColor: 'light grey',
        paddingVertical: 10,
        paddingHorizontal: 50,
        marginTop: 20,
    },
    desc_botao: {
        fontSize: 20,
        color: 'white'
    },
});
