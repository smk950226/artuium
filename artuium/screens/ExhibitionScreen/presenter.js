import React from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import ExhibitionCard from '../../components/ExhibitionCard';
import ExhibitionCard2 from '../../components/ExhibitionCard2';
import ExhibitionCard3 from '../../components/ExhibitionCard3';
import PropTypes from 'prop-types';
import styles from '../../styles';
import {exhibitionListIcon, exhibitionReviewIcon} from '../../assets/images';
import {deviceInfo} from '../../util';

const iosStatusBarHeight = getStatusBarHeight();

const {width, height} = Dimensions.get('window');

const dummyList = [
  {
    id: -1,
  },
];

class ExhibitionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollX: new Animated.Value(0),
      scrollX2: new Animated.Value(0),
      index: 0,
      routes: [
        {key: 'first', title: '알림'},
        {key: 'second', title: '공지사항'},
      ],
      scrollTop: true,
      topOpacity: new Animated.Value(1),
    };
  }

  static propTypes = {
    noticeNew: PropTypes.bool.isRequired,
    notificationNew: PropTypes.bool.isRequired,
    newExhibitions: PropTypes.array,
    recommendedExhibitions: PropTypes.array,
    hotExhibitions: PropTypes.array,
    pastExhibitions: PropTypes.array,
    handleNoticeNewChange: PropTypes.func.isRequired,
    handleNotificationNewChange: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
    refreshing: PropTypes.bool.isRequired,
  };

  _handleScroll = event => {
    if (event.nativeEvent.contentOffset.y === 0) {
      if (!this.state.scrollTop) {
        Animated.timing(this.state.topOpacity, {
          toValue: 1,
          duration: 200,
        }).start(() => {
          this.setState({
            scrollTop: true,
          });
        });
      }
    } else {
      if (this.state.scrollTop) {
        Animated.timing(this.state.topOpacity, {
          toValue: 0,
          duration: 200,
        }).start(() => {
          this.setState({
            scrollTop: false,
          });
        });
      }
    }
  };

  render() {
    let position = Animated.divide(this.state.scrollX, width);
    let position2 = Animated.divide(this.state.scrollX2, width);
    const {
      noticeNew,
      notificationNew,
      newExhibitions,
      recommendedExhibitions,
      hotExhibitions,
      pastExhibitions,
      refreshing,
    } = this.props;
    return (
      <View style={[styles.container]}>
        <Animated.View
          style={[
            styles.row,
            styles.alignItemsCenter,
            styles.spaceBetween,
            styles.px15,
            {
              width: width,
              height: 50,
              position: 'absolute',
              top: getStatusBarHeight(),
              zIndex: 900,
              opacity: this.state.topOpacity,
            },
          ]}>
          <TouchableWithoutFeedback
            onPress={() =>
              this.props.navigation.navigate('Alert', {
                notificationNew,
                noticeNew,
                handleNoticeNewChange: this.props.handleNoticeNewChange,
                handleNotificationNewChange: this.props
                  .handleNotificationNewChange,
              })
            }>
            <View>
              {noticeNew || notificationNew ? (
                <Image
                  style={{width: 32, height: 32, zIndex: 999}}
                  source={require('../../assets/images/notification_alert.png')}
                />
              ) : (
                <Image
                  style={{width: 32, height: 32, zIndex: 999}}
                  source={require('../../assets/images/notification.png')}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate('Search')}>
            <View>
              <Image
                style={{width: 32, height: 32, zIndex: 999}}
                source={require('../../assets/images/search.png')}
              />
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.props.refresh}
              tintColor={'#000000'}
            />
          }
          onScroll={this._handleScroll}
          scrollEventThrottle={16}>
          <View style={[styles.widthFull]}>
            <View>
              <View style={[{width: width, height: 516}]}>
                {recommendedExhibitions && recommendedExhibitions.length > 0 ? (
                  <ScrollView
                    style={{height: 516}}
                    horizontal={true}
                    alwaysBounceVertical={false}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event([
                      {
                        nativeEvent: {
                          contentOffset: {
                            x: this.state.scrollX,
                          },
                        },
                      },
                    ])}
                    scrollEventThrottle={16}>
                    {recommendedExhibitions.map((exhibition, index) => {
                      return (
                        <TouchableWithoutFeedback
                          key={index}
                          onPress={() =>
                            this.props.navigation.navigate('ExhibitionDetail', {
                              exhibition,
                              from: 'Exhibition',
                            })
                          }>
                          <View style={[{zIndex: 999}]}>
                            <ExhibitionCard3
                              from={'Exhibition'}
                              exhibition={exhibition}
                              navigation={this.props.navigation}
                            />
                          </View>
                        </TouchableWithoutFeedback>
                      );
                    })}
                  </ScrollView>
                ) : (
                  <View
                    style={[
                      {width, height: 516},
                      styles.alignItemsCenter,
                      styles.justifyContentCenter,
                    ]}>
                    <Text
                      style={[
                        styles.fontMedium,
                        styles.font15,
                        styles.mt40,
                        styles.grayA7,
                        styles.textCenter,
                      ]}>
                      전시가 없습니다.
                    </Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  left: 30,
                  bottom: 30,
                  zIndex: 999,
                }}>
                {recommendedExhibitions && recommendedExhibitions.length > 0
                  ? recommendedExhibitions.map((_, i) => {
                      let opacity = position.interpolate({
                        inputRange: [i - 1, i, i + 1],
                        outputRange: [0, 1, 0],
                        extrapolate: 'clamp',
                      });
                      return (
                        <View
                          key={i}
                          style={[
                            styles.sliderDotWhiteEmpty,
                            styles.center,
                            {marginRight: 6},
                          ]}>
                          <Animated.View
                            style={[styles.sliderDotWhite, {opacity}]}
                          />
                        </View>
                      );
                    })
                  : dummyList.map((_, i) => {
                      let opacity = position.interpolate({
                        inputRange: [i - 1, i, i + 1],
                        outputRange: [0, 1, 0],
                        extrapolate: 'clamp',
                      });
                      return (
                        <View
                          key={i}
                          style={[
                            styles.sliderDotWhiteEmpty,
                            styles.center,
                            {marginRight: 6},
                          ]}>
                          <Animated.View
                            style={[styles.sliderDotWhite, {opacity}]}
                          />
                        </View>
                      );
                    })}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 18,
                marginTop: 20,
              }}>
              <TouchableOpacity
                style={style.exhibitionButton}
                onPress={() => this.props.navigation.navigate('AllExhibition')}>
                <Image source={exhibitionListIcon} />
                <Text style={style.buttonText}>전시 목록</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.exhibitionButton}
                onPress={() =>
                  this.props.navigation.navigate('AllExhibitionReview')
                }>
                <Image source={exhibitionReviewIcon} />
                <Text style={style.buttonText}>전시 감상</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.pt30]}>
            <View>
              <View style={[styles.ml15, styles.mb10]}>
                <Text
                  style={[
                    styles.fontMedium,
                    styles.font15,
                    {color: '#a7a7a7'},
                  ]}>
                  당신을 위한 추천
                </Text>
                <Text
                  style={[styles.fontBold, styles.font20, {color: '#222222'}]}>
                  추천하는 전시
                </Text>
              </View>
              <ImageBackground
                source={require('../../assets/images/gradient_small.png')}
                style={[{width}]}>
                <View style={[{height: 220}]}>
                  {recommendedExhibitions &&
                  recommendedExhibitions.length > 0 ? (
                    <ScrollView
                      horizontal={true}
                      alwaysBounceVertical={false}
                      pagingEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      onScroll={Animated.event([
                        {
                          nativeEvent: {
                            contentOffset: {
                              x: this.state.scrollX2,
                            },
                          },
                        },
                      ])}
                      scrollEventThrottle={16}>
                      {recommendedExhibitions.map((exhibition, index) => {
                        return (
                          <ExhibitionCard
                            from={'Exhibition'}
                            key={index}
                            exhibition={exhibition}
                            navigation={this.props.navigation}
                          />
                        );
                      })}
                    </ScrollView>
                  ) : (
                    <View
                      style={[
                        {width, height: '100%'},
                        styles.alignItemsCenter,
                        styles.justifyContentCenter,
                      ]}>
                      <Text
                        style={[
                          styles.fontMedium,
                          styles.font15,
                          styles.mt40,
                          styles.grayA7,
                          styles.textCenter,
                        ]}>
                        전시가 없습니다.
                      </Text>
                    </View>
                  )}
                </View>
                <View style={[styles.alignItemsCenter, {width: width}]}>
                  <View style={[{flexDirection: 'row'}]}>
                    {recommendedExhibitions && recommendedExhibitions.length > 0
                      ? recommendedExhibitions.map((_, ind) => {
                          let opacity2 = position2.interpolate({
                            inputRange: [ind - 1, ind, ind + 1],
                            outputRange: [0, 1, 0],
                            extrapolate: 'clamp',
                          });
                          return (
                            <View
                              key={ind}
                              style={[
                                styles.sliderDotWhiteEmptyLg,
                                styles.center,
                                {margin: 4},
                              ]}>
                              <Animated.View
                                style={[
                                  styles.sliderDotWhiteLg,
                                  {opacity: opacity2},
                                ]}
                              />
                            </View>
                          );
                        })
                      : dummyList.map((_, i) => {
                          let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0, 1, 0],
                            extrapolate: 'clamp',
                          });
                          return (
                            <View
                              key={i}
                              style={[
                                styles.sliderDotWhiteEmpty,
                                styles.center,
                                {marginRight: 6},
                              ]}>
                              <Animated.View
                                style={[styles.sliderDotWhite, {opacity}]}
                              />
                            </View>
                          );
                        })}
                  </View>
                </View>
                <View style={[{height: 40}]} />
              </ImageBackground>
            </View>
            <View style={styles.line} />
            <View>
              <View style={[styles.ml15, styles.mb10]}>
                <Text
                  style={[styles.fontBold, styles.font20, {color: '#222222'}]}>
                  새로 열린 전시
                </Text>
              </View>
              <View style={{height: 280}}>
                {newExhibitions && newExhibitions.length > 0 ? (
                  <ScrollView
                    contentContainerStyle={[styles.pl15]}
                    alwaysBounceVertical={false}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {newExhibitions.map((exhibition, index) => {
                      return (
                        <ExhibitionCard2
                          from={'Exhibition'}
                          key={index}
                          exhibition={exhibition}
                          navigation={this.props.navigation}
                        />
                      );
                    })}
                  </ScrollView>
                ) : (
                  <View
                    style={[
                      {width, height: '100%'},
                      styles.alignItemsCenter,
                      styles.justifyContentCenter,
                    ]}>
                    <Text
                      style={[
                        styles.fontMedium,
                        styles.font15,
                        styles.mt40,
                        styles.grayA7,
                        styles.textCenter,
                      ]}>
                      전시가 없습니다.
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.line} />
            <View>
              <View style={[styles.ml15, styles.mb10]}>
                <Text
                  style={[
                    styles.fontMedium,
                    styles.font15,
                    {color: '#a7a7a7'},
                  ]}>
                  아틔움이 주목하는
                </Text>
                <Text
                  style={[styles.fontBold, styles.font20, {color: '#222222'}]}>
                  핫한 전시
                </Text>
              </View>
              <View style={{height: 280}}>
                {hotExhibitions && hotExhibitions.length > 0 ? (
                  <ScrollView
                    contentContainerStyle={[styles.pl15]}
                    horizontal={true}
                    alwaysBounceVertical={false}
                    showsHorizontalScrollIndicator={false}>
                    {hotExhibitions.map((exhibition, index) => {
                      return (
                        <ExhibitionCard2
                          from={'Exhibition'}
                          key={index}
                          exhibition={exhibition}
                          navigation={this.props.navigation}
                        />
                      );
                    })}
                  </ScrollView>
                ) : (
                  <View
                    style={[
                      {width, height: '100%'},
                      styles.alignItemsCenter,
                      styles.justifyContentCenter,
                    ]}>
                    <Text
                      style={[
                        styles.fontMedium,
                        styles.font15,
                        styles.mt40,
                        styles.grayA7,
                        styles.textCenter,
                      ]}>
                      전시가 없습니다.
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={[styles.bgGrayEb]}>
              <View style={[styles.ml15, styles.mb10, {marginTop: 35}]}>
                <Text
                  style={[styles.fontBold, styles.font20, {color: '#222222'}]}>
                  최근 지나친 전시
                </Text>
              </View>
              <View style={{height: 280}}>
                {pastExhibitions && pastExhibitions.length > 0 ? (
                  <ScrollView
                    contentContainerStyle={[styles.pl15]}
                    horizontal={true}
                    alwaysBounceVertical={false}
                    showsHorizontalScrollIndicator={false}>
                    {pastExhibitions.map((exhibition, index) => {
                      return (
                        <ExhibitionCard2
                          from={'Exhibition'}
                          key={index}
                          exhibition={exhibition}
                          navigation={this.props.navigation}
                        />
                      );
                    })}
                  </ScrollView>
                ) : (
                  <View
                    style={[
                      {width, height: '100%'},
                      styles.alignItemsCenter,
                      styles.justifyContentCenter,
                    ]}>
                    <Text
                      style={[
                        styles.fontMedium,
                        styles.font15,
                        styles.mt40,
                        styles.grayA7,
                        styles.textCenter,
                      ]}>
                      전시가 없습니다.
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const style = {
  exhibitionButton: {
    width: deviceInfo.size.width / 2 - 28,
    height: 40,
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    marginLeft: 20,
    fontWeight: '500',
    fontSize: 14,
    opacity: 0.5,
  },
};

export default ExhibitionScreen;
