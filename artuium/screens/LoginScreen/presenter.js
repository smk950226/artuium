import React from 'react';
import { View, Text, Alert, ImageBackground, Image, TouchableWithoutFeedback, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import { GoogleSigninButton } from '@react-native-community/google-signin';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import PropTypes from 'prop-types';
import styles from '../../styles';

const { width, height } = Dimensions.get('window')

class LoginScreen extends React.Component {
    static propTypes = {
        isCheckingNickname: PropTypes.bool.isRequired,
        isSubmitting: PropTypes.bool.isRequired,
        agreeTerm: PropTypes.bool.isRequired,
        handleChangeAgreeTerm: PropTypes.func.isRequired,
        handleChangeShowTerm: PropTypes.func.isRequired,
        showTerm: PropTypes.bool.isRequired
    }

    render(){
        const { isCheckingNickname, isSubmitting, agreeTerm, showTerm } = this.props;
        return(
            <ImageBackground source={require('../../assets/images/bg_login.jpg')} resizeMode={'cover'} style={[styles.container, styles.center]}>
                <Modal
                    isVisible={this.props.addInfoModal}
                    onBackButtonPress={this.props.closeAddInfo}
                    onBackdropPress={this.props.closeAddInfo}
                    style={[styles.center, styles.pb30]}
                >
                    {showTerm ? (
                    <View style={[styles.loginModal, styles.alignItemsCenter, styles.justifyContentCenter, styles.py15, {width: width-50}]}>
                            <Text style={[styles.fontBold, styles.font16, styles.textCenter]}>
                                아틔움 개인정보처리방침
                            </Text>
                            <ScrollView style={[styles.px10, styles.py10, {height: height - 200}]} scrollEnabled={true}>
                                <Text style={[styles.fontMedium, styles.font12, styles.mb20]}>
                                    {`<포브(Fov)>('www.artuium.com'이하 '아틔움')은(는) 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.

<포브(Fov)>('아틔움') 은(는) 회사는 개인정보처리방침을 개정하는 경우 웹사이트 공지사항(또는 개별공지)을 통하여 공지할 것입니다.

○ 본 방침은부터 2019년 12월 17일부터 시행됩니다.

1. 개인정보의 처리 목적 <포브(Fov)>('www.artuium.com'이하 '아틔움')은(는) 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.

가. 홈페이지 회원가입 및 관리

회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정이용 방지, 각종 고지·통지 등을 목적으로 개인정보를 처리합니다.

나. 민원사무 처리

민원인의 신원 확인, 민원사항 확인 등을 목적으로 개인정보를 처리합니다.

다. 재화 또는 서비스 제공

서비스 제공, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증 등을 목적으로 개인정보를 처리합니다.

라. 마케팅 및 광고에의 활용

이벤트 및 광고성 정보 제공 및 참여기회 제공 , 인구통계학적 특성에 따른 서비스 제공 및 광고 게재 , 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.

2. 개인정보 파일 현황

3. 개인정보의 처리 및 보유 기간① <포브(Fov)>('아틔움')은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집시에 동의 받은 개인정보 보유,이용기간 내에서 개인정보를 처리,보유합니다.② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.

4. 개인정보의 제3자 제공에 관한 사항① <포브(Fov)>('www.artuium.com'이하 '아틔움')은(는) 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.

②

<포브(Fov)>('www.artuium.com')

은(는) 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.

1. <갤러리>- 개인정보를 제공받는 자 : 갤러리- 제공받는 자의 개인정보 이용목적 : 성별, 생년월일, 서비스 이용 기록- 제공받는 자의 보유.이용기간: 1년

5. 개인정보처리 위탁① <포브(Fov)>('아틔움')은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.

②

<포브(Fov)>('www.artuium.com'이하 '아틔움')

은(는) 위탁계약 체결시 개인정보 보호법 제25조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적․관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리․감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.

6. 정보주체와 법정대리인의 권리·의무 및 그 행사방법 이용자는 개인정보주체로써 다음과 같은 권리를 행사할 수 있습니다.

① 정보주체는 포브(Fov)에 대해 언제든지 개인정보 열람,정정,삭제,처리정지 요구 등의 권리를 행사할 수 있습니다.② 제1항에 따른 권리 행사는포브(Fov)에 대해 개인정보 보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 포브(Fov)은(는) 이에 대해 지체 없이 조치하겠습니다.③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.④ 개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제5항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.⑥ 포브(Fov)은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.

7. 처리하는 개인정보의 항목 작성① <포브(Fov)>('www.artuium.com'이하 '아틔움')은(는) 다음의 개인정보 항목을 처리하고 있습니다.

1<홈페이지 회원가입 및 관리>- 필수항목 : 이메일, 휴대전화번호, 로그인ID, 성별, 생년월일, 이름, 서비스 이용 기록, 접속 로그- 선택항목 :

8. 개인정보의 파기<포브(Fov)>('아틔움')은(는) 원칙적으로 개인정보 처리목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.

-파기절차이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이 때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.-파기기한이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.

-파기방법종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.

9. 개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항

① 포브(Fov) 은 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠기(cookie)’를 사용합니다. ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다. 가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다. 나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다. 다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.

10. 개인정보 보호책임자 작성

① 포브(Fov)(‘www.artuium.com’이하 ‘아틔움) 은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.

▶ 개인정보 보호책임자성명 :김푸른직책 :대표직급 :대표연락처 :01044563780, fov@artuium.com,※ 개인정보 보호 담당부서로 연결됩니다.▶ 개인정보 보호 담당부서부서명 :담당자 :연락처 :, ,② 정보주체께서는 포브(Fov)(‘www.artuium.com’이하 ‘아틔움) 의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 포브(Fov)(‘www.artuium.com’이하 ‘아틔움) 은(는) 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.

11. 개인정보 처리방침 변경

①이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.

12. 개인정보의 안전성 확보 조치 <포브(Fov)>('아틔움')은(는) 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.

1. 정기적인 자체 감사 실시개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.2. 개인정보 취급 직원의 최소화 및 교육개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.3. 개인정보의 암호화이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.4. 접속기록의 보관 및 위변조 방지개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능 사용하고 있습니다.5. 개인정보에 대한 접근 제한개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.6. 문서보안을 위한 잠금장치 사용개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.`}
                                </Text>
                            </ScrollView>
                            <TouchableOpacity
                                style={[styles.center, styles.mx5, styles.mt20, styles.loginShadow, isSubmitting ? styles.opacity07 : null, {backgroundColor: '#1162d0', height: 35, borderRadius: 5, width: 120}]}
                                onPress={this.props.handleChangeShowTerm}
                            >
                                <Text style={[styles.font16, styles.fontMedium, styles.white]}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                    <View style={[styles.loginModal, styles.alignItemsCenter, styles.py15, {width: width-50}]}>
                        <Text style={[styles.font21, styles.fontMedium]}>프로필 작성</Text>
                        <View style={[styles.justifyContentBetween, styles.alignItemsCenter, {width: width-50}]}> 
                            <TouchableWithoutFeedback onPress={()=>this.props.handleChangeProfileImg()}>
                                {this.props.profileImg ?
                                    <Image source={{uri: this.props.profileImg.uri}} style={[styles.mt30, {width: 100, height: 100, borderRadius: 50}]} />
                                :
                                    <Image source={require('../../assets/images/empty_profile.png')} style={[styles.mt30, {width: 100, height: 100, borderRadius: 50}]} />
                                }
                            </TouchableWithoutFeedback>
                            <View style={[styles.my15, styles.px15, {width: '100%'}]}>
                                <View style={[styles.row, styles.justifyContentBetween, styles.px5, styles.alignItemsCenter, {height: 40}]}>
                                    <View style={[styles.row, styles.pl5, styles.alignItemsCenter, {width: '100%', height: 40, borderBottomWidth: 1, borderBottomColor: '#b2b2b2'}]}>
                                        <TextInput
                                            style={[styles.font14, {height: 43, width: '80%'}]}
                                            placeholder={'닉네임을 입력해주세요'}
                                            autoCapitalize={'none'} 
                                            autoCorrect={false} 
                                            value={this.props.nickname} 
                                            onChangeText={this.props.handleNicknameChange} 
                                            returnKeyType={'next'} 
                                            placeholderTextColor={'#b2b2b2'}
                                        />
                                        <TouchableOpacity style={[styles.smBlueBtn, isCheckingNickname ? styles.opacity07 : null]} onPress={this.props.handleCheckNickname}>
                                            <Text style={[styles.fontMedium, styles.font10, {color: '#044ae6'}]}>중복확인</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <TouchableWithoutFeedback onPress={this.props.handleChangeAgreeTerm}>
                                <View style={[styles.row, styles.alignItemsCenter, styles.mt10]}>
                                    <View style={[styles.borderRadius3, styles.alignItemsCenter, styles.justifyContentCenter, styles.bgWhite, styles.loginShadow, { width: 20, height: 20 }]}>
                                        {agreeTerm && (
                                            <View style={[styles.borderRadius3, styles.bgBlue, { width: 12, height: 12 }]}></View>
                                        )}
                                    </View>
                                    <Text style={[styles.fontMedium, styles.font13, styles.ml15]}>
                                        <TouchableWithoutFeedback onPress={this.props.handleChangeShowTerm}>
                                            <Text style={[styles.fontBold, styles.font13, styles.blue, { zIndex: 99 }]}>
                                                개인정보처리방침
                                            </Text>
                                        </TouchableWithoutFeedback>
                                        에 동의합니다.
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={[styles.row]}>
                                {this.props.checkedNickname && this.props.nicknameForm && this.props.profileImg && this.props.agreeTerm ? 
                                <TouchableOpacity
                                    style={[styles.center, styles.mx5, styles.loginShadow, styles.my30, isSubmitting ? styles.opacity07 : null, {backgroundColor: '#1162d0', height: 35, borderRadius: 5, width: 120}]}
                                    onPress={this.props.addInfoEnd}
                                >
                                    <Text style={[styles.font16, styles.fontMedium, styles.white]}>입장하기</Text>
                                </TouchableOpacity>
                                :
                                <View
                                    style={[styles.center, styles.mx5, styles.loginShadow, styles.my30, isSubmitting ? styles.opacity07 : null, {backgroundColor: '#bdbdbd', height: 35, borderRadius: 5, width: 120}]}
                                >
                                    <Text style={[styles.font16, styles.fontMedium, styles.white]}>입장하기</Text>
                                </View>
                                }
                            </View>
                        </View>
                    </View>
                    )}
                </Modal>
                <View>
                    <Text style={[styles.font20, styles.fontMedium, styles.textCenter]}>
                        예술을 이야기하다
                    </Text>
                    <Image source={require('../../assets/images/logo_with_text.png')} style={[{width: 1324*0.05, height: 1536*0.05}, styles.mt15, styles.alignSelfCenter, {marginBottom: 100}]} />
                    <View style={[styles.alignItemsCenter]}>
                        <TouchableWithoutFeedback onPress={()=>this.props.handleKakaoLogin()}>
                            <View>
                                <Image source={require('../../assets/images/login_kakao.png')} style={[styles.loginBtn]} resizeMode={'contain'} />
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={[styles.mt25, styles.loginBtn]}>
                            <GoogleSigninButton
                                style={{ width: 308, height: 58 }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Light}
                                onPress={()=>this.props.handleGoogleLogin()}
                            />
                        </View>
                        <View style={[styles.mt25, styles.loginBtn]}>
                            <LoginButton
                                style={[styles.loginBtn]}
                                readPermissions={["public_profile"]}
                                onLoginFinished={
                                    (error, result) => {
                                        if (error) {
                                            console.log("login has error: " + result.error);
                                        } else if (result.isCancelled) {
                                            console.log("login is cancelled.");
                                        } else {
                                            AccessToken.getCurrentAccessToken().then(
                                                (data) => {
                                                    this.props.handleFacebookLogin(data.accessToken.toString())
                                                }
                                            )
                                        }
                                    }
                                }
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

export default LoginScreen;