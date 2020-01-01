import React from 'react';
import { View, Text, TouchableWithoutFeedback, Image, ScrollView, Animated, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import styles from '../../styles';
import ExhibitionLikeScreen from '../ExhibitionLikeScreen';
import ArtworkLikeScreen from '../ArtworkLikeScreen';
import ReviewLikeScreen from '../ReviewLikeScreen';

const iosStatusBarHeight = getStatusBarHeight()

const { width, height } = Dimensions.get('window')

class LikeListScreen extends React.Component {
    static propTypes = {
        profile: PropTypes.object.isRequired,
        getReviewLikeList: PropTypes.func.isRequired,
        getReviewLikeListMore: PropTypes.func.isRequired,
        getArtworkLikeList: PropTypes.func.isRequired,
        getArtworkLikeListMore: PropTypes.func.isRequired,
        getExhibitionLikeList: PropTypes.func.isRequired,
        getExhibitionLikeListMore: PropTypes.func.isRequired
    }
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: '전시' },
                { key: 'second', title: '작품' },
                { key: 'third', title: '감상' },
            ],
            others: props.navigation.getParam('others', null)
        }
    }

    _renderExhibitionRoute = () => {
        return(
            <ExhibitionLikeScreen navigation={this.props.navigation} others={this.state.others} />
        )
    }

    _renderArtworkRoute = () => {
        return(
            <ArtworkLikeScreen navigation={this.props.navigation} others={this.state.others} />
        )
    }

    _renderReviewRoute = () => {
        return(
            <ReviewLikeScreen navigation={this.props.navigation} others={this.state.others} />
        )
    }

    render(){
        const { profile } = this.props;
        const { others } = this.state;
        return(
            <View style={[styles.container]}>
                <View style={[{height: iosStatusBarHeight+50, paddingTop: iosStatusBarHeight}, styles.bgWhite, styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px25, styles.borderBtmGrayDb]}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack(null)}>
                        <Image source={require('../../assets/images/icon_back.png')} style={[{width: 9*1.6, height: 17*1.6}]} />
                    </TouchableWithoutFeedback>
                    {others ? 
                    <Text style={[styles.fontBold, styles.font20]}>{`${others.nickname}님이 좋아한`}</Text>
                    :
                    <Text style={[styles.fontBold, styles.font20]}>{`${profile.nickname}님이 좋아한`}</Text>
                    }
                    <View style={[{width: 9, height: 17}]} />
                </View>
                <TabView
                    navigationState={this.state}
                    onIndexChange={index => this.setState({ index })}
                    renderScene={SceneMap({
                        first: this._renderExhibitionRoute,
                        second: this._renderArtworkRoute,
                        third: this._renderReviewRoute,
                    })}
                    renderTabBar={props =>
                        <TabBar
                            {...props}
                            activeColor = {'#1162d0'}
                            inactiveColor = {'#d1d1d1'}
                            labelStyle = {[styles.font15, styles.fontMedium]}
                            bounces={false}
                            indicatorStyle={{ backgroundColor: '#1162d0', height: 3 }}
                            style={{ backgroundColor: 'white' }}
                        />
                    }
                />
            </View>
        )
    }
}

export default LikeListScreen;