import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';

import auth from "@react-native-firebase/auth";
import { Exec2Props } from '../navigation/HomeNavigator';
import ListaFlat from '../ListaFlat';
import Carregamento from '../Carregamento'
import firestore from '@react-native-firebase/firestore';

const Exec2 = ({ navigation, route }: Exec2Props) => {
    const [codigo, setCodigo] = useState('');
    const [preco, setPreco] = useState('');
    const [nome, setNome] = useState('');

    const cadastrar = () => {          
        if(verificaCampos()){
            
            firestore()
            .collection('produtos')
            .add({
                codigo,
                nome,
                preco
             })
            .then(() => {
                Alert.alert("Produto", "Cadastro com sucesso");
                setCodigo('');
                setNome('');
                setPreco('');
            })
            .catch((error) => {
                Alert.alert('Erro ao cadasrtrar' + error)})
        }
    }

    function verificaCampos(){
        if(nome == ''){
            Alert.alert("Nome em branco", "Digite um nome")
            return false;
        }
        if(codigo == ''){
            Alert.alert("Rua em branco", "Digite sua rua")
            return false;
        }
        if(preco == ''){
            Alert.alert("Número da Casa em branco", "Digite o número da sua casa")
            return false;
        }
        return true;
    }

    return (
        <View style={styles.container}>

            <Text
                style={styles.titulo_caixa_texto}>
                ATIVIDADE 2🛒
            </Text>

            <View style={styles.container_main}>

                <View 
                style={styles.container_dados}>

                <TextInput 
                keyboardType='numeric'
                style={styles.caixa_texto}
                onChangeText={(text) => {setCodigo(text)}} 
                placeholder='Código de Barras'/>

                <TextInput
                style={styles.caixa_texto}
                onChangeText={(text) => {setNome(text)}} 
                placeholder='Nome'/>
                </View>

                <TextInput 
                keyboardType='numeric' 
                style={styles.caixa_texto_numero}
                onChangeText={(text) => {setPreco(text)}} 
                placeholder='Preço'/>

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

export default Exec2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'grey'
        // backgroundColor: '#100D28',
    }, 
    topo:{
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#61DBFB',
    },
    titulo_caixa_texto:{
        fontFamily: 'Jacquard',
        fontWeight: 'bold',
        fontSize: 25,
        color: '#61DBFB',
        alignSelf: 'center',
        paddingTop: 40
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    container_main: {
        flex: 2,
        flexDirection: 'column',
        padding: 15,
        paddingTop: 40
    },
    container_dados:{
        flexDirection: 'row',
        gap: 10
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
    botao: {
        justifyContent: 'center',
        backgroundColor: '#61DBFB',
        paddingVertical: 10,
        marginHorizontal: 60,
        marginTop: 20,
        elevation: 8,
        fontWeight: 'bold',
        borderRadius: 3
    },
    desc_botao: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center'
    }
});
