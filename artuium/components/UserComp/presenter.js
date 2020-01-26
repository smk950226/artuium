import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import ModalDropdown from '../ModalDropdown';

const { width, height } = Dimensions.get('window')

class UserComp extends Component{
    static propTypes = {
        user: PropTypes.object.isRequired,
        is_following: PropTypes.bool.isRequired,
        is_me: PropTypes.bool.isRequired,
        size: PropTypes.string,
        reportUser: PropTypes.func.isRequired,
        deleted: PropTypes.bool.isRequired
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(!prevProps.hideDropdown && this.props.hideDropdown){
            if(this.dropdownuser){
                this.dropdownuser.hide()
            }
        }
    }

    _handleGoToProfile = () => {
        if(this.props.is_me){
            this.props.navigation.navigate('Profile')
        }
        else{
            this.props.navigation.navigate('OthersProfile', {others: this.props.user})
        }
    }

    render(){
        const { user, is_following, is_me, size, deleted } = this.props;
        if(deleted){
            return null
        }
        else{
            return(
                <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px20, styles.py15]}>
                     <View style={[styles.row, styles.alignItemsCenter]}>
                         <TouchableWithoutFeedback onPress={this._handleGoToProfile}>
                             <View>
                                {user.profile_image ? (
                                    <Image source={{uri: user.profile_image}} style={[size === 'large' ? styles.profileImage50 : styles.profileImage40]} resizeMode={'cover'} />
                                ) : (
                                    <Image source={require('../../assets/images/empty_profile.png')} style={[size === 'large' ? styles.profileImage50 : styles.profileImage40]} />
                                )}
                             </View>
                         </TouchableWithoutFeedback>
                        <View style={[styles.ml10]}>
                            <TouchableWithoutFeedback onPress={this._handleGoToProfile}>
                                <Text style={[styles.fontMedium, styles.font16]}>{user.nickname}</Text>
                            </TouchableWithoutFeedback>
                            <Text style={[styles.fontRegular, styles.font12]}>{`팔로우하는 내 친구 ${user.following_friends_count}명`}</Text>
                        </View>
                    </View>
                    <View style={[styles.row, styles.alignItemsCenter]}>
                        {is_following ? (
                            <View style={[styles.borderRadius5, styles.bgGrayD1, styles.alignItemsCenter, styles.justifyContentCenter, styles.px25, styles.py5]}>
                                <TouchableWithoutFeedback onPress={is_me ? null : this.props.unfollow}>
                                    <View>
                                        <Text style={[styles.fontMedium, styles.font13, styles.white]}>언팔로우</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        ) : (
                            <View style={[styles.borderRadius5, styles.bgBlue, styles.alignItemsCenter, styles.justifyContentCenter, styles.px25, styles.py5]}>
                                <TouchableWithoutFeedback onPress={is_me ? null : this.props.follow}>
                                    <View>
                                        <Text style={[styles.fontMedium, styles.font13, styles.white]}>팔로우</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )}
                        {is_me ? (
                            <Image source={require('../../assets/images/icon_dotted.png')} style={[styles.icon20]} />
                        ) : (
                            <ModalDropdown ref={(el) => this.dropdownuser = el} options={['신고하기', '숨기기']}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={{height: Platform.OS === 'ios' ? 70 : 90}}
                            dropdownTextStyle={{fontSize: 15, height: Platform.OS === 'ios' ? 35 : 45}}
                            onSelect={this.props.reportUser}
                            >
                                <Image source={require('../../assets/images/icon_dotted.png')} style={[styles.icon20]} />
                            </ModalDropdown>
                        )}
                    </View>
                </View>
            )
        }
    }
}

export default UserComp;