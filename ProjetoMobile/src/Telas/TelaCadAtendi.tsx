import {TextInput, View, Alert, Text, StyleSheet, Pressable} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Carregamento from '../Carregamento';
import { AtendimentoProps } from "../navigation/HomeNavigator";
import { useState } from 'react';
import { create } from 'react-test-renderer';
import { IAtendimento } from '../model/IAtendimento';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
  
const TelaCadAtendi = ({ navigation, route}: AtendimentoProps) =>{
    const [value, setValue] = useState(null);
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [exame, setExame] = useState('');
    //const [dataNasc, setDataNasc] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

function cadastrar(){
    setIsCarregando(true);

        let cliente = {
            nome: nome,
            exame: exame,
            descricao: descricao,
            //dataNasc: Date,
            created_at: firestore.FieldValue.serverTimestamp()
        } as IAtendimento;

        firestore()
        .collection('Atendimento')
        .add(cliente)
        .then(() => {
            Alert.alert("Nota", "Cadastrada com sucesso")
            navigation.navigate('TelaPrincipal')
        })
        .catch((error) => console.log(error))
        .finally(() => setIsCarregando(false));
    }
    setIsCarregando(false);      

    return(
    <View style={styles.container}>
        <Carregamento isCarregando={isCarregando}/>

        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )}
      />
            <Text style={styles.texto}>Exame</Text>

        <TextInput 
        style={styles.caixa_texto}
        secureTextEntry={true} 
        onChangeText={(text) => {setExame(text)}} 
        placeholder='Exame'/>

            <Text style={styles.texto}>Descrição</Text>
        <TextInput
        multiline
        numberOfLines={4}
        maxLength={100}
        style={styles.caixa_texto}
        onChangeText={(text) => { setDescricao(text)}} 
        placeholder='Descrição'/>

        <Pressable
            style={styles.botao}
            onPress={() => cadastrar()}
            disabled={isCarregando}>
            <Text style={styles.desc_botao}>Cadastrar</Text>
        </Pressable>
    </View>
)

}

export default TelaCadAtendi;

const styles=StyleSheet.create({
    container: {
        gap: 20
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      },
      icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
    texto: {
        color: 'black',
        fontSize: 30,
        textDecorationStyle: 'solid',
        textAlign: 'justify'
    },
    caixa_texto: {
        fontFamily: 'Cochin',
        fontSize: 18,
        color: 'black',
        borderWidth: 3,
    },
    botao: {
        elevation: 8,
        justifyContent: 'center',
        backgroundColor: '#61DBFB',
        padding: 20,
        marginTop: 20,
        width: 300,
        marginLeft: 45,
    },
    desc_botao: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    }
})
