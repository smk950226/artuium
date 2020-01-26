import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import RecommendArtworkScreen from './presenter';
import { NavigationEvents } from "react-navigation";

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

    _remount = async() => {
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
            <Fragment>
                <NavigationEvents
                onWillFocus={payload => {
                    this._remount()
                }}
                />
                <RecommendArtworkScreen 
                {...this.props}
                {...this.state}
                remount={this._remount}
                />
            </Fragment>
        )
    }
}

export default Container;