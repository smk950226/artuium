import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from '../../styles';
import PropTypes from 'prop-types';
import HomeScreen from './presenter';

class Container extends Component{
    static propTypes = {
        initialStatus: PropTypes.string,
        newReviews: PropTypes.array,
        recommendedReviews: PropTypes.array,
        followingReviews: PropTypes.array,
        initialReview: PropTypes.func.isRequired
    }

    state = {
        loading: true,
        fetchedNew: false,
        fetchedRecommended: false,
        fetchedFollowing: false,
        fetchClear: false
    }

    componentDidMount = async() => {
        const { initialReview } = this.props;
        await initialReview()
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { fetchedNew, fetchedRecommended, fetchedFollowing } = prevState;
        if((!fetchedNew) || (!fetchedRecommended) || (!fetchedFollowing)){
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

            return update
        }
        else{
            return null
        }
    }

    componentDidUpdate = () => {
        if(this.state.fetchedNew && this.state.fetchedRecommended && this.state.fetchedFollowing && !this.state.fetchClear){
            this.setState({
                loading: false,
                fetchClear: true
            })
        }
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
                <HomeScreen 
                    {...this.props}
                    {...this.state}
                />
            )
        }
    }
}

export default Container;