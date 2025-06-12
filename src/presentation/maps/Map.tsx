import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Platform, StyleSheet} from 'react-native';
import { Location } from '../../infrastructure/interfaces/location';
import { FAB } from '../component/FAB';

interface Props {
  showsUserLocation?: boolean;
  initialLocation: Location; 
}

export const Map = ({showsUserLocation = true, initialLocation}: Props) => {
  return (
    <>
      <MapView
      showsUserLocation = {showsUserLocation}
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Este es el titulo"
          description="Este es la descripción"
          image={require('../../assets/custom-marker.png')}
        />
      </MapView>

      <FAB iconName="add" onPress={() => { console.log('add') }}  style={{position: 'absolute', bottom: 20, right: 20}}/>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
