import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Image, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';

const { width, height } = Dimensions.get('window')

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

const ExhibitionDetailScreen = (props) => (
    <SafeAreaView style={[styles.container]}>
        <View style={[styles.alignItemsCenter, styles.px15, {height: 40, flexDirection: 'row-reverse'}]}>
            <TouchableWithoutFeedback onPress={()=>props.navigation.goBack()}>
                <View style={[styles.exitBtn]}>
                    <Text style={[styles.fontBold, styles.font16, styles.white]}>나가기</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
        <View style={[styles.center, {height: height*0.5, paddingTop: 20}]}>
            <Image source={{uri: data.image}} style={{width: 360, height: 240}} resizeMode={'cover'} />
        </View>
        <View style={[styles.alignItemsCenter]}>
            <View style={[styles.row, styles.mt10, styles.alignItemsCenter]}>
                <Image style={{width: 15, height: 15}} source={require('../../assets/images/icon_comment.png')} />
                <Text style={[styles.fontRegular, styles.font8, {color: '#909090', marginLeft: 4}]}>{data.comments}</Text>
                <Image style={[styles.ml15, {width: 13, height: 12}]} source={require('../../assets/images/icon_like.png')} />
                <Text style={[styles.fontRegular, styles.font8, {color: '#909090', marginLeft: 4}]}>{data.likes}</Text>
            </View>
            <View style={[styles.flexWrap, {width: 200}]}>
                <Text style={[styles.fontBold, styles.font30, styles.textCenter]}>{data.title}</Text>
            </View>
            <Text style={[styles.fontMedium, styles.font14]}>{data.author}, {data.year}, {data.painting}</Text>
            <View style={[styles.relatedBtn, styles.mt30]}>
                <Text style={[styles.fontMedium, styles.font18, styles.gray8B]}>관련 전시</Text>
            </View>
            <TouchableWithoutFeedback onPress={()=>props.navigation.navigate('ExhibitionContent')}>
                <View style={[styles.upBtn, {marginTop: 40}]}>
                    <Text style={[styles.white, styles.font40]}>^</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    </SafeAreaView>
)

ExhibitionDetailScreen.propTypes = {

}

export default ExhibitionDetailScreen;