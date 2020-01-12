import React from 'react';
import { View, Text, ImageBackground, Image, ScrollView, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styles from '../../styles';
import NoticeScreen from '../../screens/NoticeScreen';
import NotificationScreen from '../../screens/NotificationScreen';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import ArtuiumCard from '../../components/ArtuiumCard';

const iosStatusBarHeight = getStatusBarHeight()
const { width } = Dimensions.get('window')

class ProfileScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            profile: PropTypes.object.isRequired,
            reviewListMore: PropTypes.func.isRequired,
            isLoadingMore: PropTypes.bool.isRequired,
            hasNextPage: PropTypes.bool.isRequired,
            reviewList: PropTypes.array,
            refreshing: PropTypes.bool.isRequired,
            refresh: PropTypes.func.isRequired
        }
    }

    render(){
        const { others, profile, loadingReviewList, isLoadingMore, hasNextPage, reviewList, refreshing } = this.props;
        return(
            <SafeAreaView style={[styles.container]}>
                <View style={[styles.row, styles.justifyContentBetween, styles.alignItemsCenter, styles.px25, styles.bgWhite, {width, height: iosStatusBarHeight+50, paddingTop: iosStatusBarHeight}]}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack(null)}>
                        <Image source={require('../../assets/images/icon_back.png')} style={[{width: 9*1.6, height: 17*1.6}]} />
                    </TouchableWithoutFeedback>
                    <Text style={[styles.fontBold, styles.font20]}>{`${others.nickname}님의 프로필`}</Text>
                    <View style={{width: 9*1.6}} />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: {
                            contentOffset: {
                                y: this.state.scrollY
                            }
                        }}]
                    )}
                    bounces={false}
                    scrollEventThrottle={16}
                >
                    {others.background_image ? (
                        <ImageBackground
                            source={{uri: others.background_image}}
                            style={[styles.paddingIOS, styles.px15, styles.justifyContentEnd, styles.pb15, {height: 210}]}
                            resizeMode={'cover'}
                        >
                            {others.profile_image ? (
                                <Image source={{uri: others.profile_image}} style={[styles.profileImage70]} />
                            ) : (
                                <View style={[styles.profileImage70, styles.bgGrayC9]} />
                            )}
                        </ImageBackground>
                    ) : (
                        <ImageBackground
                            source={require('../../assets/images/empty_bg.png')}
                            style={[styles.paddingIOS, styles.px15, styles.justifyContentEnd, styles.pb15, {height: 210}]}
                            resizeMode={'cover'}
                        >
                            {others.profile_image ? (
                                <Image source={{uri: others.profile_image}} style={[styles.profileImage70]} />
                            ) : (
                                <View style={[styles.profileImage70, styles.bgGrayC9]} />
                            )}
                        </ImageBackground>
                    )}
                    
                    <ImageBackground source={require('../../assets/images/gradient.png')} style={[styles.px15, {paddingBottom: 70}]}>
                        <View style={[styles.row, styles.pt20, styles.px5, styles.justifyContentBetween]}>
                            <Text style={[styles.fontBold, styles.font25]}>{others.nickname}</Text>
                            <View style={[styles.row]}>
                                {others.is_following ?
                                <TouchableOpacity style={[styles.othersUnfollowBtn]} onPress={()=>this.props.unfollow()}>
                                    <Text style={[styles.fontMedium, styles.font15, styles.white]}>팔로우 중</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={[styles.othersFollowBtn]} onPress={()=>this.props.follow()}>
                                    <Text style={[styles.fontMedium, styles.font15, styles.white]}>팔로우</Text>
                                </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={[styles.row, styles.px5]}>
                            <Text style={[styles.fontMedium, styles.font13, {color: '#a7a7a7'}]}>팔로워</Text>
                            <Text style={[styles.fontMedium, styles.font13, styles.ml10, {color: '#a7a7a7'}]}>{others.follower_count}</Text>
                            <Text style={[styles.fontMedium, styles.font13, styles.ml30, {color: '#a7a7a7'}]}>팔로잉</Text>
                            <Text style={[styles.fontMedium, styles.font13, styles.ml10, {color: '#a7a7a7'}]}>{others.following_count}</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('LikeList', {others})}>
                            <View style={[styles.row, styles.justifyContentEven, styles.othersProfileBox, styles.mt10]}>
                                <View style={[styles.alignItemsCenter]}>
                                    <Text style={[styles.fontBold, styles.font35, {color: '#fff'}]}>{others.like_exhibition_count}</Text>
                                    <Text style={[styles.fontMedium, styles.font16, {color: '#fff'}]}>좋아한 전시</Text>
                                </View>
                                <View style={[styles.alignItemsCenter]}>
                                    <Text style={[styles.fontBold, styles.font35, {color: '#fff'}]}>{others.like_artwork_count}</Text>
                                    <Text style={[styles.fontMedium, styles.font16, {color: '#fff'}]}>좋아한 작품</Text>
                                </View>
                                <View style={[styles.alignItemsCenter]}>
                                    <Text style={[styles.fontBold, styles.font35, {color: '#fff'}]}>{others.like_review_count}</Text>
                                    <Text style={[styles.fontMedium, styles.font16, {color: '#fff'}]}>좋아한 감상</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ImageBackground>
                    {loadingReviewList ? (
                        <View style={[styles.mt20, styles.alignItemsCenter, styles.justifyContentCenter]}>
                            <ActivityIndicator size={'small'} color={'#000'} />
                        </View>
                    ) : (
                        reviewList && reviewList.length > 0 ? (
                            <FlatList 
                            data={reviewList} 
                            renderItem={({item}) => (
                                <ArtuiumCard from={'OthersProfile'} review={item} size={'xlarge'} navigation={this.props.navigation} />
                            )} 
                            numColumns={1} 
                            keyExtractor={item => String(item.id)} 
                            refreshing={refreshing} 
                            onRefresh={this.props.refresh} 
                            onEndReached={hasNextPage ? this.props.reviewListMore : null} 
                            onEndReachedThreshold={0.5} 
                            bounces={true} 
                            ListFooterComponent={isLoadingMore ? (
                                <View style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.mt5, styles.py5]}>
                                    <ActivityIndicator size={'small'} color={'#000000'} />
                                </View>
                            ): null} />
                        ) : (
                            <ScrollView 
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.props.refresh} tintColor={'#000000'} />}
                            >
                                <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>감상이 없습니다.</Text>
                            </ScrollView>
                        )
                    )}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

ProfileScreen.propTypes = {

}

export default ProfileScreen;