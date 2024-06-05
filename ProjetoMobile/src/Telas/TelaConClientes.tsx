import {useState, useEffect} from 'react';
import { View, Pressable, FlatList, StyleSheet, Text, Alert, ImageBackground} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { TelaConClienteProps } from '../navigation/HomeNavigator';
import Carregamento from '../Carregamento';
import { IClientes } from "../model/IClientes";

type ItemClienteProps = {
    numero: number;
    cliente: IClientes;
    onAlterar: (id: string) => void;
    onDeletar: (id: string) => void;
}

const ItemCliente = (props: ItemClienteProps) => {
    return(
        <View style={styles.card}>
            <View style={styles.dados_card}>
                <Text style={{fontSize: 35}}>
                    {props.numero+1 + ' - ' + props.cliente.nome}
                </Text>
                <Text style={{ fontSize: 20 }}>{props.cliente.cpf}</Text>
            </View>

        <View style={styles.botao_alterar}>
            <Pressable
            onPress={() => props.onAlterar(props.cliente.id!)}>
                <Text style={styles.texto_botao_card}>
                ✎
                </Text>
            </Pressable>
        </View>

        <View style={styles.botao_excluir}>
            <Pressable
            onPress={() => props.onDeletar(props.cliente.id!)}>
                <Text style={styles.texto_botao_card}>
                ☒
                </Text>
            </Pressable>
        </View>

        </View>
    )
}


const TelaConClientes = ({ navigation, route }: TelaConClienteProps) => {
    const [cliente, setCliente] = useState([] as IClientes[]);
    const [isCarregando, setIsCarregando] = useState(false);

    useEffect(() => {
        setIsCarregando(true);

        const subscribe = firestore()
        .collection('Clientes')
        .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => {

                return {
                    id: doc.id,
                    ...doc.data()
                }

            }) as IClientes[];

            setCliente(data);
            setIsCarregando(false);
        });

        return () => subscribe();
    }, []);

    function deletarCliente(id: string) {
        setIsCarregando(true);

        firestore()
        .collection('Clientes')
        .doc(id)
        .delete()
        .then(() => {
            Alert.alert("Cliente", "Removido com sucesso!")
        })
        .catch((error) => console.log(error))
        .finally(() => setIsCarregando(false));
    }
    
    function alterarCliente(id: string) {
        navigation.navigate('TelaAltClientes', { id: id})
    } 

    return (
        <ImageBackground source={require ("../imagens/Iphone.jpg")} style={styles.container}>
            <Carregamento isCarregando={isCarregando}/>
            <Text style={styles.titulo}>Consulta de Clientes</Text>
            <FlatList 
            data={cliente} renderItem={(info) => <ItemCliente numero={info.index} cliente={info.item} onAlterar={alterarCliente} onDeletar={deletarCliente}/>}>

            </FlatList>

        </ImageBackground>
    )
}


export default TelaConClientes;
    
    
const styles =StyleSheet.create({
    container:{
        flex: 1,
    },
    card: {
        borderWidth: 2,
        borderColor: 'grey',
        margin: 5,
        borderRadius: 10,
        padding: 3,
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    dados_card:{
        flex: 1
    },
    botao_alterar:{
        backgroundColor: 'green',
        width: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto_botao_card:{
        fontSize: 50,
        right: -2,
        color: 'black'
    },
    botao_excluir:{
        backgroundColor: 'red',
        width: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo:{
        marginTop: 30,
        fontSize:40,
        textAlign:'center',
        color:'white',
        fontWeight: '900'
    }
});
