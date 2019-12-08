import React from 'react';
import { View, Text, ImageBackground, Image, ScrollView, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styles from '../../styles';

const iosStatusBarHeight = getStatusBarHeight()
const { width } = Dimensions.get('window')

class ProfileScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
        }
    }

    render(){
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 50+iosStatusBarHeight],
            extrapolate: 'clamp'
        });
        const headerPadding = this.state.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [0, iosStatusBarHeight],
            extrapolate: 'clamp'
        });
        const headerOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 50],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        return(
            <View style={[styles.container]}>
                <View style={[styles.row, styles.justifyContentBetween, styles.alignItemsCenter, styles.px15,
                    {width, height: 50, position: 'absolute', top: iosStatusBarHeight, zIndex: 999}
                ]}>
                    <Image source={require('../../assets/images/notification.png')} style={[styles.icon30]} />
                    <Animated.Text style={[styles.fontBold, styles.font20, {opacity: headerOpacity}]}>빠라바라밤님의 프로필</Animated.Text>
                    <Image source={require('../../assets/images/icon_setting.png')} style={[styles.icon30]} />
                </View>
                <Animated.View style={[{width, height: headerHeight, zIndex: 900, paddingTop: headerPadding}]} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: {
                            contentOffset: {
                                y: this.state.scrollY
                            }
                        }}]
                    )}
                    bounces={false}
                    scrollEventThrottle={16}
                >
                    <ImageBackground
                        source={{uri: 'http://mblogthumb1.phinf.naver.net/20130714_4/doyacart_1373813913596rsdT3_JPEG/%C1%F8%C1%D6%B1%CD%B0%ED%B8%AE%B8%A6_%C7%D1_%BC%D2%B3%E0.jpg?type=w2'}}
                        style={[styles.paddingIOS, styles.px15, styles.justifyContentEnd, styles.pb15, {height: 210}]}
                        resizeMode={'cover'}
                    >
                        <Image source={{uri: 'https://thumb.named.com/normal/resize/origin/file/photo/editor/1804/176ef5cda5edd31a2d453c0446649a57_nE72y9HJLoBrgI7LFPq.jpg'}} style={[styles.profileImage70]} />
                    </ImageBackground>
                    <LinearGradient colors={['#fff', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#fff']} start={[0, 0.5]} end={[1, 0.5]} style={[styles.px15, {paddingBottom: 35}]}>
                        <View style={[styles.row, styles.pt20, styles.px5, styles.justifyContentBetween]}>
                            <Text style={[styles.fontBold, styles.font25]}>빠라바라밤</Text>
                            <TouchableOpacity style={[styles.profileBtn]} onPress={()=>this.props.navigation.navigate('EditProfile')}>
                                <Text style={[styles.fontMedium, styles.font15, {color: '#a8a8a8'}]}>프로필 변경</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row, styles.px5]}>
                            <Text style={[styles.fontMedium, styles.font13, {color: '#a7a7a7'}]}>팔로워</Text>
                            <Text style={[styles.fontMedium, styles.font13, styles.ml10, {color: '#a7a7a7'}]}>345</Text>
                            <Text style={[styles.fontMedium, styles.font13, styles.ml30, {color: '#a7a7a7'}]}>팔로잉</Text>
                            <Text style={[styles.fontMedium, styles.font13, styles.ml10, {color: '#a7a7a7'}]}>123</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('LikeList')}>
                            <View style={[styles.row, styles.justifyContentEven, styles.profileBox, styles.mt20]}>
                                <View style={[styles.alignItemsCenter]}>
                                    <Text style={[styles.fontBold, styles.font35, {color: '#bfbfbf'}]}>11</Text>
                                    <Text style={[styles.fontMedium, styles.font16, {color: '#bfbfbf'}]}>좋아한 전시</Text>
                                </View>
                                <View style={[styles.alignItemsCenter]}>
                                    <Text style={[styles.fontBold, styles.font35, {color: '#bfbfbf'}]}>321</Text>
                                    <Text style={[styles.fontMedium, styles.font16, {color: '#bfbfbf'}]}>좋아한 작품</Text>
                                </View>
                                <View style={[styles.alignItemsCenter]}>
                                    <Text style={[styles.fontBold, styles.font35, {color: '#bfbfbf'}]}>57</Text>
                                    <Text style={[styles.fontMedium, styles.font16, {color: '#bfbfbf'}]}>좋아한 감상</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </LinearGradient>
                    <View style={[styles.alignItemsCenter]}>
                        <Image source={{uri: 'https://thumb.named.com/normal/resize/origin/file/photo/editor/1804/176ef5cda5edd31a2d453c0446649a57_nE72y9HJLoBrgI7LFPq.jpg'}} style={{width: 400, height: 700}} />
                        <Image source={{uri: 'https://thumb.named.com/normal/resize/origin/file/photo/editor/1804/176ef5cda5edd31a2d453c0446649a57_nE72y9HJLoBrgI7LFPq.jpg'}} style={{width: 400, height: 700}} />
                        <Image source={{uri: 'https://thumb.named.com/normal/resize/origin/file/photo/editor/1804/176ef5cda5edd31a2d453c0446649a57_nE72y9HJLoBrgI7LFPq.jpg'}} style={{width: 400, height: 700}} />
                        <Image source={{uri: 'https://thumb.named.com/normal/resize/origin/file/photo/editor/1804/176ef5cda5edd31a2d453c0446649a57_nE72y9HJLoBrgI7LFPq.jpg'}} style={{width: 400, height: 700}} />
                        <Image source={{uri: 'https://thumb.named.com/normal/resize/origin/file/photo/editor/1804/176ef5cda5edd31a2d453c0446649a57_nE72y9HJLoBrgI7LFPq.jpg'}} style={{width: 400, height: 700}} />            
                    </View>
                </ScrollView>
            </View>
        )
    }
}

ProfileScreen.propTypes = {

}

export default ProfileScreen;