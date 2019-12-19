import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, Dimensions, TouchableWithoutFeedback, ImageBackground, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import styles from '../../styles';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import ArtuiumCard3 from '../../components/ArtuiumCard3'
import HTML from 'react-native-render-html';

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

const appric = [
    {
        id: 1,
        image: 'http://chedulife.com.au/wp-content/uploads/%EA%B3%A0%ED%9D%90-%EB%B0%A4%EC%9D%98-%EC%B9%B4%ED%8E%98-%ED%85%8C%EB%9D%BC%EC%8A%A4-456x300.jpg',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 4.5,
        name: '라쿤',
        date: '5일 전',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름 ...'
    },
    {
        id: 2,
        image: 'http://mblogthumb3.phinf.naver.net/MjAxOTAxMDNfOTEg/MDAxNTQ2NDgxOTgwNTcz.I3sUkC74k5K1fExm6woYSK8DhlgA6MZsqmB91SLCsIcg.vb2MUoFo6xYjZnWOBvnI_jDklXM3jKR8xrbj5tlDjFwg.JPEG.allthat_art/01_5347.JPG?type=w800',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 1,
        name: '라쿤',
        date: '5일 전',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름 ...'
    },
    {
        id: 3,
        image: 'https://t1.daumcdn.net/cfile/tistory/2218C34D55096EE51F',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 5,
        name: '라쿤',
        date: '5일 전',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름 ...'
    },
    {
        id: 4,
        image: 'http://chedulife.com.au/wp-content/uploads/%EA%B3%A0%ED%9D%90-%EB%B0%A4%EC%9D%98-%EC%B9%B4%ED%8E%98-%ED%85%8C%EB%9D%BC%EC%8A%A4-456x300.jpg',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 4,
        name: '라쿤',
        date: '5일 전',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름 ...'
    },
    {
        id: 5,
        image: 'http://chedulife.com.au/wp-content/uploads/%EA%B3%A0%ED%9D%90-%EB%B0%A4%EC%9D%98-%EC%B9%B4%ED%8E%98-%ED%85%8C%EB%9D%BC%EC%8A%A4-456x300.jpg',
        title: '그랑드 자트 섬의 일요일...',
        author: '조르주 쇠라',
        profile_image: 'http://yekyong.cafe24.com/data/editor/1711/f475e62a10fc4f5ed5390e8cb63222a8_1510794623_8464.jpg',
        emoji: require('../../assets/images/icon_sad.png'),
        rating: 3.5,
        name: '라쿤',
        date: '5일 전',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름 ...'
    }
]

const data = {
    id: 1,
    image: 'http://cfile217.uf.daum.net/image/2462D34B53C5F36D20F13F',
    title: '그랑드 자트 섬의 일요일 오후',
    author: '조르주피에르 쇠라',
    year: '1886',
    painting: '캔버스에 유화',
    comments: 32,
    likes: 32,
    content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름 하루를 보내고 있는 시민들의 모습을 담고 있다.다양한 색채와 빛, 그리고 형태들을 점묘 화법을 통해 꼼꼼하게 표현하고 있다. 쇠라는 빛의 분석이 인상주의의 수법을 따르면서도 인상주의의 본능적이며 직감적인 제작 태도가 빛에만 지나치게 얽매인 나머지 형태를 확산시키고 있는 점에 불만을 느끼고, 여기에 엄밀한 이론과 과학성을 부여하고자 도모하였다.',
    summaryTitle: '점묘화를 바라보는 법',
    summary: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름 하루를 보내고 있는 시민들의 모습을 담고 있다.다양한 색채와 빛, 그리고 형태들을 점묘 화법을 통해 꼼꼼하게 표현하고 있다. 쇠라는 빛의 분석이 인상주의의 수법을 따르면서도 인상주의의 본능적이며 직감적인 제작 태도가 빛에만 지나치게 얽매인 나머지 형태를 확산시키고 있는 점에 불만을 느끼고, 여기에 엄밀한 이론과 과학성을 부여하고자 도모하였다.',
}

class ExhibitionContentScreen extends React.Component {
    static propTypes = {
        exhibition: PropTypes.object.isRequired,
        like: PropTypes.func.isRequired,
        unlike: PropTypes.func.isRequired,
        is_liked: PropTypes.bool.isRequired,
        like_count: PropTypes.number.isRequired,
        review_count: PropTypes.number.isRequired
    }
    constructor(props){
        super(props);
        this.state = {
            index: 0
        }
    }

    render(){
        const { exhibition, is_liked, like_count, review_count } = this.props;
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
                        <View style={[styles.bgBlack, styles.px10, styles.pb10]}>
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
                                            <View style={[styles.bgWhite, styles.center, {width: '100%', height: 170}]}>
                                                <View style={[styles.center]}>
                                                    <View style={[styles.bgBlack, styles.mb10, {width: 60, height: 60, borderRadius: 30}]} />
                                                    <Text style={[styles.textCenter, styles.fontMedium, styles.font12, {color: '#382a2a'}]}>리뷰를 작성하면{'\n'}통계를 볼 수 있습니다.</Text>
                                                </View>
                                            </View>
                                            <View style={[styles.divView]} />
                                            <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentBetween, styles.px30, styles.pt20]}>
                                                <Text style={[styles.font20, styles.fontBold, {color: '#382a2a'}]}>유저 감상</Text>
                                                <Image source={require('../../assets/images/icon_sort.png')} style={[styles.icon20]} />
                                            </View>
                                            {appric.map((da, index) => {
                                                return(
                                                    <ArtuiumCard3 key={index} artwork={da}/>
                                                )
                                            })}
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