import React from 'react';
import { View, Text, ImageBackground, Image, TouchableWithoutFeedback, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import PropTypes from 'prop-types';
import styles from '../../styles';

const { width, height } = Dimensions.get('window')

class LoginScreen extends React.Component {
    render(){
        const {username, usernameForm, password1, passwordForm, passwordMatch, nickname, nicknameForm, profileImg} = this.props;
        return(
            <ImageBackground source={require('../../assets/images/bg_login.jpg')} resizeMode={'cover'} style={[styles.container, styles.center]}>
                <Modal
                    isVisible={this.props.visibleLogin}
                    onBackButtonPress={this.props.closeLogin}
                    onBackdropPress={this.props.closeLogin}
                    style={[styles.center, styles.pb30]}
                >
                    <View style={[styles.loginModal, styles.alignItemsCenter, styles.py20, {width: width-50, height: height*0.3}]}>
                        <Text style={[styles.font21, styles.fontMedium]}>로그인</Text>
                        <View style={[styles.py30, styles.px15, {width: '100%'}]}>
                            <View style={[styles.row, styles.justifyContentBetween, styles.px5, styles.alignItemsCenter, {height: 40}]}>
                                <Text style={[styles.font14, styles.fontMedium]}>이메일</Text>
                                <TextInput
                                    style={[styles.font14, styles.fontMedium, {height: 20, width: '60%', borderBottomWidth: 1, borderBottomColor: '#b2b2b2'}]}
                                    autoFocus={true}
                                    placeholder={'이메일을 입력해주세요'}
                                    autoCapitalize={'none'} 
                                    autoCorrect={false} 
                                    value={this.props.loginId} 
                                    onChangeText={this.props.handleLoginIdChange} 
                                    returnKeyType={'next'} 
                                    placeholderTextColor={'#b2b2b2'}
                                    onEndEditing={() => {this.passwordInput.focus()}}
                                />
                            </View>
                            <View style={[styles.row, styles.justifyContentBetween, styles.px5, styles.alignItemsCenter, {height: 40}]}>
                                <Text style={[styles.font14, styles.fontMedium]}>비밀번호</Text>
                                <TextInput
                                    style={[styles.font14, styles.fontMedium, {height: 20, width: '60%', borderBottomWidth: 1, borderBottomColor: '#b2b2b2'}]}
                                    placeholder={'비밀번호를 입력해주세요'}
                                    ref={(input) => { this.passwordInput = input; }}
                                    underlineColorAndroid={'transparent'} 
                                    secureTextEntry={true} 
                                    autoCorrect={false} 
                                    value={this.props.loginPw}
                                    onChangeText={this.props.handleLoginPwChange} 
                                    onSubmitEditing={()=>this.props.login(this.props.loginId, this.props.loginPw)}
                                    placeholderTextColor={'#b2b2b2'}
                                />
                            </View>
                        </View>
                        <TouchableWithoutFeedback onPress={()=>this.props.login(this.props.loginId, this.props.loginPw)}>
                            <View
                                style={[styles.center, styles.mb25, styles.loginShadow, styles.bgWhite, {height: 35, borderRadius: 5, width: 120}]}
                            >
                                <Text style={[styles.font16, styles.fontMedium]}>로그인</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>
                <Modal
                    isVisible={this.props.visibleSignup}
                    onBackButtonPress={this.props.closeSignup}
                    onBackdropPress={this.props.closeSignup}
                    style={[styles.center, {paddingBottom: 50}]}
                >
                    <View style={[styles.loginModal, styles.alignItemsCenter, styles.py15, {width: width-50, height: height/3+20}]}>
                        <Text style={[styles.font21, styles.fontMedium]}>회원가입</Text>
                        <ScrollView
                            horizontal={true}
                            pagingEnabled={true}
                            contentContainerStyle={[styles.row]}
                            showsHorizontalScrollIndicator={false}
                            ref={"scrollView"}
                            scrollEnabled={false}
                        >
                            <View style={[styles.justifyContentBetween, styles.alignItemsCenter, {width: width-50}]}> 
                                <View style={[styles.py30, styles.px15, {width: '100%'}]}>
                                    <View style={[styles.row, styles.justifyContentBetween, styles.alignItemsCenter, {height: 40}]}>
                                        <Text style={[styles.font14, styles.fontMedium]}>이메일</Text>
                                        <View style={[styles.row, styles.pl5, styles.alignItemsCenter, {width: '60%', height: 40, borderBottomWidth: 1, borderBottomColor: '#b2b2b2'}]}>
                                            <TextInput
                                                style={[styles.font14, styles.fontMedium, {height: 20}]}
                                                autoFocus={true}
                                                placeholder={'이메일를 입력해주세요'}
                                                autoCapitalize={'none'} 
                                                autoCorrect={false} 
                                                value={this.props.username} 
                                                onChangeText={this.props.handleUsernameChange} 
                                                returnKeyType={'next'} 
                                                placeholderTextColor={'#b2b2b2'}
                                            />
                                            <TouchableOpacity style={[styles.smBlueBtn]} onPress={()=>this.props.handleCheckUsername(this.props.username)}>
                                                <Text style={[styles.fontMedium, styles.font10, {color: '#044ae6'}]}>중복확인</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={[styles.row, styles.justifyContentBetween, styles.px5, styles.alignItemsCenter, {height: 40}]}>
                                        <Text style={[styles.font14, styles.fontMedium]}>비밀번호</Text>
                                        <TextInput
                                            style={[styles.font14, styles.fontMedium, {height: 20, width: '60%', borderBottomWidth: 1, borderBottomColor: '#b2b2b2'}]}
                                            placeholder={'비밀번호를 입력해주세요'}
                                            underlineColorAndroid={'transparent'} 
                                            secureTextEntry={true} 
                                            autoCorrect={false} 
                                            value={this.props.password1}
                                            onChangeText={this.props.handlePassword1Change} 
                                            placeholderTextColor={'#b2b2b2'}
                                        />
                                    </View>
                                    <View style={[styles.row, styles.justifyContentBetween, styles.px5, styles.alignItemsCenter, {height: 40}]}>
                                        <Text style={[styles.font14, styles.fontMedium]}>비밀번호 확인</Text>
                                        <TextInput
                                            style={[styles.font14, styles.fontMedium, {height: 20, width: '60%', borderBottomWidth: 1, borderBottomColor: '#b2b2b2'}]}
                                            underlineColorAndroid={'transparent'} 
                                            secureTextEntry={true} 
                                            autoCorrect={false} 
                                            value={this.props.password2}
                                            onChangeText={this.props.handlePassword2Change} 
                                        />
                                    </View>
                                </View>
                                <TouchableWithoutFeedback onPress={()=>this.refs.scrollView.scrollTo({x: width-50, y: 0, animated: true})}>
                                    <View
                                        style={[styles.center, styles.mb25, styles.loginShadow, styles.bgWhite, {height: 35, borderRadius: 5, width: 120}]}
                                    >
                                        <Text style={[styles.font16, styles.fontMedium]}>다음</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={[styles.justifyContentBetween, styles.alignItemsCenter, {width: width-50}]}> 
                                <TouchableWithoutFeedback onPress={()=>this.props.handleChangeProfileImg()}>
                                    {this.props.profileImg ?
                                        <Image source={{uri: this.props.profileImg.uri}} style={[styles.mt30, {width: 100, height: 100, borderRadius: 50}]} />
                                    :
                                        <View style={[styles.mt30, {width: 100, height: 100, borderRadius: 50, backgroundColor: '#d8d8d8'}]} />
                                    }
                                </TouchableWithoutFeedback>
                                <View style={[styles.my15, styles.px15, {width: '100%'}]}>
                                    <View style={[styles.row, styles.justifyContentBetween, styles.px5, styles.alignItemsCenter, {height: 40}]}>
                                        <Text style={[styles.font14, styles.fontMedium]}>닉네임</Text>
                                        <View style={[styles.row, styles.pl5, styles.alignItemsCenter, {width: '60%', height: 40, borderBottomWidth: 1, borderBottomColor: '#b2b2b2'}]}>
                                            <TextInput
                                                style={[styles.font14, styles.fontMedium, {height: 20}]}
                                                placeholder={'닉네임을 입력해주세요'}
                                                autoCapitalize={'none'} 
                                                autoCorrect={false} 
                                                value={this.props.nickname} 
                                                onChangeText={this.props.handleNicknameChange} 
                                                returnKeyType={'next'} 
                                                placeholderTextColor={'#b2b2b2'}
                                            />
                                            <TouchableOpacity style={[styles.smBlueBtn]} onPress={()=>this.props.handleCheckNickname(this.props.nickname)}>
                                                <Text style={[styles.fontMedium, styles.font10, {color: '#044ae6'}]}>중복확인</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.row]}>
                                    <TouchableWithoutFeedback onPress={()=>this.refs.scrollView.scrollTo({x: 0, y: 0, animated: true})}>
                                        <View
                                            style={[styles.center, styles.mx5, styles.mb25, styles.loginShadow, styles.bgWhite, {height: 35, borderRadius: 5, width: 120}]}
                                        >
                                            <Text style={[styles.font16, styles.fontMedium]}>이전</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                        {(username && usernameForm && password1 && passwordForm && passwordMatch && nickname && usernameForm && profileImg)
                                         ?
                                            <TouchableOpacity
                                                style={[styles.center, styles.mx5, styles.mb25, styles.loginShadow, {backgroundColor: '#1162d0', height: 35, borderRadius: 5, width: 120}]}
                                                onPress={()=>this.props.handleSignup()}
                                            >
                                                <Text style={[styles.font16, styles.fontMedium, styles.white]}>입장하기</Text>
                                            </TouchableOpacity>
                                        :
                                            <View
                                                style={[styles.center, styles.mx5, styles.mb25, styles.loginShadow, {backgroundColor: '#bdbdbd', height: 35, borderRadius: 5, width: 120}]}
                                            >
                                                <Text style={[styles.font16, styles.fontMedium, styles.white]}>입장하기</Text>
                                            </View>
                                        }
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>
                <View>
                    <Text style={[styles.font20, styles.fontMedium, styles.textCenter]}>
                        예술을 이야기하다
                    </Text>
                    <Image source={require('../../assets/images/logo_with_text.png')} style={[{width: 1324*0.05, height: 1536*0.05}, styles.mt15, styles.alignSelfCenter, {marginBottom: 100}]} />
                    <TouchableWithoutFeedback onPress={this.props.openLogin}>
                        <View
                            style={[styles.loginBtn, styles.center, styles.mb25, styles.loginShadow, styles.bgWhite, {height: 50, borderRadius: 5}]}
                        >
                            <Text style={[styles.font16, styles.fontMedium]}>로그인</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={this.props.openSignup}>
                        <View
                            style={[styles.loginBtn, styles.center, styles.mb25, styles.loginShadow, {backgroundColor: '#1162d0', height: 50, borderRadius: 5}]}
                        >
                            <Text style={[styles.font16, styles.fontMedium, styles.white]}>회원가입</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>this.props.login('fov@artuium.com', 'fov959697')}>
                        <View>
                            <Image source={require('../../assets/images/login_kakao.png')} style={[styles.loginBtn]} resizeMode={'contain'} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ImageBackground>
        )
    }
}

export default LoginScreen;