import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert, ImageBackground, ScrollView } from 'react-native';

import auth from "@react-native-firebase/auth";
import { CadUsuariosProps } from '../navigation/HomeNavigator';
import Carregamento from '../Carregamento'
import firestore from '@react-native-firebase/firestore';

const CadUsuarios = ({ navigation, route }: CadUsuariosProps) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    async function cadastrar() {
        setIsCarregando(true);

        if (verificaCampos()) {
            firestore()
                .collection('Usuário')
                .add({
                   email, senha
                })
                .then(() => {
                    Alert.alert("Usuário", "Cadastro com sucesso");
                    setEmail(''); setSenha('');
                    navigation.navigate('TelaLogin')
                })
                .catch((error) => tratarErros(String(error)))
        }
        setIsCarregando(false);
    }

    function verificaCampos() {
         if (email == '') {
            Alert.alert("Email em branco", "Digite um email")
            return false;
        } if (senha == '') {
            Alert.alert("Senha em branco", "Digite uma senha")
            return false;
        } if (confirmaSenha == '') {
            Alert.alert("Confirmação de senha em branco", "Digite a confirmção de senha")
            return false;
        } if (senha != confirmaSenha) {
            Alert.alert("Confirmação de senha em branco", "Digite a confirmção de senha")
            return false;
        }
        return true;
    }
    //TIRAR ISSO 
    function tratarErros(erro: string) {
        console.log(erro);
        if (erro.includes("[auth/")) {
            Alert.alert("Formato inválido", "Ex.: 01/01/2000")
            return false;
        } if (erro.includes("[auth/invalid-email]")) {
            Alert.alert("Email inválido", "Digite um email válido")
        } else if (erro.includes("[auth/weak-password]")) {
            Alert.alert("Senha Fraca", "A senha digitada é fraca. A senha deve pelo " + "menos 6 dígitos.")
        } else if (erro.includes("[auth/email-already-in-use]")) {
            Alert.alert("Email em uso", "O email inserido já foi cadastrado em outra conta.")
        } else {
            Alert.alert("Erro", erro)
        }
    }

    return (
        <ImageBackground source={require ("../imagens/PaisagemCadClientes.jpg")} style={styles.container}>
                <ScrollView>
               <Carregamento isCarregando={isCarregando} />
                <View style={styles.topo}>
                    <Text style={styles.title}>CADASTRO</Text>
                </View>
                    <View style={styles.container_caixas}>
                        <TextInput style={styles.caixa_texto} onChangeText={(text) => { setEmail(text) }} placeholder='Email' />

                        <TextInput style={styles.caixa_texto} secureTextEntry={true} onChangeText={(text) => { setSenha(text) }} placeholder='Senha' />

                        <TextInput style={styles.caixa_texto} secureTextEntry={true} onChangeText={(text) => { setConfirmaSenha(text) }} placeholder='Confirmar Senha' />
                    </View>

                    <Pressable
                        style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                        onPress={() => cadastrar()} >
                        <Text style={styles.desc_botao}>Cadastrar</Text>
                    </Pressable>

        </ScrollView>
        </ImageBackground>
    )
}

export default CadUsuarios;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#100D28',
    },
    topo: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20,
        height: 70,
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        margin: 20,
        left: 115
    },
    container_caixas: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container_6: {
        left: 90
    },
    caixa_texto: {
        width: '60%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 20,
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: '#4682B4',
        paddingVertical: 10,
        paddingHorizontal: 70,
        marginHorizontal: 80,
        marginTop: 10,
        elevation: 8,
        fontWeight: 'bold',
        borderRadius: 10
    },
    desc_botao: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center'
    }
});
