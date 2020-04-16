import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const StatusMessage = ({message, showMore, setShowMore, setLineNum}) => {
  const [statusMessageLineNum, setStatusMessageLineNum] = useState(-1);
  return (
    <View>
      <Text
        style={{
          ...statusMessageStyle.statusMessageText,
          marginTop: 6,
          marginBottom: 3,
        }}
        numberOfLines={showMore ? null : 2}>
        {message}
      </Text>
      <Text
        style={{...statusMessageStyle.dummyForLineNumText}}
        onTextLayout={({nativeEvent: {lines}}) => {
          setStatusMessageLineNum(lines.length);
          setLineNum(lines.length);
        }}>
        {message}
      </Text>
      {statusMessageLineNum > 2 && (
        <TouchableOpacity
          style={{
            ...statusMessageStyle.moreButton,
            marginTop: 5,
            marginBottom: 4,
          }}
          onPress={() => setShowMore(!showMore)}>
          <Text style={{...statusMessageStyle.moreButtonText}}>
            {showMore ? '접기' : '더보기'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const statusMessageStyle = {
  statusMessageText: {
    fontFamily: 'Noto Sans KR',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  dummyForLineNumText: {
    fontFamily: 'Noto Sans KR',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.24,
    opacity: 0,
    position: 'absolute',
    width: width - 50,
  },
  moreButton: {
    width: 39,
    height: 16,
    backgroundColor: '#ffffff50',
    borderRadius: 5,
  },
  moreButtonText: {
    fontFamily: 'Noto Sans KR',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: -0.24,
    color: '#FFFFFF',
    textAlignVertical: 'center',
  },
};

export default StatusMessage;
