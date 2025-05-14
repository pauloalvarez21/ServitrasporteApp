import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const DeviceInfoScreen = () => {
  const [deviceInfo, setDeviceInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const info = {
        // Información básica
        Nombre: await DeviceInfo.getDeviceName(),
        Marca: DeviceInfo.getBrand(),
        Modelo: DeviceInfo.getModel(),
        'ID único': DeviceInfo.getUniqueId(),
        'Sistema operativo': Platform.OS,
        'Versión OS': DeviceInfo.getSystemVersion(),
        'Versión de la app': DeviceInfo.getVersion(),
        'Número de build': DeviceInfo.getBuildNumber(),
        'Bundle ID': DeviceInfo.getBundleId(),

        // Hardware
        'Tipo de dispositivo': DeviceInfo.getDeviceType(),
        'Núcleos CPU': DeviceInfo.supportedAbis,
        'RAM total': `${(await DeviceInfo.getTotalMemory()) / 1024 / 1024} MB`,
        'Almacenamiento total': `${
          (await DeviceInfo.getTotalDiskCapacity()) / 1024 / 1024 / 1024
        } GB`,

        // Batería
        'Nivel de batería': await DeviceInfo.getBatteryLevel(),
        'Estado de carga': await DeviceInfo.isBatteryCharging(),

        // Red
        'Dirección IP': await DeviceInfo.getIpAddress(),
        'MAC address': await DeviceInfo.getMacAddress(),
        //'Tipo de conexión': await DeviceInfo.getNetworkType(),

        // Características
        'Es tablet': DeviceInfo.isTablet(),
        'Tiene notch': DeviceInfo.hasNotch(),
        'Es emulador': await DeviceInfo.isEmulator(),
        //'Huella digital disponible': await DeviceInfo.hasBiometricSensor(),
      };
      setDeviceInfo(info);
    };

    fetchDeviceInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Información del Dispositivo</Text>

        <View style={styles.infoContainer}>
          {Object.entries(deviceInfo).map(([key, value]) => (
            <View key={key} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{key}:</Text>
              <Text style={styles.infoValue}>
                {typeof value === 'boolean'
                  ? value
                    ? 'Sí'
                    : 'No'
                  : String(value)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#555',
    flex: 1,
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',
    color: '#333',
  },
});

export default DeviceInfoScreen;
