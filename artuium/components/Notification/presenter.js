import React, {Fragment} from 'react';
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

const Notification = props => (
  <TouchableWithoutFeedback onPress={props.openExpand}>
    <View style={[styles.borderBtmGrayE6]}>
      <View style={[styles.pt25, styles.pb20, {paddingHorizontal: 26}]}>
        <View
          style={[
            styles.row,
            styles.alignItemsCenter,
            styles.justifyContentBetween,
          ]}>
          <View style={[styles.flex9]}>
            <View style={[styles.row]}>
              <View
                style={[
                  styles.mt10,
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
              <View style={[styles.row, styles.flexWrap]}>
                <Text
                  style={{
                    fontSize: 13,
                    lineHeight: 22,
                    letterSpacing: -0.24,
                    color: '#2E2E2E',
                    opacity: 0.8,
                  }}>
                  {props.notification.type === 'comment_review' && (
                    <Fragment>
                      <Text style={{fontWeight: 'bold'}}>
                        {props.notification.from_user.nickname}
                      </Text>
                      님이 회원님의
                      {props.notification.review && (
                        <Text style={{fontWeight: 'bold'}}>
                          {props.notification.review.exhibition &&
                            ` '${props.notification.review.exhibition.name}'`}
                          {props.notification.review.artwork &&
                            ` '${props.notification.review.artwork.name}'`}
                        </Text>
                      )}
                      {props.notification.review && (
                        <Text>
                          {props.notification.review.exhibition &&
                            ` 전시 감상에 `}
                          {props.notification.review.artwork && ` 감상에 `}
                        </Text>
                      )}
                      댓글을 달았습니다.
                    </Fragment>
                  )}
                  {props.notification.type === 'comment_reply' && (
                    <Fragment>
                      <Text style={{fontWeight: 'bold'}}>
                        {props.notification.from_user.nickname}
                      </Text>
                      님이 회원님의
                      {props.notification.reply && (
                        <Text style={{fontWeight: 'bold'}}>
                          {props.notification.review.exhibition &&
                            ` '${props.notification.review.exhibition.name}'`}
                          {props.notification.review.artwork &&
                            ` '${props.notification.review.artwork.name}'`}
                        </Text>
                      )}
                      {props.notification.reply && (
                        <Text>
                          {props.notification.review.exhibition &&
                            ` 전시 감상의 댓글에 `}
                          {props.notification.review.artwork &&
                            ` 감상의 댓글에 `}
                        </Text>
                      )}
                      대댓글을 달았습니다.
                    </Fragment>
                  )}
                  {props.notification.type === 'like_review' && (
                    <Fragment>
                      <Text style={{fontWeight: 'bold'}}>
                        {props.notification.from_user.nickname}
                      </Text>
                      님이 회원님의
                      {props.notification.review && (
                        <Text style={{fontWeight: 'bold'}}>
                          {props.notification.review.exhibition &&
                            ` '${props.notification.review.exhibition.name}'`}
                          {props.notification.review.artwork &&
                            ` '${props.notification.review.artwork.name}'`}
                        </Text>
                      )}
                      {props.notification.review && (
                        <Text>
                          {props.notification.review.exhibition &&
                            ` 전시 감상에 `}
                          {props.notification.review.artwork && ` 감상에 `}
                        </Text>
                      )}
                      좋아요를 눌렀습니다.
                    </Fragment>
                  )}
                  {props.notification.type === 'following' && (
                    <Fragment>
                      <Text style={{fontWeight: 'bold'}}>
                        {props.notification.from_user.nickname}
                      </Text>
                      님이 회원님을 팔로우합니다.
                    </Fragment>
                  )}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 25,
                letterSpacing: -0.24,
                color: '#2E2E2E',
                opacity: 0.3,
              }}>
              {`${props.notification.date.slice(
                0,
                4,
              )}.${props.notification.date.slice(
                5,
                7,
              )}.${props.notification.date.slice(8, 10)}`}
            </Text>
          </View>
        </View>
        {props.notification.type === 'comment_review' && (
          <View
            style={[
              styles.mt10,
              styles.px10,
              styles.py10,
              styles.bgWhite,
              styles.borderGrayE6,
              styles.borderRadius5,
            ]}>
            <View style={[styles.row]}>
              <View style={[styles.flex1]}>
                <View style={[styles.row, styles.alignItemsCenter]}>
                  {props.notification.reply.author.profile_image ? (
                    <Image
                      source={{
                        uri: props.notification.reply.author.profile_image,
                      }}
                      style={{width: 24, height: 24, borderRadius: 12}}
                      resizeMode={'cover'}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/images/empty_profile.png')}
                      style={{width: 24, height: 24, borderRadius: 12}}
                    />
                  )}
                  <Text
                    style={[
                      styles.fontBold,
                      styles.font14,
                      styles.ml5,
                      {
                        fontSize: 13,
                        lineHeight: 22,
                        letterSpacing: -0.24,
                        color: '#2E2E2E',
                        opacity: 0.8,
                      },
                    ]}>
                    {props.notification.reply.author.nickname}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.fontRegular,
                    styles.font11,
                    styles.gray71,
                    styles.mt10,
                    styles.mr5,
                  ]}
                  numberOfLines={4}>
                  {props.notification.reply.content}
                </Text>
              </View>
              <View style={[{width: 100}, styles.justifyContentCenter]}>
                {props.notification.review.exhibition && (
                  <Image
                    source={{
                      uri:
                        props.notification.review.exhibition.images &&
                        props.notification.review.exhibition.images.length > 0
                          ? props.notification.review.exhibition.images[0].image
                          : '',
                    }}
                    style={{width: 100, height: 100, borderRadius: 5}}
                    resizeMode={'cover'}
                  />
                )}
                {props.notification.review.artwork && (
                  <Image
                    source={{
                      uri: props.notification.review.artwork.image
                        ? props.notification.review.artwork.image
                        : '',
                    }}
                    style={[styles.widthFull]}
                    style={{width: 100, height: 100, borderRadius: 5}}
                    resizeMode={'cover'}
                  />
                )}
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  </TouchableWithoutFeedback>
);

Notification.propTypes = {
  openExpand: PropTypes.func.isRequired,
  closeExpand: PropTypes.func.isRequired,
  expand: PropTypes.bool.isRequired,
  notification: PropTypes.object.isRequired,
  is_new: PropTypes.bool.isRequired,
};

export default Notification;
