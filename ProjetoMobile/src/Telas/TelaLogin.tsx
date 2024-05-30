import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';
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
                {/* 
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
                </Pressable> */}

                <Pressable
                    style={(state) => [styles.botao2, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('Exec1')}}>
                    <Text style={styles.desc_botao}>Exercicio 1</Text>
                </Pressable>

                <Pressable
                    style={(state) => [styles.botao2, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => {navigation.navigate('Exec2')}}>
                    <Text style={styles.desc_botao}>Exercicio 2</Text>
                </Pressable>

            </View>
        </View>
    );
}

export default TelaLogin;

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
        left: -100,
        fontFamily: 'Jacquard',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#61DBFB',
    },
    caixa_texto: {
        elevation: 8,
        width: '70%',
        color: 'black',
        // borderWidth: 3,
        margin: 3,
        backgroundColor: 'white'
    },
    botao1: {
        elevation: 8,
        justifyContent: 'center',
        backgroundColor: '#61DBFB',
        paddingVertical: 10,
        paddingHorizontal: 80,
        marginTop: 20,
    },
    botao2: {
        elevation: 8,
        justifyContent: 'center',
        backgroundColor: '#61DBFB',
        paddingVertical: 10,
        paddingHorizontal: 50,
        marginTop: 20,
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
