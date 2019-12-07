import React from 'react';
import { View, Text, ImageBackground, Image, TouchableWithoutFeedback, Animated, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const LoginScreen = (props) => (
    <ImageBackground source={require('../../assets/images/bg_login.jpg')} resizeMode={'cover'} style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>
        <View>
            <Text style={[styles.font20, styles.fontMedium, styles.textCenter]}>
                예술을 이야기하다
            </Text>
            <Image source={require('../../assets/images/logo_with_text.png')} style={[{width: 1324*0.05, height: 1536*0.05}, styles.mt15, styles.alignSelfCenter]} />
            <TouchableWithoutFeedback onPress={props.login}>
                <View>
                    <Image source={require('../../assets/images/login_kakao.png')} style={[styles.loginBtn, {marginTop: 100}]} resizeMode={'contain'} />
                </View>
            </TouchableWithoutFeedback>
        </View>
    </ImageBackground>
)

export default LoginScreen;