import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArtuiumCard4 from './presenter';

class Container extends Component{
    static propTypes = {
        artwork: PropTypes.object.isRequired,
        likeArtwork: PropTypes.func.isRequired,
        unlikeArtwork: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        const { artwork : { is_liked, like_count, review_count } } = props;
        this.state = {
            is_liked,
            like_count,
            review_count,
            isSubmitting: false,
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.artwork !== this.props.artwork){
            const { artwork : { is_liked, like_count, review_count } } = this.props;
            this.setState({
                is_liked, 
                like_count, 
                review_count
            })
        }
    }

    _like = async() => {
        const { is_liked, isSubmitting } = this.state;
        const { likeArtwork, artwork : { id } } = this.props;
        if(!isSubmitting){
            if(!is_liked){
                this.setState({
                    isSubmitting: true
                })
                const result = await likeArtwork(id)
                if(result.status === 'ok'){
                    this.setState({
                        is_liked: true,
                        isSubmitting: false,
                        like_count: this.state.like_count + 1
                    })
                }
                else{
                    this.setState({
                        isSubmitting: false
                    })
                }
            }
        }
    }

    _unlike = async() => {
        const { is_liked, isSubmitting } = this.state;
        const { unlikeArtwork, artwork : { id } } = this.props;
        if(!isSubmitting){
            if(is_liked){
                this.setState({
                    isSubmitting: true
                })
                const result = await unlikeArtwork(id)
                if(result.status === 'ok'){
                    this.setState({
                        is_liked: false,
                        isSubmitting: false,
                        like_count: this.state.like_count - 1
                    })
                }
                else{
                    this.setState({
                        isSubmitting: false
                    })
                }
            }
        }
    }
    
    render(){
        return(
            <ArtuiumCard4 
            {...this.props}
            {...this.state}
            like={this._like}
            unlike={this._unlike}
            />
        )
    }
}

export default Container;