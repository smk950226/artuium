import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import NoticeScreen from '../../screens/NoticeScreen';
import NotificationScreen from '../../screens/NotificationScreen';
import {backArrow} from '../../assets/images';

const iosStatusBarHeight = getStatusBarHeight();

const {width, height} = Dimensions.get('window');

class AlertScreen extends Component {
  static propTypes = {
    clearNotification: PropTypes.func.isRequired,
    clearNotice: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const {index} = props;
    this.state = {
      index,
      routes: [
        {key: 'first', title: '알림'},
        {key: 'second', title: '공지사항'},
      ],
    };
  }

  _renderNoticeRouter = () => {
    return (
      <NoticeScreen
        navigation={this.props.navigation}
        handleNoticeNewChange={this.props.handleNoticeNewChange}
        clearNotice={this.props.clearNotice}
      />
    );
  };

  _renderNotificationRouter = () => {
    return (
      <NotificationScreen
        navigation={this.props.navigation}
        handleNotificationNewChange={this.props.handleNotificationNewChange}
        clearNotification={this.props.clearNotification}
      />
    );
  };

  render() {
    const {noticeNew, notificationNew} = this.props;
    return (
      <View style={[styles.container, styles.bgWhite]}>
        <View
          style={[
            styles.row,
            styles.alignItemsCenter,
            styles.borderBtmGrayE6,
            {marginTop: iosStatusBarHeight, height: 50, paddingHorizontal: 17},
          ]}>
          <TouchableOpacity
            style={{}}
            onPress={() => this.props.navigation.goBack(null)}>
            <Image source={backArrow} style={{width: 24}} />
          </TouchableOpacity>
        </View>
        <TabView
          navigationState={this.state}
          onIndexChange={index => this.setState({index})}
          swipeEnabled={false}
          renderScene={SceneMap({
            first: this._renderNotificationRouter,
            second: this._renderNoticeRouter,
          })}
          renderTabBar={props => (
            <TabBar
              {...props}
              activeColor={'#FA4D2C'}
              inactiveColor={'#e6e6e6'}
              labelStyle={[styles.font15, styles.fontMedium]}
              renderLabel={({route, focused}) => (
                <View>
                  <Text
                    style={{
                      ...styles.fontMedium,
                      ...styles.font15,
                      color: focused ? '#FA4D2C' : '#c4c4c4',
                    }}>
                    {route.title}
                  </Text>
                  {route.title === '공지사항' && noticeNew && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: -5,
                        backgroundColor: '#fa4d2c',
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                      }}
                    />
                  )}
                  {route.title === '알림' && notificationNew && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: -5,
                        backgroundColor: '#fa4d2c',
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                      }}
                    />
                  )}
                </View>
              )}
              bounces={false}
              indicatorStyle={{height: 2, backgroundColor: '#fa4d2c'}}
              style={{
                backgroundColor: '#ffffff',
              }}
            />
          )}
        />
      </View>
    );
  }
}

export default AlertScreen;
