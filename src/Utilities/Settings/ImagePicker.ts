import {CameraOptions} from 'react-native-image-picker';

export const PickerOption: CameraOptions = {
  mediaType: 'photo',
  maxWidth: 1024,
  maxHeight: 1024,
  saveToPhotos: true,
  cameraType: 'back',
};
