import React, {Fragment} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const {width, height} = Dimensions.get('window');

const ExhibitionCard2 = props => (
  <TouchableWithoutFeedback
    onPress={() =>
      props.navigation.navigate('ExhibitionDetail', {
        exhibition: props.exhibition,
        from: props.from,
      })
    }>
    <View style={[styles.mr10, {width: 130, height: 250}]}>
      <Image
        source={{
          uri: props.exhibition
            ? props.exhibition.images && props.exhibition.images.length > 0
              ? props.exhibition.images[0].image
              : ''
            : '',
        }}
        style={[
          styles.widthFull,
          styles.artworkBorder,
          {height: 190, borderRadius: 5},
        ]}
        resizeMode={'cover'}
      />
      <View style={[styles.mt10]}>
        <Text
          numberOfLines={1}
          style={[
            styles.fontBold,
            styles.font12,
            {color: '#2e2e2e', letterSpacing: -0.2},
          ]}>
          {props.exhibition.name}
        </Text>
        <Text
          style={[
            styles.fontLight,
            styles.font10,
            {color: '#2e2e2e', letterSpacing: -0.2, opacity: 0.5},
          ]}>
          {props.exhibition.gallery.name}
        </Text>
        <Text
          style={[
            styles.fontLight,
            styles.font10,
            {color: '#2e2e2e', letterSpacing: -0.2, opacity: 0.5},
          ]}>{`${props.exhibition.open_date.slice(
          0,
          4,
        )}.${props.exhibition.open_date.slice(
          5,
          7,
        )}.${props.exhibition.open_date.slice(8, 10)}-`}</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

ExhibitionCard2.propTypes = {
  exhibition: PropTypes.object.isRequired,
};

export default ExhibitionCard2;
