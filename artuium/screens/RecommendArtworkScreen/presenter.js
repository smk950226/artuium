import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../../styles';
import ArtiumHeader from '../../components/ArtiumHeader/ArtiumHeader';
import {backArrow} from '../../assets/images';
import {
  getCardLabelFromReview,
  getCardSubLabelFromReview,
  getImageUriFromReview,
  abbreviateNumber,
} from '../../util';
import {AllReviewCard} from '../../components/AllReviewCard/AllReviewCard';
import stripHtml from 'string-strip-html';
import moment from 'moment';
import 'moment/locale/ko';

class RecommendArtworkScreen extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    users: PropTypes.array,
    artworks: PropTypes.array,
    exhibitions: PropTypes.array,
    remount: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isArtworkTabActive: false,
    };
  }

  render() {
    const {loading, users, artworks, exhibitions} = this.props;
    return (
      <Fragment>
        <SafeAreaView style={[styles.container]}>
          <ArtiumHeader
            label={'추천 감상'}
            leftOnPress={() => this.props.navigation.pop()}
            leftIcon={backArrow}
          />
          <View style={style.artworkExihibitionTabContainer}>
            <TouchableOpacity
              style={
                this.state.isArtworkTabActive
                  ? style.inactiveTab
                  : style.activeTab
              }
              onPress={() => this.setState({isArtworkTabActive: false})}>
              <Text
                style={
                  this.state.isArtworkTabActive
                    ? style.inactiveLabel
                    : style.activeLabel
                }>
                전시
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                this.state.isArtworkTabActive
                  ? style.activeTab
                  : style.inactiveTab
              }
              onPress={() => this.setState({isArtworkTabActive: true})}>
              <Text
                style={
                  this.state.isArtworkTabActive
                    ? style.activeLabel
                    : style.inactiveLabel
                }>
                작품
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {loading ? (
              <View
                style={[
                  styles.container,
                  styles.alignItemsCenter,
                  styles.justifyContentCenter,
                ]}>
                <ActivityIndicator size={'small'} color={'#000'} />
              </View>
            ) : this.state.isArtworkTabActive ? (
              artworks && artworks.length > 0 ? (
                artworks.map((review, index) => {
                  return (
                    <>
                      <AllReviewCard
                        cardLabel={getCardLabelFromReview(review)}
                        cardSubLabel={getCardSubLabelFromReview(review)}
                        cardImageUri={getImageUriFromReview(review)}
                        chatNum={abbreviateNumber(review.reply_count)}
                        likeNum={abbreviateNumber(review.like_count)}
                        content={stripHtml(review.content)}
                        authorProfile={review.author.profile_image}
                        interactionIcon={review.expression}
                        starRateNum={review.rate}
                        authorName={review.author.nickname}
                        createdAt={moment(review.time).fromNow()}
                        onPress={() =>
                          this.props.navigation.navigate('ArtworkContent', {
                            artwork: review.artwork,
                            mode: 'review',
                            review: review,
                            from: 'RecommendArtwork',
                          })
                        }
                        type={'artwork'}
                        reviewTitle={review.title}
                      />
                      <View style={{height: 20}} />
                    </>
                  );
                })
              ) : (
                <View />
              )
            ) : exhibitions && exhibitions.length > 0 ? (
              exhibitions.map((review, index) => {
                return (
                  <>
                    <AllReviewCard
                      cardLabel={getCardLabelFromReview(review)}
                      cardSubLabel={getCardSubLabelFromReview(review)}
                      cardImageUri={getImageUriFromReview(review)}
                      chatNum={abbreviateNumber(review.reply_count)}
                      likeNum={abbreviateNumber(review.like_count)}
                      content={stripHtml(review.content)}
                      authorProfile={review.author.profile_image}
                      interactionIcon={review.expression}
                      starRateNum={review.rate}
                      authorName={review.author.nickname}
                      createdAt={moment(review.time).fromNow()}
                      onPress={() =>
                        this.props.navigation.navigate('ExhibitionContent', {
                          exhibition: review.exhibition,
                          mode: 'review',
                          review: review,
                          from: 'RecommendArtwork',
                        })
                      }
                      type={'exhibition'}
                      reviewTitle={review.title}
                    />
                    <View style={{height: 20}} />
                  </>
                );
              })
            ) : (
              <View />
            )}
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default RecommendArtworkScreen;

const style = {
  artworkExihibitionTabContainer: {
    flexDirection: 'row',
    height: 42,
    marginBottom: 15,
  },
  activeTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#fa4d2c',
  },
  inactiveTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#c4c4c4',
  },
  activeLabel: {
    fontSize: 14,
    color: '#fa4d2c',
    letterSpacing: -0.24,
    fontFamily: 'NotoSansKR-Medium',
  },
  inactiveLabel: {
    fontSize: 14,
    color: '#c4c4c4',
    letterSpacing: -0.24,
    fontFamily: 'NotoSansKR-Medium',
  },
};
