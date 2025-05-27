import {PropsWithChildren, useEffect} from 'react';
import {AppState} from 'react-native';
import {usePermissionsStore} from '../store/permissions/usePermissionsStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/StackNavigator';

export const PermissionsChecker = ({children}: PropsWithChildren) => {
  const {checkLocationPermission, localStatus} = usePermissionsStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (localStatus === 'granted') {
      navigation.reset({
        routes: [{name: 'MapScreen'}],
      });
    } else if (localStatus === 'undetermined') {
      navigation.reset({
        routes: [{name: 'PermissionScreen'}],
      });
    }
  }, [localStatus, navigation]);

  useEffect(() => {
    checkLocationPermission();
  }, [checkLocationPermission]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkLocationPermission();
      }
    });
    return () => {
      subscription.remove();
    };
  });

  return <>{children}</>;
};
