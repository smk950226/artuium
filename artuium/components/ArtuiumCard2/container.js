import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArtuiumCard2 from './presenter';

class Container extends Component{
    static propTypes = {
        artwork: PropTypes.object.isRequired
    }

    state = {
        isLiked: false
    }

    _like = () => {
        this.setState({
            isLiked: true
        })
    }

    _unLike = () => {
        this.setState({
            isLiked: false
        })
    }
    
    render(){
        return(
            <ArtuiumCard2 
            {...this.props}
            {...this.state}
            like={this._like}
            unLike={this._unLike}
            />
        )
    }
}

export default Container;