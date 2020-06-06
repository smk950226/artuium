import React from 'react';
import {View, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import moment from 'moment';
import 'moment/locale/ko';

const {width, height} = Dimensions.get('window');

const ExhibitionListCard = props => {
  const {title, place, imageSource, onPress, openDate, closeDate} = props;
  const nowOpen = moment(new Date()).isBefore(openDate)
    ? '예정'
    : moment(new Date()).isBefore(closeDate)
    ? '진행'
    : '종료';
  const date =
    openDate.split('-').join('.') + '-' + closeDate.split('-').join('.');
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: (width - 47) / 2,
        marginTop: 17,
        marginBottom: 4,
      }}>
      <Image
        style={{...exhibitionSearchCardStyles.image}}
        source={
          imageSource
            ? {uri: imageSource}
            : require('../../assets/images/defaultProfileBackground.png')
        }
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
        }}>
        <Text
          numberOfLines={1}
          style={{
            ...exhibitionSearchCardStyles.titleText,
            marginLeft: 4,
          }}>
          {title}
        </Text>
        <Text
          style={{
            backgroundColor:
              nowOpen === '진행'
                ? '#fa4d2c'
                : nowOpen === '종료'
                ? '#c4c4c4'
                : '#4a4a4a',
            ...exhibitionSearchCardStyles.nowOpen,
          }}>
          {nowOpen}
        </Text>
      </View>
      <Text
        numberOfLines={1}
        style={{
          ...exhibitionSearchCardStyles.placeText,
          marginLeft: 4,
        }}>
        {place}
      </Text>
      <Text
        numberOfLines={1}
        style={{
          ...exhibitionSearchCardStyles.dateText,
          marginLeft: 4,
        }}>
        {date}
      </Text>
    </TouchableOpacity>
  );
};

const exhibitionSearchCardStyles = {
  image: {
    overflow: 'hidden',
    width: '100%',
    height: (((width - 47) / 2) * 233) / 164,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderRadius: 5,
  },
  titleText: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#2e2e2e',
    flex: 1,
  },
  nowOpen: {
    flexBasis: 30,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#FFFFFF',
    width: 30,
    height: 20,
    textAlign: 'center',
  },
  placeText: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#2e2e2e',
    opacity: 0.5,
  },
  dateText: {
    fontSize: 12,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#2e2e2e',
    opacity: 0.5,
  },
};

export default ExhibitionListCard;
