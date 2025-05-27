import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useLocationStore} from '../store/location/useLocationStore';
import {LoadingScreen} from './LoadingScreen';
import {Map} from '../presentation/maps/Map';

const MapScreen = () => {
  const {lastKnownLocation, getLocation} = useLocationStore();

  useEffect(() => {
    if (lastKnownLocation === null) {
      getLocation();
    }
  });

  if (lastKnownLocation === null) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <Map initialLocation={lastKnownLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
