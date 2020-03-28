import React from 'react';
import {View} from 'react-native';

const DashLine = () => {
  const createDash = () => {
    let dashContent = [];
    for (let i = 0; i < 54; i++) {
      dashContent.push(
        <View
          style={{
            flex: 1,
            height: '100%',
            backgroundColor: i % 2 == 1 ? '#a7a7a7' : '#ffffff',
          }}
        />,
      );
    }
    return dashContent;
  };
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        flexDirection: 'row',
      }}>
      {createDash()}
    </View>
  );
};

export default DashLine;
