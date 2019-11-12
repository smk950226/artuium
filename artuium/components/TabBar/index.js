import React from 'react';
import { Animated } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';


const TabNavigation = props =>
    <Animated.View style={{height: props.screenProps.scrollY.interpolate({
        inputRange: [0, 90],
        outputRange: [0, 90],
        extrapolate: 'clamp'
    })
    }}>
        <BottomTabBar {...props} />
    </Animated.View>

export default TabNavigation