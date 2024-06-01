import {TextInput, View, Alert, Text, StyleSheet, Pressable} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Carregamento from '../Carregamento';
import { AtendimentoProps } from "../navigation/HomeNavigator";
import { useState } from 'react';
import { create } from 'react-test-renderer';
import { IClientes } from '../model/IClientes';


const TelaCadAtendi = ({ navigation, route}: AtendimentoProps) =>{
    const [atendimento, setAtendimento] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [email, setEmail] = useState(''); 
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);

function cadastrar(){
    setIsCarregando(true);

    if(verificaCampos()){
        let cliente = {
            atendimento: atendimento,
            nome: nome,
            cpf: cpf,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            email: email,
            senha: senha,
            dataNasc: Date,
            created_at: firestore.FieldValue.serverTimestamp()
        } as unknown as IClientes;

        firestore()
        .collection('cliente')
        .add(cliente)
        .then(() => {
            Alert.alert("Nota", "Cadastrada com sucesso")
            navigation.navigate('TelaPrincipal')
        })
        .catch((error) => console.log(error))
        .finally(() => setIsCarregando(false));
    }
    setIsCarregando(false);
       
}

function verificaCampos(){
    if(atendimento == ''){
        Alert.alert("Atendimento em branco", "Preencha o Atendimento")
        return false;
    }
    if(nome == ''){
        Alert.alert("Nome em branco", "Digite um nome")
        return false;
    }if (dataNasc == ''){
        Alert.alert("Data de Nascimento em branco", "Digite uma data")
        return false;
    }if(cpf == ''){
        Alert.alert("CPF em branco", "Digite um CPF")
        return false;
    }if(rua == ''){
        Alert.alert("Rua em branco", "Digite sua rua")
        return false;
    }if(numero == ''){
        Alert.alert("Número da Casa em branco", "Digite o número da sua casa")
        return false;
    }if(bairro == ''){
        Alert.alert("Bairro em branco", "Digite seu bairro")
        return false;
    }if(cidade == ''){
        Alert.alert("Cidade em branco", "Digite sua cidade")
        return false;
    }if(estado == ''){
        Alert.alert("Estado em branco", "Digite seu estado")
        return false;
    }if (email == ''){
        Alert.alert("Email em branco", "Digite um email")
        return false;
    }if (senha == ''){
        Alert.alert("Senha em branco", "Digite uma senha")
        return false;
    }if (confirmaSenha == ''){
        Alert.alert("Confirmação de senha em branco", "Digite a confirmção de senha")
        return false;
    }if (senha != confirmaSenha){
        Alert.alert("Confirmação de senha em branco", "Digite a confirmção de senha")
        return false;
    }
    return true;
}
    return(
    <View style={styles.container}>
        <Carregamento isCarregando={isCarregando}/>
            
            <Text style={styles.texto}> Notas</Text>
        <TextInput
        multiline
        numberOfLines={4}
        maxLength={100}
        style={styles.caixa_texto}
        onChangeText={(text) => { setAtendimento(text)}} 
        placeholder='Notas'/>

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
