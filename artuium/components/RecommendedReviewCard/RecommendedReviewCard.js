import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import styles from '../../styles';
import StarRating from 'react-native-star-rating';
import {DottedLine} from '../DottedLine/DottedLine';
import LinearGradient from 'react-native-linear-gradient';
import {
  chatNumIcon,
  fullStar,
  emptyStar,
  halfStar,
  chatNumIconGrey,
  heartNumIconGrey,
} from '../../assets/images';

export const RecommendedReviewCard = ({
  index,
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
  title,
}) => {
  return (
    <TouchableOpacity
      style={[style.cardContainer, {marginLeft: index === 0 ? 19 : 12}]}
      onPress={onPress}>
      <ImageBackground source={{uri: cardImageUri}} style={style.cardImage}>
        <LinearGradient
          colors={['#00000000', '#000000']}
          style={[
            {
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            },
          ]}
        />
        <View style={{marginTop: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {type === 'exhibition' && (
              <View style={style.exhibitionTag}>
                <Text style={style.exhibitionTagLabel}>전시</Text>
              </View>
            )}
            <Text style={style.cardLabel}>{cardLabel}</Text>
          </View>
          <Text style={style.cardSubLabel} numberOfLines={1}>
            {cardSubLabel}
          </Text>
        </View>
        <View style={style.reviewTitleAndProfileContainer}>
          <Text style={style.reviewLabel}>
            {title ? title : '제목 없는 감상'}
          </Text>
          <View style={style.authorProfileContainer}>
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
        </View>
      </ImageBackground>
      <Text numberOfLines={4} style={[style.content, styles.fontRegular]}>
        {content}
      </Text>
      <View style={[style.footerContainer]}>
        <View style={style.leftFooterContainer}>
          <Image
            source={chatNumIconGrey}
            style={{width: 18, height: 18, marginRight: 6}}
            resizeMode={'cover'}
          />
          <Text style={[style.footerText, styles.fontRegular]}>{chatNum}</Text>
          <Image source={heartNumIconGrey} style={{marginRight: 6}} />
          <Text style={[style.footerText, styles.fontRegular]}>{likeNum}</Text>
        </View>
        <Text style={style.timeStamp}>몇분 전</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = {
  cardContainer: {
    width: 309,
    marginLeft: 12,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#c2c2c2',
    overflow: 'hidden',

    backgroundColor: '#fff',
    marginBottom: 5,
  },
  cardImage: {
    width: 309,
    height: 169,
    justifyContent: 'space-between',
    paddingHorizontal: 11,
    paddingBottom: 8,
    borerRadius: 5,
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
  cardLabel: {
    fontWeight: '800',
    fontSize: 15,
    lineHeight: 20,
    color: '#fff',
  },
  cardSubLabel: {
    fontSize: 15,
    lineHeight: 20,
    color: '#fff',
  },
  reviewTitleAndProfileContainer: {
    marginBottom: 10,
  },
  reviewLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 20,
  },
  authorProfileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 20,
    marginRight: 6,
  },
  content: {
    marginHorizontal: 11,
    marginTop: 11,
    marginBottom: 20,
    color: 'rgb(59,59,57)',
  },
  footerContainer: {
    flexDirection: 'row',
    marginHorizontal: 11,
    marginBottom: 7,
    justifyContent: 'space-between',
  },
  leftFooterContainer: {
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 14,
    color: '#545454',
    marginRight: 12,
    opacity: 0.6,
  },
  timeStamp: {
    color: '#545454',
    fontSize: 13,
    opacity: 0.6,
  },
};
