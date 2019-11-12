import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const ExhibitionScreen = (props) => (
    <View style={[styles.container]}>
        <Text style={[styles.fontBold]}>Exhibition</Text>
    </View>
)

ExhibitionScreen.propTypes = {

}

export default ExhibitionScreen;