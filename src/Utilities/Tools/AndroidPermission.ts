import {Permission, PermissionsAndroid} from 'react-native';

const requestPermission = async (permissionItem: IPermissionItem) => {
  try {
    const granted = await PermissionsAndroid.request(
      permissionItem.permission,
      {
        title: `Fortius App ${permissionItem.name} Permission`,
        message: `Fortius App needs access to your ${permissionItem.name}`,
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(
        `[AndroidPermission] => ${permissionItem.name} request granted`,
      );
    } else {
      console.log(
        `[AndroidPermission] => ${permissionItem.name} request denied`,
      );
    }
  } catch (err) {
    console.warn(err);
  }
};

const permissionList = [
  {
    name: 'Fine Location',
    permission: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  },
  {
    name: 'Coarse Location',
    permission: PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  },
  {
    name: 'Camera',
    permission: PermissionsAndroid.PERMISSIONS.CAMERA,
  },
] as const;

type IPermissionItem = {
  name: string;
  permission: Permission;
};

type ICheckPermissionReturn = {
  name: string;
  isGranted: boolean;
};

export type IAndroidPermission = (typeof permissionList)[number]['name'];

/**
 * Check android permission
 * @param permissionName
 * @returns {name: permissionName, isGranted: boolean}
 */
export const checkAndroidPermission = async (
  permissionName: IAndroidPermission,
): Promise<ICheckPermissionReturn> => {
  console.log('[AndroidPermission] => checking permission', permissionName);
  const findPermission = permissionList.find(
    permissionItem => permissionItem.name === permissionName,
  );

  const missingPermissionReturn = {name: permissionName, isGranted: false};
  if (findPermission === undefined) return missingPermissionReturn;

  const isGranted = await PermissionsAndroid.check(findPermission.permission);
  console.log(
    '[AndroidPermission] => ' + `${permissionName} is granted:`,
    isGranted,
  );
  if (!isGranted) {
    await requestPermission(findPermission);
  }
  return {name: permissionName, isGranted};
};

/**
 * Function to be run at app initialization
 * checking all addressed permission and request it if not granted
 */
export const androidInitialPermissionCheck = async () => {
  for await (const checkItem of permissionList) {
    await checkAndroidPermission(checkItem.name);
  }
};
