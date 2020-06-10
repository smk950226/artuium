import React from 'react';
import {View, TouchableOpacity, Text, Animated} from 'react-native';
import {
  WrittenReviewIcon,
  LikedExhibitionIcon,
  LikedArtworkIcon,
  LikedReviewIcon,
} from '../../assets/images/svgs';

const getTabBarIcons = (index, color) => {
  if (index === 0) {
    return <WrittenReviewIcon color={color} />;
  } else if (index === 1) {
    return <LikedExhibitionIcon color={color} />;
  } else if (index === 2) {
    return <LikedArtworkIcon color={color} />;
  } else {
    return <LikedReviewIcon color={color} />;
  }
};

const ProfileTabBar = props => {
  const {selected, tabContents, setSelected, tabBarAnimation, hasLine} = props;
  const activeColor = '#fa4d2c';
  const inactiveColor = '#c4c4c4';
  return (
    <View>
      <Animated.View
        style={{
          height: tabBarAnimation,
          backgroundColor: 'white',
          borderBottomWidth: hasLine ? 1 : 0,
          borderBottomColor: '#f4f4f4',
        }}
      />
      <View
        style={{
          ...profileTabBarStyles.container,
          height: 77,
        }}>
        {tabContents.map(({title, number}, index) => {
          return (
            <TouchableOpacity
              onPress={() => setSelected(index)}
              style={{
                paddingTop: 10,
                ...profileTabBarStyles.button,
                borderBottomColor:
                  selected === index ? activeColor : inactiveColor,
              }}>
              {getTabBarIcons(
                index,
                selected === index ? activeColor : inactiveColor,
              )}
              <Text
                style={{
                  color: selected === index ? activeColor : inactiveColor,
                  ...profileTabBarStyles.label,
                  marginTop: -8,
                }}>
                {title}
              </Text>
              <Text
                style={{
                  color: selected === index ? activeColor : inactiveColor,
                  ...profileTabBarStyles.number,
                  marginTop: -7,
                }}>
                {number}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const profileTabBarStyles = {
  container: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  label: {
    fontFamily: 'Noto Sans KR',
    fontSize: 10,
    lineHeight: 20,
    letterSpacing: -0.24,
    textAlign: 'center',
  },
  number: {
    fontFamily: 'Noto Sans KR',
    fontSize: 8,
    lineHeight: 20,
    letterSpacing: -0.24,
    textAlign: 'center',
  },
};

export default ProfileTabBar;
