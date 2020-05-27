import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import ExhibitionCard from '../../components/ExhibitionCard';
import ArtuiumCard from '../../components/ArtuiumCard';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Modal from 'react-native-modal';
import ExhibitionListCard from '../../components/ExhibitionListCard/ExhibitionListCard';
import {getGroupedExhibitionList} from '../../util';
import {backArrow, filterDownArrow} from '../../assets/images';

const statusBarHeight = getStatusBarHeight();
const filter = [
  {
    label: '신규순',
    value: 'new',
  },
  {
    label: '많은 댓글 순',
    value: 'comment',
  },
  {
    label: '많은 좋아요 순',
    value: 'like',
  },
  {
    label: '높은 별점 순',
    value: 'rate',
  },
];

const period = [
  {
    label: '현재전시',
    value: 'now',
  },
  {
    label: '지난전시',
    value: 'past',
  },
  {
    label: '예정전시',
    value: 'upcomming',
  },
];

const scale = [
  {
    label: '중대형',
    value: '중대형',
  },
  {
    label: '소형',
    value: '소형',
  },
];

const region = [
  {
    label: '서촌,광화문,시청',
    value: '서촌/광화문/시청',
  },
  {
    label: '삼청동',
    value: '삼청동',
  },
  {
    label: '평창동,성북,부안',
    value: '평창동/성북/부안',
  },
  {
    label: '한남동',
    value: '한남동',
  },
  {
    label: '홍대',
    value: '홍대',
  },
  {
    label: '성수',
    value: '성수',
  },
  {
    label: '인사동',
    value: '인사동',
  },
  {
    label: '청담,압구정',
    value: '청담/압구정',
  },
  {
    label: '기타 지역',
    value: 'else',
  },
];

const AllExhibitionScreen = props => {
  const [filterLabel, setFilterLabel] = useState('신규순');

  return (
    <Fragment>
      <View style={[styles.container]}>
        <View
          style={[
            {
              height: 50,
              marginTop: statusBarHeight,
              paddingLeft: 17,
              paddingRight: 16,
            },
            styles.bgWhite,
            styles.row,
            styles.alignItemsCenter,
            styles.justifyContentBetween,
            styles.borderBtmGrayDb,
          ]}>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.goBack(null)}>
            <View style={[styles.pr20]}>
              <Image
                source={backArrow}
                style={[{width: 9 * 1.6, height: 17 * 1.6}]}
              />
            </View>
          </TouchableWithoutFeedback>
          <Text style={[styles.fontBold, styles.font18]}>전시 목록</Text>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate('Search')}>
            <View style={[styles.pl20]}>
              <Image
                source={require('../../assets/images/search.png')}
                style={[{width: 17 * 1.6, height: 17 * 1.6}]}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={[
            styles.alignItemsCenter,
            styles.justifyContentBetween,
            styles.py10,
            props.period.value || props.scale.value || props.region.value
              ? null
              : styles.borderBtmGrayDb,
            {paddingLeft: 18, paddingRight: 13, flexDirection: 'row'},
          ]}>
          <View style={[styles.row, styles.alignItemsCenter]}>
            <TouchableWithoutFeedback onPress={props.openPeriodModal}>
              <View
                style={{
                  width: 52,
                  height: 25,
                  backgroundColor: '#f4f4f4',
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 5,
                }}>
                <Text
                  style={[
                    styles.fontBold,
                    styles.font15,
                    {color: '#2E2E2E', opacity: 0.5},
                  ]}>
                  기간
                </Text>
                <Image source={require('../../assets/images/arrow_down.png')} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={props.openScaleModal}>
              <View
                style={{
                  width: 52,
                  height: 25,
                  backgroundColor: '#f4f4f4',
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 5,
                }}>
                <Text
                  style={[
                    styles.fontBold,
                    styles.font15,
                    {color: '#2E2E2E', opacity: 0.5},
                  ]}>
                  규모
                </Text>
                <Image source={require('../../assets/images/arrow_down.png')} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={props.openRegionModal}>
              <View
                style={{
                  width: 52,
                  height: 25,
                  backgroundColor: '#f4f4f4',
                  borderRadius: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    styles.fontBold,
                    styles.font15,
                    {color: '#2E2E2E', opacity: 0.5},
                  ]}>
                  지역
                </Text>
                <Image source={require('../../assets/images/arrow_down.png')} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback onPress={props.openFilterModal}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 14, fontWeight: '500'}}>
                {filterLabel}
              </Text>
              <Image source={filterDownArrow} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {(props.period.value || props.scale.value || props.region.value) && (
          <View
            style={[
              styles.row,
              styles.alignItemsCenter,
              styles.pb10,
              styles.borderBtmGrayDb,
              {
                paddingHorizontal: 18,
              },
            ]}>
            {props.period.value && (
              <TouchableWithoutFeedback
                onPress={() => props.handlePeriodChange({})}>
                <View
                  style={[
                    styles.row,
                    styles.alignItemsCenter,
                    styles.justifyContentCenter,
                    styles.mr5,
                    {
                      backgroundColor: '#FA4D2C',
                      height: 25,
                      paddingLeft: 4,
                      paddingRight: 4,
                      borderRadius: 5,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.fontBold,
                      styles.font15,
                      styles.white,
                      {marginRight: 4},
                    ]}>{`${props.period.label}`}</Text>
                  <Image
                    source={require('../../assets/images/icon_close_white.png')}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
            {props.scale.value && (
              <TouchableWithoutFeedback
                onPress={() => props.handleScaleChange({})}>
                <View
                  style={[
                    styles.row,
                    styles.alignItemsCenter,
                    styles.justifyContentCenter,
                    styles.mr5,
                    {
                      backgroundColor: '#FA4D2C',
                      height: 25,
                      paddingLeft: 4,
                      paddingRight: 4,
                      borderRadius: 5,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.fontBold,
                      styles.font15,
                      styles.white,
                      {marginRight: 4},
                    ]}>{`${props.scale.label}`}</Text>
                  <Image
                    source={require('../../assets/images/icon_close_white.png')}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
            {props.region.value && (
              <TouchableWithoutFeedback
                onPress={() => props.handleRegionChange({})}>
                <View
                  style={[
                    styles.row,
                    styles.alignItemsCenter,
                    styles.justifyContentCenter,
                    styles.mr5,
                    {
                      backgroundColor: '#FA4D2C',
                      height: 25,
                      paddingLeft: 4,
                      paddingRight: 4,
                      borderRadius: 5,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.fontBold,
                      styles.font15,
                      styles.white,
                      {marginRight: 4},
                    ]}>{`${props.region.label}`}</Text>
                  <Image
                    source={require('../../assets/images/icon_close_white.png')}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        )}
        {props.loading ? (
          <View
            style={[
              styles.container,
              styles.alignItemsCenter,
              styles.justifyContentCenter,
            ]}>
            <ActivityIndicator size={'small'} color={'#000'} />
          </View>
        ) : props.exhibitions && props.exhibitions.length > 0 ? (
          <FlatList
            style={{paddingTop: 16}}
            data={getGroupedExhibitionList(props.exhibitions)}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 18,
                  marginBottom: 21,
                }}>
                <ExhibitionListCard
                  imageUrl={item[0].images[0].image}
                  exhibitionTitle={item[0].name}
                  galleryName={item[0].gallery.name}
                  openDate={item[0].open_date}
                  closeDate={item[0].close_date}
                  onPress={() =>
                    props.navigation.navigate('ExhibitionDetail', {
                      exhibition: item[0],
                      from: props.from,
                    })
                  }
                />

                {item[1] && (
                  <ExhibitionListCard
                    imageUrl={item[1].images[0].image}
                    exhibitionTitle={item[1].name}
                    galleryName={item[1].gallery.name}
                    openDate={item[1].open_date}
                    closeDate={item[1].close_date}
                    onPress={() =>
                      props.navigation.navigate('ExhibitionDetail', {
                        exhibition: item[1],
                        from: props.from,
                      })
                    }
                  />
                )}
              </View>

              // <ExhibitionCard
              //   from={'AllExhibition'}
              //   exhibition={item}
              //   full={true}
              //   navigation={props.navigation}
              // />
            )}
            numColumns={1}
            keyExtractor={item => String(item.id)}
            refreshing={props.refreshing}
            onRefresh={props.refresh}
            onEndReached={props.hasNextPage ? props.exhibitionMore : null}
            onEndReachedThreshold={0.5}
            bounces={true}
            ListFooterComponent={
              props.isLoadingMore ? (
                <View
                  style={[
                    styles.alignItemsCenter,
                    styles.justifyContentCenter,
                    styles.mt5,
                    styles.py5,
                  ]}>
                  <ActivityIndicator size={'small'} color={'#000000'} />
                </View>
              ) : null
            }
          />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={props.refreshing}
                onRefresh={props.refresh}
                tintColor={'#000000'}
              />
            }>
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
          </ScrollView>
        )}
      </View>
      <Modal
        isVisible={props.showFilterModal}
        backdropOpacity={0.26}
        onBackButtonPress={props.closeFilterModal}
        onBackdropPress={props.closeFilterModal}
        style={[styles.justifyContentEnd, {margin: 0}]}>
        <TouchableWithoutFeedback onPress={props.closeFilterModal}>
          <View
            style={[styles.container, styles.px0, styles.justifyContentEnd]}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.bgWhite,
                  styles.borderTopRadius10,
                  {paddingBottom: 150},
                ]}>
                <View style={[styles.borderBtmGray70, styles.py10]}>
                  <Text
                    style={[
                      styles.fontMedium,
                      styles.font17,
                      styles.textCenter,
                    ]}>
                    정렬
                  </Text>
                </View>
                {filter.map((fil, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => {
                      props.handleFilterChange(fil.value);
                      setFilterLabel(fil.label);
                    }}>
                    <View
                      style={[
                        styles.borderBtmGray70,
                        styles.py10,
                        styles.px25,
                      ]}>
                      <Text style={[styles.fontRegular, styles.font15]}>
                        {fil.label}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        isVisible={props.showPeriodModal}
        backdropOpacity={0.26}
        onBackButtonPress={props.closePeriodModal}
        onBackdropPress={props.closePeriodModal}
        style={[styles.justifyContentEnd, {margin: 0}]}>
        <TouchableWithoutFeedback onPress={props.closePeriodModal}>
          <View
            style={[styles.container, styles.px0, styles.justifyContentEnd]}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.bgWhite,
                  styles.borderTopRadius10,
                  {paddingBottom: 150},
                ]}>
                <View style={[styles.borderBtmGray70, styles.py10]}>
                  <Text
                    style={[
                      styles.fontMedium,
                      styles.font17,
                      styles.textCenter,
                    ]}>
                    기간
                  </Text>
                </View>
                {period.map((fil, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => props.handlePeriodChange(fil)}>
                    <View
                      style={[
                        styles.borderBtmGray70,
                        styles.py10,
                        styles.px25,
                      ]}>
                      <Text style={[styles.fontRegular, styles.font15]}>
                        {fil.label}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        isVisible={props.showScaleModal}
        backdropOpacity={0.26}
        onBackButtonPress={props.closeScaleModal}
        onBackdropPress={props.closeScaleModal}
        style={[styles.justifyContentEnd, {margin: 0}]}>
        <TouchableWithoutFeedback onPress={props.closeScaleModal}>
          <View
            style={[styles.container, styles.px0, styles.justifyContentEnd]}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.bgWhite,
                  styles.borderTopRadius10,
                  {paddingBottom: 150},
                ]}>
                <View style={[styles.borderBtmGray70, styles.py10]}>
                  <Text
                    style={[
                      styles.fontMedium,
                      styles.font17,
                      styles.textCenter,
                    ]}>
                    규모
                  </Text>
                </View>
                {scale.map((fil, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => props.handleScaleChange(fil)}>
                    <View
                      style={[
                        styles.borderBtmGray70,
                        styles.py10,
                        styles.px25,
                      ]}>
                      <Text style={[styles.fontRegular, styles.font15]}>
                        {fil.label}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal
        isVisible={props.showRegionModal}
        backdropOpacity={0.26}
        onBackButtonPress={props.closeRegionModal}
        onBackdropPress={props.closeRegionModal}
        style={[styles.justifyContentEnd, {margin: 0}]}>
        <TouchableWithoutFeedback onPress={props.closeRegionModal}>
          <View
            style={[styles.container, styles.px0, styles.justifyContentEnd]}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.bgWhite,
                  styles.borderTopRadius10,
                  {paddingBottom: 150},
                ]}>
                <View style={[styles.borderBtmGray70, styles.py10]}>
                  <Text
                    style={[
                      styles.fontMedium,
                      styles.font17,
                      styles.textCenter,
                    ]}>
                    지역
                  </Text>
                </View>
                {region.map((fil, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => props.handleRegionChange(fil)}>
                    <View
                      style={[
                        styles.borderBtmGray70,
                        styles.py10,
                        styles.px25,
                      ]}>
                      <Text style={[styles.fontRegular, styles.font15]}>
                        {fil.label}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Fragment>
  );
};

AllExhibitionScreen.propTypes = {
  loading: PropTypes.bool.isRequired,
  showFilterModal: PropTypes.bool.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  exhibitions: PropTypes.array,
  refreshing: PropTypes.bool.isRequired,
  period: PropTypes.object.isRequired,
  scale: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
  openFilterModal: PropTypes.func.isRequired,
  closeFilterModal: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  openPeriodModal: PropTypes.func.isRequired,
  closePeriodModal: PropTypes.func.isRequired,
  handlePeriodChange: PropTypes.func.isRequired,
  openScaleModal: PropTypes.func.isRequired,
  closeScaleModal: PropTypes.func.isRequired,
  handleScaleChange: PropTypes.func.isRequired,
  openRegionModal: PropTypes.func.isRequired,
  closeRegionModal: PropTypes.func.isRequired,
  handleRegionChange: PropTypes.func.isRequired,
  exhibitionMore: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
  showPeriodModal: PropTypes.bool.isRequired,
  showScaleModal: PropTypes.bool.isRequired,
  showRegionModal: PropTypes.bool.isRequired,
};

export default AllExhibitionScreen;
