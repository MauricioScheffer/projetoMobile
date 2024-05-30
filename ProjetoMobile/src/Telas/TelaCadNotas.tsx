import {TextInput, View, Alert, Text, StyleSheet, Pressable} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Carregamento from '../Carregamento';
import { TelaCadNotasProps } from "../navigation/HomeNavigator";
import { useState } from 'react';
import {INotas} from '../model/INotas'
import { create } from 'react-test-renderer';


const TelaCadNotas = ({ navigation, route}: TelaCadNotasProps) =>{
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

function cadastrar(){
    setIsCarregando(true);

    if(verificaCampos()){
        let nota ={
            titulo: titulo,
            descricao: descricao,
            created_at: firestore.FieldValue.serverTimestamp()
        } as INotas;

        firestore()
        .collection('notas')
        .add(nota)
        .then(() => {
            Alert.alert("Nota", "Cadastrada com sucesso")
            navigation.navigate('TelaPrincipal')
        })
        .catch((error) => console.log(error))
        .finally(() => setIsCarregando(false));
    }
    setIsCarregando(false);
       
}

function verificaCampos(){
    if(titulo == ''){
        Alert.alert("Título em branco",
            "Preencha o Título")
            return false;
    }if(descricao == ''){
        Alert.alert("Descrição em branco",
            "Digite uma descrição da nota")
            return false;
    }
        return true;
}return(
    <View style={styles.container}>
        <Carregamento isCarregando={isCarregando}/>

        <Text style={styles.texto}> Título</Text>
        <TextInput
        style={styles.caixa_texto} onChangeText={(text) => { setTitulo(text )}} placeholder='Título' />
            
            <Text style={styles.texto}> Notas</Text>
        <TextInput
        multiline
        numberOfLines={4}
        maxLength={100}
        style={styles.caixa_texto}
        onChangeText={(text) => { setDescricao(text)}} 
        placeholder='Notas'/>

        <Pressable
            style={styles.botao}
            onPress={() => cadastrar()}
            disabled={isCarregando}>
            <Text style={styles.desc_botao}>Cadastrar</Text>
        </Pressable>
    </View>
)

}

const styles=StyleSheet.create({
    container: {
        gap: 20
    },
    texto: {
        color: 'black',
        fontSize: 30,
        textDecorationStyle: 'solid',
        textAlign: 'justify'
    },
    caixa_texto: {
        fontFamily: 'Cochin',
        fontSize: 18,
        color: 'black',
        borderWidth: 3,
    },
    botao: {
        elevation: 8,
        justifyContent: 'center',
        backgroundColor: '#61DBFB',
        padding: 20,
        marginTop: 20,
        width: 300,
        marginLeft: 45,
    },
    desc_botao: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    }
})

export default TelaCadNotas;