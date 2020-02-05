import React, { Fragment } from 'react';
import { View, Text, ScrollView, FlatList, RefreshControl, ActivityIndicator, Image, Dimensions, TouchableWithoutFeedback, ImageBackground, Platform, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import styles from '../../styles';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ArtuiumCard3 from '../../components/ArtuiumCard3'
import ArtuiumCard5 from '../../components/ArtuiumCard5'
import ReplyCard from '../../components/ReplyCard'
import HTML from 'react-native-render-html';
import StarRating from 'react-native-star-rating';
import Stars from 'react-native-stars';
import { StackActions, NavigationActions } from 'react-navigation';

const iosStatusBarHeight = getStatusBarHeight()

const { width, height } = Dimensions.get('window')

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

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

class ExhibitionContentScreen extends React.Component {
    static propTypes = {
        exhibition: PropTypes.object.isRequired,
        like: PropTypes.func.isRequired,
        unlike: PropTypes.func.isRequired,
        is_liked: PropTypes.bool.isRequired,
        like_count: PropTypes.number.isRequired,
        review_count: PropTypes.number.isRequired,
        reviews: PropTypes.array,
        isLoadingMore: PropTypes.bool.isRequired,
        hasNextPage: PropTypes.bool.isRequired,
        reviewListMore: PropTypes.func.isRequired,
        refresh: PropTypes.func.isRequired,
        refreshing: PropTypes.bool.isRequired,
        loading: PropTypes.bool.isRequired,
        is_reviewed: PropTypes.bool.isRequired,
        myReviews: PropTypes.array,
        thumb: PropTypes.number,
        good: PropTypes.number,
        soso: PropTypes.number,
        sad: PropTypes.number,
        surprise: PropTypes.number,
        handleChangeMode: PropTypes.func.isRequired,
        mode: PropTypes.string.isRequired,
        handleChangeExpression: PropTypes.func.isRequired,
        expression: PropTypes.string.isRequired,
        rating: PropTypes.number,
        handleChangeRating: PropTypes.func.isRequired,
        handleChangeContent: PropTypes.func.isRequired,
        content: PropTypes.string.isRequired,
        isSubmittingReview: PropTypes.bool.isRequired,
        total_rate: PropTypes.number.isRequired,
        submit: PropTypes.func.isRequired,
        showingReview: PropTypes.object,
        replyListMore: PropTypes.func.isRequired,
        replies: PropTypes.array,
        isLoadingMoreReply: PropTypes.bool.isRequired,
        hasNextPageReply: PropTypes.bool.isRequired,
        loadingReply: PropTypes.bool.isRequired,
        refreshReply: PropTypes.func.isRequired,
        refreshingReply: PropTypes.bool.isRequired,
        handleChangeContentReply: PropTypes.func.isRequired,
        contentReply: PropTypes.string.isRequired,
        isSubmittingReply: PropTypes.bool.isRequired,
        createReview: PropTypes.func.isRequired,
        selectReply: PropTypes.func.isRequired,
        selectedReply: PropTypes.object.isRequired,
        update: PropTypes.func.isRequired,
        handleUpdateMode: PropTypes.func.isRequired,
        deleteReview: PropTypes.func.isRequired,
        blockReviewList: PropTypes.array,
        blockUserList: PropTypes.array,
        blockReplyList: PropTypes.array,
        addBlockReview: PropTypes.func.isRequired,
        addBlockUser: PropTypes.func.isRequired,
        addBlockReply: PropTypes.func.isRequired,
    }
    constructor(props){
        super(props);
        const { initialMode } = props;

        this.state = {
            index: initialMode ? ((initialMode === 'review') || (initialMode === 'list') || (initialMode === 'create')) ? 1 : 0 : 0,
            initialMode,
            keyboardHeight: 0
        }
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount = () => {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    _keyboardDidShow = (e) => {
        this.setState({
            keyboardHeight: e.endCoordinates.height
        })
    }

    _keyboardDidHide = () => {
        this.setState({
            keyboardHeight: 0
        })
    }

    _goUpdate = (review) => {
        this.setState({
            initialMode: 'create',
            index: 1
        })
        this.props.handleUpdateMode(review)
    }

    render(){
        const { exhibition, is_liked, like_count, review_count, reviews, isLoadingMore, hasNextPage, refreshing, loading, is_reviewed, myReviews, thumb, good, soso, sad, surprise, mode, expression, rating, content, isSubmittingReview, total_rate, showingReview, replies, isLoadingMoreReply, hasNextPageReply, loadingReply, refreshingReply, contentReply, isSubmittingReply, selectedReply, from, blockReviewList, blockUserList, blockReplyList, to } = this.props;
        const { initialMode, keyboardHeight } = this.state;
        return(
            exhibition ? (
                <View style={[styles.container]}>
                    <View style={[styles.alignItemsCenter, styles.px15, {height: 40, flexDirection: 'row-reverse', position: 'absolute', top: iosStatusBarHeight + 15, right: 0, zIndex: 99}]}>
                        <TouchableWithoutFeedback onPress={from ? () => this.props.navigation.navigate(from) : ()=>this.props.navigation.goBack()}>
                            <View style={[styles.transExitBtn]}>
                                <Text style={[styles.fontBold, styles.font16, styles.white]}>나가기</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <ScrollView style={[styles.flex1]} bounces={false} showsVerticalScrollIndicator={false} ref={'scrollView'}>
                        <ImageBackground resizeMode={'cover'} source={{uri: exhibition.images ? exhibition.images.length > 0 ? exhibition.images[0].image : '' : ''}} style={[Platform.OS === 'ios' ? styles.paddingIOS : null, styles.justifyContentEnd, {height: height*0.5}]}>
                            <LinearGradient
                                colors={['#00000000', '#000000']}
                                style={[styles.pl30, styles.pb30, styles.justifyContentEnd, {height: height*0.3}]}
                            >
                                <View style={[styles.row, styles.mt10, styles.alignItemsCenter]}>
                                    <Image style={{width: 15, height: 15}} source={require('../../assets/images/icon_comment_white.png')} />
                                    <Text style={[styles.fontRegular, styles.font8, {color: '#fff', marginLeft: 4}]}>{abbreviateNumber(review_count)}</Text>
                                    <TouchableWithoutFeedback onPress={is_liked ? this.props.unlike : this.props.like}>
                                        <View style={[styles.row, styles.alignItemsCenter]}>
                                            {is_liked ? (
                                                <Image style={[styles.ml15, {width: 13, height: 12}]} source={require('../../assets/images/icon_like_active.png')} />
                                            ) : (
                                                <Image style={[styles.ml15, {width: 13, height: 12}]} source={require('../../assets/images/icon_like_white.png')} />

                                            )}
                                            <Text style={[styles.fontRegular, styles.font8, {color: '#fff', marginLeft: 4}]}>{abbreviateNumber(like_count)}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={[styles.flexWrap]}>
                                    <Text style={[styles.fontBold, styles.font30, styles.white]}><Text style={[styles.fontBold, styles.font30, styles.yellow]}>{'전시 '}</Text>{exhibition.name}</Text>
                                </View>
                                <Text style={[styles.fontMedium, styles.font14, styles.white]}>{exhibition.gallery.name}, {`${exhibition.open_date.slice(8,10)}.${exhibition.open_date.slice(5,7)}.${exhibition.open_date.slice(8,10)} ~ ${exhibition.close_date.slice(0,4)}.${exhibition.close_date.slice(5,7)}.${exhibition.close_date.slice(8,10)}`}</Text>
                            </LinearGradient>
                        </ImageBackground>
                        <View style={[styles.bgBlack, styles.px10, styles.pb10, styles.heightFull]}>
                            <View style={[styles.bgWhite, styles.widthFull, {paddingBottom: 40, borderRadius: 5}]}>
                                <View style={[styles.row, styles.justifyContentAround, styles.mt15]}>
                                    <TouchableWithoutFeedback
                                        onPress={()=>this.setState({
                                            index: 0
                                        }
                                    )}>
                                        <View style={[styles.alignItemsCenter, styles.flex6, styles.mr20, {height: 30, borderBottomWidth: 1}, this.state.index === 0 ? {borderBottomColor: '#064be6'} : {borderBottomColor: '#aaa'}]}>
                                            <Text style={[styles.font14]}>정보</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    {/* <TouchableWithoutFeedback style={[styles.flex1]} onPress={()=>this.props.navigation.navigate('ExhibitionDetail', { exhibition, from })}>   
                                        <View >
                                            <Image source={require('../../assets/images/arrow_down_exhibition.png')} style={[styles.upBtn]}/>
                                        </View>
                                    </TouchableWithoutFeedback> */}
                                    <TouchableWithoutFeedback style={[styles.flex1]} onPress={(to === 'back') ? ()=>this.props.navigation.goBack(null) : ()=>this.props.navigation.dispatch(StackActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({
                                            routeName: 'ExhibitionDetail',
                                            params: {
                                                exhibition,
                                                from
                                            }
                                        })]
                                    }))}>   
                                        <View >
                                            <Image source={require('../../assets/images/arrow_down_exhibition.png')} style={[styles.upBtn]}/>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                        onPress={()=>this.setState({
                                            index: 1
                                        }
                                    )}>
                                        <View style={[styles.alignItemsCenter, styles.flex6, styles.ml20, {height: 30, borderBottomWidth: 1}, this.state.index === 1 ? {borderBottomColor: '#064be6'} : {borderBottomColor: '#aaa'}]}>
                                            <Text style={[styles.font14]}>감상</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={[styles.alignItemsCenter]}>
                                    {this.state.index === 0 ?
                                        <View style={{width: width-80}}>
                                            <View style={[styles.bgGrayf0, styles.py20, styles.px30, styles.mt15]}>
                                                <View style={[styles.row]}>
                                                    <Text style={[{width: 60}, styles.fontBold, styles.font14]}>전시 기간</Text>
                                                    <Text style={[styles.fontRegular, styles.font14, styles.ml10, { width: width - 180 }]}>{`${exhibition.open_date.slice(0,4)}.${exhibition.open_date.slice(5,7)}.${exhibition.open_date.slice(8,10)} - ${exhibition.close_date.slice(0,4)}.${exhibition.close_date.slice(5,7)}.${exhibition.close_date.slice(8,10)}`}</Text>
                                                </View>
                                                <View style={[styles.row, styles.mt5]}>
                                                    <Text style={[{width: 60}, styles.fontBold, styles.font14]}>전시 장소</Text>
                                                    <View style={[styles.ml10]}>
                                                        <Text style={[styles.fontRegular, styles.font14, { width: width - 180 }]}>{exhibition.gallery.name}</Text>
                                                        <Text style={[styles.fontRegular, styles.font14, styles.mt5, { width: width - 180 }]}>{exhibition.gallery.address}</Text>
                                                    </View>
                                                </View>
                                                <View style={[styles.row, styles.mt5]}>
                                                    <Text style={[{width: 60}, styles.fontBold, styles.font14]}>관람 시간</Text>
                                                    <Text style={[styles.fontRegular, styles.font14, styles.ml10, { width: width - 180 }]}>{`${exhibition.open_time.slice(0,5)} - ${exhibition.close_time.slice(0,5)}`}</Text>
                                                </View>
                                                <View style={[styles.row, styles.mt5]}>
                                                    <Text style={[{width: 60}, styles.fontBold, styles.font14]}>입장료</Text>
                                                    <Text style={[styles.fontRegular, styles.font14, styles.ml10, { width: width - 180 }]}>{exhibition.fee}</Text>
                                                </View>
                                                <View style={[styles.row, styles.mt5]}>
                                                    <Text style={[{width: 60}, styles.fontBold, styles.font14]}>휴관일</Text>
                                                    <Text style={[styles.fontRegular, styles.font14, styles.ml10, { width: width - 180 }]}>{exhibition.notopendate ? exhibition.notopendate : '없음'}</Text>
                                                </View>
                                            </View>
                                            <View style={[{marginTop: 25}]}>
                                                <HTML html={exhibition.content} imagesMaxWidth={width} />
                                            </View>
                                        </View>
                                    :
                                        <View style={{width: width-20}}>
                                            {mode === 'list' && (
                                                <Fragment>
                                                    <View style={[styles.bgWhite, styles.center, is_reviewed ? {width: '100%', minHeight: 185} : {width: '100%', height: 170}]}>
                                                        {is_reviewed ? (
                                                            loading ? (
                                                                <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>
                                                                    <ActivityIndicator size={'small'} color={'#000'} />
                                                                </View>
                                                            ) : (
                                                                myReviews && myReviews.length > 0 ? (
                                                                    <Fragment>
                                                                    <ScrollView
                                                                    scrollEnabled={myReviews.length > 1 ? true : false}
                                                                    pagingEnabled={true}
                                                                    horizontal={true}
                                                                    alwaysBounceVertical={false}
                                                                    showsHorizontalScrollIndicator={false}
                                                                    style={[{height: 160}, styles.mt15]}
                                                                    >
                                                                        {myReviews.map((review, index) => {
                                                                            if((blockReviewList.findIndex(id => id === review.id) >= 0) || (blockUserList.findIndex(id => id === review.author.id) >= 0)){
                                                                                return null
                                                                            }
                                                                            else{
                                                                                return (
                                                                                    <ArtuiumCard3 addBlockReview={this.props.addBlockReview} addBlockUser={this.props.addBlockUser} deleteReview={this.props.deleteReview} goUpdate={this._goUpdate} from={from} key={index} review={review} navigation={this.props.navigation} my={true} handleChangeMode={this.props.handleChangeMode} />
                                                                                )
                                                                            }
                                                                        })}
                                                                    </ScrollView>
                                                                    <View style={[styles.widthFull, styles.px15]}>
                                                                        <Text style={[styles.fontBlack, styles.font13, styles.mt20, { opacity: 0.16 }]}>통계</Text>
                                                                        <View style={[styles.row, styles.justifyContentCenter, styles.mb20, styles.alignItemsEnd]}>
                                                                            <View style={[styles.alignItemsCenter, styles.mr20]}>
                                                                                <Text style={[styles.fontBlack, {fontSize: 45}]}>{total_rate.toFixed(1)}</Text>
                                                                                <StarRating
                                                                                    disabled={true}
                                                                                    maxStars={5}
                                                                                    rating={total_rate}
                                                                                    emptyStar={require('../../assets/images/icon_star_disabled.png')}
                                                                                    fullStar={require('../../assets/images/icon_star.png')}
                                                                                    halfStar={require('../../assets/images/icon_star_half.png')}
                                                                                    iconSet={'Ionicons'}
                                                                                    fullStarColor={'#FFBD07'}
                                                                                    starSize={18}
                                                                                />
                                                                            </View>
                                                                            <View style={[styles.row, styles.justifyContentCenter, styles.alignItemsCenter, styles.ml20, styles.mb10]}>
                                                                                <View style={[styles.justifyContentBetween, styles.alignItemsCenter, styles.mr20]}>
                                                                                    <View style={[{height: 45, width: 5}, styles.justifyContentEnd]}>
                                                                                        <LinearGradient
                                                                                            colors={['#000000', '#9b9b9b']}
                                                                                            style={[{height: `${thumb*100}%`, width: 5}]}
                                                                                        />
                                                                                    </View>
                                                                                    <Image source={require('../../assets/images/icon_thumb.png')} style={[styles.emoji]} resizeMode={'cover'} />
                                                                                </View>
                                                                                <View style={[styles.justifyContentBetween, styles.alignItemsCenter, styles.mr20]}>
                                                                                    <View style={[{height: 45, width: 5}, styles.justifyContentEnd]}>
                                                                                        <LinearGradient
                                                                                            colors={['#000000', '#9b9b9b']}
                                                                                            style={[{height: `${sad*100}%`, width: 5}]}
                                                                                        />
                                                                                    </View>
                                                                                    <Image source={require('../../assets/images/icon_sad.png')} style={[styles.emoji]} resizeMode={'cover'} />
                                                                                </View>
                                                                                <View style={[styles.justifyContentBetween, styles.alignItemsCenter, styles.mr20]}>
                                                                                    <View style={[{height: 45, width: 5}, styles.justifyContentEnd]}>
                                                                                        <LinearGradient
                                                                                            colors={['#000000', '#9b9b9b']}
                                                                                            style={[{height: `${soso*100}%`, width: 5}]}
                                                                                        />
                                                                                    </View>
                                                                                    <Image source={require('../../assets/images/icon_soso.png')} style={[styles.emoji]} resizeMode={'cover'} />
                                                                                </View>
                                                                                <View style={[styles.justifyContentBetween, styles.alignItemsCenter, styles.mr20]}>
                                                                                    <View style={[{height: 45, width: 5}, styles.justifyContentEnd]}>
                                                                                        <LinearGradient
                                                                                            colors={['#000000', '#9b9b9b']}
                                                                                            style={[{height: `${surprise*100}%`, width: 5}]}
                                                                                        />
                                                                                    </View>
                                                                                    <Image source={require('../../assets/images/icon_surprise.png')} style={[styles.emoji]} resizeMode={'cover'} />
                                                                                </View>
                                                                                <View style={[styles.justifyContentBetween, styles.alignItemsCenter]}>
                                                                                    <View style={[{height: 45, width: 5}, styles.justifyContentEnd]}>
                                                                                        <LinearGradient
                                                                                            colors={['#000000', '#9b9b9b']}
                                                                                            style={[{height: `${good*100}%`, width: 5}]}
                                                                                        />
                                                                                    </View>
                                                                                    <Image source={require('../../assets/images/icon_good.png')} style={[styles.emoji]} resizeMode={'cover'} />
                                                                                </View>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                    </Fragment>
                                                                ) : (
                                                                    <TouchableWithoutFeedback onPress={() => this.props.handleChangeMode('create')}>
                                                                    <View style={[styles.center]}>
                                                                    <Image source={require('../../assets/images/review_hide.png')} style={[{width: 60, height: 60, borderRadius: 30}, styles.mb10]} />
                                                                        <Text style={[styles.textCenter, styles.fontMedium, styles.font12, {color: '#382a2a'}]}>리뷰를 작성하면{'\n'}통계를 볼 수 있습니다.</Text>
                                                                    </View>
                                                                    </TouchableWithoutFeedback>
                                                                )
                                                            )
                                                        ) : (
                                                            <TouchableWithoutFeedback onPress={() => this.props.handleChangeMode('create')}>
                                                            <View style={[styles.center]}>
                                                            <Image source={require('../../assets/images/review_hide.png')} style={[{width: 60, height: 60, borderRadius: 30}, styles.mb10]} />
                                                                <Text style={[styles.textCenter, styles.fontMedium, styles.font12, {color: '#382a2a'}]}>리뷰를 작성하면{'\n'}통계를 볼 수 있습니다.</Text>
                                                            </View>
                                                            </TouchableWithoutFeedback>
                                                        )}
                                                        
                                                    </View>
                                                    <View style={[styles.divView]} />
                                                    <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px30, styles.pt20]}>
                                                        <Text style={[styles.font20, styles.fontBold, {color: '#382a2a'}]}>유저 감상</Text>
                                                        <Image source={require('../../assets/images/icon_sort.png')} style={[styles.icon20]} />
                                                    </View>
                                                    {loading ? (
                                                        <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>
                                                            <ActivityIndicator size={'small'} color={'#000'} />
                                                        </View>
                                                    ) : (
                                                        reviews && reviews.length > 0 ? (
                                                            <FlatList 
                                                            data={reviews} 
                                                            renderItem={({item}) => {
                                                                if((blockReviewList.findIndex(id => id === item.id) >= 0) || (blockUserList.findIndex(id => id === item.author.id) >= 0)){
                                                                    return null
                                                                }
                                                                else{
                                                                    return (
                                                                        <ArtuiumCard3 addBlockReview={this.props.addBlockReview} addBlockUser={this.props.addBlockUser} deleteReview={this.props.deleteReview} goUpdate={this._goUpdate} from={from} review={item} navigation={this.props.navigation} handleChangeMode={this.props.handleChangeMode} />
                                                                    )
                                                                }
                                                            }} 
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
                                                </Fragment>
                                            )}
                                            {mode === 'create' && (
                                                <Fragment>
                                                    <TouchableWithoutFeedback onPress={()=>this.props.handleChangeRating(0)}>
                                                        <View>
                                                        <TouchableWithoutFeedback onPress={() => this.props.handleChangeMode('list')}>
                                                            <View style={[styles.ml25, { width: 40 }]}>
                                                                <Image style={[{width: 14, height: 26}]} source={require('../../assets/images/icon_back.png')} />
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                            <View style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.alignSelfCenter, styles.mt15, styles.borderBtmGrayE8, styles.pb15, styles.widthFull]}>
                                                                <Stars
                                                                half={true}
                                                                default={rating}
                                                                update={(val)=>this.props.handleChangeRating(val)}
                                                                spacing={4}
                                                                starSize={34}
                                                                count={5}
                                                                emptyStar={require('../../assets/images/icon_star_disabled.png')}
                                                                fullStar={require('../../assets/images/icon_star.png')}
                                                                halfStar={require('../../assets/images/icon_star_half.png')}
                                                                />
                                                            </View>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                    <TouchableWithoutFeedback onPress={() => this.props.handleChangeExpression('')}>
                                                        <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.alignSelfCenter, styles.mt10, styles.borderBtmGrayE8, styles.pb15, styles.widthFull]}>
                                                            <TouchableWithoutFeedback onPress={() => this.props.handleChangeExpression('thumb')}>
                                                                <Image source={require('../../assets/images/icon_thumb.png')} style={[styles.emojiXl, styles.mx5, expression === 'thumb' ? null : {opacity: 0.3}]} resizeMode={'cover'} />
                                                            </TouchableWithoutFeedback>
                                                            <TouchableWithoutFeedback onPress={() => this.props.handleChangeExpression('sad')}>
                                                                <Image source={require('../../assets/images/icon_sad.png')} style={[styles.emojiXl, styles.mx5, expression === 'sad' ? null : {opacity: 0.3}]} resizeMode={'cover'} />
                                                            </TouchableWithoutFeedback>
                                                            <TouchableWithoutFeedback onPress={() => this.props.handleChangeExpression('soso')}>
                                                                <Image source={require('../../assets/images/icon_soso.png')} style={[styles.emojiXl, styles.mx5, expression === 'soso' ? null : {opacity: 0.3}]} resizeMode={'cover'} />
                                                            </TouchableWithoutFeedback>
                                                            <TouchableWithoutFeedback onPress={() => this.props.handleChangeExpression('surprise')}>
                                                                <Image source={require('../../assets/images/icon_surprise.png')} style={[styles.emojiXl, styles.mx5, expression === 'surprise' ? null : {opacity: 0.3}]} resizeMode={'cover'} />
                                                            </TouchableWithoutFeedback>
                                                            <TouchableWithoutFeedback onPress={() => this.props.handleChangeExpression('good')}>
                                                                <Image source={require('../../assets/images/icon_good.png')} style={[styles.emojiXl, styles.mx5, expression === 'good' ? null : {opacity: 0.3}]} resizeMode={'cover'} />
                                                            </TouchableWithoutFeedback>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                    <View style={[styles.widthFull, {height: 300, borderWidth: 1, borderColor: '#e8e8e8'}]}>
                                                        <TextInput
                                                            style={[styles.font15, styles.widthFull, styles.px25, styles.py10, styles.widthFull, {height: 300, minHeight: 300, flex: 1}]}
                                                            placeholder={'내용을 입력하세요.'}
                                                            autoCapitalize={'none'} 
                                                            autoCorrect={false} 
                                                            value={content} 
                                                            onChangeText={this.props.handleChangeContent} 
                                                            returnKeyType={'done'} 
                                                            placeholderTextColor={'#000000'}
                                                            multiline={true}
                                                            maxLength={500}
                                                            textAlignVertical={'top'}
                                                        />
                                                        <Text style={[styles.fontMedium, styles.font14, { position: 'absolute', bottom: 15, right: 25 }]}>{content.length}<Text style={[styles.grayD1]}>/500자</Text></Text>
                                                    </View>
                                                    <View style={[styles.mt30, styles.alignItemsCenter, { marginBottom: Platform.OS === 'ios' ? 70 + keyboardHeight : 70 }]}>
                                                        <TouchableWithoutFeedback onPress={initialMode === 'create' ? this.props.update : this.props.submit}>
                                                            <View style={[styles.bgBlack, styles.borderRadius5, styles.px30, styles.py5, isSubmittingReview ? styles.opacity07 : null]}>
                                                                <Text style={[styles.fontMedium, styles.font16, styles.white]}>{initialMode === 'create' ? `수정하기` : `등록하기`}</Text>
                                                            </View>
                                                        </TouchableWithoutFeedback>
                                                    </View>
                                                </Fragment>
                                            )}
                                            {mode === 'review' && (
                                                <View style={[styles.pb30]}>
                                                    <ArtuiumCard5 addBlockReview={this.props.addBlockReview} addBlockUser={this.props.addBlockUser} deleteReview={this.props.deleteReview} goUpdate={this._goUpdate} from={from} review={showingReview} navigation={this.props.navigation} handleChangeMode={this.props.handleChangeMode} />
                                                    <View style={[styles.divView, styles.mt15]} />
                                                    <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px30, styles.pt20, styles.mb15]}>
                                                        <Text style={[styles.font20, styles.fontBold, {color: '#382a2a'}]}>댓글</Text>
                                                        <Image source={require('../../assets/images/icon_sort.png')} style={[styles.icon20]} />
                                                    </View>
                                                    {loadingReply ? (
                                                        <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>
                                                            <ActivityIndicator size={'small'} color={'#000'} />
                                                        </View>
                                                    ) : (
                                                        replies && replies.length > 0 ? (
                                                            <FlatList 
                                                            data={replies} 
                                                            renderItem={({item}) => {
                                                                if((blockReplyList.findIndex(id => id === item.id) >= 0) || (blockUserList.findIndex(id => id === item.author.id) >= 0)){
                                                                    return null
                                                                }
                                                                else{
                                                                    return (
                                                                        <View style={[item.id === selectedReply.id ? { zIndex: 9999 } : { zIndex: 10 }]}>
                                                                            <ReplyCard addBlockUser={this.props.addBlockUser} addBlockReply={this.props.addBlockReply} reply={item} navigation={this.props.navigation} handleChangeMode={this.props.handleChangeMode} selectReply={this.props.selectReply} selectedReply={selectedReply} />
                                                                        </View>
                                                                    )
                                                                }
                                                            }} 
                                                            numColumns={1} 
                                                            keyExtractor={item => String(item.id)} 
                                                            refreshing={refreshingReply} 
                                                            onRefresh={this.props.refreshReply} 
                                                            onEndReached={hasNextPageReply ? this.props.replyListMore : null} 
                                                            onEndReachedThreshold={0.5} 
                                                            bounces={true} 
                                                            ListFooterComponent={isLoadingMoreReply ? (
                                                                <View style={[styles.alignItemsCenter, styles.justifyContentCenter, styles.mt5, styles.py5]}>
                                                                    <ActivityIndicator size={'small'} color={'#000000'} />
                                                                </View>
                                                            ): null} />
                                                        ) : (
                                                            <ScrollView 
                                                            refreshControl={<RefreshControl refreshing={refreshingReply} onRefresh={this.props.refreshReply} tintColor={'#000000'} />}
                                                            >
                                                                <Text style={[styles.fontMedium, styles.font15, styles.mt40, styles.grayA7, styles.textCenter]}>댓글이 없습니다.</Text>
                                                            </ScrollView>
                                                        )
                                                    )}
                                                </View>
                                            )}
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    {this.state.index === 1 && mode === 'review' && selectedReply.id ? (
                        <TouchableWithoutFeedback onPress={() => this.props.selectReply({})}>
                            <View style={[styles.screenWidth, styles.heightFull, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)' }]}>

                            </View>
                        </TouchableWithoutFeedback>
                    ) : (
                        null
                    )}
                    {this.state.index === 1 && mode === 'review' && (
                        Platform.OS === 'ios' ? (
                            <KeyboardAvoidingView behavior={'position'} contentContainerStyle={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px10, styles.pt10, styles.bgWhite, styles.widthFull, styles.pb10, { position: 'absolute', bottom: 0, zIndex: 999 }]}>
                                <View style={[styles.mr10, styles.borderRadius5, styles.bgGrayf0, styles.px10, styles.flex8]}>
                                    <TextInput
                                        style={[styles.font13, styles.widthFull, styles.px10, styles.py5, styles.widthFull]}
                                        autoCapitalize={'none'} 
                                        autoCorrect={false} 
                                        value={contentReply} 
                                        onChangeText={this.props.handleChangeContentReply} 
                                        returnKeyType={'done'} 
                                        placeholderTextColor={'#000000'}
                                    />
                                </View>
                                <TouchableWithoutFeedback onPress={this.props.createReview}>
                                    <View style={[styles.flex2, styles.bgGray33, styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.py5, styles.borderRadius5, isSubmittingReply ? { opacity: .4 } : null]}>
                                        <Text style={[styles.fontMedium, styles.font16, styles.white]}>등록</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </KeyboardAvoidingView>
                        ) : (
                            <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px10, styles.pt10, styles.bgWhite, styles.widthFull, styles.pb10, { position: 'absolute', bottom: 0, zIndex: 999 }]}>
                                <View style={[styles.mr10, styles.borderRadius5, styles.bgGrayf0, styles.px10, styles.flex8]}>
                                    <TextInput
                                        style={[styles.font13, styles.widthFull, styles.px10, styles.py5, styles.widthFull]}
                                        autoCapitalize={'none'} 
                                        autoCorrect={false} 
                                        value={contentReply} 
                                        onChangeText={this.props.handleChangeContentReply} 
                                        returnKeyType={'done'} 
                                        placeholderTextColor={'#000000'}
                                    />
                                </View>
                                <TouchableWithoutFeedback onPress={this.props.createReview}>
                                    <View style={[styles.flex2, styles.bgGray33, styles.row, styles.alignItemsCenter, styles.justifyContentCenter, styles.py5, styles.borderRadius5, isSubmittingReply ? { opacity: .4 } : null]}>
                                        <Text style={[styles.fontMedium, styles.font16, styles.white]}>등록</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )
                        
                    )}
                    
                </View>
            ) : (
                <View style={[styles.container, styles.center]}>
                    <Text style={[styles.fontMedium, styles.font16]}>
                        잘못된 요청입니다.
                    </Text>
                </View>
            )
        )
    }
}

export default ExhibitionContentScreen