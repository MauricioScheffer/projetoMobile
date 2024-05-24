import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text} from 'react-native';

const Number3 = () => {
    const [titulo, setTitulo] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.tilt}>
                <Text>
                    {titulo}
                </Text>
                <TextInput onChangeText={(text) => {setTitulo(text)}}>

                </TextInput>
            </View>
        </View>
    )
}
export default Number3;

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey'
    },
    tilt: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }

});


