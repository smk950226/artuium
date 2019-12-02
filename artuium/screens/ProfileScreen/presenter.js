import React from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../styles';

const ProfileScreen = (props) => (
    <View style={[styles.container]}>
        <ImageBackground
            source={{uri: 'http://mblogthumb1.phinf.naver.net/20130714_4/doyacart_1373813913596rsdT3_JPEG/%C1%F8%C1%D6%B1%CD%B0%ED%B8%AE%B8%A6_%C7%D1_%BC%D2%B3%E0.jpg?type=w2'}}
            style={[styles.paddingIOS, styles.pl20, styles.justifyContentBetween, styles.pb15, {height: 200}]}
            resizeMode={'cover'}
        >
            <Image source={require('../../assets/images/notification.png')} style={[styles.icon20]} />
            <Image source={{uri: 'https://thumb.named.com/normal/resize/origin/file/photo/editor/1804/176ef5cda5edd31a2d453c0446649a57_nE72y9HJLoBrgI7LFPq.jpg'}} style={[styles.profileImage70]} />
        </ImageBackground>
        <LinearGradient colors={['#fff', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#fff']} start={[0, 0.5]} end={[1, 0.5]} style={[styles.px15, {paddingBottom: 35}]}>
            <View style={[styles.row, styles.pt20, styles.px5, styles.justifyContentBetween]}>
                <Text style={[styles.fontBold, styles.font25]}>빠라바라밤</Text>
                <View style={[styles.profileBtn]}>
                    <Text style={[styles.fontMedium, styles.font15, {color: '#a8a8a8'}]}>프로필 변경</Text>
                </View>
            </View>
            <View style={[styles.row, styles.px5]}>
                <Text style={[styles.fontMedium, styles.font13, {color: '#a7a7a7'}]}>팔로워</Text>
                <Text style={[styles.fontMedium, styles.font13, styles.ml10, {color: '#a7a7a7'}]}>345</Text>
                <Text style={[styles.fontMedium, styles.font13, styles.ml30, {color: '#a7a7a7'}]}>팔로잉</Text>
                <Text style={[styles.fontMedium, styles.font13, styles.ml10, {color: '#a7a7a7'}]}>123</Text>
            </View>
            <View style={[styles.row, styles.justifyContentEven, styles.profileBox]}>
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
        </LinearGradient>
        <View>
            <Text>ㄴㅇ러ㅜ나머루</Text>
        </View>
    </View>
)

ProfileScreen.propTypes = {

}

export default ProfileScreen;