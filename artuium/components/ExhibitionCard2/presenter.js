import React, { Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const { width, height } = Dimensions.get('window')

const ExhibitionCard2 = (props) => (
    <TouchableWithoutFeedback>
        <View style={[styles.mr10, {width: 130, height: 250}]}>
            <Image source={{uri: props.exhibition.image}} style={[styles.widthFull, {height: 190, borderRadius: 5}]} resizeMode={'cover'} />
            <View style={[styles.mt10]}>
                <Text style={[styles.fontBold, styles.font12]}>{props.exhibition.title}</Text>
                <Text style={[styles.fontLight, styles.font10]}>{props.exhibition.place}</Text>
                <Text style={[styles.fontLight, styles.font10]}>{props.exhibition.date}</Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
)

ExhibitionCard2.propTypes = {
}

export default ExhibitionCard2;