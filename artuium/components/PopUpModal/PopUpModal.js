import React from 'react';
import {View, Image, Text, TouchableOpacity, AsyncStorage} from 'react-native';
import {deviceInfo} from '../../util';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const iosStatusBarHeight = getStatusBarHeight();

const PopUpModal = ({navigation}) => {
  return (
    <View
      style={[
        styles.container,
        {paddingTop: deviceInfo.OS === 'ios' ? iosStatusBarHeight : 0},
      ]}>
      <Text style={styles.title}>{navigation.state.params.popUpTitle}</Text>
      <Image
        source={{uri: navigation.state.params.popUpUri}}
        style={{flex: 1, backgroundColor: '#fff'}}
      />
      <View style={{height: 80, flexDirection: 'row'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            AsyncStorage.setItem(
              `popup-${navigation.state.params.popUpId}`,
              'hide',
            );
            navigation.pop();
          }}>
          <Text style={styles.buttonText}>다시 보지 않기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            AsyncStorage.setItem(`popup-close`, 'close');
            navigation.pop();
          }}>
          <Text style={styles.buttonTextBold}>닫기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    width: deviceInfo.size.width,
    height: deviceInfo.size.height,
    backgroundColor: '#c4c4c4',
  },
  title: {
    paddingVertical: 28,
    fontSize: 24,
    lineHeight: 32,
    width: deviceInfo.size.width,
    backgroundColor: '#fff',
    paddingHorizontal: 42,
    fontWeight: '800',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dfdfdf',
  },
  buttonText: {
    fontSize: 16,
  },
  buttonTextBold: {
    fontSize: 16,
    fontWeight: '800',
  },
};

export default PopUpModal;
