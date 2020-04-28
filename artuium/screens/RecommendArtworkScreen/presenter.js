import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import ArtiumHeader from '../../components/ArtiumHeader/ArtiumHeader';
import {backArrow} from '../../assets/images';
import {
  getCardLabelFromReview,
  getCardSubLabelFromReview,
  getImageUriFromReview,
  abbreviateNumber,
  deviceInfo,
} from '../../util';
import {AllReviewCard} from '../../components/AllReviewCard/AllReviewCard';
import stripHtml from 'string-strip-html';
import moment from 'moment';
import 'moment/locale/ko';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import ArtworkScrollView from '../../components/RecommendedArtworkScreen/ArtworkScrollView';
import ExhibitionScrollView from '../../components/RecommendedArtworkScreen/ExhibitionScrollView';

const iosStatusBarHeight = getStatusBarHeight();
class RecommendArtworkScreen extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    users: PropTypes.array,
    artworks: PropTypes.array,
    exhibitions: PropTypes.array,
    remount: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isArtworkTabActive: false,
      index: 0,
      routes: [{key: 'first', title: '전시'}, {key: 'second', title: '작품'}],
    };
  }

  render() {
    const {loading, users, artworks, exhibitions} = this.props;
    return (
      <View
        style={[
          styles.container,
          {marginTop: deviceInfo.OS === 'ios' ? iosStatusBarHeight : 0},
        ]}>
        <ArtiumHeader
          label={'추천 감상'}
          leftOnPress={() => this.props.navigation.pop()}
          leftIcon={backArrow}
        />
        {loading ? (
          <View
            style={[
              styles.container,
              styles.alignItemsCenter,
              styles.justifyContentCenter,
            ]}>
            <ActivityIndicator size={'small'} color={'#000'} />
          </View>
        ) : (
          <TabView
            navigationState={{
              index: this.state.index,
              routes: this.state.routes,
            }}
            onIndexChange={index => this.setState({index: index})}
            renderScene={SceneMap({
              first: () => (
                <ArtworkScrollView
                  artworks={artworks}
                  navigation={this.props.navigation}
                />
              ),
              second: () => (
                <ExhibitionScrollView
                  exhibitions={exhibitions}
                  navigation={this.props.navigation}
                />
              ),
            })}
            renderTabBar={props => (
              <TabBar
                {...props}
                activeColor={'#fa4d2c'}
                inactiveColor={'#c4c4c4'}
                labelStyle={[styles.font14, styles.fontMedium]}
                bounces={false}
                indicatorStyle={{backgroundColor: '#fa4d2c', height: 2}}
                style={{backgroundColor: 'white'}}
              />
            )}
          />
        )}
      </View>
    );
  }
}

export default RecommendArtworkScreen;
