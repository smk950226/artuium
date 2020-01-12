import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, Image, SafeAreaView, ImageBackground, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import { getStatusBarHeight } from "react-native-status-bar-height";
import ArtuiumCard4 from '../../components/ArtuiumCard4'
const { width, height } = Dimensions.get('window')

const iosStatusBarHeight = getStatusBarHeight();

function abbreviateNumber(value) {
    var newValue = value;
    if (value >= 1000) {
        var suffixes = ["", "k", "m", "b","t"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }
    return newValue;
}

class ExhibitionArtworkScreen extends Component{
    static propTypes = {
        exhibition: PropTypes.object.isRequired,
        like_count: PropTypes.number.isRequired,
        review_count: PropTypes.number.isRequired,
        is_liked: PropTypes.bool.isRequired,
    }

    state = {
        scrollX: new Animated.Value(0),
    }

    render(){
        let position = Animated.divide(this.state.scrollX, width);
        const { exhibition, from } = this.props;
        return(
            <ImageBackground style={[styles.center, styles.heightFull, styles.screenWidth]} source={require('../../assets/images/bg_login.jpg')} resizeMode={'cover'}>
            <SafeAreaView style={[styles.container]}>
                {exhibition ? (
                    <Fragment>
                        <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.widthFull, styles.px15, {height: 40, position: 'absolute', top: iosStatusBarHeight + 15}]}>
                            <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('ExhibitionDetail', { exhibition, from })}>
                                <View style={[styles.row, styles.alignItemsCenter, {zIndex: 10}]}>
                                    <Image source={require('../../assets/images/icon_back_gray.png')} style={[{width: 26, height: 26}]} />
                                    <Text style={[styles.fontBlack, styles.font17, styles.gray8B, styles.ml5]}>{exhibition.name}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={from ? () => this.props.navigation.navigate(from) : ()=>this.props.navigation.goBack()}>
                                <View style={[styles.exitBtn, { zIndex: 999 }]}>
                                    <Text style={[styles.fontBold, styles.font16, styles.white]}>나가기</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <ScrollView 
                        style={[styles.mt40]}
                        scrollEnabled={true}
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        ref={'scrollView'}
                        onScroll={Animated.event(
                            [{ nativeEvent: {
                                contentOffset: {
                                    x: this.state.scrollX
                                }
                            }}]
                        )}
                        scrollEventThrottle={16}
                        >
                            {exhibition.artworks && exhibition.artworks.length > 0 && (
                                exhibition.artworks.map((artwork, index) => (
                                    <View key={index} style={[styles.center, styles.heightFull, styles.screenWidth]}>
                                        <ArtuiumCard4 from={from} artwork={artwork} navigation={this.props.navigation} />
                                        
                                    </View>
                                ))
                            )}
                        </ScrollView>
                        <View style={[styles.alignItemsCenter, styles.mb25, {width: width, posizion: 'absolute', bottom: height*0.2}]}>
                            <View
                                style={[styles.row]}
                            >
                                {exhibition.artworks.map((_, ind) => {
                                    let opacity2 = position.interpolate({
                                        inputRange: [ind - 1, ind, ind + 1],
                                        outputRange: [0, 1, 0],
                                        extrapolate: 'clamp'
                                    });
                                    return (
                                        <View key={ind} style={[styles.sliderLine, styles.bgWhite, styles.center]}>
                                            <Animated.View
                                                style={[styles.sliderLine, styles.bgBlack, {opacity: opacity2}]}
                                            />
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    </Fragment>
                ) : (
                    <View style={[styles.container, styles.center]}>
                        <Text style={[styles.fontMedium, styles.font16]}>
                            잘못된 요청입니다.
                        </Text>
                    </View>
                )}
                
            </SafeAreaView>
            </ImageBackground>
        )
    }
}

export default ExhibitionArtworkScreen;