import React, {Component} from 'react';
import {Alert} from 'react-native';
import PropTypes from 'prop-types';
import ReplyCard from './presenter';

class Container extends Component {
  static propTypes = {
    reply: PropTypes.object.isRequired,
    getRepliesList: PropTypes.func.isRequired,
    selectReply: PropTypes.func.isRequired,
    selectedReply: PropTypes.object,
    followUser: PropTypes.func.isRequired,
    unfollowUser: PropTypes.func.isRequired,
    initialReview: PropTypes.func.isRequired,
    reportUser: PropTypes.func.isRequired,
    reportReply: PropTypes.func.isRequired,
    blockReply: PropTypes.func.isRequired,
    blockUserList: PropTypes.array,
    blockReplyList: PropTypes.array,
    startUpdateReply: PropTypes.func.isRequired,
    newReply: PropTypes.object,
    deleteReviewReply: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const {
      reply,
      reply: {
        author: {is_me},
        reply_count,
      },
    } = props;
    this.state = {
      is_me,
      isSubmitting: false,
      mode: 'follower',
      page: 1,
      hasNextPage: true,
      isLoadingMore: false,
      reply,
      isReporting: false,
      isBlocking: false,
      hideDropdown: false,
      reply_count,
      isDeleting: false,
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.reply !== this.props.reply) {
      this.setState({
        reply: this.props.reply,
      });
    }
    if (prevProps.newReply !== this.props.newReply) {
      const {
        reply: {initial_replies},
      } = this.state;
      const {newReply} = this.props;
      let newReplies = [];
      initial_replies.map(rep => {
        if (rep.id === newReply.id) {
          newReplies.push(newReply);
        } else {
          newReplies.push(rep);
        }
      });
      this.setState({
        reply: {
          ...this.state.reply,
          initial_replies: newReplies,
        },
      });
    }
  };

  _replyListMore = async () => {
    const {getRepliesList} = this.props;
    const {
      page,
      hasNextPage,
      isLoadingMore,
      reply: {id},
    } = this.state;
    if (hasNextPage) {
      if (!isLoadingMore) {
        await this.setState({
          isLoadingMore: true,
        });
        const result = await getRepliesList(id, page);
        if (result.status === 'ok') {
          await this.setState({
            page: this.state.page + 1,
            hasNextPage: result.has_next_page,
            isLoadingMore: false,
            reply: {
              ...this.state.reply,
              initial_replies: [
                ...this.state.reply.initial_replies,
                ...result.replies,
              ],
            },
          });
        } else {
          this.setState({
            isLoadingMore: false,
            hasNextPage: false,
          });
        }
      }
    }
  };

  _handleOption = async (index, value, replyId, replyContent) => {
    if (value === '신고하기') {
      const {isReporting} = this.state;
      const {
        reportReply,
        reply: {id},
      } = this.props;
      if (!isReporting) {
        this.setState({
          isReporting: true,
        });
        if (replyId) {
          const result = await reportReply(replyId);
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
        } else {
          const result = await reportReply(id);
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
      }
    } else if (value === '숨기기') {
      const {isBlocking} = this.state;
      const {
        blockReply,
        reply: {id},
      } = this.props;
      if (!isBlocking) {
        this.setState({
          isBlocking: true,
        });
        if (replyId) {
          const result = await blockReply(replyId);
          if (result.status === 'ok') {
            if (this.props.addBlockReply) {
              this.setState({
                isBlocking: false,
                hideDropdown: true,
                reply_count: this.state.reply_count - 1,
              });
              this.props.addBlockReply(replyId);
            } else {
              this.setState({
                isBlocking: false,
                deleted: true,
                reply_count: this.state.reply_count - 1,
              });
            }
          } else if (result.error) {
            if (this.props.addBlockReply) {
              this.setState({
                isBlocking: false,
                hideDropdown: true,
                reply_count: this.state.reply_count - 1,
              });
              this.props.addBlockReply(replyId);
            } else {
              this.setState({
                isBlocking: false,
                deleted: true,
                reply_count: this.state.reply_count - 1,
              });
            }
          } else {
            this.setState({
              isBlocking: false,
            });
            Alert.alert(null, '오류가 발생하였습니다.');
          }
        } else {
          const result = await blockReply(id);
          if (result.status === 'ok') {
            if (this.props.addBlockReply) {
              this.setState({
                isBlocking: false,
                hideDropdown: true,
              });
              this.props.addBlockReply(id);
            } else {
              this.setState({
                isBlocking: false,
                deleted: true,
              });
            }
          } else if (result.error) {
            if (this.props.addBlockReply) {
              this.setState({
                isBlocking: false,
                hideDropdown: true,
              });
              this.props.addBlockReply(id);
            } else {
              this.setState({
                isBlocking: false,
                deleted: true,
              });
            }
          } else {
            this.setState({
              isBlocking: false,
            });
            Alert.alert(null, '오류가 발생하였습니다.');
          }
        }
      }
    } else if (value === '수정하기') {
      if (replyId && replyContent) {
        this.props.startUpdateReply(replyId, replyContent, true);
      } else {
        const {
          reply: {id, content},
          startUpdateReply,
        } = this.props;
        startUpdateReply(id, content);
      }
    } else if (value === '삭제하기') {
      const {isDeleting} = this.state;
      if (!isDeleting) {
        Alert.alert(
          null,
          '정말 삭제하시겠습니까?',
          [
            {
              text: 'YES',
              onPress: async () => {
                this.setState({
                  isDeleting: true,
                });
                if (replyId) {
                  const {deleteReviewReply} = this.props;
                  const result = await deleteReviewReply(replyId);
                  if (result.status === 'ok') {
                    const {
                      reply: {initial_replies},
                    } = this.state;
                    let newReplies = [];
                    initial_replies.map(rep => {
                      if (rep.id === replyId) {
                        return null;
                      } else {
                        newReplies.push(rep);
                      }
                    });
                    this.setState({
                      reply: {
                        ...this.state.reply,
                        initial_replies: newReplies,
                      },
                      reply_count: this.state.reply_count - 1,
                      isDeleting: false,
                    });
                  } else if (result.error) {
                    this.setState({
                      isDeleting: false,
                    });
                    Alert.alert(null, result.error);
                  } else {
                    this.setState({
                      isDeleting: false,
                    });
                    Alert.alert(null, '오류가 발생하였습니다.');
                  }
                } else {
                  const {deleteReviewReply} = this.props;
                  const {
                    reply: {id},
                  } = this.state;
                  const result = await deleteReviewReply(id);
                  if (result.status === 'ok') {
                    this.setState({
                      deleted: true,
                      isDeleting: false,
                    });
                  } else if (result.error) {
                    this.setState({
                      isDeleting: false,
                    });
                    Alert.alert(null, result.error);
                  } else {
                    this.setState({
                      isDeleting: false,
                    });
                    Alert.alert(null, '오류가 발생하였습니다.');
                  }
                }
              },
            },
            {
              text: 'CANCEL',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
          ],
          {cancelable: false},
        );
      }
    }
  };

  _reportUser = async (index, value) => {
    if (value === '신고하기') {
      const {isReporting} = this.state;
      const {
        reportUser,
        reply: {
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
        reply: {
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
            this.props.addBlockUser(id);
          } else {
            this.setState({
              isBlocking: false,
              deleted: true,
            });
          }
        } else if (result.error) {
          if (this.props.addBlockUser) {
            this.setState({
              isBlocking: false,
              hideDropdown: true,
            });
            this.props.addBlockUser(id);
          } else {
            this.setState({
              isBlocking: false,
              deleted: true,
            });
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
    const {reply} = this.state;
    return (
      <ReplyCard
        {...this.props}
        {...this.state}
        reply={reply}
        replyListMore={this._replyListMore}
        reportUser={this._reportUser}
        handleOption={this._handleOption}
      />
    );
  }
}

export default Container;
