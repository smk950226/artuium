import React, { Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const { width, height } = Dimensions.get('window')

const ExhibitionCard = (props) => (
    <TouchableWithoutFeedback>
        <View style={[styles.px15, props.full ? styles.mb10 : null, {width: width}, props.full ? {height: 210} : {height: 210}]}>
            <View style={[{width: width - 30}, props.full ? {height: 210} : {height: 210}, props.full ? styles.exhibitionFull : [styles.recommend, styles.exCardShadow]]}>
                <ImageBackground source={{uri: props.exhibition ? (props.exhibition.images && (props.exhibition.images.length > 0)) ? props.exhibition.images[0].image : null : null}} style={[styles.width40, styles.heightFull, props.full ? null : styles.borderLeftRadius5, styles.overflowHidden]} resizeMode={'cover'} />
                <View style={[styles.px15, styles.py10, props.full ? styles.width60 : {width: '55%'}]}>
                    <Text style={[styles.fontBold, styles.font18]}>{props.exhibition.name}</Text>
                    <Text style={[styles.fontMedium, styles.font10]}>{`${props.exhibition.open_date.slice(0,4)}.${props.exhibition.open_date.slice(5,7)}.${props.exhibition.open_date.slice(8,10)}-${props.exhibition.close_date.slice(0,4)}.${props.exhibition.close_date.slice(5,7)}.${props.exhibition.close_date.slice(8,10)}`}</Text>
                    <Text style={[styles.fontMedium, styles.font10]}>{props.exhibition.gallery.name}</Text>
                    <View style={[styles.row, styles.mt10, styles.alignItemsCenter]}>
                        <Image style={{width: 15, height: 15}} source={require('../../assets/images/icon_comment.png')} />
                        <Text style={[styles.fontRegular, styles.font8, {color: '#909090', marginLeft: 4}]}>{props.review_count}</Text>
                        <TouchableWithoutFeedback onPress={props.is_liked ? props.unlike : props.like}>
                            <View style={[styles.row, styles.alignItemsCenter]}>
                                <Image style={[styles.ml15, {width: 13, height: 12}]} source={require('../../assets/images/icon_like.png')} />
                                <Text style={[styles.fontRegular, styles.font8, {color: '#909090', marginLeft: 4}]}>{props.like_count}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Text style={[styles.fontMedium, styles.font11, styles.mt25, {color: '#909090'}]} numberOfLines={4} ellipsizeMode={'clip'}>{props.exhibition.content}</Text>
                </View>
                {props.full ? null :
                <View style={[styles.alignItemsCenter]}>
                    <View style={[styles.hole]} />
                    <View style={[styles.hole]} />
                    <View style={[styles.hole]} />
                    <View style={[styles.hole]} />
                    <View style={[styles.hole]} />
                    <View style={[styles.hole]} />
                    <View style={[styles.hole]} />
                    <View style={[styles.hole]} />
                    <View style={[styles.hole]} />
                    <View style={[styles.hole]} />
                    <View style={[styles.hole]} />
                    <View style={[styles.hole]} />
                </View>
                }
            </View>
        </View>
    </TouchableWithoutFeedback>
)

ExhibitionCard.propTypes = {
    exhibition: PropTypes.object.isRequired,
    like_count: PropTypes.number.isRequired,
    review_count: PropTypes.number.isRequired,
    is_liked: PropTypes.bool.isRequired,
    like: PropTypes.func.isRequired,
    unlike: PropTypes.func.isRequired
}

export default ExhibitionCard;