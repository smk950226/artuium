import React, { Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import StarRating from 'react-native-star-rating';

const { width, height } = Dimensions.get('window')

const ArtuiumCard = (props) => (
    <TouchableWithoutFeedback onPress={()=>props.navigation.navigate('ExhibitionDetail')}>
        <View style={[(props.size === 'small') ? {width: (width/2)-20} : { width: width-30 }, styles.mb10, styles.artworkBorder, styles.overflowHidden]}>
            <ImageBackground source={{uri: props.review.artwork ? props.review.artwork.image : props.review.exhibition ? (props.review.exhibition.images && (props.review.exhibition.images.length > 0)) ? props.review.exhibition.images[0].image : null : null}} style={[props.size === 'small' ? styles.artworkImage : styles.artworkImageLg, props.size === 'small' ? styles.py5 : styles.py20, props.size === 'small' ? styles.px10 : styles.px15, styles.justifyContentEnd]} resizeMode={'cover'} >
                <Text style={[styles.fontBold, (props.size === 'small') ? styles.font15 : styles.font20, styles.white]}>
                    {props.review.artwork ? props.review.artwork.name : props.review.exhibition ? props.review.exhibition.name : ""}
                </Text>
                <Text style={[styles.fontMedium, (props.size === 'small') ? styles.font8 : styles.font11, styles.white]}>
                    {props.review.artwork ? props.review.artwork.author.name : props.review.exhibition ? (props.review.exhibition.artists && (props.review.exhibition.artists.length > 0)) ? props.review.exhibition.artists[0].name : "" : ""}
                </Text>
            </ImageBackground>
            <View style={[styles.py10, styles.px10]}>
                {props.size === 'small' ? (
                    <Fragment>
                        <View style={[styles.row, styles.justifyContentBetween]}>
                            <View style={[styles.row]}>
                                <View>
                                    {props.review.author.profile_image ? (
                                        <Image source={{uri: props.review.author.profile_image}} style={[styles.profileImage30]} resizeMode={'cover'} />
                                    ) : (
                                        <View style={[styles.circle30, styles.bgGray12]} />
                                    )}
                                    {props.review.expression === 'good' && (
                                        <Image source={require('../../assets/images/icon_good.png')} style={[styles.emoji, { position: 'absolute', top: 16, left: 16 }]} resizeMode={'cover'} />
                                    )}
                                    {props.review.expression === 'soso' && (
                                        <Image source={require('../../assets/images/icon_soso.png')} style={[styles.emoji, { position: 'absolute', top: 16, left: 16 }]} resizeMode={'cover'} />
                                    )}
                                    {props.review.expression === 'sad' && (
                                        <Image source={require('../../assets/images/icon_sad.png')} style={[styles.emoji, { position: 'absolute', top: 16, left: 16 }]} resizeMode={'cover'} />
                                    )}
                                    {props.review.expression === 'surprise' && (
                                        <Image source={require('../../assets/images/icon_surprise.png')} style={[styles.emoji, { position: 'absolute', top: 16, left: 16 }]} resizeMode={'cover'} />
                                    )}
                                </View>
                                <View style={[styles.ml5]}>
                                    <View style={[styles.row, styles.justifyContentStart]}>
                                        <StarRating
                                            disabled={true}
                                            maxStars={5}
                                            rating={props.review.rate}
                                            emptyStar={require('../../assets/images/icon_star_disabled.png')}
                                            fullStar={require('../../assets/images/icon_star.png')}
                                            halfStar={'ios-star-half'}
                                            iconSet={'Ionicons'}
                                            fullStarColor={'#FFBD07'}
                                            starSize={10}
                                        />
                                    </View>
                                    <View style={[styles.row]}>
                                        <Text style={[styles.fontBold, styles.font10]}>{props.review.author.nickname}</Text>
                                        <Text style={[styles.fontMedium, styles.font10, styles.grayD1, styles.ml5]}>{`${props.review.time.slice(0,4)}.${props.review.time.slice(5,7)}.${props.review.time.slice(8,10)}`}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Image source={require('../../assets/images/icon_dotted.png')} style={[styles.icon20]} />
                            </View>
                        </View>
                        <View style={[styles.row, styles.justifyContentBetween, styles.mt5]}>
                            <View>
                                <TouchableWithoutFeedback>
                                    <View style={[styles.bgGray12, styles.borderRadius5, styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.px10]}>
                                        <Text style={[styles.fontMedium, styles.font10, styles.white]}>감상 읽기</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={[styles.row, styles.alignItemsCenter]}>
                                <Image source={require('../../assets/images/icon_comment.png')} style={[styles.icon12]} />
                                <Text style={[styles.fontMedium, styles.font10, styles.grayD1]}>{props.review.reply_count}</Text>
                                <Image source={require('../../assets/images/icon_like.png')} style={[styles.icon12, styles.ml10]} />
                                <Text style={[styles.fontMedium, styles.font10, styles.grayD1]}>{props.review.like_count}</Text>
                            </View>
                        </View>
                    </Fragment>
                ) : (
                    <Fragment>
                        <View style={[styles.row, styles.justifyContentBetween]}>
                            <View style={[styles.row]}>
                                <View>
                                    {props.review.author.profile_image ? (
                                        <Image source={{uri: props.review.author.profile_image}} style={[styles.profileImage40]} resizeMode={'cover'} />
                                    ) : (
                                        <View style={[styles.circle40, styles.bgGray12]} />
                                    )}
                                    {props.review.expression === 'good' && (
                                        <Image source={require('../../assets/images/icon_good.png')} style={[styles.emojiLg, { position: 'absolute', top: 23, left: 23 }]} resizeMode={'cover'} />
                                    )}
                                    {props.review.expression === 'soso' && (
                                        <Image source={require('../../assets/images/icon_soso.png')} style={[styles.emojiLg, { position: 'absolute', top: 23, left: 23 }]} resizeMode={'cover'} />
                                    )}
                                    {props.review.expression === 'sad' && (
                                        <Image source={require('../../assets/images/icon_sad.png')} style={[styles.emojiLg, { position: 'absolute', top: 23, left: 23 }]} resizeMode={'cover'} />
                                    )}
                                    {props.review.expression === 'surprise' && (
                                        <Image source={require('../../assets/images/icon_surprise.png')} style={[styles.emojiLg, { position: 'absolute', top: 23, left: 23 }]} resizeMode={'cover'} />
                                    )}
                                </View>
                                <View style={[styles.ml10]}>
                                    <View style={[styles.row, styles.justifyContentStart]}>
                                        <StarRating
                                            disabled={true}
                                            maxStars={5}
                                            rating={props.review.rate}
                                            emptyStar={require('../../assets/images/icon_star_disabled.png')}
                                            fullStar={require('../../assets/images/icon_star.png')}
                                            halfStar={'ios-star-half'}
                                            iconSet={'Ionicons'}
                                            fullStarColor={'#FFBD07'}
                                            starSize={14}
                                        />
                                    </View>
                                    <View style={[styles.row]}>
                                        <Text style={[styles.fontBold, styles.font14]}>{props.review.author.nickname}</Text>
                                        <Text style={[styles.fontMedium, styles.font14, styles.grayD1, styles.ml5]}>{`${props.review.time.slice(0,4)}.${props.review.time.slice(5,7)}.${props.review.time.slice(8,10)}`}</Text>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <Image source={require('../../assets/images/icon_dotted.png')} style={[styles.icon30]} />
                            </View>
                        </View>
                        <View style={[styles.mt10]}>
                            <Text style={[styles.fontRegular, styles.font13, styles.lineHeight20]} numberOfLines={4}>
                                {props.review.content}
                            </Text>
                        </View>
                        <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.mt10]}>
                            <Image source={require('../../assets/images/icon_comment.png')} style={[styles.icon30]} />
                            <Text style={[styles.fontMedium, styles.font15, styles.grayD1, styles.ml5]}>{props.review.reply_count}</Text>
                            <Image source={require('../../assets/images/icon_like.png')} style={[styles.icon30, styles.ml20]} />
                            <Text style={[styles.fontMedium, styles.font15, styles.grayD1, styles.ml5]}>{props.review.like_count}</Text>
                        </View>
                    </Fragment>
                )}
            </View>
        </View>
    </TouchableWithoutFeedback>
)

ArtuiumCard.propTypes = {
    review: PropTypes.object.isRequired,
    size: PropTypes.string.isRequired
}

export default ArtuiumCard;