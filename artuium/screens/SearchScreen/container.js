import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchScreen from './presenter';

class Container extends Component{
    static propTypes = {
        search: PropTypes.func.isRequired
    }

    state = {
        q: "",
        focused: false,
        artworks: [],
        exhibitions: []
    }

    _handleQChange = async(q) => {
        this.setState({
            q
        })
        const result = await this.props.search(q)
        if(result){
            this.setState({
                artworks: result.artworks,
                exhibitions: result.exhibitions
            })
        }
    }

    _onFocus = () => {
        this.setState({
            focused: true
        })
    }

    _onBlur = () => {
        this.setState({
            focused: false
        })
    }

    _makeBlank = () => {
        this.setState({
            q: "",
            artworks: [],
            exhibitions: []
        })
    }

    render(){
        return(
            <SearchScreen 
            {...this.props}
            {...this.state}
            handleQChange={this._handleQChange}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            makeBlank={this._makeBlank}
            />
        )
    }
}

export default Container;