import {useState, useEffect} from 'react';
import { View, Pressable, FlatList, StyleSheet, Text, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { TelaConAtendimentoProps } from '../navigation/HomeNavigator';
import Carregamento from '../Carregamento';
import { IAtendimento } from '../model/IAtendimento';

type ItemNotaProps = {
    numero: number;
    atendimento: IAtendimento;
    onAlterar: (id: string) => void;
    onDeletar: (id: string) => void;
}

const ItemNota = (props: ItemNotaProps) => {
    return(
        <View style={styles.card}>
            <View style={styles.dados_card}>
                <Text style={{fontSize: 35}}>
                    {props.numero+1 + ' - ' + props.atendimento.nome}
                </Text>
                <Text style={{ fontSize: 20 }}>{props.atendimento.exame}</Text>
            </View>

        <View style={styles.botao_alterar}>
            <Pressable
            onPress={() => props.onAlterar(props.atendimento.id!)}>
                <Text style={styles.texto_botao_card}>
                ✎
                </Text>
            </Pressable>
        </View>

        <View style={styles.botao_excluir}>
            <Pressable
            onPress={() => props.onDeletar(props.atendimento.id!)}>
                <Text style={styles.texto_botao_card}>
                ☒
                </Text>
            </Pressable>
        </View>

        </View>
    )
}



const TelaConAtendi = ({ navigation, route }: TelaConAtendimentoProps) => {
    const [atendimento, setAtendimento] = useState([] as IAtendimento[]);
    const [isCarregando, setIsCarregando] = useState(false);

    useEffect(() => {
        setIsCarregando(true);

        const subscribe = firestore()
        .collection('Atendimento')
        .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => {

                return {
                    id: doc.id,
                    ...doc.data()
                }

            }) as IAtendimento[];

            setAtendimento(data);
            setIsCarregando(false);
        });

        return () => subscribe();
    }, []);

    function deletarNota(id: string) {
        setIsCarregando(true);

        firestore()
        .collection('Atendimento')
        .doc(id)
        .delete()
        .then(() => {
            Alert.alert("Atendimento", "Removido com sucesso!")
        })
        .catch((error) => console.log(error))
        .finally(() => setIsCarregando(false));
    }
    
    function alterarNota(id: string) {
        navigation.navigate("TelaAltClientes", { id: id})
    }

    return (
        <View style={styles.container} >
            <Carregamento isCarregando={isCarregando}/>
            <Text style={styles.titulo}>Listagem de Atendimentos</Text>
            <FlatList 
            data={atendimento}
            renderItem={(info) => 
                <ItemNota numero={info.index} atendimento={info.item} onAlterar={alterarNota} onDeletar={deletarNota}/>}>

            </FlatList>

        </View>
    )
}


export default TelaConAtendi;
    
    
const styles =StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFACD'
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
        fontSize:40,
        textAlign:'center',
        color:'black'
    }
});
