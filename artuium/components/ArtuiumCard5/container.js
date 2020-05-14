import React, {Component} from 'react';
import {Alert} from 'react-native';
import PropTypes from 'prop-types';
import ArtuiumCard5 from './presenter';

class Container extends Component {
  static propTypes = {
    review: PropTypes.object.isRequired,
    followUser: PropTypes.func.isRequired,
    unfollowUser: PropTypes.func.isRequired,
    likeReview: PropTypes.func.isRequired,
    unlikeReview: PropTypes.func.isRequired,
    my: PropTypes.bool,
    handleChangeMode: PropTypes.func,
    reportReview: PropTypes.func.isRequired,
    deleteExhibitionReview: PropTypes.func.isRequired,
    deleteArtworkReview: PropTypes.func.isRequired,
    reportUser: PropTypes.func.isRequired,
    blockReview: PropTypes.func.isRequired,
    blockUser: PropTypes.func.isRequired,
    addBlockReview: PropTypes.func.isRequired,
    addBlockUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const {
      review: {
        author: {is_me},
        is_liked,
        like_count,
        reply_count,
      },
    } = props;
    this.state = {
      is_liked,
      like_count,
      reply_count,
      is_me,
      mode: 'follower',
      isSubmitting: false,
      isReporting: false,
      isBlocking: false,
      hideDropdown: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.review !== this.props.review) {
      const {
        review: {
          author: {is_me},
          is_liked,
          like_count,
          reply_count,
        },
      } = this.props;
      this.setState({
        is_me,
        is_liked,
        like_count,
        reply_count,
      });
    }
  };

  _like = async () => {
    const {is_liked, isSubmitting} = this.state;
    const {
      likeReview,
      review: {id},
    } = this.props;
    if (!isSubmitting) {
      if (!is_liked) {
        this.setState({
          isSubmitting: true,
        });
        const result = await likeReview(id);
        if (result.status === 'ok') {
          this.setState({
            is_liked: true,
            isSubmitting: false,
            like_count: this.state.like_count + 1,
          });
        } else {
          this.setState({
            isSubmitting: false,
          });
        }
      }
    }
  };

  _unlike = async () => {
    const {is_liked, isSubmitting} = this.state;
    const {
      unlikeReview,
      review: {id},
    } = this.props;
    if (!isSubmitting) {
      if (is_liked) {
        this.setState({
          isSubmitting: true,
        });
        const result = await unlikeReview(id);
        if (result.status === 'ok') {
          this.setState({
            is_liked: false,
            isSubmitting: false,
            like_count: this.state.like_count - 1,
          });
        } else {
          this.setState({
            isSubmitting: false,
          });
        }
      }
    }
  };

  _handleOption = async (index, value) => {
    if (value === '신고하기') {
      const {isReporting, is_reported} = this.state;
      const {
        reportReview,
        review: {id},
      } = this.props;
      if (!isReporting) {
        if (is_reported) {
          Alert.alert(null, '이미 신고되었습니다.');
        } else {
          this.setState({
            isReporting: true,
          });
          const result = await reportReview(id);
          if (result.status === 'ok') {
            this.setState({
              is_reported: true,
              isReporting: false,
            });
            Alert.alert(null, '신고되었습니다.');
          } else if (result.error) {
            this.setState({
              isReporting: false,
            });
            Alert.alert(null, result.error);
          } else {
            this.setState({
              isReporting: false,
            });
            Alert.alert(null, '오류가 발생하였습니다.');
          }
        }
      }
    } else if (value === '수정하기') {
      const {review, goUpdate} = this.props;
      goUpdate(review);
    } else if (value === '삭제하기') {
      const {isDeleting} = this.state;
      const {
        deleteArtworkReview,
        deleteExhibitionReview,
        review,
        deleteReview,
      } = this.props;
      if (review.artwork) {
        if (!isDeleting) {
          Alert.alert(null, '정말 삭제하시겠습니까?', [
            {
              text: 'YES',
              onPress: async () => {
                this.setState({
                  isDeleting: true,
                });
                const result = await deleteArtworkReview(
                  review.artwork.id,
                  review.id,
                );
                if (result.status === 'ok') {
                  deleteReview(review.id);
                  this.setState({
                    isDeleting: false,
                    deleted: true,
                  });
                } else if (result.error) {
                  this.setState({
                    isDeleting: false,
                    deleted: true,
                  });
                } else {
                  this.setState({
                    isDeleting: false,
                    deleted: false,
                  });
                  Alert.alert(null, '오류가 발생하였습니다.');
                }
              },
            },
            {
              text: 'CANCEL',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]);
        }
      } else {
        if (!isDeleting) {
          Alert.alert(null, '정말 삭제하시겠습니까?', [
            {
              text: 'YES',
              onPress: async () => {
                this.setState({
                  isDeleting: true,
                });
                const result = await deleteExhibitionReview(
                  review.exhibition.id,
                  review.id,
                );
                if (result.status === 'ok') {
                  deleteReview(review.id);
                  this.setState({
                    isDeleting: false,
                    deleted: true,
                  });
                } else if (result.error) {
                  this.setState({
                    isDeleting: false,
                    deleted: true,
                  });
                } else {
                  this.setState({
                    isDeleting: false,
                    deleted: false,
                  });
                  Alert.alert(null, '오류가 발생하였습니다.');
                }
              },
            },
            {
              text: 'CANCEL',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ]);
        }
      }
    } else if (value === '숨기기') {
      const {isBlocking} = this.state;
      const {
        blockReview,
        review: {id},
      } = this.props;
      if (!isBlocking) {
        this.setState({
          isBlocking: true,
        });
        const result = await blockReview(id);
        if (result.status === 'ok') {
          if (this.props.addBlockReview) {
            this.setState({
              isBlocking: false,
              hideDropdown: true,
            });
            this.props.handleChangeMode('list');
            this.props.addBlockReview(id);
          } else {
            this.setState({
              isBlocking: false,
              deleted: true,
            });
            this.props.handleChangeMode('list');
          }
        } else if (result.error) {
          if (this.props.addBlockReview) {
            this.setState({
              isBlocking: false,
              hideDropdown: true,
            });
            this.props.handleChangeMode('list');
            this.props.addBlockReview(id);
          } else {
            this.setState({
              isBlocking: false,
              deleted: true,
            });
            this.props.handleChangeMode('list');
          }
        } else {
          this.setState({
            isBlocking: false,
          });
          Alert.alert(null, '오류가 발생하였습니다.');
        }
      }
    }
  };

  _reportUser = async (index, value) => {
    if (value === '신고하기') {
      const {isReporting} = this.state;
      const {
        reportUser,
        review: {
          author: {id},
        },
      } = this.props;
      if (!isReporting) {
        this.setState({
          isReporting: true,
        });
        const result = await reportUser(id);
        if (result.status === 'ok') {
          this.setState({
            isReporting: false,
          });
          Alert.alert(null, '신고되었습니다.');
        } else if (result.error) {
          this.setState({
            isReporting: false,
          });
          Alert.alert(null, result.error);
        } else {
          this.setState({
            isReporting: false,
          });
          Alert.alert(null, '오류가 발생하였습니다.');
        }
      }
    } else if (value === '숨기기') {
      const {isBlocking} = this.state;
      const {
        blockUser,
        review: {
          author: {id},
        },
      } = this.props;
      if (!isBlocking) {
        this.setState({
          isBlocking: true,
        });
        const result = await blockUser(id);
        if (result.status === 'ok') {
          if (this.props.addBlockUser) {
            this.setState({
              isBlocking: false,
              hideDropdown: true,
            });
            this.props.handleChangeMode('list');
            this.props.addBlockUser(id);
          } else {
            this.setState({
              isBlocking: false,
              deleted: true,
            });
            this.props.handleChangeMode('list');
          }
        } else if (result.error) {
          if (this.props.addBlockUser) {
            this.setState({
              isBlocking: false,
              hideDropdown: true,
            });
            this.props.handleChangeMode('list');
            this.props.addBlockUser(id);
          } else {
            this.setState({
              isBlocking: false,
              deleted: true,
            });
            this.props.handleChangeMode('list');
          }
        } else {
          this.setState({
            isBlocking: false,
          });
          Alert.alert(null, '오류가 발생하였습니다.');
        }
      }
    }
  };

  render() {
    return (
      <ArtuiumCard5
        {...this.props}
        {...this.state}
        like={this._like}
        unlike={this._unlike}
        handleOption={this._handleOption}
        reportUser={this._reportUser}
      />
    );
  }
}

export default Container;
