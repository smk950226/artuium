import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import {deviceInfo} from '../../util';

const ExhibitionListCard = ({
  imageUrl,
  exhibitionTitle,
  galleryName,
  openDate,
  closeDate,
  exhibitionType,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.cardContainer}>
      <Image
        source={{uri: imageUrl}}
        style={style.cardImage}
        resizeMode={'cover'}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8,
        }}>
        <Text style={style.exhibitionTitle} numberOfLines={1}>
          {exhibitionTitle}
        </Text>
        <Text>{exhibitionType}</Text>
      </View>
      <Text style={style.galleryName} numberOfLines={1}>
        {galleryName}
      </Text>
      <Text style={style.openTerm}>
        {openDate.replace(/-/gi, '.') + ' '}-
        {' ' + closeDate.replace(/-/gi, '.')}
      </Text>
    </TouchableOpacity>
  );
};

const style = {
  cardContainer: {
    width: (deviceInfo.size.width - 42) / 2,
    height: 301,
  },
  cardImage: {
    width: '100%',
    height: 233,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    borderRadius: 5,
    overflow: 'hidden',
  },
  exhibitionTitle: {
    maxWidth: '80%',
    color: '#2e2e2e',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: -0.24,
    lineHeight: 20,
  },
  galleryName: {
    fontSize: 12,
    color: '#2e2e2e',
    opacity: 0.5,
    lineHeight: 20,
    letterSpacing: -0.24,
    maxWidth: '100%',
  },
  openTerm: {
    fontSize: 12,
    color: '#2e2e2e',
    opacity: 0.5,
    lineHeight: 20,
    letterSpacing: -0.24,
    maxWidth: '100%',
  },
};

export default ExhibitionListCard;
