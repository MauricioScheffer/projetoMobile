import React from 'react';
import {
    SectionList,
    StyleSheet,
    Text
} from 'react-native';

const listaSection = [
    { titulo: 'A', data: [{ descricao: 'Ana' }] },
    { titulo: 'B', data: [{ descricao: 'Bruno' }] },
    { titulo: 'C', data: [{ descricao: 'Carlos' }] },
    { titulo: 'D', data: [{ descricao: 'Douglas' }] },
    { titulo: 'E', data: [{ descricao: 'Elio' }] },
    { titulo: 'F', data: [{ descricao: 'Fábio' }] },
];

const ListaSection = () => {
    return (
        <SectionList 
            sections={listaSection} 
            renderItem={({item}) => (
                <Text style={styles.item}>{item.descricao}</Text>)}
            renderSectionHeader={({section}) => (
                <Text style={styles.sectionHeader}>{section.titulo}</Text>
            )}
        />  
    )
}

export default ListaSection;

const styles = StyleSheet.create({
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
      },
  });