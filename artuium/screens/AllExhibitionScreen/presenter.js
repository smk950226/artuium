import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import ExhibitionCard from '../../components/ExhibitionCard'

const data = [
    {
        id: 1,
        image: 'http://daljin.com/File/edtImg/1fa04f03_001.jpg',
        title: '반추상',
        intro: '거짓말로 이야기하는 창작',
        place: '국립현대미술관',
        date: '2019.06.27-2019.09.30',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬'
    },
    {
        id: 2,
        image: 'https://cphoto.asiae.co.kr/listimglink/1/2016101309160570554_1.jpg',
        title: '영감공감',
        intro: '거짓말로 이야기하는 창작',
        place: '금호 갤러리',
        date: '2019.10.19-2019.10.25',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬'
    },
    {
        id: 3,
        image: 'https://og-data.s3.amazonaws.com/media/exhibitions/image/10882/ei_10882.jpg',
        title: '여성의 일',
        intro: '거짓말로 이야기하는 창작',
        place: '서울대학교미술관',
        date: '2018.12.27-2019.02.24',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬'
    },
    {
        id: 4,
        image: 'https://pbs.twimg.com/media/D6_l4JFUcAEe-Ke.jpg',
        title: '거짓말',
        intro: '거짓말로 이야기하는 창작',
        place: '김달진미술자료박물관',
        date: '2019.09.27-2019.10.30',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬'
    },
    {
        id: 5,
        image: 'http://daljin.com/File/edtImg/1fa04f03_001.jpg',
        title: '반추상',
        intro: '거짓말로 이야기하는 창작',
        place: '국립현대미술관',
        date: '2019.06.27-2019.09.30',
        comments: 32,
        likes: 32,
        content: '신인상주의의 창시자인 조르주 쇠라의 대표적인 작품 가운데 하나로 1886년 제8회 인상파 전람회에 출품되어 이목을 끌었다. 파리 근교의 그랑드 자트 섬'
    },
]

const AllExhibitionScreen = (props) => (
    <View style={[styles.container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((da,index) => (
                <ExhibitionCard key={index} exhibition={da} full={true} />
            ))}
        </ScrollView>
    </View>
)

AllExhibitionScreen.propTypes = {

}

export default AllExhibitionScreen;