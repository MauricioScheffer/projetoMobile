import React from 'react';
import {
    FlatList,
    StyleSheet,
    Text
} from 'react-native';

const lista = [
    { descricao: 'Cachorro'},
    { descricao: 'Gato'},
    { descricao: 'Galinha'},
    { descricao: 'Papagaio'},
    { descricao: 'Cachorro'}
];

const ListaFlat = () => {
    return (
        <FlatList 
            data={lista} 
            renderItem={({item}) => <Text style={styles.item}>{item.descricao}</Text>}/> 
    )
     
}

export default ListaFlat;

const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });