import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, Animated, TextInput, Dimensions, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
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
                    <TouchableOpacity onPress={() => this.props.handleChangeNickname(this.props.nickname)}>
                        <Text style={[styles.fontMedium, styles.font16, {color: '#044ae6'}]}>완료</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.alignItemsCenter]}>
                    <Image
                        source={{uri: this.props.profile.background_image}}
                        style={[{width, height: 210}]} resizeMode={'cover'}
                    />
                    <TouchableWithoutFeedback onPress={this.props.handleChangeBackgroundImg}>
                        <View style={[styles.blueBtn, styles.my15]}>
                            <Text style={[styles.fontMedium, styles.font12, {color: '#044ae6'}]}>커버 사진 바꾸기</Text>
                        </View> 
                    </TouchableWithoutFeedback>
                </View>
                <View style={[styles.divGray]} />
                <View style={[styles.center, {height: 150}]}>
                    <Image source={{uri: this.props.profile.profile_image}} style={[styles.profileImage70]} />
                    <TouchableWithoutFeedback onPress={this.props.handleChangeProfileImg}>
                        <View style={[styles.blueBtn, styles.mt15]}>
                            <Text style={[styles.fontMedium, styles.font12, {color: '#044ae6'}]}>프로필 사진 바꾸기</Text>
                        </View> 
                    </TouchableWithoutFeedback>
                </View>
                <View style={[styles.divGray]} />
                <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.borderBtmGrayD1, styles.px30, {height: 80}]}>
                    <Text style={[styles.fontMedium, styles.font16]}>이름</Text>
                    <View style={{width: width/2}}>
                        <TextInput
                            style={[styles.fontMedium, styles.font16]}
                            underlineColorAndroid={'transparent'} 
                            autoCapitalize={'none'} 
                            autoCorrect={false} 
                            value={this.props.nickname} 
                            onChangeText={this.props.handleNicknameChange} 
                        />
                    </View>
                    <TouchableOpacity style={[styles.GrayXBtn]} onPress={()=>this.props.handleNicknameClear()}>
                        <Text style={[styles.font14, {color: '#bababa'}]}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

EditProfileScreen.propTypes = {

}

export default EditProfileScreen;