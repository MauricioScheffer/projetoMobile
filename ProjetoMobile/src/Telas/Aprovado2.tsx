import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { AprovadoProps } from '../navigation/HomeNavigator.tsx';

const Aprovado = ({navigation,route}: AprovadoProps) => {
    const [nome, setNome] = useState('');
    const [nota1, setNota1] = useState(0);
    const [nota2, setNota2] = useState(0);

    function media() {
        return (nota1 + nota2) / 2;
    }
    
    function resultado() {
        let mediaNota = media();
        let texto = mediaNota >= 7 ? 'Aprovado' : 'Reprovado'

        if(mediaNota >= 7){
            texto = 'Apovado'
        }else{
            texto = 'Reprovado'
        }
        
        return texto;
    }
    
    function calcular() {
        let mensagem = 'O aluno '+ nome + ' teve a média: ' + media() + ' e está ' + resultado();
        Alert.alert(mensagem);
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, color: '#000' }}>
                Nome:
            </Text>
            <TextInput
                style={styles.caixa_texto}
                onChangeText={(text) => { setNome(text) }} />

            <Text style={{ fontSize: 30, color: '#000' }}>
                Nota 1:
            </Text>
            <TextInput
                style={styles.caixa_texto}
                onChangeText={(text) => { setNota1(Number.parseFloat(text)) }} />

            <Text style={{ fontSize: 30, color: '#000' }}>
                Nota 2:
            </Text>
            <TextInput
                style={styles.caixa_texto}
                onChangeText={(text) => { setNota2(Number.parseFloat(text)) }} />

            <Pressable
                style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                onPress={calcular}>
                <Text style={styles.desc_botao}>Calcular</Text>
            </Pressable>
        </View>
    )
};

export default Aprovado;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFACD'
    },
    container_login: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo_caixa_texto: {
        fontSize: 25,
        color: 'black',
        fontWeight: 'bold',
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 2,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white'
    },
    botao: {
        backgroundColor: '#61DBFB',
        alignItems: 'center',
        padding: 20,
        marginTop: 20,
        elevation: 8,
        width: 300,
        borderRadius: 4,
        marginLeft: 45,
    },
    desc_botao: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    painel_imagem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagem: {
        width: 200,
        height: 200,
        resizeMode: "center"
    }
});