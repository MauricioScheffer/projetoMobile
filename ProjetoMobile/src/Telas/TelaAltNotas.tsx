import { useEffect, useState } from "react";
import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {INotas} from '../model/INotas'
import Carregamento from "../Carregamento";
import { AltNotaProps } from "../navigation/HomeNavigator";

const TelaAltNota = ({ navigation, route}: AltNotaProps) => {
    const [id,] = useState(route.params.id);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

    async function carregar() {
        setIsCarregando(true);
        const resultado = await firestore()
        .collection('notas')
        .doc(id)
        .get();

        const nota = {
            id: resultado.id,
            ...resultado.data()
        } as INotas;

        setTitulo(nota.titulo);
        setDescricao(nota.descricao);
        setIsCarregando(false);
    }

    useEffect(() => {
        carregar();
    }, []);

    function alterar(){
        setIsCarregando(true);

        firestore()
        .collection('notas')
        .doc(id)
        .update({
            titulo,
            descricao,
            created_at: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            Alert.alert("Nota", "Alterad com sucesso")
            navigation.goBack();
        })
        .catch((error) => console.log(error)) 
        .finally(() => setIsCarregando(false));
    }

    return(
        <View
        style={styles.container}>
            <Carregamento isCarregando={isCarregando}/>

            <Text style={styles.titulo}>Alterar Nota</Text>

            <Text style = {styles.desc_caixa_texto}>
                Título
            </Text>
            <TextInput
            style={styles.caixa_texto}
            value={titulo}
            onChangeText={(text) => { setTitulo(text)}}/>

            <Text style = {styles.desc_caixa_texto}>
                    Descrição
            </Text>
            <TextInput
            multiline
            numberOfLines={4}
            maxLength={100}
            style={styles.caixa_texto}
            value={descricao}
            onChangeText={(text) => { setDescricao(text)}}/>

            <Pressable
            style={styles.botao}
            onPress={() => alterar()}
            disabled={isCarregando}>
                <Text style = {styles.desc_botao}>Alterar</Text>
            </Pressable>
        </View>
    )
}

export default TelaAltNota;

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#FFFACD'
    },
    titulo:{
        color: 'black',
        fontSize: 30,
        textDecorationStyle: 'solid',
        textAlign: 'center',
        paddingBottom: 20,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    desc_caixa_texto:{
        fontSize: 20,
        fontWeight: 'bold',
        right: -5
    },

    caixa_texto:{
        fontFamily: 'Cochin',
        fontSize: 18,
        color: 'black',
        borderWidth: 3,
        marginBottom: 20
    },
    botao:{
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
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    }
})