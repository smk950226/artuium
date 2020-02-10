import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const { width, height } = Dimensions.get('window');

const Notice = (props) => (
    <View style={[styles.borderBtmGrayE6, styles.bgGrayF8]}>
        <View style={[styles.pt25, styles.pb20, styles.px20]}>
            <View style={[styles.row, styles.justifyContentBetween]}>
                <View style={[styles.flex9]}>
                    <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween]}>
                        <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween]}>
                            <View style={[styles.bgRed, styles.circle6, styles.mr5, props.is_new ? null : styles.hidden]} />
                            <Text style={[styles.fontBold, styles.font13]}>
                                {props.notice.title}
                            </Text>
                        </View>
                        <TouchableWithoutFeedback onPress={props.expand ? props.closeExpand : props.openExpand}>
                            <View >
                                <Text style={[styles.fontBlack, styles.font16]}>
                                    {props.expand ? (
                                        <Image source={require('../../assets/images/arrow_up.png')} style={[{width: 40, height: 40}]} />
                                    ) : (
                                        <Image source={require('../../assets/images/arrow_down.png')} style={[{width: 40, height: 40}]} />
                                    )}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <Text style={[styles.fontMedium, styles.font13, styles.grayD1, styles.ml10]}>
                        {`${props.notice.date.slice(0,4)}.${props.notice.date.slice(5,7)}.${props.notice.date.slice(8,10)}`}
                    </Text>
                </View>
            </View>
            {props.expand && (
                <View style={[styles.mt15]}>
                    {props.notice.image ? (
                        <Image resizeMode={'cover'} source={{uri: props.notice.image}} resizeMode={'contain'} style={[styles.alignSelfCenter, {height: props.notice.image_width >= props.notice.image_height ? props.notice.image_height*(width - 40)/props.notice.image_width : 400, width: props.notice.image_width >= props.notice.image_height ? width - 40 : props.notice.image_width*400/props.notice.image_height}]} />
                    ) : (
                        null
                    )}
                    <Text style={[styles.fontMedium, styles.font13, styles.mt10, styles.gray71, { lineHeight: 20 }]}>
                        {props.notice.content}
                    </Text>
                </View>
            )}
            
        </View>
    </View>
)

Notice.propTypes = {
    openExpand: PropTypes.func.isRequired,
    closeExpand: PropTypes.func.isRequired,
    expand: PropTypes.bool.isRequired,
    notice: PropTypes.object.isRequired,
    is_new: PropTypes.bool.isRequired
}

export default Notice;