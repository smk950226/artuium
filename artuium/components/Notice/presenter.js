import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const {width, height} = Dimensions.get('window');

const Notice = props => (
  <View style={[styles.borderBtmGrayE6]}>
    <View style={[styles.pt20, styles.pb25, {paddingHorizontal: 26}]}>
      <View style={[styles.row, styles.justifyContentBetween]}>
        <View style={[styles.flex9]}>
          <View
            style={[
              styles.row,
              styles.alignItemsCenter,
              styles.justifyContentBetween,
            ]}>
            <View
              style={[
                styles.row,
                styles.alignItemsCenter,
                styles.justifyContentBetween,
              ]}>
              <View
                style={[
                  props.is_new ? null : styles.hidden,
                  {
                    backgroundColor: '#FA4D2C',
                    position: 'absolute',
                    left: -8,
                    width: 4,
                    height: 4,
                    borderRadius: 2,
                  },
                ]}
              />
              <Text
                style={{
                  fontSize: 13,
                  lineHeight: 22,
                  letterSpacing: -0.24,
                  color: '#2E2E2E',
                  opacity: 0.8,
                }}>
                {props.notice.title}
              </Text>
            </View>
            <TouchableWithoutFeedback
              onPress={props.expand ? props.closeExpand : props.openExpand}>
              {props.expand ? (
                <Image
                  source={require('../../assets/images/upArrowIcon.png')}
                  style={{width: 24, height: 24}}
                />
              ) : (
                <Image
                  source={require('../../assets/images/downArrowIcon.png')}
                  style={{width: 24, height: 24}}
                />
              )}
            </TouchableWithoutFeedback>
          </View>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 25,
              letterSpacing: -0.24,
              color: '#2E2E2E',
              opacity: 0.3,
            }}>
            {`${props.notice.date.slice(0, 4)}.${props.notice.date.slice(
              5,
              7,
            )}.${props.notice.date.slice(8, 10)}`}
          </Text>
        </View>
      </View>
      {props.expand && (
        <View style={[styles.mt15]}>
          {props.notice.image ? (
            <Image
              resizeMode={'cover'}
              source={{uri: props.notice.image}}
              resizeMode={'contain'}
              style={[
                styles.alignSelfCenter,
                {
                  height:
                    props.notice.image_width >= props.notice.image_height
                      ? (props.notice.image_height * (width - 52)) /
                        props.notice.image_width
                      : 400,
                  width:
                    props.notice.image_width >= props.notice.image_height
                      ? width - 52
                      : (props.notice.image_width * 400) /
                        props.notice.image_height,
                  borderRadius: 5,
                },
              ]}
            />
          ) : null}
          <Text
            style={[
              styles.mt10,
              {
                fontSize: 12,
                lineHeight: 20,
                letterSpacing: -0.24,
                color: '#2E2E2E',
                opacity: 0.6,
              },
            ]}>
            {props.notice.content}
          </Text>
        </View>
      )}
    </View>
  </View>
);

Notice.propTypes = {
  openExpand: PropTypes.func.isRequired,
  closeExpand: PropTypes.func.isRequired,
  expand: PropTypes.bool.isRequired,
  notice: PropTypes.object.isRequired,
  is_new: PropTypes.bool.isRequired,
};

export default Notice;
