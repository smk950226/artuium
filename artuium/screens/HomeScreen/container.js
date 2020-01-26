import React, { Component, Fragment } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import HomeScreen from './presenter';
import firebase from 'react-native-firebase';
import { NavigationEvents } from "react-navigation";

class Container extends Component{
    static propTypes = {
        banners: PropTypes.array,
        newReviews: PropTypes.array,
        recommendedReviews: PropTypes.array,
        followingReviews: PropTypes.array,
        initApp: PropTypes.func.isRequired,
        checkNoticeAll: PropTypes.func.isRequired,
        checkNotificationAll: PropTypes.func.isRequired,
        setPushToken: PropTypes.func.isRequired,
        getNoticeNew: PropTypes.func.isRequired,
        getNotificationNew: PropTypes.func.isRequired,
        noticeNew: PropTypes.bool,
        notificationNew: PropTypes.bool,
        getRecommendedReview: PropTypes.func.isRequired,
        getNewReview: PropTypes.func.isRequired,
        getFollowingReview: PropTypes.func.isRequired,
    }

    constructor(props){
        super(props);
        const { noticeNew, notificationNew } = props;
        this.state = {
            loading: false,
            fetchedProfile: false,
            fetchedNew: false,
            fetchedRecommended: false,
            fetchedFollowing: false,
            fetchClear: false,
            noticeNew,
            notificationNew,
            pushPermission: false
        }
    }

    _getToken = async() => {
        const { profile, setPushToken } = this.props;
        if(profile){
            fcmToken = await firebase.messaging().getToken();
            if(fcmToken) {
                if(profile.push_token !== fcmToken){
                    const result =  await setPushToken(fcmToken);
                }
            }
        }
    };

    _checkPermission = async () => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.setState({
                pushPermission: true
            })
            // this._getToken();
        } 
        else {
            this._requestPermission();
        }
    };

    _requestPermission = async () => {
        try {
            await firebase.messaging().requestPermission();
            this.setState({
                pushPermission: true
            })
            // this._getToken();
        } catch (error) {
        }
    };

    componentDidMount = async() => {
        const { initApp, checkNoticeAll, checkNotificationAll, getNoticeNew, getNotificationNew } = this.props;
        const noticeNew = await checkNoticeAll()
        const notificationNew = await checkNotificationAll()
        // this.props.resetBlockUser()
        // this.props.resetBlockReview()
        // this.props.resetBlockReply()
        if(noticeNew.is_new){
            getNoticeNew(true)
            this.setState({
                noticeNew: true
            })
        }
        else{
            getNoticeNew(false)
            this.setState({
                noticeNew: false
            })
        }
        if(notificationNew.is_new){
            getNotificationNew(true)
            this.setState({
                notificationNew: true
            })
        }
        else{
            getNotificationNew(false)
            this.setState({
                notificationNew: false
            })
        }
        await initApp()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.noticeNew !== this.props.noticeNew){
            this.setState({
                noticeNew: this.props.noticeNew
            })
        }
        if(prevProps.notificationNew !== this.props.notificationNew){
            this.setState({
                notificationNew: this.props.notificationNew
            })
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedNew, fetchedRecommended, fetchedFollowing, fetchedProfile } = prevState;
        if((!fetchedNew) || (!fetchedRecommended) || (!fetchedFollowing) || (!fetchedProfile)){
            let update = {}
            if((nextProps.newReviews)){
                update.fetchedNew = true
            }
            if((nextProps.recommendedReviews)){
                update.fetchedRecommended = true
            }
            if((nextProps.followingReviews)){
                update.fetchedFollowing = true
            }
            if(nextProps.profile){
                update.fetchedProfile = true
            }

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = () => {
        if(this.props.profile && this.state.fetchedNew && this.state.fetchedRecommended && this.state.fetchedFollowing && this.state.fetchedProfile && !this.state.fetchClear){
            this.setState({
                fetchClear: true
            })
            if(this.state.pushPermission){
                this._getToken()
            }
        }
    }

    _handleNoticeNewChange = (noticeNew) => {
        this.props.getNoticeNew(noticeNew)
        this.setState({
            noticeNew
        })
    }

    _handleNotificationNewChange = (notificationNew) => {
        this.props.getNotificationNew(notificationNew)
        this.setState({
            notificationNew
        })
    }

    _remount = async() => {
        const { initApp, checkNoticeAll, checkNotificationAll, getNoticeNew, getNotificationNew } = this.props;
        const noticeNew = await checkNoticeAll()
        const notificationNew = await checkNotificationAll()
        if(noticeNew.is_new){
            getNoticeNew(true)
            this.setState({
                noticeNew: true
            })
        }
        else{
            getNoticeNew(false)
            this.setState({
                noticeNew: false
            })
        }
        if(notificationNew.is_new){
            getNotificationNew(true)
            this.setState({
                notificationNew: true
            })
        }
        else{
            getNotificationNew(false)
            this.setState({
                notificationNew: false
            })
        }
        await initApp()
    }

    render(){
        const { loading } = this.state;
        if(loading){
            return(
                <View style={[styles.container, styles.alignItemsCenter, styles.justifyContentCenter]}>
                    <ActivityIndicator size={'small'} color={'#000'} />
                </View>
            )
        }
        else{
            return(
                <Fragment>
                    <NavigationEvents
                    onWillFocus={payload => {
                        this._remount()
                    }}
                    />
                    <HomeScreen 
                        {...this.props}
                        {...this.state}
                        handleNoticeNewChange={this._handleNoticeNewChange}
                        handleNotificationNewChange={this._handleNotificationNewChange}
                        remount={this._remount}
                    />
                </Fragment>
                
            )
        }
    }
}

export default Container;