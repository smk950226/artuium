import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const Notice = (props) => (
    <View style={[styles.borderBtmGrayE6, styles.bgGrayF8]}>
        <View style={[styles.pt25, styles.pb20, styles.px20]}>
            <View style={[styles.row, styles.justifyContentBetween]}>
                <View style={[styles.flex9]}>
                    <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween]}>
                        <View>
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
                    <Text style={[styles.fontMedium, styles.font13, styles.grayD1]}>
                        {`${props.notice.date.slice(0,4)}.${props.notice.date.slice(5,7)}.${props.notice.date.slice(8,10)}`}
                    </Text>
                </View>
            </View>
            {props.expand && (
                <View style={[styles.mt15]}>
                    <Text style={[styles.fontMedium, styles.font13, styles.gray71, { lineHeight: 20 }]}>
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