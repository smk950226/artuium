import React from 'react';
import {Text} from 'react-native';

const TabBarLabel = ({color, title, number}) => {
  return (
    <>
      <Text
        style={{
          color,
          ...tabBarStyles.tabBarLabel,
          marginTop: -7,
        }}>
        {title}
      </Text>
      <Text
        style={{
          color,
          ...tabBarStyles.tabBarNumber,
          marginTop: -7,
        }}>
        {number}
      </Text>
    </>
  );
};

const tabBarStyles = {
  tabBarLabel: {
    fontFamily: 'Noto Sans KR',
    fontSize: 10,
    lineHeight: 20,
    letterSpacing: -0.24,
    textAlign: 'center',
  },
  tabBarNumber: {
    fontFamily: 'Noto Sans KR',
    fontSize: 8,
    lineHeight: 20,
    letterSpacing: -0.24,
    textAlign: 'center',
  },
};

export default TabBarLabel;
