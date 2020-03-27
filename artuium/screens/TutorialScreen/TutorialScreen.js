import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const tutorialOneImageSrc = require('../../assets/images/tutorialImg1.png');
const tutorialTwoImageSrc = require('../../assets/images/tutorialImg2.png');
const tutorialThreeImageSrc = require('../../assets/images/tutorialImg3.png');
const tutorialFourImageSrc = require('../../assets/images/tutorialImg4.png');
const tutorialFiveImageSrc = require('../../assets/images/tutorialImg5.png');

const tutorialOneTitle = '아틔움에 오신걸 환영합니다';
const TutorialOneDescription = (
  <>
    예술을 이야기하는 곳, 아틔움에서{'\n'}어떤 일들을 할 수 있는지 알려드릴게요.
  </>
);

const tutorialTwoTitle = '사람들과 예술적인 이야기를';
const TutorialTwoDescription = (
  <>
    아틔움을 돌아다니며{'\n'}
    <Text style={{fontWeight: 'bold'}}>다양한 전시들에 대한 정보를</Text> 얻고,
    {'\n'}
    <Text style={{fontWeight: 'bold'}}>맛보기 작품들을 구경</Text>할 수 있어요.
  </>
);

const tutorialThreeTitle = '내 손 안의 전시 감상하기';
const TutorialThreeDescription = (
  <>
    진행중인 전시나 유명 작품에 대한{'\n'}사람들의 생각을 들어보세요.{'\n'}전시
    관람에 유용한 정보를 얻거나{'\n'}작품에 대한 비밀스러운 이야기를{'\n'}들을
    수 있을지도 몰라요.
  </>
);

const tutorialFourTitle = '나만의 컬렉션을 장식하기';
const TutorialFourDescription = (
  <>
    마음에 드는 전시나 작품이 생겼다면{'\n'}
    <Text style={{fontWeight: 'bold'}}>이미지를 두 번 눌러서</Text> 간단하게
    {'\n'}
    <Text style={{fontWeight: 'bold'}}>컬렉션에 저장</Text>해보세요.{'\n'}내
    취향의 포스터와 작품으로 가득찬
    {'\n'}
    공간을 만들 수 있습니다.
  </>
);

const tutorialFiveTitle = '그 전에, 티켓이 필요해요';
const TutorialFiveDescription = (
  <>
    이제 내 프로필만 만들면{'\n'}언제든지 아틔움에 입장하고{'\n'}자유롭게 이용할
    수 있는 티켓이 발급됩니다.{'\n'}예술적인 경험이 되길 바래요.
  </>
);

const PagenationDots = ({order, style}) => {
  const dots = [];
  for (var i = 1; i <= 5; i++) {
    dots.push(
      <View
        style={{
          backgroundColor: order === i ? '#fd4c1e' : '#c4c4c4',
          width: 7,
          height: 7,
          borderRadius: 3.5,
        }}
      />,
    );
  }
  return (
    <View
      style={{
        ...style,
        flexDirection: 'row',
        width: 75,
        justifyContent: 'space-between',
        alignSelf: 'center',
      }}>
      {dots}
    </View>
  );
};

const Button = ({onPress, buttonText, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...style,
        width: 290,
        height: 38,
        backgroundColor: '#fd4c1e',
        borderRadius: 5,
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontFamily: 'Noto Sans KR',
          fontWeight: '500',
          fontSize: 16,
          textAlign: 'center',
          color: '#ffffff',
        }}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const tutorialStyle = {
  skipText: {
    color: '#9c9c9c',
    textDecorationLine: 'underline',
    fontFamily: 'Noto Sans KR',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: 'bold',
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

const Tutorial = props => {
  const {onPressLastButton} = props;
  const tutorialContents = [
    {
      title: tutorialOneTitle,
      description: TutorialOneDescription,
      imgSrc: tutorialOneImageSrc,
    },
    {
      title: tutorialTwoTitle,
      description: TutorialTwoDescription,
      imgSrc: tutorialTwoImageSrc,
    },
    {
      title: tutorialThreeTitle,
      description: TutorialThreeDescription,
      imgSrc: tutorialThreeImageSrc,
    },
    {
      title: tutorialFourTitle,
      description: TutorialFourDescription,
      imgSrc: tutorialFourImageSrc,
    },
    {
      title: tutorialFiveTitle,
      description: TutorialFiveDescription,
      imgSrc: tutorialFiveImageSrc,
    },
  ];

  return (
    <ScrollView
      style={{width, height}}
      horizontal={true}
      pagingEnabled={true}
      showsHorizontalScrollIndicator={false}>
      {tutorialContents.map((content, index) => (
        <View style={{width, height}}>
          {index !== 4 && (
            <Text
              style={{
                position: 'absolute',
                top: 47,
                right: 20,
                ...tutorialStyle.skipText,
              }}>
              건너뛰기
            </Text>
          )}
          <Image source={content.imgSrc} style={{width, marginTop: 119}} />
          <Text
            style={{
              ...tutorialStyle.tutorialTitle,
              marginTop: 4,
            }}>
            {content.title}
          </Text>
          <Text
            style={{
              ...tutorialStyle.tutorialDescription,
              marginTop: 9,
            }}>
            {content.description}
          </Text>
          {index === 4 && (
            <Button
              onPress={onPressLastButton}
              buttonText={'프로필 만들기'}
              style={{position: 'absolute', bottom: 101}}
            />
          )}
          <PagenationDots
            order={index + 1}
            style={{position: 'absolute', bottom: 75}}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default Tutorial;
