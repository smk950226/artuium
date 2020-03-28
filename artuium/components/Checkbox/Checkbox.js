import React from 'react';
import {TouchableOpacity, View} from 'react-native';

const Checkbox = props => {
  const {checked, onPressCheckbox} = props;
  return (
    <TouchableOpacity
      onPress={onPressCheckbox}
      style={{
        width: 18,
        height: 18,
        borderColor: '#707070',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: 12,
          height: 12,
          backgroundColor: checked ? '#fd4c1e' : '#e8e8e8',
        }}
      />
    </TouchableOpacity>
  );
};

export default Checkbox;
