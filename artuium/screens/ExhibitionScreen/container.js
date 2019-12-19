import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import ExhibitionScreen from './presenter';

class Container extends Component{
    static propTypes = {
        initialStatus: PropTypes.string,
        newExhibitions: PropTypes.array,
        recommendedExhibitions: PropTypes.array,
        hotExhibitions: PropTypes.array,
        pastExhibitions: PropTypes.array,
        initialExhibition: PropTypes.func.isRequired,
        checkNoticeAll: PropTypes.func.isRequired
    }

    state = {
        loading: true,
        fetchedNew: false,
        fetchedRecommended: false,
        fetchedHot: false,
        fetchedPast: false,
        fetchClear: false,
        showNoticeModal: false,
        noticeNew: false,
        refreshing: false
    }

    componentDidMount = async() => {
        const { initialExhibition, checkNoticeAll } = this.props;
        const noticeNew = await checkNoticeAll()
        if(noticeNew.is_new){
            this.setState({
                noticeNew: true
            })
        }
        await initialExhibition()
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedNew, fetchedRecommended, fetchedHot, fetchedPast } = prevState;
        let update = {}
        if((nextProps.newExhibitions)){
            update.fetchedNew = true
        }
        if((nextProps.recommendedExhibitions)){
            update.fetchedRecommended = true
        }
        if((nextProps.hotExhibitions)){
            update.fetchedHot = true
        }
        if((nextProps.pastExhibitions)){
            update.fetchedPast = true
        }

        return update
    }

    componentDidUpdate = () => {
        if(this.state.fetchedNew && this.state.fetchedRecommended && this.state.fetchedHot && this.state.fetchedPast && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true
            })
        }
    }

    _refresh = async() => {
        const { initialExhibition, checkNoticeAll } = this.props;
        this.setState({
            refreshing: false
        })
        const noticeNew = await checkNoticeAll()
        if(noticeNew.is_new){
            this.setState({
                noticeNew: true
            })
        }
        await initialExhibition()
        this.setState({
            refreshing: false
        })
    }

    _openNoticeModal = () => {
        this.setState({
            showNoticeModal: true
        })
    }

    _closeNoticeModal = () => {
        this.setState({
            showNoticeModal: false
        })
    }
    _handleNoticeNewChange = (noticeNew) => {
        this.setState({
            noticeNew
        })
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
                <ExhibitionScreen 
                    {...this.props}
                    {...this.state}
                    openNoticeModal={this._openNoticeModal}
                    closeNoticeModal={this._closeNoticeModal}
                    handleNoticeNewChange={this._handleNoticeNewChange}
                    refresh={this._refresh}
                />
            )
        }
    }
}

export default Container;