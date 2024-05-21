import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput } from 'react-native';

const Aprovado = () => {
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
        <>
            <Text style={{ fontSize: 40 }}>
                Nome:
            </Text>
            <TextInput
                style={styles.caixa_texto}
                onChangeText={(text) => { setNome(text) }} />

            <Text style={{ fontSize: 30 }}>
                Nota 1:
            </Text>
            <TextInput
                style={styles.caixa_texto}
                onChangeText={(text) => { setNota1(Number.parseFloat(text)) }} />

            <Text style={{ fontSize: 30 }}>
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
        </>
    )
};

export default Aprovado;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFACD'
    },
    container_login: {
        flex: 2,
        alignItems: 'center'
    },
    titulo_caixa_texto: {
        fontSize: 25,
        color: 'black'
    },
    caixa_texto: {
        width: '70%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'white'
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 10
    },
    desc_botao: {
        fontSize: 20,
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