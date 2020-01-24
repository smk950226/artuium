import React, { Component, Fragment } from 'react';
import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import NoticeScreen from '../../screens/NoticeScreen';
import NotificationScreen from '../../screens/NotificationScreen';

const iosStatusBarHeight = getStatusBarHeight()

const { width, height } = Dimensions.get('window');


class AlertScreen extends Component{
    static propTypes = {
        clearNotification: PropTypes.func.isRequired,
        clearNotice: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        const { index } = props;
        this.state = {
            index,
            routes: [
                { key: 'first', title: '알림' },
                { key: 'second', title: '공지사항' },
            ],
        }
    }

    _renderNoticeRouter = () => {
        return (
            <NoticeScreen navigation={this.props.navigation} handleNoticeNewChange={this.props.handleNoticeNewChange} clearNotice={this.props.clearNotice} />
        )
    }

    _renderNotificationRouter = () => {
        return (
            <NotificationScreen navigation={this.props.navigation} handleNotificationNewChange={this.props.handleNotificationNewChange} clearNotification={this.props.clearNotification} />
        )
    }

    render(){
        const { noticeNew, notificationNew } = this.props;
        return(
            <View style={[styles.container, styles.bgWhite]}>
                <View style={[styles.row, styles.alignItemsCenter, styles.justifyContentEnd, styles.px15, styles.borderBtmGrayE6, { marginTop: iosStatusBarHeight, height: 50 }]}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack(null)}>
                        <View>
                            <Text style={[styles.fontMedium, styles.font16, styles.gray93]}>
                                닫기
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <TabView
                    navigationState={this.state}
                    onIndexChange={index => this.setState({ index })}
                    swipeEnabled={false}
                    renderScene={SceneMap({
                        first: this._renderNotificationRouter,
                        second: this._renderNoticeRouter
                    })}
                    renderTabBar={props =>
                        <TabBar
                            {...props}
                            activeColor = {'#1162d0'}
                            inactiveColor = {'#e6e6e6'}
                            labelStyle = {[styles.font15, styles.fontMedium]}
                            renderLabel={({ route, focused }) => (
                                <View>
                                        <Text style={[styles.fontMedium, styles.font15, focused ? styles.blue : styles.grayE6]}>
                                            {route.title}
                                        </Text>
                                        {(route.title === '공지사항') && noticeNew && (
                                            <View style={[styles.bgRed, styles.circle6, focused ? null : {opacity: 0.4}, {position: 'absolute', top: 0, right: -5}]} />
                                        )}
                                        {(route.title === '알림') && notificationNew && (
                                            <View style={[styles.bgRed, styles.circle6, focused ? null : {opacity: 0.4}, {position: 'absolute', top: 0, right: -5}]} />
                                        )}
                                </View>
                                )}
                            bounces={false}
                            indicatorStyle={{ backgroundColor: '#1162d0', height: 1 }}
                            style={[styles.bgGrayF8]}
                        />
                    }
                />
            </View>
        )
    }
}

export default AlertScreen;