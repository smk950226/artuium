import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, Animated, Dimensions, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styles from '../../styles';

const iosStatusBarHeight = getStatusBarHeight()
const { width, height } = Dimensions.get('window')

class EditProfileScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    render(){
        return(
            <View style={[styles.container, styles.bgGrayf0]}>
                <View style={[styles.row, styles.justifyContentBetween, styles.alignItemsCenter, styles.px25, styles.bgWhite, {width, height: iosStatusBarHeight+50, paddingTop: iosStatusBarHeight}]}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack(null)}>
                        <Image source={require('../../assets/images/icon_back.png')} style={[{width: 9, height: 17}]} />
                    </TouchableWithoutFeedback>
                    <Text style={[styles.fontBold, styles.font20]}>프로필 변경</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                        <Text style={[styles.fontMedium, styles.font16, {color: '#044ae6'}]}>완료</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.alignItemsCenter]}>
                    <Image
                        source={{uri: 'http://mblogthumb1.phinf.naver.net/20130714_4/doyacart_1373813913596rsdT3_JPEG/%C1%F8%C1%D6%B1%CD%B0%ED%B8%AE%B8%A6_%C7%D1_%BC%D2%B3%E0.jpg?type=w2'}}
                        style={[{width, height: 210}]} resizeMode={'cover'}
                    />
                    <View style={[styles.blueBtn, styles.my15]}>
                        <Text style={[styles.fontMedium, styles.font12, {color: '#044ae6'}]}>커버 사진 바꾸기</Text>
                    </View> 
                </View>
                <View style={[styles.divGray]} />
                <View style={[styles.center, {height: 150}]}>
                    <Image source={{uri: 'https://thumb.named.com/normal/resize/origin/file/photo/editor/1804/176ef5cda5edd31a2d453c0446649a57_nE72y9HJLoBrgI7LFPq.jpg'}} style={[styles.profileImage70]} />
                    <View style={[styles.blueBtn, styles.mt15]}>
                        <Text style={[styles.fontMedium, styles.font12, {color: '#044ae6'}]}>프로필 사진 바꾸기</Text>
                    </View> 
                </View>
                <View style={[styles.divGray]} />
                <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.borderBtmGrayD1, styles.px30, {height: 80}]}>
                    <Text style={[styles.fontMedium, styles.font16]}>이름</Text>
                    <View style={{width: width/2}}>
                        <Text style={[styles.fontMedium, styles.font16]}>빠밤밤밤밤빰</Text>
                    </View>
                    <View style={[styles.GrayXBtn]}>
                        <Text style={[styles.font14, {color: '#bababa'}]}>X</Text>
                    </View>
                </View>
            </View>
        )
    }
}

EditProfileScreen.propTypes = {

}

export default EditProfileScreen;