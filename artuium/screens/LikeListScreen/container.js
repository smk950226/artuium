import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LikeListScreen from './presenter';

class Container extends Component{
    static propTypes = {
        profile: PropTypes.object.isRequired,
        getReviewLikeList: PropTypes.func.isRequired,
        getReviewLikeListMore: PropTypes.func.isRequired,
        getArtworkLikeList: PropTypes.func.isRequired,
        getArtworkLikeListMore: PropTypes.func.isRequired,
        getExhibitionLikeList: PropTypes.func.isRequired,
        getExhibitionLikeListMore: PropTypes.func.isRequired
    }

    render(){
        return(
            <LikeListScreen 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;