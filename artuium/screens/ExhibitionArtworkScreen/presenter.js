import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, Image, SafeAreaView, ImageBackground, Dimensions, TouchableWithoutFeedback, Animated, FlatList, PanResponder, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import { getStatusBarHeight } from "react-native-status-bar-height";
import ArtuiumCard4 from '../../components/ArtuiumCard4'
import HTML from 'react-native-render-html';

const { width, height } = Dimensions.get('window')

const ratio = width/411.429
const ratioV = height/797.714

const iosStatusBarHeight =  Platform.OS === 'ios' ? getStatusBarHeight() : 20;

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
        like: PropTypes.func.isRequired,
        unlike: PropTypes.func.isRequired,
    }
    
    constructor(props){
        super(props)
        const { exhibition, from } = props;
        this.state = {
            exhibition,
            artworks: exhibition.artworks.concat({id: -1}),
            scrollX: new Animated.Value(0),
            showingIndex: 0
        }
        this.cardsPanResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                if(gestureState.dy < 0){
                    if(gestureState.dy < -30){
                        return true
                    }
                    else{
                        return false
                    }
                }
                else{
                    return false
                }
            },
            onPanResponderMove: ( event, gestureState ) => {
            },
            onPanResponderTerminationRequest: () => false,
            onPanResponderRelease: ( event, gestureState ) => {
                if(gestureState.dy < 0){
                    if(gestureState.dy < -50){
                        const { showingIndex, artworks } = this.state;
                        if(showingIndex === artworks.length - 1){
                            this.props.navigation.navigate('ExhibitionContent', { exhibition : exhibition, from })
                        }
                        else{
                            this.props.navigation.navigate('ArtworkContent', { artwork : artworks[showingIndex], from })
                        }
                    }
                }
            }
        })
    }

    _handleViewable = (info) => {
        if(info.viewableItems[0]){
            this.setState({
                showingIndex: Number(info.viewableItems[0].key)
            })
        }
    }

    render(){
        let position = Animated.divide(this.state.scrollX, width);
        const { from, is_liked, like_count } = this.props;
        const { exhibition, showingIndex, artworks } = this.state;
        return(
            <Animated.View { ...this.cardsPanResponder.panHandlers }>
            <ImageBackground style={[styles.center, styles.heightFull, styles.screenWidth]} source={require('../../assets/images/bg_login.jpg')} resizeMode={'cover'}>
                {exhibition ? (
                    <Fragment>
                        <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.widthFull, styles.px15, {height: 40, position: 'absolute', top: iosStatusBarHeight + 15, zIndex: 999}]}>
                            <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('ExhibitionDetail', { exhibition, from })}>
                                <View style={[styles.row, styles.alignItemsCenter, {zIndex: 10}]}>
                                    <Image source={require('../../assets/images/icon_back_gray.png')} style={[{width: 26, height: 26}]} />
                                    <Text style={[styles.fontBlack, styles.font17, styles.gray8B, styles.ml5]}>{exhibition.name}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            {showingIndex !== artworks.length - 1 && (
                                <TouchableWithoutFeedback onPress={from ? () => this.props.navigation.navigate(from) : ()=>this.props.navigation.goBack()}>
                                    <View style={[styles.exitBtn, { zIndex: 999 }]}>
                                        <Text style={[styles.fontBold, styles.font16, styles.white]}>나가기</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                        </View>
                        <FlatList 
                        style={[{marginTop: 60}]}
                        contentContainerStyle={[{height: Platform.OS === 'ios' ? height - 60 - iosStatusBarHeight : height - 60 - 40, alignSelf: 'flex-end'}]}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}
                        horizontal={true}
                        pagingEnabled={true}
                        alwaysBounceVertical={false}
                        showsHorizontalScrollIndicator={false}
                        ref={el => this.scrollView = el}
                        onScroll={Animated.event(
                            [{ nativeEvent: {
                                contentOffset: {
                                    x: this.state.scrollX
                                }
                            }}]
                        )}
                        keyExtractor={(item, index) => String(index)}
                        onViewableItemsChanged={this._handleViewable}
                        viewabilityConfig={{
                            viewAreaCoveragePercentThreshold: 95
                        }}
                        data={artworks}
                        renderItem={({item, index, separators}) => {
                            if(index === (artworks.length - 1)){
                                return(
                                    <ScrollView alwaysBounceVertical={false} showsVerticalScrollIndicator={false} style={[{height: height - (135 + height*0.17*ratioV)}, styles.screenWidth, styles.px30]}>
                                        <Text style={[styles.fontBold, styles.font35]}>{exhibition.name}</Text>
                                        <View style={[styles.mt10, styles.row, styles.alignItemsCenter]}>
                                            <View style={[styles.borderRadius5, styles.borderGray91, styles.py5, styles.px15]}>
                                                <Text style={[styles.fontMedium, styles.font14, styles.gray91, styles.textCenter]}>평점</Text>
                                                <Text style={[styles.fontBlack, styles.font25, styles.gray91, styles.textCenter]}>{exhibition.total_rate.toFixed(2)}</Text>
                                            </View>
                                            <TouchableWithoutFeedback onPress={is_liked ? this.props.unlike : this.props.like}>
                                                <View style={[styles.borderRadius5, styles.borderGray91, styles.py5, styles.px15, styles.ml10, styles.row, styles.alignItemsCenter]}>
                                                    <Image source={is_liked ? require('../../assets/images/icon_heart_red.png') : require('../../assets/images/icon_heart_gray.png')} style={[{width: 107*0.4, height: 99*0.4}]} />
                                                    <View style={[styles.ml5]}>
                                                        <Text style={[styles.fontMedium, styles.font14, styles.gray91, styles.textCenter]}>좋아요</Text>
                                                        <Text style={[styles.fontBlack, styles.font25, styles.gray91, styles.textCenter]}>{abbreviateNumber(like_count)}</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                        <View style={[styles.mt15]}>
                                            <HTML html={exhibition.content} imagesMaxWidth={width} />
                                        </View>
                                    </ScrollView>
                                )
                            }
                            else{
                                return(
                                    <ArtuiumCard4 key={index} from={from} artwork={item} navigation={this.props.navigation} />
                                )
                            }
                        }}
                        scrollEventThrottle={16}
                        />
                        <View style={[styles.alignItemsCenter, {width: width, position: 'absolute', bottom: height*0.17*ratioV}]}>
                            {showingIndex !== (artworks.length - 1) ? (
                                <View
                                    style={[styles.row]}
                                >
                                    {artworks.map((_, ind) => {
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
                            ) : (
                                <TouchableWithoutFeedback onPress={from ? () => this.props.navigation.navigate(from) : ()=>this.props.navigation.goBack()}>
                                    <View style={[styles.relatedBtn]}>
                                        <Text style={[styles.fontMedium, styles.font18, styles.white]}>전시 나가기</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                            
                        </View>

                        <View style={[styles.alignItemsCenter, {width: width, position: 'absolute', bottom: height*0.05*ratioV}]}>
                            <TouchableWithoutFeedback onPress={showingIndex === artworks.length - 1 ? ()=> this.props.navigation.navigate('ExhibitionContent', { exhibition : exhibition, from }) : ()=> this.props.navigation.navigate('ArtworkContent', { artwork : artworks[showingIndex], from })}>
                                <View style={[styles.mt30]}>
                                    <Image source={require('../../assets/images/arrow_up_exhibition.png')} style={[styles.upBtn]}/>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </Fragment>
                ) : (
                    <View style={[styles.container, styles.center]}>
                        <Text style={[styles.fontMedium, styles.font16]}>
                            잘못된 요청입니다.
                        </Text>
                    </View>
                )}
                
            </ImageBackground>
            </Animated.View>
        )
    }
}

export default ExhibitionArtworkScreen;