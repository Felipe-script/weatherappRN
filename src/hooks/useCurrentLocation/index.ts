import {useCallback, useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
import {Coordinates} from 'src/types/Location';

import Geolocation from '@react-native-community/geolocation';

type useCurrentLocationReturn = {
  myCoords: Coordinates | undefined;
  updateLocation: () => Promise<void>;
};

const useCurrentLocation = (): useCurrentLocationReturn => {
  const [myCoords, setMyCoords] = useState<Coordinates>();

  const hasLocationPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  }, []);

  const updateLocation = useCallback(async (): Promise<void> => {
    if (Platform.OS === 'android') {
      const hasPermission = await hasLocationPermission();
      if (!hasPermission) {
        return;
      }
    } else {
      Geolocation.requestAuthorization();
    }

    Geolocation.getCurrentPosition(
      position => {
        const {
          coords: {latitude, longitude},
        } = position;
        console.log({position});
        setMyCoords({latitude, longitude});
      },
      error => {
        console.log(JSON.stringify(error));
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {myCoords, updateLocation};
};
export default useCurrentLocation;
