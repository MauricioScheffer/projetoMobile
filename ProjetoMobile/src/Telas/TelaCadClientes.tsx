import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Image, Alert, ImageBackground, ScrollView, Button } from 'react-native';

import auth from "@react-native-firebase/auth";
import { CadClienteProps } from '../navigation/HomeNavigator';
import Carregamento from '../Carregamento'
import firestore from '@react-native-firebase/firestore';
import { Eye, EyeOff} from "lucide-react";

const TelaCadClientes = ({ navigation, route }: CadClienteProps) => {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [complemento, setComplemento] = useState('')
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);
    const [dataNasc, setDataNasc] = useState('');

    const formatarCPF = (text: string) => {
        let cpfFormatado = text.replace(/\D/g, '');

        if (cpfFormatado.length > 3) {
            cpfFormatado = cpfFormatado.replace(/^(\d{3})(\d)/g, '$1.$2');
            if (cpfFormatado.length > 7) {
                cpfFormatado = cpfFormatado.replace(/^(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3');
                if (cpfFormatado.length > 11) {
                    cpfFormatado = cpfFormatado.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3-$4');
                }
            }
        }

        return cpfFormatado.substring(0, 14);
    };

    const ajustarCPF = (text: string) => {
        const cpfFormatado = formatarCPF(text);
        setCpf(cpfFormatado);
    };

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

    const ajustarDataNascimento = (text: string) => {
        const dataFormatada = formatarData(text);
        setDataNasc(dataFormatada);
    };

    function validarCPF() {
        let cpfValido = cpf.replace(/\D/g, '');
        // Remover caracteres não numéricos

        // Verificar se o CPF possui 11 dígitos
        if (cpfValido.length !== 11) {
            return false;
        }

        // Verificar se todos os dígitos são iguais (ex: 111.111.111-11)
        const todosDigitosIguais = /^(\d)\1{10}$/.test(cpfValido);
        if (todosDigitosIguais) {
            return false;
        }

        // Calcular os dígitos verificadores
        let soma = 0;
        let resto;
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpfValido.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;

        // Verificar o primeiro dígito verificador
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpfValido.substring(9, 10))) {
            return false;
        }

        // Calcular o segundo dígito verificador
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpfValido.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;

        // Verificar o segundo dígito verificador
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpfValido.substring(10, 11))) {
            return false;
        }

        // Se passar por todas as verificações, o CPF é válido
        return true;
    }

    async function cadastrar() {
        setIsCarregando(true);

        if (verificaCampos()) {
            firestore()
                .collection('Clientes')
                .add({
                    nome, cpf, rua, numero, bairro, cidade, estado, complemento, email, senha, dataNasc
                })
                .then(() => {
                    Alert.alert("Cliente", "Cadastro com sucesso");
                    setNome(''); setRua(''); setNumero(''); setBairro(''); setCidade(''); setEstado('');
                    setCpf(''); setEmail(''); setSenha('');
                    navigation.navigate('TelaPrincipal')
                })
                .catch((error) => tratarErros(String(error)))
        }
        setIsCarregando(false);
    }

    function verificaCampos() {
        if (nome == '') {
            Alert.alert("Nome em branco", "Digite um nome")
            return false;
        }
        if (!(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(nome))) {
            Alert.alert("Nome Inválido", "Digite um nome válido")
            return false;
        } if (dataNasc == '') {
            Alert.alert("Data de Nascimento em branco", "Digite uma data")
            return false;
        } if (!(dataNasc.length == 10)) {
            Alert.alert("Data de Nascimento Incompleta")
            return false;
        } if (cpf == '') {
            Alert.alert("CPF em branco", "Digite um CPF")
            return false;
        } if (!validarCPF()) {
            Alert.alert("CPF Inválido", "Digite um CPF válido")
            return false;
        } if (rua == '') {
            Alert.alert("Rua em branco", "Digite sua rua")
            return false;
        } if (numero == '') {
            Alert.alert("Número da Casa em branco", "Digite o número da sua casa")
            return false;
        } if (bairro == '') {
            Alert.alert("Bairro em branco", "Digite seu bairro")
            return false;
        } if (cidade == '') {
            Alert.alert("Cidade em branco", "Digite sua cidade")
            return false;
        } if (estado == '') {
            Alert.alert("Estado em branco", "Digite seu estado")
            return false;
        } if (email == '') {
            Alert.alert("Email em branco", "Digite um email")
            return false;
        } if (senha == '') {
            Alert.alert("Senha em branco", "Digite uma senha")
            return false;
        } if (confirmaSenha == '') {
            Alert.alert("Confirmação de senha em branco", "Digite a confirmção de senha")
            return false;
        } if (senha != confirmaSenha) {
            Alert.alert("Confirmação de senha em branco", "Digite a confirmção de senha")
            return false;
        }
        return true;
    }
    //TIRAR ISSO 
    function tratarErros(erro: string) {
        console.log(erro);
        if (erro.includes("[auth/")) {
            Alert.alert("Formato inválido", "Ex.: 01/01/2000")
            return false;
        } if (erro.includes("[auth/invalid-email]")) {
            Alert.alert("Email inválido", "Digite um email válido")
        } else if (erro.includes("[auth/weak-password]")) {
            Alert.alert("Senha Fraca", "A senha digitada é fraca. A senha deve pelo " + "menos 6 dígitos.")
        } else if (erro.includes("[auth/email-already-in-use]")) {
            Alert.alert("Email em uso", "O email inserido já foi cadastrado em outra conta.")
        } else {
            Alert.alert("Erro", erro)
        }
    }

    return (
        <ImageBackground source={require ("../imagens/PaisagemCadClientes.jpg")} style={styles.container}>
                <ScrollView>
               <Carregamento isCarregando={isCarregando} />
                <View style={styles.topo}>
                    <Text style={styles.title}>Cadastro</Text>
                </View>
                <View style={styles.container_login}>

                    <View style={styles.container_1}>
                        <TextInput style={styles.caixa_texto} onChangeText={(text) => { setNome(text) }} placeholder='Nome' />

                        <TextInput style={styles.caixa_texto} maxLength={10} keyboardType='numeric' onChangeText={ajustarDataNascimento} value={dataNasc}
                        placeholder='Data de Nascimento' />
                    </View>

                    <View style={styles.container_2}>
                        <TextInput style={styles.caixa_texto} maxLength={14} keyboardType='numeric' onChangeText={ajustarCPF} value={cpf} placeholder='CPF' />

                        <TextInput style={styles.caixa_texto} onChangeText={(text) => { setRua(text) }} placeholder='Rua' />
                    </View>

                    <View style={styles.container_3}>
                        <TextInput style={styles.caixa_texto_numero} maxLength={5} keyboardType='numeric' onChangeText={(text) => { setNumero(text) }} placeholder='Número' />

                        <TextInput style={styles.caixa_texto} value={bairro} onChangeText={(text) => { setBairro(text) }} placeholder='Bairro' />
                    </View>

                    <View style={styles.container_4}>
                        <TextInput style={styles.caixa_texto} onChangeText={(text) => { setComplemento(text) }} placeholder='Complemento' />

                        <TextInput style={styles.caixa_texto} onChangeText={(text) => { setCidade(text) }} placeholder='Cidade' />
                    </View>

                    <TextInput style={styles.caixa_texto_estado} value={estado} onChangeText={(text) => { setEstado(text) }} placeholder='Estado' />

                    <View style={styles.meio}>
                        <Text style={styles.title}>Conta</Text>
                    </View>

                    <View style={styles.container_5}>
                        <TextInput style={styles.caixa_texto} onChangeText={(text) => { setEmail(text) }} placeholder='Email' />

                        <TextInput style={styles.caixa_texto} secureTextEntry={true} onChangeText={(text) => { setSenha(text) }} placeholder='Senha' />
                    </View>

                    <View style={styles.container_6}>
                        <TextInput style={styles.caixa_texto} secureTextEntry={true} onChangeText={(text) => { setConfirmaSenha(text) }} placeholder='Confirmar Senha' />
                    </View>

                    <Pressable
                        style={(state) => [styles.botao, state.pressed ? { opacity: 0.5 } : null]}
                        onPress={() => cadastrar()} >
                        <Text style={styles.desc_botao}>Cadastrar</Text>
                    </Pressable>

                </View>
        </ScrollView>
        </ImageBackground>
    );
}

export default TelaCadClientes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#100D28',
    },
    topo: {
        flexDirection: 'row',
        height: 70,
    },
    meio: {
        flexDirection: 'row',
        height: 70,
        marginTop: -10,
        marginBottom: 10,
    },
    title: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        margin: 20,
        left: 130
    },
    painel_imagem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagem: {
        width: 200,
        height: 200
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    container_login: {
        flex: 2,
        flexDirection: 'column',
        padding: 15,
    },
    container_1: {
        flexDirection: 'row',
        gap: 10
    },
    container_2: {
        flexDirection: 'row',
        gap: 10
    },
    container_3: {
        flexDirection: 'row',
        gap: 10
    },
    container_4: {
        flexDirection: 'row',
        gap: 10
    },
    container_5: {
        flexDirection: 'row',
        gap: 10
    },
    container_6: {
        left: 90
    },
    caixa_texto: {
        width: '50%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 20,
    },
    caixa_texto_numero: {
        width: '50%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 10,
        margin: 0,
        backgroundColor: 'white',
        marginBottom: 20,
    },
    caixa_texto_estado: {
        width: '50%',
        color: 'black',
        borderWidth: 1,
        borderRadius: 10,
        margin: 0,
        backgroundColor: 'white',
        marginBottom: 20,
        left: 90
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
    desc_botao: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center'
    }
});
