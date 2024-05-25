import React from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';

type Livros = {
    nome: string,
    tipo: String,
}

let listaLivros = [] as Livros[];

let livro1 = {nome:'O Alquimista', tipo:'Aventura'} as Livros;
let livro2 = {nome:'Coach Chines', tipo:'Auto-Ajuda'} as Livros;
let livro3 = {nome:'Uma Breve História Sobre O Muno', tipo:'História'} as Livros;
let livro4 = {nome:'Dragão de Gelo', tipo:'Aventura'} as Livros;

listaLivros.push(livro1);
listaLivros.push(livro2);
listaLivros.push(livro3);
listaLivros.push(livro4);

type ItemPros ={
    livros: Livros;
}

const ItemLista = (props: ItemPros) =>{
    
return(
    <View>
        <Text style={styles.item2}>
            {props.livros.tipo + ' ' + props.livros.nome}
        </Text>
    </View>
);
}

const ListaFlat = () => {
    return (
        <>
            <FlatList
            data={listaLivros}
            renderItem={({ item }) => 
            <Text style={styles.item}>
                {item.nome + '' + item.tipo}
            </Text>} />


            <FlatList
            data={listaLivros}
            renderItem={({ item }) => <ItemLista livros={item} /> } />
        
        </>
    )
}

const styles= StyleSheet.create({
    item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'red'
    },
    item2: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: 'green'
    }
});

export default ListaFlat;