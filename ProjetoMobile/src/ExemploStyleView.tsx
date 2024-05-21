import { StyleSheet, View } from "react-native";

const ExemploStylesView = () => {
    return (
        <>
            <View style={styles.container_fixo}>
                <View style={[styles.fundo_azul, 
                    styles.tamanho_50, styles.borda]} />
                <View style={[styles.fundo_laranja, 
                    styles.tamanho_50, styles.borda]} />
                <View style={[styles.fundo_verde, 
                    styles.tamanho_50, styles.borda]} />
            </View>
            <View style={styles.container_flex}>
                <View style={[styles.fundo_azul, 
                    styles.flex_pequeno, styles.borda]} />
                <View style={[styles.fundo_laranja, 
                    styles.flex_grande, styles.borda]} />
                <View style={[styles.fundo_verde, 
                    styles.flex_grande, styles.borda]} />
            </View>
        </>
    );
}

export default ExemploStylesView;

const styles = StyleSheet.create({
    container_fixo: {
        //valor de preenchimento da área disponível
        flex: 1,
        //definição do eixo principal
        //flexDirection: 'row-reverse',
        //posicionamento dos objetos no eixo principal
        justifyContent: 'space-evenly',
        //posicionamento dos objetos no eixo secundário
        alignItems: 'stretch',

        backgroundColor: 'red',
        margin: 10,
    },
    container_flex: {
        //valor de preenchimento da área disponível
        flex: 2,
        //definição do eixo principal
        flexDirection: 'row',

        backgroundColor: '#FFFACD',
        margin: 10,
    },
    fundo_azul: {
        backgroundColor: 'blue'
    },
    fundo_laranja: {
        backgroundColor: 'orange'
    },
    fundo_verde: {
        backgroundColor: 'green'
    },
    tamanho_50: {
        //largura
        width: 50,
        //altura
        height: 50
    },
    flex_pequeno: {
        //valor de preenchimento da área disponível
        flex: 1
    },
    flex_grande: {
        //valor de preenchimento da área disponível
        flex: 2
    },
    borda: {
        borderColor: 'black',
        borderWidth: 5
    }
});
