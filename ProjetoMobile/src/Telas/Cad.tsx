import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert, ImageBackground } from 'react-native';

import auth from "@react-native-firebase/auth";
import { CadUsuarioProps } from '../navigation/HomeNavigator';
import Carregamento from '../Carregamento'
import firestore from '@react-native-firebase/firestore';

//BACKGROUND
const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const Cadastro = ({navigation, route}: CadUsuarioProps) => {
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

    async function cadastrar() {
        setIsCarregando(true);

        if(verificaCampos()){
            firestore()
            .collection('Clientes')
            .add({
               nome, cpf, rua, numero, bairro, cidade, estado, email, senha, dataNasc
             })
            .then(() => {
                Alert.alert("Cliente", "Cadastro com sucesso");
                setNome(''); setRua(''); setNumero(''); setBairro(''); setCidade(''); setEstado(''); 
                setCpf(''); setEmail(''); setSenha('');
                navigation.navigate('TelaPrincipal')
            })
           .catch((error) => tratarErros( String(error) ))
        }
        setIsCarregando(false);
    }

    function verificaCampos(){
        if(nome == ''){
            Alert.alert("Nome em branco", "Digite um nome")
            return false;
        }if (dataNasc == ''){
            Alert.alert("Data de Nascimento em branco", "Digite uma data")
            return false;
        }if(cpf == ''){
            Alert.alert("CPF em branco", "Digite um CPF")
            return false;
        }if(rua == ''){
            Alert.alert("Rua em branco", "Digite sua rua")
            return false;
        }if(numero == ''){
            Alert.alert("Número da Casa em branco", "Digite o número da sua casa")
            return false;
        }if(bairro == ''){
            Alert.alert("Bairro em branco", "Digite seu bairro")
            return false;
        }if(cidade == ''){
            Alert.alert("Cidade em branco", "Digite sua cidade")
            return false;
        }if(estado == ''){
            Alert.alert("Estado em branco", "Digite seu estado")
            return false;
        }if (email == ''){
            Alert.alert("Email em branco", "Digite um email")
            return false;
        }if (senha == ''){
            Alert.alert("Senha em branco", "Digite uma senha")
            return false;
        }if (confirmaSenha == ''){
            Alert.alert("Confirmação de senha em branco", "Digite a confirmção de senha")
            return false;
        }if (senha != confirmaSenha){
            Alert.alert("Confirmação de senha em branco", "Digite a confirmção de senha")
            return false;
        }
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
            {/* <Carregamento isCarregando={isCarregando}/> */}

             {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}></ImageBackground> */}

            {/* <View style={styles.painel_imagem}>
                <Image style={styles.imagem} source={require('./imagem/LogoMobile.png') } />
            </View> */}
            <View style={styles.topo}>
                <Text style={styles.title}>Cadastro</Text>
            </View>
            <View style={styles.container_login}>

                <View style={styles.container_1}>
                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setNome(text)}} placeholder='Nome'/>

                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setDataNasc(text)}} placeholder='Data de Nascimento'/>
                </View>

                <View style={styles.container_2}>
                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setCpf(text)}} placeholder='CPF'/>

                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setRua(text)}} placeholder='Rua'/>
                </View>

                <View style={styles.container_3}>
                <TextInput style={styles.caixa_texto_numero} onChangeText={(text) => {setNumero(text)}} placeholder='Número'/>

                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setBairro(text)}} placeholder='Bairro'/>
                </View>

                <View style={styles.container_4}>
                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setCidade(text)}} placeholder='Cidade'/>

                <TextInput style={styles.caixa_texto_estado} onChangeText={(text) => {setEstado(text)}} placeholder='Estado'/>
                </View>

                <View style={styles.meio}>
                <Text style={styles.title}>Conta</Text>
                </View>

                <View style={styles.container_5}>
                <TextInput style={styles.caixa_texto} onChangeText={(text) => {setEmail(text)}} placeholder='Email'/>

                <TextInput style={styles.caixa_texto} secureTextEntry={true} onChangeText={(text) => {setSenha(text)}} placeholder='Senha'/>
                </View>

                <View style={styles.container_6}>
                <TextInput style={styles.caixa_texto} secureTextEntry={true} onChangeText={(text) => {setConfirmaSenha(text)}} placeholder='Confirmar Senha'/>
                </View>

                <Pressable
                    style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null] }
                    onPress={() => cadastrar()} >
                    <Text style={styles.desc_botao}>Cadastrar</Text>
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
    topo:{
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#61DBFB'
    }, 
    meio:{
        backgroundColor: '#61DBFB',
        alignSelf: 'center',
        flexDirection: 'row',
        height: 70,
        width: 200,
        textAlign: 'center',
        marginBottom: 20
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
    container_1:{
        flexDirection: 'row',
        gap: 10
    }, 
    container_2:{
        flexDirection: 'row',
        gap: 10
    },
    container_3:{
        flexDirection: 'row',
        gap: 10
    },
    container_4:{
        flexDirection: 'row',
        gap: 10
    },
    container_5:{
        flexDirection: 'row',
        gap: 10
    },
    container_6:{
    },
    caixa_texto: {
        width: '50%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'white',
        marginBottom:20,
    },
    caixa_texto_numero: {
        width: '50%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 0,
        backgroundColor: 'white',
        marginBottom:20,
    },
    caixa_texto_estado: {
        width: '50%',
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
        marginHorizontal: 60,
        marginTop: 20,
        elevation: 8,
        fontWeight: 'bold',
        borderRadius: 3
    },
    desc_botao: {
        fontSize: 20,
        color: 'white',
        alignSelf:'center'
    }
});
