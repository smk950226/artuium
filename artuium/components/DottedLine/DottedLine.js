import React from 'react';
import {View} from 'react-native';
export const DottedLine = ({dotNum}) => {
  const dots = [];
  for (let i = 0; i < dotNum; i++) {
    dots.push(
      <View
        style={{
          height: 1,
          flex: 1,
          backgroundColor: i % 2 === 0 ? 'rgb(181,181,181)' : 'white',
        }}
      />,
    );
  }
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'rgb(181,181,181)',
      }}>
      {dots}
    </View>
  );
};
