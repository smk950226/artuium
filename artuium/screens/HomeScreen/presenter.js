import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const HomeScreen = (props) => (
    <View style={[styles.container]}>
        <Text style={[styles.fontBold]}>Home</Text>
    </View>
)

HomeScreen.propTypes = {

}

export default HomeScreen;