import {Pressable, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../config/theme/styles';
import {usePermissionsStore} from '../store/permissions/usePermissionsStore';

export const PermissionScreen = () => {
  const {localStatus, requestLocationPermission} = usePermissionsStore();

  return (
    <View style={styles.container}>
      <Text>Habilitar ubicación</Text>

      <Pressable
        style={globalStyles.btnContainer}
        onPress={requestLocationPermission}>
        <Text style={{color: 'white'}}>Habilitar Localización</Text>
      </Pressable>

      <Text>Estado actual: {localStatus}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
