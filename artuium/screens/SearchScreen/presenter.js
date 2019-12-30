import React from 'react';
import { View, Text, ScrollView, Image, TextInput, Dimensions, TouchableWithoutFeedback, ImageBackground, Modal } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import ArtworkCard from '../../components/ArtworkCard'
import ExhibitionCard2 from '../../components/ExhibitionCard2'
import PropTypes from 'prop-types';
import styles from '../../styles';

const statusBarHeight = getStatusBarHeight()

const { width, height } = Dimensions.get('window')

const dummyList = [
    {
        id: -1
    }
]


const SearchScreen = (props) => (
    <View style={[styles.container]}>
        <View style={[{height:50, marginTop: statusBarHeight}, styles.bgWhite, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px25, styles.borderBtmGrayDb]}>
            <TouchableWithoutFeedback onPress={() => props.navigation.goBack(null)}>
                <Image source={require('../../assets/images/icon_back.png')} style={[{width: 9*1.6, height: 17*1.6}]} />
            </TouchableWithoutFeedback>
            <Text style={[styles.fontBold, styles.font18]}>통합 검색</Text>
            <TouchableWithoutFeedback>
                <View style={[styles.hidden]}>
                    <Image source={require('../../assets/images/search.png')} style={[{width: 17*1.6, height: 17*1.6}]} />
                </View>
            </TouchableWithoutFeedback>
        </View>
        <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px15, styles.py10, styles.bgGrayF4]}>
            <TouchableWithoutFeedback onPress={props.onFocus}>
                    <View style={[styles.bgWhite, styles.borderRadius5, styles.pl20, styles.width90, styles.justifyContentCenter, {zIndex: 9, height: 43}]} >
                        <Text style={[styles.fontMedium, styles.font17]}>{props.q}</Text>
                    </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={props.makeBlank}>
                <View style={[{zIndex: 9}]}>
                    <Image source={require('../../assets/images/icon_close.png')} style={[styles.icon15]} />
                </View>
            </TouchableWithoutFeedback>
        </View>
        {props.focused && (
            <TouchableWithoutFeedback onPress={props.onBlur}>
            <View style={[{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1}, styles.bgBlack07]}>
                <View style={[{height:50, marginTop: statusBarHeight}, styles.bgWhite, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px25, styles.borderBtmGrayDb, styles.hidden]}>
                    <TouchableWithoutFeedback>
                        <Image source={require('../../assets/images/icon_back.png')} style={[{width: 9*1.6, height: 17*1.6}]} />
                    </TouchableWithoutFeedback>
                    <Text style={[styles.fontBold, styles.font18]}>통합 검색</Text>
                    <TouchableWithoutFeedback>
                        <View style={[styles.hidden]}>
                            <Image source={require('../../assets/images/search.png')} style={[{width: 17*1.6, height: 17*1.6}]} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px15, styles.py10, styles.bgTransparent, {zIndex: 9}]}>
                    <TextInput 
                    style={[styles.bgWhite, styles.borderRadius5, styles.font14, styles.pl20, styles.width90, styles.justifyContentCenter, {zIndex: 9, height: 43}]} 
                    underlineColorAndroid={'transparent'} 
                    autoCapitalize={'none'} 
                    autoCorrect={false} 
                    value={props.q} 
                    onChangeText={props.handleQChange} 
                    returnKeyType={'send'} 
                    onFocus={props.onFocus}
                    onBlur={props.onBlur}
                    autoFocus={true}
                    />
                    <TouchableWithoutFeedback onPress={props.onBlur}>
                        <View style={[{zIndex: 99}]}>
                            <Image source={require('../../assets/images/icon_close.png')} style={[styles.icon15]} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            </TouchableWithoutFeedback>
        )}
        <View style={[styles.mt15, styles.px25]}>
            <Text style={[styles.fontBold, styles.font16]}>작품</Text>
            <View style={[{height: 230}]}>
                {props.artworks && props.artworks.length > 0 ? (
                    <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={[styles.mt15]}
                    >
                        {props.artworks.map((artwork, index) => (
                            <ArtworkCard key={index} artwork={artwork} navigation={props.navigation} />
                        ))}
                    </ScrollView>
                ) : (
                    <View style={[styles.widthFull, styles.heightFull, styles.alignItemsCenter, styles.justifyContentCenter]}>
                        <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>결과를 찾을 수 없습니다</Text>
                    </View>
                )}
            </View>
        </View>
        <View style={[styles.mt15, styles.px25]}>
            <Text style={[styles.fontBold, styles.font16]}>전시</Text>
            <View style={[{height: 230}]}>
                {props.exhibitions && props.exhibitions.length > 0 ? (
                    <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={[styles.mt15]}
                    >
                        {props.exhibitions.map((exhibition, index) => (
                            <ExhibitionCard2 key={index} exhibition={exhibition} navigation={props.navigation} />
                        ))}
                    </ScrollView>
                ) : (
                    <View style={[styles.widthFull, styles.heightFull, styles.alignItemsCenter, styles.justifyContentCenter]}>
                        <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>결과를 찾을 수 없습니다</Text>
                    </View>
                )}
            </View>
        </View>
    </View>
)

SearchScreen.propTypes = {
    q: PropTypes.string.isRequired,
    handleQChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    focused: PropTypes.bool.isRequired,
    artworks: PropTypes.array,
    exhibitions: PropTypes.array,
    makeBlank: PropTypes.func.isRequired
}

export default SearchScreen;