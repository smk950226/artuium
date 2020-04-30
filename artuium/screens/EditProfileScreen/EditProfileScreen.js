import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {useSelector, useDispatch, useStore} from 'react-redux';
import {actionCreators as userActions} from '../../redux/modules/user';
import ImagePickerButton from '../../components/ImagePickerButton/ImagePickerButton';
import EditNicknameDimmer from '../../components/EditNicknameDimmer/EditNicknameDimmer';
import EditStatusMessageDimmer from '../../components/EditStatusMessageDimmer/EditStatusMessageDimmer';
const {width, height} = Dimensions.get('window');

const EditProfileScreen = props => {
  const [showNicknameDimmer, setShowNicknameDimmer] = useState(false);
  const [showStatusMessageDimmer, setShowStatusMessageDimmer] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newBackgroundImage, setNewBackgroundImage] = useState(null);
  const [newNickname, setNewNickname] = useState(null);
  const [newStatusMessage, setNewStatusMessage] = useState(null);

  const profile = useSelector(store => store.user.profile);
  const dispatch = useDispatch();
  const getState = useStore().getState;
  const changeProfile = (
    nickname,
    statusMessage,
    profileImage,
    backgroundImage,
  ) => {
    userActions.changeProfile(
      nickname,
      statusMessage,
      profileImage,
      backgroundImage,
    )(dispatch, getState);
  };

  const onPressSaveButton = () => {
    changeProfile(
      newNickname ? newNickname : profile.nickname,
      newStatusMessage !== null ? newStatusMessage : profile.status_message,
      newProfileImage ? newProfileImage : null,
      newBackgroundImage ? newBackgroundImage : null,
    );
    props.navigation.pop();
  };

  const onPressCancelButton = () => {
    props.navigation.pop();
  };

  return (
    <View style={{width, height}}>
      <ImageBackground
        source={
          newBackgroundImage?.uri
            ? {uri: newBackgroundImage.uri}
            : profile.background_image
            ? {uri: profile.background_image}
            : require('../../assets/images/defaultProfileBackground.png')
        }
        style={{width, height: 275, alignItems: 'center'}}
        resizeMode={'cover'}>
        <View
          style={{
            ...editProfileScreenStyles.backgroundImageBlackCover,
          }}
        />
        <View style={{height: 86, width: 86, marginTop: 116}}>
          <Image
            source={
              newProfileImage?.uri
                ? {uri: newProfileImage.uri}
                : profile.profile_image
                ? {uri: profile.profile_image}
                : require('../../assets/images/empty_profile.png')
            }
            style={{...editProfileScreenStyles.profileImage}}
          />
          <ImagePickerButton
            style={{
              bottom: 0,
              right: 0,
            }}
            setImage={setNewProfileImage}
          />
          <View />
        </View>
        <ImagePickerButton
          style={{
            bottom: 17,
            right: 18,
          }}
          setImage={setNewBackgroundImage}
        />
      </ImageBackground>
      {!showNicknameDimmer && !showStatusMessageDimmer && (
        <Text
          style={{
            position: 'absolute',
            top: 49,
            left: 21,
            ...editProfileScreenStyles.textButton,
          }}
          onPress={onPressCancelButton}>
          취소
        </Text>
      )}
      {!showNicknameDimmer && !showStatusMessageDimmer && (
        <Text
          style={{
            position: 'absolute',
            top: 49,
            right: 20,
            ...editProfileScreenStyles.textButton,
          }}
          onPress={onPressSaveButton}>
          저장
        </Text>
      )}
      <Text
        style={{
          ...editProfileScreenStyles.labelText,
          marginTop: 25,
          paddingLeft: 31,
        }}>
        닉네임
      </Text>
      <TouchableOpacity
        style={{
          ...editProfileScreenStyles.descriptionTextContainer,
          marginTop: 6,
        }}
        onPress={() => setShowNicknameDimmer(true)}>
        <Text
          style={{
            ...editProfileScreenStyles.descriptionText,
          }}>
          {newNickname ? newNickname : profile.nickname}
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          ...editProfileScreenStyles.labelText,
          marginTop: 25,
          paddingLeft: 31,
        }}>
        소개
      </Text>
      <TouchableOpacity
        style={{
          ...editProfileScreenStyles.descriptionTextContainer,
          marginTop: 9,
          flex: 1,
          marginBottom: 77,
        }}
        onPress={() => setShowStatusMessageDimmer(true)}>
        <Text style={{...editProfileScreenStyles.descriptionText}}>
          {newStatusMessage !== null
            ? newStatusMessage
            : profile.status_message}
        </Text>
      </TouchableOpacity>
      {showNicknameDimmer && (
        <EditNicknameDimmer
          closeDimmer={() => setShowNicknameDimmer(false)}
          defaultNickname={profile.nickname}
          defaultValue={newNickname ? newNickname : profile.nickname}
          setValue={setNewNickname}
        />
      )}
      {showStatusMessageDimmer && (
        <EditStatusMessageDimmer
          closeDimmer={() => setShowStatusMessageDimmer(false)}
          defaultStatusMessage={profile.status_message}
          defaultValue={
            newStatusMessage !== null
              ? newStatusMessage
              : profile.status_message
          }
          setValue={setNewStatusMessage}
        />
      )}
    </View>
  );
};

const editProfileScreenStyles = {
  textButton: {
    fontFamily: 'Noto Sans KR',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#ffffff',
  },
  titleText: {
    fontFamily: 'Noto Sans KR',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#FFFFFF',
  },
  labelText: {
    fontFamily: 'Noto Sans KR',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#000000',
  },
  descriptionTextContainer: {
    paddingTop: 8,
    paddingBottom: 7,
    paddingHorizontal: 12,
    marginLeft: 19,
    marginRight: 18,
    borderWidth: 1,
    borderColor: '#dfdfdf',
  },
  descriptionText: {
    fontFamily: 'Noto Sans KR',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#000000',
    opacity: 0.8,
  },
  profileImage: {
    height: 86,
    width: 86,
    borderRadius: 43,
  },
  backgroundImageBlackCover: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#00000060',
  },
};

export default EditProfileScreen;
