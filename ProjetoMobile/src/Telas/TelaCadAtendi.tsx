import { TextInput, View, Alert, Text, StyleSheet, Pressable, ImageBackground, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Carregamento from '../Carregamento';
import { AtendimentoProps } from "../navigation/HomeNavigator";
import React, { useState, useEffect } from 'react';
import { create } from 'react-test-renderer';
import { IAtendimento } from '../model/IAtendimento';
import { Dropdown } from 'react-native-element-dropdown';
import { IClientes } from '../model/IClientes';
//import  AntDesign  from '@expo/vector-icons/AntDesign';

const TelaCadAtendi = ({ navigation, route }: AtendimentoProps) => {
  const [value, setValue] = useState(null);
  const [clientes, setClientes] = useState([] as IClientes[]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [exame, setExame] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
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

        setClientes(data);
        setIsCarregando(false);
      });

    return () => subscribe();
  }, []);

  function verificaCampos() {
    if (nome == '') {
      Alert.alert("Nome em branco", "Digite um nome")
      return false;
    } if (descricao == '') {
      Alert.alert("descricao em branco", "Digite uma descricao")
      return false;
    } if (exame == '') {
      Alert.alert("exame em branco", "Digite um exame")
      return false;
    }
  }

  function cadastrar() {
    setIsCarregando(true);

    let cliente = {
      nome: nome,
      exame: exame,
      descricao: descricao,
      data: data,
      hora: hora,
      //dataNasc: Date,
      created_at: firestore.FieldValue.serverTimestamp()
    } as IAtendimento;

    firestore()
      .collection('Atendimento')
      .add(cliente)
      .then(() => {
        Alert.alert("Atendimento", "Cadastrada com sucesso")
        navigation.navigate('TelaPrincipal')
      })
      .catch((error) => console.log(error))
      .finally(() => setIsCarregando(false));
  }

  //   async function cadastrar() {
  //     setIsCarregando(true);

  //     if (verificaCampos()) {
  //         firestore()
  //             .collection('Clientes')
  //             .add({
  //                 nome, cpf, rua, numero, bairro, cidade, estado, complemento, email, senha, dataNasc
  //             })
  //             .then(() => {
  //                 Alert.alert("Cliente", "Cadastro com sucesso");
  //                 setNome(''); setRua(''); setNumero(''); setBairro(''); setCidade(''); setEstado('');
  //                 setCpf(''); setEmail(''); setSenha('');
  //                 navigation.navigate('TelaPrincipal')
  //             })
  //             .catch((error) => tratarErros(String(error)))
  //     }
  //     setIsCarregando(false);
  // }
  const formatarData = (text: string) => {
    let dataFormatada = text.replace(/\D/g, '');

    if (dataFormatada.length > 2) {
        dataFormatada = dataFormatada.replace(/^(\d{2})(\d)/g, '$1/$2');
        if (dataFormatada.length > 5) {
            dataFormatada = dataFormatada.replace(/^(\d{2})\/(\d{2})(\d)/g, '$1/$2/$3');
        }
    }

    return dataFormatada.substring(0, 10);
};

const ajustarData = (text: string) => {
    const dataFormatada = formatarData(text);
    setData(dataFormatada);
};

// const formatTime = (text: string) => {
//   // Verifica se o texto inserido é um formato de hora válido (HH:mm)
//   const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
//   if (regex.test(text)) {
//     setHora(text);
//   }
// }
  return (
    <ImageBackground source={require("../imagens/PaisagemCadAtendimento.jpg")} style={styles.container}>
    <ScrollView>
      <Carregamento isCarregando={isCarregando} />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={clientes}
        search
        maxHeight={300}
        labelField="nome"
        valueField="id"
        placeholder="Select item"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.nome as any);
          setNome(item.nome);
        }}
      // renderLeftIcon={() => (
      //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      // )}
      />
      <View style={styles.containerDH}>

      {/* <Text style={styles.texto}>Dia</Text> */}

      <TextInput
        style={styles.caixa_data}
        keyboardType='numeric'
        onChangeText={ajustarData}
        value={data}
        placeholder='DD/MM/AA' />

      {/* <Text style={styles.texto}>Hora</Text> */}

      <TextInput
        style={styles.caixa_data}
        keyboardType='numeric'
        onChangeText={(text) => { setHora(text) }}
        value={hora}
        placeholder='--:--' />
      </View>

      {/* <Text style={styles.texto}>Exame</Text> */}

      <TextInput
        style={styles.caixa_texto}
        onChangeText={(text) => { setExame(text) }}
        placeholder='Exame' />

      {/* <Text style={styles.texto}>Descrição</Text> */}
      <TextInput
        multiline
        numberOfLines={4}
        maxLength={100}
        style={styles.caixa_texto}
        onChangeText={(text) => { setDescricao(text) }}
        //placeholderTextColor={'#fff'}
        placeholder ='Descrição' />

      <Pressable
        style={styles.botao}
        onPress={() => cadastrar()}
        disabled={isCarregando}>
        <Text style={styles.desc_botao}>Cadastrar</Text>
      </Pressable>
    </ScrollView>
    </ImageBackground>

  )

}

export default TelaCadAtendi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    flexDirection: 'column'
  },
  dropdown: {
    margin: 16,
    height: 50,
    fontWeight: '500',
    borderColor: 'black',
    borderBottomColor: 'grey',
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

  }, containerDH:{
    flexDirection: 'row',
  },
  caixa_data:{
    fontFamily: 'Cochin',
    paddingHorizontal: 40,
    margin: 20,
    fontSize: 20, 
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'white'
  },
  texto: {
    fontSize: 20,
    fontWeight: '600',
    textDecorationStyle: 'solid',
    textAlign: 'justify'
  },
  caixa_texto: {
    fontFamily: 'Cochin',
    margin: 20,
    fontSize: 20, 
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'white'
  },
  botao: {
    elevation: 8,
    justifyContent: 'center',
    backgroundColor: '#4682B4',
    padding: 20,
    marginTop: 20,
    width: 300,
    marginLeft: 45,
    borderRadius: 10
  },
  desc_botao: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  }
})
