import React from 'react';
import {Text, ScrollView, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

const TermModal = props => {
  const {visible, setModalVisible, modalTitle, modalContent} = props;
  return (
    <Modal
      animationIn={'fadeIn'}
      isVisible={visible}
      backdropOpacity={0.27}
      onBackButtonPress={() => setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}
      style={{
        ...termModalStyles.container,
        marginTop: 91,
        marginBottom: 75,
        marginHorizontal: 17,
      }}>
      <Text
        style={{
          ...termModalStyles.title,
          marginTop: 17,
          marginLeft: 21,
        }}>
        {modalTitle}
      </Text>
      <ScrollView style={{marginTop: 21, paddingHorizontal: 21}}>
        <Text style={{...termModalStyles.text}}>{modalContent}</Text>
      </ScrollView>
      <TouchableOpacity
        style={{
          ...termModalStyles.button,
          marginTop: 25,
          marginBottom: 17,
        }}
        onPress={() => setModalVisible(false)}>
        <Text style={{...termModalStyles.buttonText}}>확인</Text>
      </TouchableOpacity>
    </Modal>
  );
};

const termModalStyles = {
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
  title: {
    fontFamily: 'NotoSansKR-Bold',
    letterSpacing: -0.6,
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
    color: '#fd4c1e',
  },
  text: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    lineHeight: 30,
    letterSpacing: -0.48,
  },
  button: {
    height: 38,
    width: 174,
    borderRadius: 5,
    backgroundColor: '#fd4c1e',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'NotoSansKR-Regular',
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
};

export default TermModal;
