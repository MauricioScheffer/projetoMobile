import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

// const Atividade = () => {
//     const = [titulo, setTitulo] = useState('');
//     const = [tela, setTela] = useState('');
//     const = [tc, setTc] = useState('');
// }

type Props = {
    titulo: string;
}
const Titulo = (props: Props) => {
    return (
      <View style={styles.container}>
            <View>
            <Text>{props.titulo}</Text>
            <TextInput placeholder="Digite aqui" />
            </View>
      </View>

    );
  };
  
  export default Titulo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFACD'
    },
    scroll: {
        flexDirection: 'column'
    },
    image: {
        height: 10,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})