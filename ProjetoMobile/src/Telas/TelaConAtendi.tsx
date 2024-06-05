import {useState, useEffect} from 'react';
import { View, Pressable, FlatList, StyleSheet, Text, Alert, ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { TelaConAtendimentoProps } from '../navigation/HomeNavigator';
import Carregamento from '../Carregamento';
import { IAtendimento } from '../model/IAtendimento';

type ItemNotaProps = {
    numero: number;
    atendimento: IAtendimento;
    //onAlterar: (id: string) => void;
    onDeletar: (id: string) => void;
}

const ItemNota = (props: ItemNotaProps) => {
    return(
        <View style={styles.card}>
            <View style={styles.dados_card}>
                <Text style={{fontSize: 25, fontWeight: '600'}}>
                    {props.numero+1 + ' - ' + props.atendimento.nome}
                </Text>
                <Text style={{ fontSize: 18, fontWeight: '900' }}>Exame: {props.atendimento.exame}</Text>
                <Text style={{ fontSize: 18, fontWeight: '900' }}>Descrição: {props.atendimento.descricao}</Text>
                <Text style={{ fontSize: 18, fontWeight: '900' }}>Data: {props.atendimento.data}</Text>
                <Text style={{ fontSize: 18, fontWeight: '900' }}>Hora: {props.atendimento.hora}</Text>
            </View>

        {/* <View style={styles.botao_alterar}>
            <Pressable
            onPress={() => props.onAlterar(props.atendimento.id!)}>
                <Text style={styles.texto_botao_card}>
                ✎
                </Text>
            </Pressable>
        </View>
        */}

        <View style={styles.botao_excluir}>
            <Pressable
            onPress={() => props.onDeletar(props.atendimento.id!)}>
                <Text style={styles.texto_botao_card}>
                Deletar
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
    
    //  function alterarNota(id: string) {
    //      navigation.navigate("TelaAltAtendi", { id: id})
    //  }

    return (
        <ImageBackground source={require ("../imagens/PaisagemConAtendimento.jpg")} style={styles.container} >
            <Carregamento isCarregando={isCarregando}/>
            <Text style={styles.titulo}>Consulta de Atendimentos</Text>
            <FlatList 
            data={atendimento}
            renderItem={(info) => 
                <ItemNota numero={info.index} atendimento={info.item}
                //onAlterar={alterarNota} 
                onDeletar={deletarNota}
                />}>

            </FlatList>

        </ImageBackground>
    )
}


export default TelaConAtendi;
    
    
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
        backgroundColor: '#fff'
    },
    dados_card:{
        flex: 1,
    },
    botao_alterar:{
        backgroundColor: 'green',
        width: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    texto_botao_card:{
        fontSize: 20,
        //fontSize: 30,
        fontWeight: '600',
        right: -2,
        color: 'red'
    },
    botao_excluir:{
        //backgroundColor: '#B22222',
        width: 100,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo:{
        marginTop: 40,
        marginBottom: 20,
        fontSize:30,
        textAlign:'center',
        color:'white',
        fontWeight: '700'
    }
});
