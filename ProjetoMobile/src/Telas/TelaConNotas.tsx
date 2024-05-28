import {useState, useEffect} from 'react';
import { View, Pressable, FlatList, StyleSheet, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { TelaConProps } from '../navigation/HomeNavigator';
import Carregamento from '../Carregamento';
import { INotas } from "../model/INotas";

type ItemNotaProps = {
    numero: number;
    nota: INotas;
    onAlterar: (id: string) => void;
    onDeletar: (id: string) => void;
}

const ItemNota = (props: ItemNotaProps) => {
    return(
        <View style={styles.card}>
            <View style={styles.dados_card}>
                <Text style={{fontSize: 35}}>
                    {props.numero+1 + ' - ' + props.nota.titulo}
                </Text>
                <Text style={{ fontSize: 20 }}>{props.nota.descricao}</Text>
            </View>

        <View style={styles.botao_alterar}>
            <Pressable
            onPress={() => props.onAlterar(props.nota.id!)}>
                <Text style={styles.texto_botao_card}>
                ✎
                </Text>
            </Pressable>
        </View>

        <View style={styles.botao_excluir}>
            <Pressable
            onPress={() => props.onDeletar(props.nota.id!)}>
                <Text style={styles.texto_botao_card}>
                ☒
                </Text>
            </Pressable>
        </View>

        </View>
    )
}



const TelaConNotas = ({ navigation, route }: TelaConProps) => {
    const [notas, setNotas] = useState([] as INotas[]);
    const [isCarregando, setIsCarregando] = useState(false);

    useEffect(() => {
        setIsCarregando(true);

        const subscribe = firestore()
        .collection('notas')
        .onSnapshot(querySnapshot => {
            const data = querySnapshot.docs.map(doc => {

                return {
                    id: doc.id,
                    ...doc.data()
                }

            }) as INotas[];

            setNotas(data);
            setIsCarregando(false);
        });

        return () => subscribe();
    }, []);

    function deletarNota(id: string) {
        //
    }
    
    function alterarNota(id: string) {
        navigation.navigate("TelaAltNota", { id: id})
    } 

    return (
        <View style={styles.container} >
            <Carregamento isCarregando={isCarregando}/>
            <Text style={styles.titulo}>Listagem de Notas</Text>
            <FlatList 
            data={notas}
            renderItem={(info) => 
                <ItemNota numero={info.index} nota={info.item} onAlterar={alterarNota} onDeletar={deletarNota}/>}>

            </FlatList>

        </View>
    )
}


export default TelaConNotas;
    
    
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
