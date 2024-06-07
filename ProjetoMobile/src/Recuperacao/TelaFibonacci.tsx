import { View, Text, Pressable, TextInput, StyleSheet, Alert } from "react-native"
import { FibonacciProps } from "../navigation/HomeNavigator";
import { useState } from "react";


const TelaFibonacci = ({ navigation, route }: FibonacciProps) => {
    const [numero, setNumero] = useState(0); 

    function fibonar() {
        let numArray = [];

        let numA = 0;
        let numB = 1;
        let numC = 0;

        for (let cont = 1; cont <= numero; cont++) {
            numC = numA + numB;
            numA = numB;
            numB = numC;
            numArray.push(numC);
        }
        Alert.alert(numArray.toString());

    }


    return(
        <View>
            <Text style={styles.titulo}>
                Eba primeira atividade
            </Text>

            <TextInput
                    style={styles.caixa_texto} 
                    onChangeText={(text) => {setNumero(Number.parseInt(text))}}/>

            <Pressable style={styles.pressionavel}
            onPress={() => fibonar()} >
                <Text style={styles.texto_botao_card}>
                Fibonacci
                </Text>
            </Pressable>
        </View>
        
    )
}

export default TelaFibonacci;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF7F00',
        flex: 1,
    },
    titulo: {
        backgroundColor: '#4682B4',
        marginTop: 80,
        marginBottom: 60,
        textAlign: 'center',
        fontWeight: '900',
        padding: 10,
        marginHorizontal: 100,
        borderRadius: 0,
        fontSize: 20,
        color: 'white',
    },
    pressionavel: {
        elevation: 10,
        backgroundColor: '#4682B4',
        alignItems: 'center',
        width: 300,
        marginLeft: 45,
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
    },
    caixa_texto: {
        elevation: 8,
        width: '75%',
        color: 'black',
        fontWeight: '600',
        margin: 3,
        backgroundColor: 'white'
    },
    texto_botao_card:{
        fontSize: 20,
        fontWeight: '600',
        right: -2,
        color: 'red'
    }
});