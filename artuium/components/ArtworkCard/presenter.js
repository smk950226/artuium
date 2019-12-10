import React, { Component, Fragment } from 'react';
import { View, Text, Image, Dimensions, TouchableWithoutFeedback, ImageBackground, Modal } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const { width, height } = Dimensions.get('window')

class ArtworkCard extends Component{
    static propTypes = {
        artwork: PropTypes.object.isRequired
    }

    render(){
        const { artwork } = this.props;
        return(
            <TouchableWithoutFeedback>
                <Fragment>
                    <View style={[{width: 130}, styles.mr10]}>
                        <Image source={{uri: artwork.image}} style={[{width: 130, height: 130}]} resizeMode={'cover'} />
                        <Text style={[styles.fontBold, styles.font12, styles.mt10]}>{artwork.name}</Text>
                        <Text style={[styles.fontLight, styles.font10]}>{artwork.author.name}</Text>
                    </View>
                </Fragment>
            </TouchableWithoutFeedback>
        )
    }
}

export default ArtworkCard;