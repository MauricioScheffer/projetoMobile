import { Button, StyleSheet } from 'react-native';
import {NativeStackScreenProps, createNativeStackNavigator} from '@react-navigation/native-stack';
import Cadastro from './Cad';
import TelaLogin from './TelaLogin';


type RootStackParamList = {
  TelaLogin: undefined;
  Cadastro: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();


const HomeNavigator = () => {
  return (
    <Stack.Navigator initialRouteName= "TelaLogin" screenOptions={{headerShown:false}}>
        <Stack.Screen name="TelaLogin" component={TelaLogin}/>
        <Stack.Screen name="Cadastro" component={Cadastro}/>
      </Stack.Navigator>
  );
}

type LoginProps = NativeStackScreenProps<RootStackParamList, 'TelaLogin'>;

type CadUsuarioProps = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;


export default HomeNavigator;
export type {LoginProps, CadUsuarioProps};

// const styles = StyleSheet.create({
//   titulo: {
//     textAlign:'center',
//     justifyContent: 'center'
//   }

// })




// export const HomeScreen = ({navigation}) => {
//     return (
//       <Button
//         title="Go to Mauricio profile"
//         onPress={() =>
//           navigation.navigate('Profile', {name: 'Jane'})
//         }
//       />
//     );
//   };

//   export const ProfileScreen = ({navigation, route}) => {
//     return <Text>This is {route.params.name}'s profile</Text>;
//   };
  
//   export default ProfileScreen;

 