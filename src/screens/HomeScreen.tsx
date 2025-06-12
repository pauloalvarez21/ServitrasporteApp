import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
  Image,
} from 'react-native';
import {RootStackParamList} from '../navigation/StackNavigator';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleExit = () => {
    Alert.alert(
      'Salir de la aplicación',
      '¿Estás seguro que deseas salir?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Salir',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {cancelable: false},
    );
  };

  const irDevice = () => {
    navigation.navigate('MapScreen');
  };

  return (
    <View style={styles.container}>
      <Image  source={require('../assets/sumyt.png')} style={styles.logo} />
      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => handleExit()}
        activeOpacity={0.7}>
        <Text style={styles.exitButtonText}>Salir de la aplicación</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => irDevice()}
        activeOpacity={0.7}>
        <Text style={styles.exitButtonText}>ir al Mapa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#e74c3c',
    borderRadius: 25,
    elevation: 3,
  },
  exitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});
