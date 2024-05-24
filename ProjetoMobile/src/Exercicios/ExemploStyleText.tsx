import { StyleSheet, Text } from "react-native";

const ExemploStylesText = () => {
    return (
        <>
            <Text style={styles.texto1}>Texto 1</Text>
            <Text style={styles.texto2}>Texto 2</Text>
            <Text style={styles.texto3}>Texto 3</Text>
            <Text style={styles.texto4}>Texto 4</Text>
            <Text style={styles.texto5}>Texto 5</Text>
            <Text style={[styles.negrito, styles.titulo]}>Texto 6</Text>
            <Text style={[styles.texto5, styles.texto1, styles.titulo]}>Texto 7</Text>
        </>
    );
}

export default ExemploStylesText;

const styles = StyleSheet.create({
    texto1:{
        color: 'blue'
    },
    texto2:{
        color: '#00BFFF'
    },
    texto3:{
        fontWeight: 'bold',
        fontSize: 30,
    },
    texto4:{
        fontStyle: 'italic'
    },
    texto5:{
        color: 'black',
        textShadowColor: 'yellow',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 10,
        fontSize: 100,
    },
    negrito: {
        fontWeight: 'bold',
    },
    titulo: {
        fontSize: 30,
    },
});
