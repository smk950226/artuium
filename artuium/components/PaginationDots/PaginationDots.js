import React from 'react';
import {View} from 'react-native';

const PaginationDots = ({total, order, style}) => {
  const dots = [];
  for (var i = 1; i <= total; i++) {
    dots.push(
      <View
        style={{
          backgroundColor: order === i ? '#fd4c1e' : '#c4c4c4',
          width: 7,
          height: 7,
          borderRadius: 3.5,
        }}
      />,
    );
  }
  return (
    <View
      style={{
        ...style,
        flexDirection: 'row',
        width: total * 17 - 10,
        justifyContent: 'space-between',
        alignSelf: 'center',
      }}>
      {dots}
    </View>
  );
};

export default PaginationDots;
