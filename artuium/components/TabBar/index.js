import React from 'react';
import { Animated, View } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';


const TabNavigation = props =>{
    if(props.navigation.state.index === 0){
        if(props.navigation.state.routes[props.navigation.state.index].index === 0){
            return(
                <Animated.View style={{height: props.screenProps.scrollY.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 80],
                    extrapolate: 'clamp'
                })
                }}>
                    <BottomTabBar {...props} />
                </Animated.View>
            )
        }
        else{
            return(
                <View style={{height: 60}}>
                    <BottomTabBar {...props} />
                </View>
            )
        }
    }
    else{
        return(
            <View style={{height: 60}}>
                <BottomTabBar {...props} />
            </View>
        )
    }
}
   

export default TabNavigation