import React, { Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const { width, height } = Dimensions.get('window')

const ExhibitionCard3 = (props) => (
    <TouchableWithoutFeedback onPress={() => props.navigation.navigate('ExhibitionDetail', { exhibition: props.exhibition, from: props.from })}>
        <ImageBackground
            resizeMode={'cover'} source={{uri : props.exhibition ? (props.exhibition.images && (props.exhibition.images.length > 0)) ? props.exhibition.images[0].image : null : null}}
            style={[{width: width, height: 400, zIndex: 999}, styles.justifyContentEnd]}
            blurRadius={20}
        >
            <Image source={{uri: props.exhibition ? (props.exhibition.images && (props.exhibition.images.length > 0)) ? props.exhibition.images[0].image : null : null}} resizeMode={'contain'} style={[styles.heightFull]} />
            <View style={[{position: 'absolute', bottom: 50, left: 30}]}>
                <Text style={[styles.fontMedium, styles.font14, styles.yellow]}>{props.exhibition.name}</Text>
                <Text style={[styles.fontBold, styles.font30, styles.white]}>{props.exhibition.name}</Text>
            </View>
        </ImageBackground>
    </TouchableWithoutFeedback>
)

ExhibitionCard3.propTypes = {
    exhibition: PropTypes.object.isRequired,
    like_count: PropTypes.number.isRequired,
    review_count: PropTypes.number.isRequired,
    is_liked: PropTypes.bool.isRequired,
    like: PropTypes.func.isRequired,
    unlike: PropTypes.func.isRequired
}

export default ExhibitionCard3;