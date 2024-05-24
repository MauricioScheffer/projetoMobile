import {TextInput, View, Alert, Text, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Carregamento from '../Carregamento';
import { CadNotaProps } from "../navigation/Screen";
import { useState } from 'react';
import {INotas} from '../model/INotas'
import { create } from 'react-test-renderer';


const TelaCadNota = ({ navigation, route}: CadNotaProps) =>{
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

function cadastrar(){
    setIsCarregando(true);

    if(verificaCampos()){
        let nota ={
            titulo: titulo,
            descricao: descricao,
            create_at: firestore.FieldValue.serverTimestamp()
        }as INotas;

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
    <View>
        <Carregamento isCarregando={isCarregando}/>

        <Text>Título</Text>
        <TextInput
        style={styles.caixa_texto} onChangeText={(text) => { setTitulo(text )}} placeholder='Título' />
            
            <Text>Descrição</Text>
        <TextInput
        multiline
        numberOfLines={4}
        maxLength={100}
        style={styles.caixa_texto}
        onChange={(text) => {setDescricao(text)}}/>
    </View>
)
}

const styles=StyleSheet.create({

})