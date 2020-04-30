import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {cameraIcon} from '../../assets/images';
import ImagePicker from 'react-native-image-picker';

const ImagePickerButton = props => {
  const {setImage} = props;

  const handleChangeImg = () => {
    const options = {
      mediaTypes: 'Images',
      skipBackup: true,
      path: 'images',
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const source = {uri: response.uri, type: response.type};
        setImage(source);
      }
    });
  };

  return (
    <TouchableOpacity
      onPress={handleChangeImg}
      style={{...props.style, position: 'absolute', height: 25, width: 25}}>
      <Image source={cameraIcon} style={{width: '100%', height: '100%'}} />
    </TouchableOpacity>
  );
};

export default ImagePickerButton;
