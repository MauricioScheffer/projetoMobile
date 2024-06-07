import { View, Text, Pressable, StyleSheet, TextInput, FlatList } from "react-native"
import { RecuperacaoProps } from "../navigation/HomeNavigator";
import { useState } from "react";
import { Produto } from "../model/Produto";
import TelaProduto from "./TelaProduto";
import { Info } from "lucide-react";

type ProdutoProps = {
    onAlterar: (id:string) => void;
    produto: Produto;
}

const itemProduto = (props: ProdutoProps) => {
    return(
        <Pressable style={styles.botao_alterar}
        onPress={() => props.onAlterar(props.produto.id!)}>
            <Text style={styles.texto_botao_card}>
                Alterar produto
            </Text>
        </Pressable>
    )
} 

const TelaRecuperacao = ({ navigation, route }: RecuperacaoProps) => {

    const [numero, setNumero] = useState(''); 

    return(
        <View style={styles.container}>
            

        <TextInput
                style={styles.caixa_texto} 
                onChangeText={(text) => {setNumero(text.toString())}}/>
        

        <Text style={styles.titulo}>
                Minha recuperaçãozinha :3
            </Text>
            
        <Pressable style={styles.pressionavel}
            onPress={() => {navigation.navigate('TelaFibonacci')}}>
                <Text style={styles.texto_botao_card}>
                Fibonacci atividade 1
                </Text>
        </Pressable>

        <Pressable style={styles.pressionavel}
        onPress={() => {navigation.navigate('TelaProduto', {id: numero})}}>
            
                <Text style={styles.texto_botao_card}>
                Alterar produto atividade 2
                </Text>
        </Pressable>


        </View>
    )
}

export default TelaRecuperacao;

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
    botao_alterar:{
        backgroundColor: 'green',
        width: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto_botao_card:{
        fontSize: 20,
        fontWeight: '600',
        right: -2,
        color: 'red'
    },
});