import React from 'react';
import {
  View,
  ImageBackground,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import styles from '../../styles';
import StarRating from 'react-native-star-rating';
import {DottedLine} from '../DottedLine/DottedLine';
import LinearGradient from 'react-native-linear-gradient';
import {
  emptyStar,
  fullStar,
  halfStar,
  chatNumIconGrey,
  heartNumIconGrey,
  chatNumIcon,
  heartNumIcon,
} from '../../assets/images';

const {width, height} = Dimensions.get('window');

export const AllReviewCard = ({
  cardImageUri,
  cardLabel,
  cardSubLabel,
  authorProfile,
  interactionIcon,
  starRateNum,
  authorName,
  createdAt,
  content,
  chatNum,
  likeNum,
  onPress,
  type,
  reviewTitle,
}) => {
  return (
    <TouchableOpacity style={style.cardContainer} onPress={onPress}>
      <ImageBackground
        source={{uri: cardImageUri}}
        style={{
          justifyContent: 'space-between',
          paddingBottom: 14,
          width: width,
          height: 371,
          paddingHorizontal: 18,
        }}
        resizeMode="cover">
        <LinearGradient
          colors={['#00000043', '#000000']}
          style={[{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}]}
        />
        <View style={style.cardTitleContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {type === 'exhibition' && (
              <View style={style.exhibitionTag}>
                <Text style={style.exhibitionTagLabel}>전시</Text>
              </View>
            )}
            <Text
              style={[
                styles.fontMedium,
                {
                  color: '#fff',
                  fontSize: 20,
                  lineHeight: 34,
                },
              ]}>
              {cardLabel}
            </Text>
          </View>
          <Text
            style={[
              styles.fontMedium,
              {
                color: '#fff',
                fontSize: 14,
                lineHeight: 20,
              },
            ]}
            numberOfLines={1}>
            {cardSubLabel}
          </Text>
        </View>
        <View>
          <Text style={style.reviewTitle}>
            {reviewTitle ? reviewTitle : ''}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text style={style.authorName}>{authorName}</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={starRateNum}
              emptyStar={emptyStar}
              fullStar={fullStar}
              halfStar={halfStar}
              iconSet={'Ionicons'}
              fullStarColor={'#FFBD07'}
              starSize={15}
            />
          </View>
          <Text style={style.content} numberOfLines={4}>
            {content}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={chatNumIcon}
                style={style.chatNumIcon}
                resizeMode={'cover'}
              />
              <Text style={style.footerText}>{chatNum}</Text>
              <Image source={heartNumIcon} style={{marginRight: 3}} />
              <Text style={style.footerText}>{likeNum}</Text>
            </View>
            <Text style={style.createdAt}>{createdAt}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const style = {
  cardContainer: {
    minHeight: 371,
    width: width - 36,

    borderRadius: 5,
    overflow: 'hidden',

    marginBottom: 5,
    marginRight: 18,
    marginLeft: 18,
    alignItems: 'center',

    // shadow for ios
  },
  cardImage: {
    width: 208,
    height: 94,
    justifyContent: 'flex-end',
    paddingHorizontal: 11,
    paddingBottom: 8,
  },
  cardTitleContainer: {
    marginTop: 15,
    marginHorizontal: 18,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    marginLeft: 18,
    lineHeight: 20,
    marginBottom: 2,
  },
  authorName: {
    fontSize: 13,
    lineHeight: 20,
    color: '#fff',
    marginLeft: 18,
    marginRight: 6,
  },
  content: {
    marginHorizontal: 18,
    marginBottom: 16,
    color: '#fff',
    lineHeight: 20,
  },
  chatNumIcon: {
    width: 24,
    height: 24,
    marginLeft: 20,
    marginRight: 3,
  },

  footerContainer: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginBottom: 7,
  },
  footerText: {
    fontSize: 13,
    color: '#fff',
    marginRight: 12,
    lineHeight: 20,
    opacity: 0.6,
  },
  createdAt: {
    fontSize: 13,
    lineHeight: 20,
    color: '#fff',
    opacity: 0.6,
    marginRight: 16,
  },
  exhibitionTag: {
    width: 33,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fa4d2c',
    marginRight: 5,
  },
  exhibitionTagLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
};
