import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecommendArtworkScreen from './presenter';

class Container extends Component{
    static propTypes = {
        recommended: PropTypes.func.isRequired
    }

    state = {
        loading: true,
        users: [],
        artworks: [],
        exhibitions: []
    }

    componentDidMount = async() => {
        const { recommended } = this.props;
        const result = await recommended()
        this.setState({
            users: result.users,
            artworks: result.artworks,
            exhibitions: result.exhibitions,
            loading: false
        })
    }

    render(){
        return(
            <RecommendArtworkScreen 
            {...this.props}
            {...this.state}
            />
        )
    }
}

export default Container;