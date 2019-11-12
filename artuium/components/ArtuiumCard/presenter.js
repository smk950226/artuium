import React from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import StarRating from 'react-native-star-rating';

const { width, height } = Dimensions.get('window')

const ArtuiumCard = (props) => (
    <TouchableWithoutFeedback>
        <View style={[(props.size === 'small') ? {width: (width/2)-20} : { width: width-30 }, styles.mb10, styles.artworkBorder, styles.overflowHidden]}>
            <Image source={{uri: props.artwork.image}} style={[styles.artworkImage]} resizeMode={'cover'} />
            <View style={[styles.py10, styles.px10]}>
                <View style={[styles.row, styles.justifyContentBetween]}>
                    <View style={[styles.row]}>
                        <View>
                            <Image source={{uri: props.artwork.profile_image}} style={[styles.profileImage30]} resizeMode={'cover'} />
                            <Image source={props.artwork.emoji} style={[styles.emoji, { position: 'absolute', top: 16, left: 16 }]} resizeMode={'cover'} />
                        </View>
                        <View style={[styles.ml5]}>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={props.artwork.rating}
                                emptyStar={require('../../assets/images/icon_star_disabled.png')}
                                fullStar={require('../../assets/images/icon_star.png')}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                fullStarColor={'#FFBD07'}
                                starSize={10}
                            />
                            <Text style={[styles.fontBold, styles.font10]}>{props.artwork.name}</Text>
                        </View>
                    </View>
                    <View>
                        <Image source={require('../../assets/images/icon_dotted.png')} style={{width: 20, height: 20}} />
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
                        <Text style={[styles.fontMedium, styles.font10, styles.grayD1]}>{props.artwork.comments}</Text>
                        <Image source={require('../../assets/images/icon_like.png')} style={[styles.icon12, styles.ml10]} />
                        <Text style={[styles.fontMedium, styles.font10, styles.grayD1]}>{props.artwork.likes}</Text>
                    </View>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
)

ArtuiumCard.propTypes = {
    artwork: PropTypes.object.isRequired,
    size: PropTypes.string.isRequired
}

export default ArtuiumCard;