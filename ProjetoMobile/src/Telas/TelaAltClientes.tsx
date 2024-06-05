import { useEffect, useState } from "react";
import {Alert, Pressable, StyleSheet, Text, TextInput, View, ScrollView, ImageBackground} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Carregamento from "../Carregamento";
import { AltClienteProps } from "../navigation/HomeNavigator";
import { IClientes } from "../model/IClientes";

const TelaAltClientes = ({ navigation, route}: AltClienteProps) => {
    const [id,] = useState(route.params.id);
    const [cliente, setCliente] = useState('');
    const [atendimento, setAtendimento] = useState('');
    const [isCarregando, setIsCarregando] = useState(false);
    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [complemento, setComplemento] = useState('')
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [dataNasc, setDataNasc] = useState('');

    async function carregar() {
        setIsCarregando(true);
        try{
            const resultado = await firestore()
            .collection('Clientes')
            .doc(id)
            .get();

        const cliente = {
            id: resultado.id,
            ...resultado.data()
        } as IClientes;

        setNome(cliente.nome);
        setDataNasc(cliente.dataNasc);
        setRua(cliente.rua);
        setNumero(cliente.numero);
        setBairro(cliente.bairro);
        setCidade(cliente.cidade);
        setEstado(cliente.estado);
        setComplemento(cliente.complemento);
        setEmail(cliente.email);
        setSenha(cliente.senha);
        setConfirmaSenha(cliente.senha); // Defina isso conforme necessário
        setIsCarregando(false);
    }catch (error){
        setIsCarregando(false);
        console.log(error)
    }
    setIsCarregando(false);
}

    useEffect(() => {
        carregar();
    }, []);

    function alterar(){ 
        if(verificaCampos()){
        setIsCarregando(true);
        firestore()
        .collection('Clientes')
        .doc(id)
        .update({
            nome,
            dataNasc,
            rua,
            numero,
            bairro,
            complemento,
            cidade,
            estado,
            created_at: firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            Alert.alert("Cliente", "Alterado com sucesso")
            navigation.goBack();
        })
        .catch((error) => console.log(error)) 
        .finally(() => setIsCarregando(false));
    }
    }

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


    // async function cadastrar() {
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

    return(
        <ImageBackground source={require ("../imagens/PaisagemAltClientes.jpg")} style={styles.container}>
            <ScrollView>
                <Carregamento isCarregando={isCarregando} />
                <View style={styles.topo}>
                    <Text style={styles.title}>Alterar Clientes</Text>
                </View>
                <View style={styles.container_login}>

                    <View style={styles.container_1}>
                        <TextInput style={styles.caixa_texto} value={nome} onChangeText={(text) => { setNome(text) }} placeholder='Nome' />

                        <TextInput style={styles.caixa_texto} value={dataNasc} maxLength={10} keyboardType='numeric' onChangeText={ajustarDataNascimento} 
                        placeholder='Data de Nascimento' />
                    </View>

                    <View style={styles.container_2}>
                        <TextInput style={styles.caixa_texto} value={rua} onChangeText={(text) => { setRua(text) }} placeholder='Rua' />

                        <TextInput style={styles.caixa_texto_numero} value={numero} maxLength={5} keyboardType='numeric' onChangeText={(text) => { setNumero(text) }} placeholder='Número' />
                    </View>

                    <View style={styles.container_3}>
                        <TextInput style={styles.caixa_texto} value={bairro} onChangeText={(text) => { setBairro(text) }} placeholder='Bairro' />

                        <TextInput style={styles.caixa_texto} value={complemento} onChangeText={(text) => { setComplemento(text) }} placeholder='Complemento' />

                    </View>

                    <View style={styles.container_4}>
                        <TextInput style={styles.caixa_texto} value={cidade} onChangeText={(text) => { setCidade(text) }} placeholder='Cidade' />

                        <TextInput style={styles.caixa_texto} value={estado} onChangeText={(text) => { setEstado(text) }} placeholder='Estado' />

                    </View>


                    {/* <View style={styles.meio}>
                        <Text style={styles.subtitle}>Conta</Text>
                    </View>

                    <View style={styles.container_5}>
                        <TextInput style={styles.caixa_texto} value={email} onChangeText={(text) => { setEmail(text) }} placeholder='Email' />

                        <TextInput style={styles.caixa_texto} secureTextEntry={true} onChangeText={(text) => { setSenha(text) }} placeholder='Senha' />
                    </View>

                    <View style={styles.container_6}>
                        <TextInput style={styles.caixa_texto} secureTextEntry={true} onChangeText={(text) => { setConfirmaSenha(text) }} placeholder='Confirmar Senha' />
                    </View> */}

            <Pressable
            style={styles.botao}
            onPress={() => alterar()}
            disabled={isCarregando}>
                <Text style = {styles.desc_botao}>Alterar</Text>
            </Pressable>
            </View>
        </ScrollView>
        </ImageBackground>
    )
}

export default TelaAltClientes;

const styles = StyleSheet.create ({
container: {
        flex: 1,
        flexDirection: 'column',
        // backgroundColor: '#100D28',
    },
    topo: {
        marginTop: 20,
        flexDirection: 'row',
        height: 70,
    },
    meio: {
        //backgroundColor: '#4682B4',
        flexDirection: 'row',
        height: 70,
        marginVertical: 10,
        marginTop: -10,
        marginBottom: 10,
        borderRadius: 10,
    },
    title: {
        color: '#fff',
        fontSize: 25,
        fontWeight: 'bold',
        margin: 20,
        left: 100,
    },
    subtitle: {
        color: '#fff',
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
        marginTop: 20,
        elevation: 8,
        borderRadius: 10
    },
    desc_botao: {
        fontWeight: '600',
        fontSize: 20,
        color: 'white',
        alignSelf: 'center'
    }
});