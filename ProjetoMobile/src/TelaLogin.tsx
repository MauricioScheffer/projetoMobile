import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';

import auth from "@react-native-firebase/auth";

const Login = () => {
    const [email, setEmail] = useState(''); 
    const [senha, setSenha] = useState(''); 

    function logar() {
        if (verificaCampos()) {

            auth()
                .signInWithEmailAndPassword(email, senha)
                .then(() => { Alert.alert('Logado com sucesso') })
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

    return (
        <View style={styles.container}>
            <View style={styles.painel_imagem}>
                <Image 
                    style={styles.imagem} 
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }} />
            </View>
            
            <View style={styles.container_login}>
                <Text
                    style={styles.titulo_caixa_texto}>
                    Login
                </Text>
                <TextInput
                    style={styles.caixa_texto}
                    onChangeText={(text) => {setEmail(text)}}/>

                <Text
                    style={styles.titulo_caixa_texto}>
                    Senha
                </Text>
                <TextInput
                    style={styles.caixa_texto} 
                    onChangeText={(text) => {setSenha(text)}}/>

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={logar}>
                    <Text style={styles.desc_botao}>Entrar</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFACD'
    },
    container_login: {
        flex: 2,
        alignItems: 'center'
    },
    titulo_caixa_texto:{
        fontSize: 25,
        color: 'black'
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white'
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 10
    },
    desc_botao: {
        fontSize: 20,
        color: 'white'
    },
    painel_imagem: {
        flex:1,
        alignItems:'center', 
        justifyContent:'center'
    },
    imagem: { 
        width: 200, 
        height: 200, 
        resizeMode: "center"
    }
});
