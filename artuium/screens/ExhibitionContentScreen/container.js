import React, { Component } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import ExhibitionContentScreen from './presenter';

class Container extends Component{
    static propTypes = {
        likeExhibition: PropTypes.func.isRequired,
        unlikeExhibition: PropTypes.func.isRequired,
        getExhibitionReviewList: PropTypes.func.isRequired,
        getExhibitionReviewListMore: PropTypes.func.isRequired,
        createExhibitionReview: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        const exhibition = props.navigation.getParam('exhibition', null)
        const { is_liked, like_count, review_count, is_reviewed, total_rate } = exhibition;
        this.state = {
            exhibition,
            is_liked,
            is_reviewed,
            like_count,
            review_count,
            loading: true,
            isSubmitting: false,
            page: 1,
            hasNextPage: true,
            isLoadingMore: false,
            reviews: [],
            refreshing: false,
            myReviews: [],
            mode: 'list',
            rating: 0,
            expression: '',
            content: '',
            isSubmittingReview: false,
            total_rate,
            showingReview: {}
        }
    }

    componentDidMount = async() => {
        const { exhibition : { id } } = this.state;
        const { getExhibitionReviewList } = this.props;
        const result = await getExhibitionReviewList(id)
        if(result.status === 'ok'){
            this.setState({
                loading: false,
                reviews: result.reviews,
                myReviews: result.my_review,
                thumb: result.thumb,
                good: result.good,
                soso: result.soso,
                sad: result.sad,
                surprise: result.surprise,
            })
        }
        else{
            this.setState({
                loading: false
            })
        }
    }

    _reviewListMore = async() => {
        const { getExhibitionReviewListMore } = this.props;
        const { page, hasNextPage, isLoadingMore, exhibition : { id } } = this.state;
        if(hasNextPage){
            if(!isLoadingMore){
                await this.setState({
                    isLoadingMore: true
                });
                const result = await getExhibitionReviewListMore(id, page+1);
                if(result.status === 'ok'){
                    await this.setState({
                        page: this.state.page+1,
                        isLoadingMore: false,
                        reviews: [...this.state.reviews, ...result.reviews]
                    })
                }
                else{
                    this.setState({
                        isLoadingMore: false,
                        hasNextPage: false
                    })
                }
            }
        }
    }

    _refresh = async() => {
        const { getExhibitionReviewList } = this.props;
        const { exhibition : { id } } = this.state;
        this.setState({
            refreshing: true,
            isLoadingMore: false,
            page: 1,
            hasNextPage: true,
        })

        const result = await getExhibitionReviewList(id)
        if(result.status === 'ok'){
            this.setState({
                loading: false,
                reviews: result.reviews,
                refreshing: false,
                myReviews: result.my_review,
                thumb: result.thumb,
                good: result.good,
                soso: result.soso,
                sad: result.sad,
                surprise: result.surprise,
            })
        }
        else{
            this.setState({
                loading: false,
                reviews: [],
                refreshing: false
            })
        }
    }  

    _like = async() => {
        const { is_liked, isSubmitting, exhibition : { id } } = this.state;
        const { likeExhibition } = this.props;
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
        const { is_liked, isSubmitting, exhibition : { id } } = this.state;
        const { unlikeExhibition } = this.props;
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
                }
                else{
                    this.setState({
                        isSubmitting: false
                    })
                }
            }
        }
    }
    
    _handleChangeMode = (mode, showingReview) => {
        if(mode === 'review'){
            this.setState({
                mode,
                rating: 0,
                expression: '',
                content: '',
                showingReview
            })
        }
        else{
            this.setState({
                mode,
                rating: 0,
                expression: '',
                content: ''
            })
        }
    }

    _handleChangeExpression = (expression) => {
        this.setState({
            expression
        })
    }

    _handleChangeRating = (rating) => {
        this.setState({
            rating
        })
    }

    _handleChangeContent = (content) => {
        this.setState({
            content
        })
    }

    _submit = async() => {
        const { rating, expression, content, isSubmittingReview, exhibition : { id } } = this.state;
        const { createExhibitionReview } = this.props;
        if(!isSubmittingReview){
            if(rating && expression && content){
                this.setState({
                    isSubmittingReview: true
                })
                const result = await createExhibitionReview(id, rating, expression, content)
                if(result.status === 'ok'){
                    this.setState({
                        reviews: [...this.state.reviews, result.review],
                        myReviews: [result.review, ...this.state.myReviews],
                        total_rate: result.total_rate,
                        thumb: result.thumb,
                        good: result.good,
                        soso: result.soso,
                        sad: result.sad,
                        surprise: result.surprise,
                        isSubmittingReview: false,
                        mode: 'list',
                        is_reviewed: true
                    })
                }
                else if(result.error){
                    this.setState({
                        isSubmittingReview: false
                    })
                    Alert.alert(null, result.error)
                }
                else{
                    this.setState({
                        isSubmittingReview: false
                    })
                    Alert.alert(null, '오류가 발생하였습니다.')
                }
            }
            else{
                Alert.alert(null, "감상 정보를 입력해주세요.")
            }
        }
    }

    render(){
        return(
            <ExhibitionContentScreen 
            {...this.props}
            {...this.state}
            like={this._like}
            unlike={this._unlike}
            reviewListMore={this._reviewListMore}
            refresh={this._refresh}
            handleChangeMode={this._handleChangeMode}
            handleChangeExpression={this._handleChangeExpression}
            handleChangeRating={this._handleChangeRating}
            handleChangeContent={this._handleChangeContent}
            submit={this._submit}
            />
        )
    }
}

export default Container;