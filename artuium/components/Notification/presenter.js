import React, { Fragment } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const { width, height } = Dimensions.get('window')

const Notification = (props) => (
    <TouchableWithoutFeedback onPress={props.expand ? props.closeExpand : props.openExpand}>
    <View style={[styles.borderBtmGrayE6, styles.bgGrayF8]}>
        <View style={[styles.pt25, styles.pb20, styles.px20]}>
            <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween]}>
                <View style={[styles.flex9]}>
                    <View style={[styles.row]}>
                        <View style={[styles.bgRed, styles.circle6, styles.mr5, styles.mt10, props.is_new ? null : styles.hidden]} />
                        <View style={[styles.row, styles.flexWrap]}>
                            {props.notification.type === 'comment_review' && (
                                <Fragment>
                                    <Text style={[styles.fontBold, styles.font13]}>{props.notification.from_user.nickname}</Text>
                                    <Text style={[styles.fontMedium, styles.font13]}>
                                    님이 회원님의 
                                    </Text>
                                    {props.notification.review && (
                                        <Text style={[styles.fontBold, styles.font13]}>
                                            {props.notification.review.exhibition && ` '${props.notification.review.exhibition.name}'`}
                                            {props.notification.review.artwork && ` '${props.notification.review.artwork.name}'`}
                                        </Text>
                                    )}
                                    {props.notification.review && (
                                        <Text style={[styles.fontMedium, styles.font13]}>
                                            {props.notification.review.exhibition && ` 전시 감상에 `}
                                            {props.notification.review.artwork && ` 감상에 `}
                                        </Text>
                                    )}
                                    <Text style={[styles.fontMedium, styles.font13]}>
                                    댓글을 달았습니다.
                                    </Text>
                                </Fragment>
                            )}
                            {props.notification.type === 'comment_reply' && (
                                <Fragment>
                                    <Text style={[styles.fontBold, styles.font13]}>{props.notification.from_user.nickname}</Text>
                                    <Text style={[styles.fontMedium, styles.font13]}>
                                    님이 회원님의 
                                    </Text>
                                    {props.notification.reply && (
                                        <Text style={[styles.fontBold, styles.font13]}>
                                            {props.notification.reply.review.exhibition && ` '${props.notification.reply.review.exhibition.name}'`}
                                            {props.notification.reply.review.artwork && ` '${props.notification.reply.review.artwork.name}'`}
                                        </Text>
                                    )}
                                    <Text style={[styles.fontMedium, styles.font13]}>
                                    {props.notification.reply.review.exhibition && ` 전시 감상에 `}
                                    {props.notification.reply.review.artwork && ` 감상에 `}
                                    </Text>
                                    <Text style={[styles.fontMedium, styles.font13]}>
                                    대댓글을 달았습니다.
                                    </Text>
                                </Fragment>
                            )}
                            {props.notification.type === 'like_review' && (
                                <Fragment>
                                    <Text style={[styles.fontBold, styles.font13]}>{props.notification.from_user.nickname}</Text>
                                    <Text style={[styles.fontMedium, styles.font13]}>
                                    님이 회원님의 
                                    </Text>
                                    {props.notification.review && (
                                        <Text style={[styles.fontBold, styles.font13]}>
                                            {props.notification.review.exhibition && ` '${props.notification.review.exhibition.name}'`}
                                            {props.notification.review.artwork && ` '${props.notification.review.artwork.name}'`}
                                        </Text>
                                    )}
                                    {props.notification.review && (
                                        <Text style={[styles.fontMedium, styles.font13]}>
                                        {props.notification.review.exhibition && ` 전시 감상에 `}
                                        {props.notification.review.artwork && ` 감상에 `}
                                        </Text>
                                    )}
                                    <Text style={[styles.fontMedium, styles.font13]}>
                                    좋아요를 눌렀습니다.
                                    </Text>
                                </Fragment>
                            )}
                            {props.notification.type === 'following' && (
                                <Fragment>
                                    <Text style={[styles.fontBold, styles.font13]}>{props.notification.from_user.nickname}</Text>
                                    <Text style={[styles.fontMedium, styles.font13]}>
                                    님이 회원님을 팔로우합니다.
                                    </Text>
                                </Fragment>
                            )}
                        </View>
                    </View>
                    <Text style={[styles.fontMedium, styles.font13, styles.grayD1]}>
                        {`${props.notification.date.slice(0,4)}.${props.notification.date.slice(5,7)}.${props.notification.date.slice(8,10)}`}
                    </Text>
                </View>
            </View>
        </View>
    </View>
    </TouchableWithoutFeedback>
)

Notification.propTypes = {
    openExpand: PropTypes.func.isRequired,
    closeExpand: PropTypes.func.isRequired,
    expand: PropTypes.bool.isRequired,
    notification: PropTypes.object.isRequired,
    is_new: PropTypes.bool.isRequired
}

export default Notification;