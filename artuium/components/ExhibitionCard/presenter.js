import React, { Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const { width, height } = Dimensions.get('window')

const ExhibitionCard = (props) => (
    <TouchableWithoutFeedback>
        <View style={[styles.px15, styles.overflowHidden, props.full ? styles.mb10 : null, {width: width}, props.full ? {height: height*0.23} : {height: height/4}]}>
            <View style={[{width: width - 30}, props.full ? {height: height*0.23} : {height: height/4}, props.full ? styles.exhibitionFull : [styles.recommend, styles.exCardShadow]]}>
                <Image source={{uri: props.exhibition.image}} style={[styles.width40, styles.heightFull, props.full ? null : {borderRadius: 5}]} resizeMode={'cover'} />
                <View style={[styles.px15, styles.py10, props.full ? styles.width60 : {width: '55%'}]}>
                    <Text style={[styles.fontBold, styles.font18]}>{props.exhibition.title}</Text>
                    <Text style={[styles.fontMedium, styles.font10]}>{props.exhibition.date}</Text>
                    <Text style={[styles.fontMedium, styles.font10]}>{props.exhibition.place}</Text>
                    <View style={[styles.row, styles.mt10, styles.alignItemsCenter]}>
                        <Image style={{width: 15, height: 15}} source={require('../../assets/images/icon_comment.png')} />
                        <Text style={[styles.fontRegular, styles.font8, {color: '#909090', marginLeft: 4}]}>{props.exhibition.comments}</Text>
                        <Image style={[styles.ml15, {width: 13, height: 12}]} source={require('../../assets/images/icon_like.png')} />
                        <Text style={[styles.fontRegular, styles.font8, {color: '#909090', marginLeft: 4}]}>{props.exhibition.likes}</Text>
                    </View>
                    <Text style={[styles.fontMedium, styles.font11, styles.mt25, {color: '#909090'}]}>{props.exhibition.content}</Text>
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
                    <View style={[styles.hole]} />
                </View>
                }
            </View>
        </View>
    </TouchableWithoutFeedback>
)

ExhibitionCard.propTypes = {
}

export default ExhibitionCard;