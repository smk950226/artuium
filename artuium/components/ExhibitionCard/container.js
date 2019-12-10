import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExhibitionCard from './presenter';

class Container extends Component{
    static propTypes = {
        exhibition: PropTypes.object.isRequired,
        likeExhibition: PropTypes.func.isRequired,
        unlikeExhibition: PropTypes.func.isRequired,
        initialExhibition: PropTypes.func.isRequired
    }

    constructor(props){
        super(props);
        const { exhibition : { is_liked, like_count, review_count } } = props;
        this.state = {
            is_liked,
            like_count,
            review_count,
            isSubmitting: false,
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevProps.review !== this.props.review){
            const { exhibition : { is_liked, like_count, review_count } } = this.props;
            this.setState({
                is_liked, 
                like_count, 
                review_count
            })
        }
    }

    _like = async() => {
        const { is_liked, isSubmitting } = this.state;
        const { likeExhibition, initialExhibition, exhibition : { id } } = this.props;
        if(!isSubmitting){
            if(!is_liked){
                this.setState({
                    isSubmitting: true
                })
                const result = await likeExhibition(id)
                if(result.status === 'ok'){
                    this.setState({
                        is_liked: true,
                        isSubmitting: false,
                        like_count: this.state.like_count + 1
                    })
                    initialExhibition()
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
        const { unlikeExhibition, initialExhibition, exhibition : { id } } = this.props;
        if(!isSubmitting){
            if(is_liked){
                this.setState({
                    isSubmitting: true
                })
                const result = await unlikeExhibition(id)
                if(result.status === 'ok'){
                    this.setState({
                        is_liked: false,
                        isSubmitting: false,
                        like_count: this.state.like_count - 1
                    })
                    initialExhibition()
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
            <ExhibitionCard 
                {...this.props}
                {...this.state}
                like={this._like}
                unlike={this._unlike}
            />
        )
    }
}

export default Container;