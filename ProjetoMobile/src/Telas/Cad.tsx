import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert, ImageBackground } from 'react-native';

import auth from "@react-native-firebase/auth";
import { CadUsuarioProps } from '../navigation/HomeNavigator';
import Carregamento from '../Carregamento'

//BACKGROUND
const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const Cadastro = ({navigation, route}: CadUsuarioProps) => {
    // const [nome, setNome] = useState('');
    const [email, setEmail] = useState(''); 
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);
    // const [dataNasc, setDataNasc] = useState(''); 

    function login() {

        if (verificaCampos()) {

            auth()
                .signInWithEmailAndPassword(email, senha)
                .then(() => { Alert.alert('Logado com sucesso') })
                .catch((error) => tratarErros( String(error) ))
        }
    }

    async function cadastrar() {
        setIsCarregando(true);

        if(verificaCampos()){
            auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(() => {
                Alert.alert("Conta", "Cadastro com sucesso")
                navigation.goBack();
            })
            .catch((error) => { tratarErros( String(error) )})
            .finally(() => {
            setIsCarregando(false)
            }); 
        }
        setIsCarregando;
    }

    function verificaCampos(){
        let resultado = true;
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
        if (confirmaSenha == ''){
            Alert.alert("Confirmação de senha em branco", "Digite a confirmção de senha")
            return false;
        }
        if (senha != confirmaSenha){
            Alert.alert("Confirmação de senha em branco", "Digite a confirmção de senha")
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
        } else if(erro.includes("[auth/weak-password]")){
            Alert.alert("Senha Fraca", "A senha digitada é fraca. A senha deve pelo " + "menos 6 dígitos.")
        } else if(erro.includes("[auth/email-already-in-use]")){
            Alert.alert("Email em uso", "O email inserido já foi cadastrado em outra conta.")
        }else{
            Alert.alert("Erro", erro)
        }
    }

    return (
        <View style={styles.container}>
            <Carregamento isCarregando={isCarregando}/>

             {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}></ImageBackground> */}

            {/* <View style={styles.painel_imagem}>
                <Image style={styles.imagem} source={require('./imagem/LogoMobile.png') } />
            </View> */}
            
            <View style={styles.container_login}>

                {/* <Text style={styles.titulo_caixa_texto}>Nome</Text>
                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setNome(text)}}/> */}

                <Text style={styles.titulo_caixa_1}>Email</Text>
                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setEmail(text)}} placeholder='Email'/>

                <Text style={styles.titulo_caixa_2}>Senha</Text>
                <TextInput style={styles.caixa_texto} secureTextEntry={true} onChangeText={(text) => {setSenha(text)}} placeholder='Senha'/>

                <Text style={styles.titulo_caixa_3}>Confirmar senha</Text>
                <TextInput style={styles.caixa_texto} secureTextEntry={true} onChangeText={(text) => {setConfirmaSenha(text)}} placeholder='Confirmar Senha'/>

                {/* <Text style={styles.titulo_caixa_texto}>Data de Nascimento</Text>
                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setDataNasc(text)}}/> */}

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => cadastrar()}
                    disabled={isCarregando} 
                    >
                    <Text style={styles.desc_botao}>Entrar</Text>
                </Pressable>
                
            </View>
            {/* <ImageBackground/> */}
        </View>

    );
}

export default Cadastro;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFACB'
        // backgroundColor: '#100D28',
    },
    painel_imagem: {
        flex:1,
        alignItems:'center', 
        justifyContent:'center'
    },
    imagem: { 
        width: 200, 
        height: 200
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    container_login: {
        flex: 2,
        padding: 15,
        alignItems: 'center'
    },
    titulo_caixa_1:{
        fontFamily: 'Cochin',
        fontWeight: 'bold',
        marginRight: 190,
        fontSize: 25,
        color: '#000'
    },titulo_caixa_2:{
        fontFamily: 'Cochin',
        fontWeight: 'bold',
        marginRight: 190,
        fontSize: 25,
        color: '#000'
    },
    titulo_caixa_3:{
        fontFamily: 'Cochin',
        fontWeight: 'bold',
        marginRight: 70,
        fontSize: 25,
        color: '#000'
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white',
        marginBottom:30
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: '#61DBFB',
        paddingVertical: 10,
        paddingHorizontal: 50,
        marginTop: 20,
        elevation: 8,
        fontWeight: 'bold',
        borderRadius: 3
    },
    desc_botao: {
        fontSize: 20,
        color: 'white'
    }
});
