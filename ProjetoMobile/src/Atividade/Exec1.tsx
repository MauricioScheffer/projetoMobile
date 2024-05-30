import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert } from 'react-native';

import { Exec1Props } from '../navigation/HomeNavigator';

const Exec1 = ({ navigation, route }: Exec1Props) => {
    const [numero, setNumero] = useState(0);
    let numArray: number[] = [];

    function Calcular(){
        numArray = [];
        if (numero > 0) {
            let num = 1;
            while (num!=numero + 1){
                if (num % 3 == 0){
                    numArray.push(num);
            }
            num++;}

        }else{
            Alert.alert('Numero inválido');
    }Alert.alert(numArray.toString());
}

    return (
        <View style={styles.container}>
            <Text
            style={styles.titulo_caixa_texto}>
            ATIVIDADE 1🧮
            </Text>

            <TextInput
                keyboardType='numeric'
                style={styles.caixa_texto}
                onChangeText={(text) => { setNumero(Number.parseFloat(text)) }} placeholder='Digite um número'/>

            <Pressable
                style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                onPress={Calcular} >
                <Text style={styles.desc_botao}>Calcular</Text>
            </Pressable>
        </View>
    )
};

export default Exec1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        paddingTop: 150,
        alignItems: 'center'
    },
    titulo_caixa_texto:{
        fontFamily: 'Jacquard',
        fontWeight: 'bold',
        fontSize: 25,
        color: '#61DBFB',
        paddingBottom: 20
    },
    caixa_texto: {
        alignSelf: 'center',
        width: '70%',
        color: 'black',
        borderWidth: 2,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white'
    },
    botao: {
        elevation: 8,
        justifyContent: 'center',
        backgroundColor: '#61DBFB',
        paddingVertical: 10,
        paddingHorizontal: 50,
        marginTop: 20,
    },
    desc_botao: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'center'
    }
});
