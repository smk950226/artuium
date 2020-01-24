import React, { Component } from 'react';
import { Alert, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import ExhibitionContentScreen from './presenter';

class Container extends Component{
    static propTypes = {
        likeExhibition: PropTypes.func.isRequired,
        unlikeExhibition: PropTypes.func.isRequired,
        getExhibitionReviewList: PropTypes.func.isRequired,
        getExhibitionReviewListMore: PropTypes.func.isRequired,
        createExhibitionReview: PropTypes.func.isRequired,
        getReplyList: PropTypes.func.isRequired,
        getReplyListMore: PropTypes.func.isRequired,
        createReviewReply: PropTypes.func.isRequired,
        createReplyReply: PropTypes.func.isRequired,
        updateExhibitionReview: PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        const exhibition = props.navigation.getParam('exhibition', null)
        const mode = props.navigation.getParam('mode', null)
        const review = props.navigation.getParam('review', null)
        const from = props.navigation.getParam('from', null)
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
            mode: mode ? mode : 'list',
            rating: mode === 'create' ? review.rate : 0,
            expression: mode === 'create' ? review.expression : '',
            content: mode === 'create' ? review.content : '',
            isSubmittingReview: false,
            total_rate,
            showingReview: review ? review : {},
            loadingReply: false,
            isLoadingMoreReply: false,
            pageReply: 1,
            hasNextPageReply: true,
            replies: [],
            refreshingReply: false,
            contentReply: '',
            isSubmittingReply: false,
            selectedReply: {},
            initialMode: mode,
            from,
            review
        }
    }

    componentDidMount = async() => {
        const { exhibition : { id }, initialMode, showingReview } = this.state;
        if(initialMode === 'review'){
            this.setState({
                loadingReply: true,
                selectedReply: {}
            })
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
            const { getReplyList } = this.props;
            const result2 = await getReplyList(showingReview.id)
            if(result2.status === 'ok'){
                this.setState({
                    replies: result2.replies,
                    isLoadingMoreReply: false,
                    hasNextPageReply: true,
                    pageReply: 1,
                    loadingReply: false
                })
            }
            else if(result2.error){
                this.setState({
                    isLoadingMoreReply: false,
                    hasNextPageReply: true,
                    pageReply: 1,
                    loadingReply: false
                })
                Alert.alert(null, result2.error)
            }
            else{
                this.setState({
                    isLoadingMoreReply: false,
                    hasNextPageReply: true,
                    pageReply: 1,
                    loadingReply: false
                })
                Alert.alert(null, '오류가 발생하였습니다.')
            }
        }
        else{
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
    
    _handleChangeMode = async(mode, showingReview) => {
        if(mode === 'review'){
            this.setState({
                mode,
                rating: 0,
                expression: '',
                content: '',
                showingReview,
                loadingReply: true,
                selectedReply: {}
            })
            const { getReplyList } = this.props;
            const result = await getReplyList(showingReview.id)
            if(result.status === 'ok'){
                this.setState({
                    replies: result.replies,
                    isLoadingMoreReply: false,
                    hasNextPageReply: true,
                    pageReply: 1,
                    loadingReply: false
                })
            }
            else if(result.error){
                this.setState({
                    isLoadingMoreReply: false,
                    hasNextPageReply: true,
                    pageReply: 1,
                    loadingReply: false
                })
                Alert.alert(null, result.error)
            }
            else{
                this.setState({
                    isLoadingMoreReply: false,
                    hasNextPageReply: true,
                    pageReply: 1,
                    loadingReply: false
                })
                Alert.alert(null, '오류가 발생하였습니다.')
            }
        }
        else{
            this.setState({
                mode,
                rating: 0,
                expression: '',
                content: '',
                selectedReply: {}
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

    _handleChangeContentReply = (contentReply) => {
        this.setState({
            contentReply
        })
    }

    _submit = async() => {
        const { rating, expression, content, isSubmittingReview, exhibition : { id } } = this.state;
        const { createExhibitionReview } = this.props;
        if(!isSubmittingReview){
            if(rating || expression || content){
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
                        is_reviewed: true,
                        selectedReply: {}
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

    _update = async() => {
        const { rating, expression, content, isSubmittingReview, review: { id }, exhibition } = this.state;
        const { updateExhibitionReview } = this.props;
        if(!isSubmittingReview){
            if(rating || expression || content){
                this.setState({
                    isSubmittingReview: true
                })
                const result = await updateExhibitionReview(exhibition.id, id, rating, expression, content)
                if(result.status === 'ok'){
                    let newReviews = []
                    this.state.reviews.map(rev => {
                        if(rev.id === result.review.id){
                            newReviews.push(result.review)
                        }
                        else{
                            newReviews.push(rev)
                        }
                    })
                    let newMyReviews = []
                    this.state.myReviews.map(rev => {
                        if(rev.id === result.review.id){
                            newMyReviews.push(result.review)
                        }
                        else{
                            newMyReviews.push(rev)
                        }
                    })
                    this.setState({
                        reviews: newReviews,
                        myReviews: newMyReviews,
                        total_rate: result.total_rate,
                        thumb: result.thumb,
                        good: result.good,
                        soso: result.soso,
                        sad: result.sad,
                        surprise: result.surprise,
                        isSubmittingReview: false,
                        mode: 'list',
                        is_reviewed: true,
                        selectedReply: {}
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

    _replyListMore = async() => {
        const { getReplyListMore } = this.props;
        const { pageReply, hasNextPageReply, isLoadingMoreReply, showingReview : { id } } = this.state;
        if(hasNextPageReply){
            if(!isLoadingMoreReply){
                await this.setState({
                    isLoadingMoreReply: true
                });
                const result = await getReplyListMore(id, pageReply+1);
                if(result.status === 'ok'){
                    await this.setState({
                        pageReply: this.state.pageReply+1,
                        isLoadingMoreReply: false,
                        replies: [...this.state.replies, ...result.replies],
                        selectedReply: {}
                    })
                }
                else{
                    this.setState({
                        isLoadingMoreReply: false,
                        hasNextPageReply: false,
                        selectedReply: {}
                    })
                }
            }
        }
    }

    _refreshReply = async() => {
        const { getReplyList } = this.props;
        const { showingReview : { id } } = this.state;
        if(id){
            this.setState({
                refreshingReply: true,
                isLoadingMoreReply: false,
                pageReply: 1,
                hasNextPageReply: true,
                selectedReply: {}
            })
    
            const result = await getReplyList(id)
            if(result.status === 'ok'){
                this.setState({
                    loadingReply: false,
                    replies: result.replies,
                    refreshingReply: false,
                })
            }
            else{
                this.setState({
                    loadingReply: false,
                    replies: [],
                    refreshingReply: false
                })
            }
        }
    }

    _createReview = async() => {
        const { contentReply, isSubmittingReply, showingReview : { id }, selectedReply } = this.state;
        const { createReviewReply, createReplyReply } = this.props;
        if(!isSubmittingReply){
            if(selectedReply.id){
                if(contentReply){
                    this.setState({
                        isSubmittingReply: true
                    })
                    const result = await createReplyReply(selectedReply.id, contentReply)
                    if(result.status === 'ok'){
                        let newReplist = []
                        this.state.replies.map(rep => {
                            if(rep.id === selectedReply.id){
                                newReplist.push({
                                    ...rep,
                                    reply_count: rep.reply_count + 1,
                                    initial_replies: [
                                        ...rep.initial_replies,
                                        result.reply
                                    ]
                                })
                            }
                            else{
                                newReplist.push(rep)
                            }
                        })
                        this.setState({
                            replies: newReplist,
                            isSubmittingReply: false,
                            contentReply: '',
                            selectedReply: {}
                        })
                        Keyboard.dismiss()
    
    
                    }
                    else if(result.error){
                        this.setState({
                            isSubmittingReply: false
                        })
                        Alert.alert(null, result.error)
                    }
                    else{
                        this.setState({
                            isSubmittingReply: false
                        })
                        Alert.alert(null, '오류가 발생하였습니다.')
                    }
                }
            }
            else{
                if(id && contentReply){
                    this.setState({
                        isSubmittingReply: true
                    })
                    const result = await createReviewReply(id, contentReply)
                    if(result.status === 'ok'){
                        this.setState({
                            replies: [
                                ...this.state.replies,
                                result.reply
                            ],
                            isSubmittingReply: false,
                            contentReply: '',
                            selectedReply: {}
                        })
                        Keyboard.dismiss()
    
    
                    }
                    else if(result.error){
                        this.setState({
                            isSubmittingReply: false
                        })
                        Alert.alert(null, result.error)
                    }
                    else{
                        this.setState({
                            isSubmittingReply: false
                        })
                        Alert.alert(null, '오류가 발생하였습니다.')
                    }
                }
            }
        }
    }

    _selectReply = (selectedReply) => {
        this.setState({
            selectedReply
        })
    }

    _handleUpdateMode = (review) => {
        this.setState({
            review,
            mode: 'create',
            rating: review.rate,
            expression: review.expression,
            content: review.content,
        })
    }

    _deleteReview = (reviewId) => {
        let newMyReviews = []
        this.state.myReviews.map(rev => {
            if(rev.id === reviewId){
                return null
            }
            else{
                newMyReviews.push(rev)
            }
        })
        let newReviews = []
        this.state.reviews.map(rev => {
            if(rev.id === reviewId){
                return null
            }
            else{
                newReviews.push(rev)
            }
        })
        if(newMyReviews.length > 0){
            this.setState({
                myReviews: newMyReviews,
                reviews: newReviews,
                mode: 'list'
            })
        }
        else{
            this.setState({
                myReviews: [],
                is_reviewed: false,
                reviews: newReviews,
                mode: 'list'
            })
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
            replyListMore={this._replyListMore}
            refreshReply={this._refreshReply}
            handleChangeContentReply={this._handleChangeContentReply}
            createReview={this._createReview}
            selectReply={this._selectReply}
            update={this._update}
            handleUpdateMode={this._handleUpdateMode}
            deleteReview={this._deleteReview}
            />
        )
    }
}

export default Container;