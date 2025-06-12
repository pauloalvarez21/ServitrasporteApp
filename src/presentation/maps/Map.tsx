import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import {Platform, StyleSheet} from 'react-native';
import {Location} from '../../infrastructure/interfaces/location';
import {FAB} from '../component/FAB';
import {useEffect, useRef, useState} from 'react';
import {useLocationStore} from '../../store/location/useLocationStore';

interface Props {
  showsUserLocation?: boolean;
  initialLocation: Location;
}

export const Map = ({showsUserLocation = true, initialLocation}: Props) => {
  const mapRef = useRef<MapView>();
  const cameraLocation = useRef<Location>(initialLocation);
  const [isFollowinUser, setIsFollowinUser] = useState(true);
  const [isShowingPolile, setIsShowingPolile] = useState(true);

  const {
    getLocation,
    lastKnownLocation,
    watchLocation,
    clearWatchLocation,
    userLocationList,
  } = useLocationStore();

  const moveCamaraToLocation = (location: Location) => {
    if (!mapRef.current) return;
    mapRef.current.animateCamera({
      center: location,
    });
  };

  const moveCurrentLocation = async () => {
    if (!lastKnownLocation) {
      moveCamaraToLocation(initialLocation);
    }
    const location = await getLocation();
    if (!location) return;
    moveCamaraToLocation(location);
  };

  useEffect(() => {
    watchLocation();

    return () => {
      clearWatchLocation();
    };
  }, []);

  useEffect(() => {
    if (lastKnownLocation && isFollowinUser) {
      moveCamaraToLocation(lastKnownLocation);
    }
  }, [lastKnownLocation, isFollowinUser]);

  return (
    <>
      <MapView
        ref={map => (mapRef.current = map!)}
        showsUserLocation={showsUserLocation}
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        onTouchStart={() => setIsFollowinUser(false)}
        region={{
          latitude: cameraLocation.current.latitude,
          longitude: cameraLocation.current.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>

          {
            isShowingPolile && (
              <Polyline
                coordinates={userLocationList}
                strokeColor='black'
                strokeWidth={5}
              />
            )
          }

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

      <FAB
        iconName={isShowingPolile ? 'eye-outline' : 'eye-off-outline'}
        onPress={() => {
          setIsShowingPolile(!isShowingPolile);
        }}
        style={{position: 'absolute', bottom: 140, right: 20}}
      />

      <FAB
        iconName={isFollowinUser ? 'walk-outline' : 'accessibility-outline'}
        onPress={() => {
          setIsFollowinUser(!isFollowinUser);
        }}
        style={{position: 'absolute', bottom: 80, right: 20}}
      />

      <FAB
        iconName="compass-outline"
        onPress={() => {
          moveCurrentLocation;
        }}
        style={{position: 'absolute', bottom: 20, right: 20}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
