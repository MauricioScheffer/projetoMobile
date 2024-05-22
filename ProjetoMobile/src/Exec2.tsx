import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';

const Imagem = () => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll}>
                <Image style={styles.image} source={require('./imagem/grito.jpg')} />

                <Image style={styles.image} source={require('./imagem/LogoMobile.png')} />

                <Image style={styles.image} source={require('./imagem/monalisa.jpg')} />

                <Image style={styles.image} source={require('./imagem/grito.jpg')} />

                <Image style={styles.image} source={require('./imagem/LogoMobile.png')} />

                <Image style={styles.image} source={require('./imagem/monalisa.jpg')} />

            </ScrollView>
        </View>
    );
}
export default Imagem;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFACD'
    },
    scroll: {
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        left: 90,
        padding: 30,
        height: 300,
        width: 200,
        margin: 12,
    }
})