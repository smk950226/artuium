import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Notice from './presenter';

class Container extends Component{
    static propTypes = {
        notice: PropTypes.object.isRequired,
        checkNotice: PropTypes.func.isRequired,
        handleNoticeNewChange: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        const { notice : { is_new } } = props;
        this.state = {
            expand: false,
            is_new,
            isSubmitting: false
        }
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if(!prevState.expand && this.state.expand){
            const { checkNotice, handleNoticeNewChange, notice : { id }, clearNotice } = this.props;
            const { is_new, isSubmitting } = this.state;
            if(!isSubmitting){
                if(is_new){
                    this.setState({
                        isSubmitting: true
                    })
                    const result = await checkNotice(id)
                    if(result === 'clear'){
                        clearNotice()
                        handleNoticeNewChange(false)
                        this.setState({
                            is_new: false,
                            isSubmitting: false
                        })
                    }
                    else if(result){
                        this.setState({
                            is_new: false,
                            isSubmitting: false
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
        if(prevProps.notice !== this.props.notice){
            const { notice : { is_new } } = this.props;
            this.setState({
                is_new
            })
        }
    }

    _openExpand = () => {
        this.setState({
            expand: true
        })
    }

    _closeExpand = () => {
        this.setState({
            expand: false
        })
    }

    render(){
        return(
            <Notice 
            {...this.props} 
            {...this.state}
            openExpand={this._openExpand}
            closeExpand={this._closeExpand}
            />
        )
    }
}

export default Container;