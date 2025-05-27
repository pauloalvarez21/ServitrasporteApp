import {create} from 'zustand';
import type {PermissionStatus} from '../../infrastructure/interfaces/permissions';
import {requestLocationPermission} from '../../actions/permissions/location';

interface PermissionsState {
  localStatus: PermissionStatus;

  requestLocationPermission: () => Promise<PermissionStatus>;
  checkLocationPermission: () => Promise<PermissionStatus>;
}

export const usePermissionsStore = create<PermissionsState>()(set => ({
  localStatus: 'unavailable',

  requestLocationPermission: async () => {
    const status = await requestLocationPermission();
    set({localStatus: status});
    return status;
  },

  checkLocationPermission: async () => {
    const status = await requestLocationPermission();
    set({localStatus: status});
    return status;
  },
}));
