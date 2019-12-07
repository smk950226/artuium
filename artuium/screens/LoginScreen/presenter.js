import React from 'react';
import { View, Text, ImageBackground, Image, ScrollView, Animated, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import styles from '../../styles';

class LoginScreen extends React.Component {
    render(){
        return(
            <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>
                <View>
                    <Text style={[styles.font20, styles.fontMedium, styles.textCenter]}>
                        예술을 이야기하다
                    </Text>
                    <Image source={require('../../assets/images/icon.png')} style={[{width: 60, height: 60}, styles.mt15, styles.alignSelfCenter]} />
                    <Image source={require('../../assets/images/login_kakao.png')} style={[styles.loginBtn, {marginTop: 100}]} resizeMode={'contain'} />
                </View>
            </View>
        )
    }
}

LoginScreen.propTypes = {

}

export default LoginScreen;