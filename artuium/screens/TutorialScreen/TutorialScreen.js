import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  BackHandler,
} from 'react-native';
import PaginationDots from '../../components/PaginationDots/PaginationDots';
import MakeProfileButton from '../../components/MakeProfileButton/MakeProfileButton';

const {width, height} = Dimensions.get('window');

const tutorialOneImageSrc = require('../../assets/images/tutorialImg1.png');
const tutorialTwoImageSrc = require('../../assets/images/tutorialImg2.png');
const tutorialThreeImageSrc = require('../../assets/images/tutorialImg3.png');
const tutorialFourImageSrc = require('../../assets/images/tutorialImg4.png');
const tutorialFiveImageSrc = require('../../assets/images/tutorialImg5.png');
const tutorialContents = [
  {
    title: '아틔움에 오신걸 환영합니다',
    description: (
      <>
        예술을 이야기하는 곳, 아틔움에서{'\n'}어떤 일들을 할 수 있는지
        알려드릴게요.
      </>
    ),
    imgSrc: tutorialOneImageSrc,
  },
  {
    title: '내 손 안의 전시 감상하기',
    description: (
      <>
        아틔움을 돌아다니며{'\n'}
        <Text style={{fontWeight: 'bold'}}>
          다양한 전시들에 대한 정보를
        </Text>{' '}
        얻고,{'\n'}
        <Text style={{fontWeight: 'bold'}}>맛보기 작품들을 구경</Text>할 수
        있어요.
      </>
    ),
    imgSrc: tutorialTwoImageSrc,
  },
  {
    title: '사람들과 예술적인 이야기를',
    description: (
      <>
        진행중인 전시나 유명 작품에 대한{'\n'}사람들의 생각을 들어보세요.
        {'\n'}전시 관람에 유용한 정보를 얻거나{'\n'}작품에 대한 비밀스러운
        이야기를{'\n'}들을 수 있을지도 몰라요.
      </>
    ),
    imgSrc: tutorialThreeImageSrc,
  },
  {
    title: '나만의 컬렉션을 장식하기',
    description: (
      <>
        마음에 드는 전시나 작품이 생겼다면{'\n'}
        <Text style={{fontWeight: 'bold'}}>이미지를 두 번 눌러서</Text> 간단하게
        {'\n'}
        <Text style={{fontWeight: 'bold'}}>컬렉션에 저장</Text>해보세요.{'\n'}내
        취향의 포스터와 작품으로 가득찬{'\n'}공간을 만들 수 있습니다.
      </>
    ),
    imgSrc: tutorialFourImageSrc,
  },
  {
    title: '그 전에, 티켓이 필요해요',
    description: (
      <>
        이제 내 프로필만 만들면{'\n'}언제든지 아틔움에 입장하고{'\n'}자유롭게
        이용할 수 있는 티켓이 발급됩니다.{'\n'}예술적인 경험이 되길 바래요.
      </>
    ),
    imgSrc: tutorialFiveImageSrc,
  },
];

const Tutorial = props => {
  const {closeTutorial} = props;
  const [currentIndex, _setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(currentIndex);
  const setCurrentIndex = index => {
    currentIndexRef.current = index;
    _setCurrentIndex(index);
  };
  const scrollView = useRef();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onPressBackButton,
    );
    return () => backHandler.remove();
  }, []);

  const onPressBackButton = () => {
    if (currentIndexRef.current == 0) {
      // exit app
      return false;
    } else {
      scrollView.current.scrollTo({
        x: width * (currentIndexRef.current - 1),
        y: 0,
        animated: true,
      });
      return true;
    }
  };

  const onScroll = event => {
    // Get current page's index from scoll event.
    if (event) {
      const xOffset = event.nativeEvent.contentOffset.x + 10;
      setCurrentIndex(Math.floor(xOffset / width));
    }
  };

  return (
    <>
      <ScrollView
        ref={scrollView}
        style={{width, height}}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}>
        {tutorialContents.map(content => (
          <View style={{width, height}}>
            <View
              style={{
                height: height - 295 - 48,
                marginTop: 48,
                justifyContent: 'center',
              }}>
              <Image source={content.imgSrc} style={{width}} />
            </View>
            <View
              style={{
                position: 'absolute',
                width,
                top: height - 291,
              }}>
              <Text
                style={{
                  ...tutorialStyles.tutorialTitle,
                }}>
                {content.title}
              </Text>
              <Text
                style={{
                  ...tutorialStyles.tutorialDescription,
                  marginTop: 9,
                }}>
                {content.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      {currentIndex !== 4 && (
        <Text
          style={{
            position: 'absolute',
            top: 48,
            right: 20,
            ...tutorialStyles.skipText,
          }}
          onPress={closeTutorial}>
          건너뛰기
        </Text>
      )}
      {currentIndex === 4 && (
        <MakeProfileButton
          onPress={closeTutorial}
          buttonText={'프로필 만들기'}
          style={{position: 'absolute', bottom: 101}}
        />
      )}
      <PaginationDots
        total={5}
        order={currentIndex + 1}
        style={{position: 'absolute', bottom: 75}}
      />
    </>
  );
};

const tutorialStyles = {
  skipText: {
    color: '#9c9c9c',
    textDecorationLine: 'underline',
    fontFamily: 'Noto Sans KR',
    fontSize: 18,
    lineHeight: 26,
  },
  tutorialTitle: {
    fontFamily: 'Noto Sans KR',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
  },
  tutorialDescription: {
    fontFamily: 'Noto Sans KR',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '#383838',
  },
};

export default Tutorial;