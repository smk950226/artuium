import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const ArtworkScreen = (props) => (
    <View style={[styles.container, styles.center]}>
        <Image source={require('../../assets/images/artwork_ready.png')} style={[styles.width90]} resizeMode={'contain'} />
    </View>
)

ArtworkScreen.propTypes = {

}

export default ArtworkScreen;