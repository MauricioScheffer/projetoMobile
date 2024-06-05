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
  const [dia, setDia] = useState('');
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
      dia: dia,
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

  return (
    <ScrollView>
    <ImageBackground source={require("../imagens/fundo.jpg")} style={styles.container}>
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
      <Text style={styles.texto}>Dia</Text>

      <TextInput
        style={styles.caixa_texto}
        secureTextEntry={true}
        onChangeText={(text) => { setDia(text) }}
        placeholder='Exame' />

      <Text style={styles.texto}>Hora</Text>

      <TextInput
        style={styles.caixa_texto}
        secureTextEntry={true}
        onChangeText={(text) => { setHora(text) }}
        placeholder='Exame' />

      <Text style={styles.texto}>Exame</Text>

      <TextInput
        style={styles.caixa_texto}
        secureTextEntry={true}
        onChangeText={(text) => { setExame(text) }}
        placeholder='Exame' />

      <Text style={styles.texto}>Descrição</Text>
      <TextInput
        multiline
        numberOfLines={4}
        maxLength={100}
        style={styles.caixa_texto}
        onChangeText={(text) => { setDescricao(text) }}
        placeholderTextColor={'#fff'}
        placeholder ='Descrição' />

      <Pressable
        style={styles.botao}
        onPress={() => cadastrar()}
        disabled={isCarregando}>
        <Text style={styles.desc_botao}>Cadastrar</Text>
      </Pressable>
    </ImageBackground>
    </ScrollView>
  )

}

export default TelaCadAtendi;

const styles = StyleSheet.create({
  container: {
    gap: 20
  },
  dropdown: {
    margin: 16,
    height: 50,
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
  },
  texto: {
    color: 'white',
    fontSize: 20,
    textDecorationStyle: 'solid',
    textAlign: 'justify'
  },
  caixa_texto: {
    fontFamily: 'Cochin',
    fontSize: 18,
    color: 'white',
  },
  botao: {
    elevation: 8,
    justifyContent: 'center',
    backgroundColor: 'grey',
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
