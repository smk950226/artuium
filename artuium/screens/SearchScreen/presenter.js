import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import PropTypes from 'prop-types';
import styles from '../../styles';
import ExhibitionSearchCard from '../../components/ExhibitionSearchCard/ExhibitionSearchCard';
import moment from 'moment';
import 'moment/locale/ko';

const statusBarHeight = getStatusBarHeight();

const {width, height} = Dimensions.get('window');

const SearchScreen = props => (
  <>
    <View style={{...searchScreenStyles.headerContainer}}>
      <TouchableWithoutFeedback onPress={() => props.navigation.goBack(null)}>
        <Image
          source={require('../../assets/images/backArrow.png')}
          style={{width: 24, height: 24}}
        />
      </TouchableWithoutFeedback>
      <Text style={{...searchScreenStyles.headerTitleText}}>통합 검색</Text>
      <TouchableWithoutFeedback>
        <View style={[styles.hidden]}>
          <Image
            source={require('../../assets/images/search.png')}
            style={{width: 24, height: 24}}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
    <View
      style={[
        styles.row,
        styles.alignItemsCenter,
        styles.justifyContentBetween,
        styles.py15,
        {
          backgroundColor: '#f4f4f4',
          paddingHorizontal: 17,
          borderBottomColor: '#dfdfdf',
          borderBottomWidth: 1,
        },
      ]}>
      <View style={{...searchScreenStyles.textInputContainer}}>
        <TextInput
          style={{...searchScreenStyles.textInput}}
          placeholder={'찾으시는 전시를 입력해주세요'}
          placeholderTextColor={'#2e2e2e50'}
          underlineColorAndroid={'transparent'}
          autoCapitalize={'none'}
          autoCorrect={false}
          value={props.q}
          onChangeText={props.handleQChange}
          returnKeyType={'send'}
        />
        <TouchableOpacity onPress={props.makeBlank}>
          <Image
            source={require('../../assets/images/searchCancelIcon.png')}
            style={{width: 20, marginRight: 5}}
          />
        </TouchableOpacity>
      </View>
    </View>
    {props.exhibitions && props.exhibitions.length > 0 ? (
      <ScrollView
        contentContainerStyle={{
          marginHorizontal: 17,
          ...searchScreenStyles.resultContainer,
        }}>
        {props.exhibitions.map((exhibition, index) => {
          const nowOpen = moment(new Date()).isBefore(exhibition.open_date)
            ? '예정'
            : moment(new Date()).isBefore(exhibition.close_date)
            ? '진행'
            : '종료';
          const date =
            exhibition.open_date.split('-').join('.') +
            '-' +
            exhibition.close_date.split('-').join('.');
          return (
            <ExhibitionSearchCard
              onPress={() =>
                props.navigation.navigate('ExhibitionDetail', {
                  exhibition,
                  from: 'Search',
                })
              }
              title={exhibition.name}
              place={exhibition.gallery.name}
              date={date}
              nowOpen={nowOpen}
              imageSource={exhibition.images[0].image}
            />
          );
        })}
      </ScrollView>
    ) : (
      <View style={{marginTop: 150}}>
        <Text style={{...searchScreenStyles.noResultText}}>
          찾으시는 전시가 없습니다.
        </Text>
      </View>
    )}
  </>
);

const searchScreenStyles = {
  headerContainer: {
    height: 87,
    paddingTop: statusBarHeight,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 17,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleText: {
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.24,
    fontWeight: '500',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  textInputContainer: {
    width: '100%',
    height: 33,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    fontWeight: '500',
    width: width - 79,
    marginLeft: 11,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24,
    color: '#2E2E2E',
  },
  noResultText: {
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: -0.24,
    color: '#2E2E2E',
    opacity: 0.3,
  },
};

SearchScreen.propTypes = {
  q: PropTypes.string.isRequired,
  handleQChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  focused: PropTypes.bool.isRequired,
  artworks: PropTypes.array,
  exhibitions: PropTypes.array,
  makeBlank: PropTypes.func.isRequired,
};

export default SearchScreen;
