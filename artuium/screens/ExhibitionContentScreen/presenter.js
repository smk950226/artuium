import React, { Fragment } from 'react';
import { View, Text, ScrollView, FlatList, RefreshControl, ActivityIndicator, Image, Dimensions, TouchableWithoutFeedback, ImageBackground, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import styles from '../../styles';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ArtuiumCard3 from '../../components/ArtuiumCard3'
import HTML from 'react-native-render-html';
import StarRating from 'react-native-star-rating';

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
    }
    constructor(props){
        super(props);
        this.state = {
            index: 0
        }
    }

    render(){
        const { exhibition, is_liked, like_count, review_count, reviews, isLoadingMore, hasNextPage, refreshing, loading, is_reviewed, myReviews, thumb, good, soso, sad, surprise } = this.props;
        return(
            exhibition ? (
                <View style={[styles.container]}>
                    <View style={[styles.alignItemsCenter, styles.px15, {height: 40, flexDirection: 'row-reverse', position: 'absolute', top: iosStatusBarHeight + 15, right: 0, zIndex: 99}]}>
                        <TouchableWithoutFeedback onPress={()=>this.props.navigation.goBack()}>
                            <View style={[styles.transExitBtn]}>
                                <Text style={[styles.fontBold, styles.font16, styles.white]}>나가기</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <ScrollView style={[styles.flex1]} bounces={false} showsVerticalScrollIndicator={false}>
                        <ImageBackground resizeMode={'cover'} source={{uri: exhibition.images ? exhibition.images.length > 0 ? exhibition.images[0].image : null : null}} style={[Platform.OS === 'ios' ? styles.paddingIOS : null, styles.justifyContentEnd, {height: height*0.5}]}>
                            <LinearGradient
                                colors={['#00000000', '#000000']}
                                style={[styles.pl30, styles.pb30, styles.justifyContentEnd, {height: height*0.3}]}
                            >
                                <View style={[styles.row, styles.mt10, styles.alignItemsCenter]}>
                                    <Image style={{width: 15, height: 15}} source={require('../../assets/images/icon_comment.png')} />
                                    <Text style={[styles.fontRegular, styles.font8, {color: '#fff', marginLeft: 4}]}>{abbreviateNumber(review_count)}</Text>
                                    <TouchableWithoutFeedback onPress={is_liked ? this.props.unlike : this.props.like}>
                                        <View style={[styles.row, styles.alignItemsCenter]}>
                                            {is_liked ? (
                                                <Image style={[styles.ml15, {width: 13, height: 12}]} source={require('../../assets/images/icon_like.png')} />
                                            ) : (
                                                <Image style={[styles.ml15, {width: 13, height: 12}]} source={require('../../assets/images/icon_like.png')} />

                                            )}
                                            <Text style={[styles.fontRegular, styles.font8, {color: '#fff', marginLeft: 4}]}>{abbreviateNumber(like_count)}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={[styles.flexWrap, {width: 200}]}>
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
                                    <TouchableWithoutFeedback style={[styles.flex1]} onPress={()=>this.props.navigation.navigate('ExhibitionDetail')}>   
                                        <View style={[styles.upBtn]}>
                                            <Text style={[styles.white, styles.font40]}>V</Text>
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
                                                    <Text style={[styles.fontRegular, styles.font14, styles.ml10]}>{`${exhibition.open_date.slice(8,10)}.${exhibition.open_date.slice(5,7)}.${exhibition.open_date.slice(8,10)} - ${exhibition.close_date.slice(0,4)}.${exhibition.close_date.slice(5,7)}.${exhibition.close_date.slice(8,10)}`}</Text>
                                                </View>
                                                <View style={[styles.row, styles.mt5]}>
                                                    <Text style={[{width: 60}, styles.fontBold, styles.font14]}>전시 장소</Text>
                                                    <View style={[styles.ml10]}>
                                                        <Text style={[styles.fontRegular, styles.font14]}>{exhibition.gallery.name}</Text>
                                                        <Text style={[styles.fontRegular, styles.font14, styles.mt5]}>{exhibition.address}</Text>
                                                    </View>
                                                </View>
                                                <View style={[styles.row, styles.mt5]}>
                                                    <Text style={[{width: 60}, styles.fontBold, styles.font14]}>관람 시간</Text>
                                                    <Text style={[styles.fontRegular, styles.font14, styles.ml10]}>{`${exhibition.open_time.slice(0,5)} - ${exhibition.close_time.slice(0,5)}`}</Text>
                                                </View>
                                                <View style={[styles.row, styles.mt5]}>
                                                    <Text style={[{width: 60}, styles.fontBold, styles.font14]}>입장료</Text>
                                                    <Text style={[styles.fontRegular, styles.font14, styles.ml10]}>{`${numberWithCommas(exhibition.fee)}원`}</Text>
                                                </View>
                                                <View style={[styles.row, styles.mt5]}>
                                                    <Text style={[{width: 60}, styles.fontBold, styles.font14]}>휴관일</Text>
                                                    <Text style={[styles.fontRegular, styles.font14, styles.ml10]}>{exhibition.notopendate ? exhibition.notopendate : '없음'}</Text>
                                                </View>
                                            </View>
                                            <View style={[{marginTop: 25}]}>
                                                <HTML html={exhibition.content} imagesMaxWidth={width} />
                                            </View>
                                        </View>
                                    :
                                        <View style={{width: width-20}}>
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
                                                            scrollEnabled={true}
                                                            pagingEnabled={true}
                                                            horizontal={true}
                                                            showsHorizontalScrollIndicator={false}
                                                            style={[{height: 160}, styles.mt15]}
                                                            >
                                                                {myReviews.map((review, index) => (
                                                                    <ArtuiumCard3 key={index} review={review} navigation={this.props.navigation} my={true} />
                                                                ))}
                                                            </ScrollView>
                                                            <View style={[styles.widthFull, styles.px15]}>
                                                                <Text style={[styles.fontBlack, styles.font13, styles.mt20, { opacity: 0.16 }]}>통계</Text>
                                                                <View style={[styles.row, styles.justifyContentCenter, styles.mb20, styles.alignItemsEnd]}>
                                                                    <View style={[styles.alignItemsCenter, styles.mr20]}>
                                                                        <Text style={[styles.fontBlack, {fontSize: 45}]}>{exhibition.total_rate.toFixed(1)}</Text>
                                                                        <StarRating
                                                                            disabled={true}
                                                                            maxStars={5}
                                                                            rating={exhibition.total_rate}
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
                                                            <View style={[styles.center]}>
                                                                <View style={[styles.bgBlack, styles.mb10, {width: 60, height: 60, borderRadius: 30}]} />
                                                                <Text style={[styles.textCenter, styles.fontMedium, styles.font12, {color: '#382a2a'}]}>리뷰를 작성하면{'\n'}통계를 볼 수 있습니다.</Text>
                                                            </View>
                                                        )
                                                    )
                                                ) : (
                                                    <View style={[styles.center]}>
                                                        <View style={[styles.bgBlack, styles.mb10, {width: 60, height: 60, borderRadius: 30}]} />
                                                        <Text style={[styles.textCenter, styles.fontMedium, styles.font12, {color: '#382a2a'}]}>리뷰를 작성하면{'\n'}통계를 볼 수 있습니다.</Text>
                                                    </View>
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
                                                    renderItem={({item}) => (
                                                        <ArtuiumCard3 review={item} navigation={this.props.navigation} />
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
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </ScrollView>
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

ExhibitionContentScreen.propTypes = {

}

export default ExhibitionContentScreen;