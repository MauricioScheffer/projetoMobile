import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity} from 'react-native';

export default () => {   
    const [email, setEmail] = useState('');    
    const [senha, setSenha] = useState('');

    function log(){
        console.log('Email:' + email + '\nSenha: ' + senha)
    }
    const cadastro = () => {
        //alert(email)
        //alert(senha);
    }
    //fuction cadastro(){
    //    alert('ok')
    //}


    return(
        <View style={styles.container}>
           
            <Image style={{width:300,height:200}} source={{uri: 'LogoMobile.png'}}/>
           
            <TextInput placeholder="Email" style={styles.textInput} onChangeText={text=>setEmail(text)} />
            <TextInput secureTextEntry={true} placeholder="Senha" style={styles.textInput} onChangeText={text=>setSenha(text)} />


            <TouchableOpacity style={styles.btnEntrar} onPress={()=>cadastro()}>
                <Text style={{color:'white'}}>Entrar</Text>
            </TouchableOpacity>
       
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
        padding:20,
        backgroundColor: '#100D28',
    },
    
    textInput:{
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        borderRadius:20,
        paddingLeft:10,
        marginBottom:10
    },
    btnEntrar:{
        width: '30%' , 
        height:40,
        backgroundColor:'#7b42f5',
        borderRadius:20,
        alignItems:'center',
        justifyContent: 'center',
        textAlign:'center'
    }
});


