import { View, Text, Pressable, TextInput, StyleSheet, Alert } from "react-native"
import { ProdutoProps } from "../navigation/HomeNavigator";
import { useEffect, useState } from "react";
import { Produto } from "../model/Produto";
import firestore from '@react-native-firebase/firestore';


const TelaProduto = ({ navigation, route }: ProdutoProps) => {
    const [id,] = useState(route.params.id);
    const [nome, setNome] = useState('');
    const [codBarras, setCodBarras] = useState('');
    const [preco, setPreco] = useState('');

    async function carregar() {
        const resultado = await firestore()
            .collection('produtos')
            .doc(id)
            .get();

        const produto= {
            id: resultado.id,
            ...resultado.data()
        } as Produto;

        setNome(produto.nome);
        setCodBarras(produto.codBarras);
        setPreco(produto.preco);
    };

    useEffect(() => {
        carregar();
    }, []);

    function alterar() {

        firestore()
            .collection('produtos')
            .doc(id)
            .update({
                nome,
                codBarras,
                preco,
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Produto", "Alterado com sucesso")
                navigation.goBack();
            })
            .catch((error) => console.log(error))
        
    }


    return(
        <View>
            <Text style={styles.titulo}>
                Alterar produto
            </Text>

            <TextInput
                    style={styles.caixa_texto}
                    value={nome} 
                    onChangeText={(text) => {setNome(text)}}/>
            
            <TextInput
                    style={styles.caixa_texto}
                    value={codBarras} 
                    onChangeText={(text) => {setCodBarras(text)}}/>
            
            <TextInput
                    style={styles.caixa_texto}
                    value={preco} 
                    onChangeText={(text) => {setPreco(text)}}/>

            <Pressable
                        style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                        onPress={() => alterar()} >
                        <Text style={styles.desc_botao}>Cadastrar</Text>
            </Pressable>

        </View>
    )
}

export default TelaProduto;

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
    desc_botao: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center'
    },
    botao: {
        justifyContent: 'center',
        backgroundColor: '#4682B4',
        paddingVertical: 10,
        paddingHorizontal: 50,
        marginHorizontal: 60,
        marginTop: 10,
        elevation: 8,
        fontWeight: 'bold',
        borderRadius: 10
    },
});