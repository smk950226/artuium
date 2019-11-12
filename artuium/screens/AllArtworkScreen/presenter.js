import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import ArtuiumCard2 from '../../components/ArtuiumCard2'

const data = [
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
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름  신인상주의의 창시자인 조 신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파...'
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
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름  신인상주의의 창시자인 조 신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파...'
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
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름  신인상주의의 창시자인 조 신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파...'
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
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름  신인상주의의 창시자인 조 신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파...'
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
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬에서 맑게 개인 여름  신인상주의의 창시자인 조 신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파...'
    }
]

const AllArtworkScreen = (props) => (
    <View style={[styles.container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((da,index) => (
                <ArtuiumCard2 key={index} artwork={da} />
            ))}
        </ScrollView>
    </View>
)

AllArtworkScreen.propTypes = {

}

export default AllArtworkScreen;