import React, { Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import StarRating from 'react-native-star-rating';

const { width, height } = Dimensions.get('window')

const ArtuiumCard2 = (props) => (
    <TouchableWithoutFeedback>
        <View style={[styles.screenWidth, styles.mb10]}>
            <Image source={{uri: props.artwork.image}} style={[styles.artworkImageLg]} resizeMode={'cover'} />
            <View style={[styles.py20, styles.px30]}>
                <View style={[styles.row, styles.justifyContentBetween]}>
                    <View style={[styles.row]}>
                        <View>
                            <Image source={{uri: props.artwork.profile_image}} style={[styles.profileImage40]} resizeMode={'cover'} />
                            <Image source={props.artwork.emoji} style={[styles.emojiLg, { position: 'absolute', top: 23, left: 23 }]} resizeMode={'cover'} />
                        </View>
                        <View style={[styles.ml10]}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={props.artwork.rating}
                                emptyStar={require('../../assets/images/icon_star_disabled.png')}
                                fullStar={require('../../assets/images/icon_star.png')}
                                halfStar={require('../../assets/images/icon_star_half.png')}
                                iconSet={'Ionicons'}
                                fullStarColor={'#FFBD07'}
                                starSize={14}
                            />
                            <View style={[styles.row]}>
                                <Text style={[styles.fontBold, styles.font14]}>{props.artwork.name}</Text>
                                <Text style={[styles.fontMedium, styles.font11, styles.grayD1, styles.ml5]}>{props.artwork.date}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Image source={require('../../assets/images/icon_dotted.png')} style={[styles.icon30]} />
                    </View>
                </View>
                <View style={[styles.mt20]}>
                    <Text style={[styles.fontRegular, styles.font13, styles.lineHeight20]}>
                        {props.artwork.content}
                    </Text>
                </View>
                <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.mt20]}>
                    <Image source={require('../../assets/images/icon_comment.png')} style={[styles.icon30]} />
                    <Text style={[styles.fontMedium, styles.font15, styles.grayD1, styles.ml5]}>{props.artwork.comments}</Text>
                    <Image source={require('../../assets/images/icon_like.png')} style={[styles.icon30, styles.ml30]} />
                    <Text style={[styles.fontMedium, styles.font15, styles.grayD1, styles.ml5]}>{props.artwork.likes}</Text>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
)

ArtuiumCard2.propTypes = {
    artwork: PropTypes.object.isRequired,
    like: PropTypes.func.isRequired,
    unLike: PropTypes.func.isRequired,
    isLiked: PropTypes.bool.isRequired
}

export default ArtuiumCard2;