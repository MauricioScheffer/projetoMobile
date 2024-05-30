import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert, ImageBackground } from 'react-native';

import auth from "@react-native-firebase/auth";
// import { CadClientesProps } from '../navigation/HomeNavigator';
import Carregamento from '../Carregamento'

//BACKGROUND
const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const TelaCadClientes = ({navigation, route}: CadClientesProps) => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [email, setEmail] = useState(''); 
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);
    const [dataNasc, setDataNasc] = useState(''); 

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
        if(nome == ''){
            Alert.alert("Nome em branco", "Digite um nome")
            return false;
        }
        if(rua == ''){
            Alert.alert("Rua em branco", "Digite sua rua")
            return false;
        }
        if(numero == ''){
            Alert.alert("Número da Casa em branco", "Digite o número da sua casa")
            return false;
        }
        if(bairro == ''){
            Alert.alert("Bairro em branco", "Digite seu bairro")
            return false;
        }
        if(cidade == ''){
            Alert.alert("Cidade em branco", "Digite sua cidade")
            return false;
        }
        if(estado == ''){
            Alert.alert("Estado em branco", "Digite seu estado")
            return false;
        }
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
        if(erro.includes("[auth/")){
            Alert.alert("Formato inválido", "Ex.: 01/01/2000")
            return false;
        }if(erro.includes("[auth/invalid-email]")){
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
            <View style={styles.topo}>
                <Text style={styles.title}>Cadastro</Text>
            </View>
            <View style={styles.container_login}>

                <View style={styles.container_dados}>
                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setNome(text)}} placeholder='Nome'/>

                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setDataNasc(text)}} placeholder='Data de Nascimento'/>
                </View>

                <View style={styles.container_endereco}>
                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setRua(text)}} placeholder='Rua'/>

                <TextInput style={styles.caixa_texto_numero} onChangeText={(text) => {setNumero(text)}} placeholder='Número'/>

                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setBairro(text)}} placeholder='Bairro'/>

                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setCidade(text)}} placeholder='Cidade'/>

                <TextInput style={styles.caixa_texto_estado} onChangeText={(text) => {setEstado(text)}} placeholder='Estado'/>
                </View>

                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setEmail(text)}} placeholder='Email'/>

                <TextInput style={styles.caixa_texto} secureTextEntry={true} onChangeText={(text) => {setSenha(text)}} placeholder='Senha'/>

                <TextInput style={styles.caixa_texto} secureTextEntry={true} onChangeText={(text) => {setConfirmaSenha(text)}} placeholder='Confirmar Senha'/>


                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => cadastrar()}
                    disabled={isCarregando} >
                    <Text style={styles.desc_botao}>Entrar</Text>
                </Pressable>
                
            </View>
            {/* <ImageBackground/> */}
        </View>

    );
}

export default TelaCadClientes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFACB'
        // backgroundColor: '#100D28',
    }, 
    topo:{
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#61DBFB'
    },
    title:{
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: 20
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
        flexDirection: 'column',
        padding: 15,
    },
    container_dados:{
    }, 
    container_endereco:{
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'white',
        marginBottom:20,
    },
    caixa_texto_numero: {
        width: '20%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 0,
        backgroundColor: 'white',
        marginBottom:20,
    },
    caixa_texto_estado: {
        width: '20%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 0,
        backgroundColor: 'white',
        marginBottom:20,
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
