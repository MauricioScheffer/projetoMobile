import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';

import auth from "@react-native-firebase/auth";

const Login = () => {
    // const [nome, setNome] = useState('');
    const [email, setEmail] = useState(''); 
    const [senha, setSenha] = useState('');
    // const [dataNasc, setDataNasc] = useState(''); 

    function login() {
        if (verificaCampos()) {

            auth()
                .signInWithEmailAndPassword(email, senha)
                .then(() => { Alert.alert('Logado com sucesso') })
                .catch((error) => tratarErros( String(error) ))
        }
    }

    function verificaCampos(){
        // if( nome == ''){
        //     Alert.alert("Nome em branco", "Digite um nome")
        //     return false;
        // }
        if (email == ''){
            Alert.alert("Email em branco", "Digite um email")
            return false;
        }
        if (senha == ''){
            Alert.alert("Senha em branco", "Digite uma senha")
            return false;
        }
        // if (dataNasc == ''){
        //     Alert.alert("Data de Nascimento em branco", "Digite uma data")
        //     return false;
        // }

        return true;
    }

    //TIRAR ISSO 
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
                    source={require('./imagem/LogoMobile.png') } />
            </View>
            
            <View style={styles.container_login}>

                {/* <Text style={styles.titulo_caixa_texto}>Nome</Text>
                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setNome(text)}}/> */}

                <Text style={styles.titulo_caixa_texto}>Email</Text>
                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setEmail(text)}}/>

                <Text style={styles.titulo_caixa_texto}>Senha</Text>
                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setSenha(text)}}/>

                {/* <Text style={styles.titulo_caixa_texto}>Data de Nascimento</Text>
                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setDataNasc(text)}}/> */}

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={login}>
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
        backgroundColor: '#100D28',
    },
    container_login: {
        flex: 2,
        padding: 15,
        alignItems: 'center'
    },
    titulo_caixa_texto:{
        right: 90,
        fontSize: 25,
        color: '#fff'
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 0,
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
