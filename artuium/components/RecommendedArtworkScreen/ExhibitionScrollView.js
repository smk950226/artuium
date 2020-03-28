import React from 'react';
import {ScrollView, View} from 'react-native';
import {AllReviewCard} from '../AllReviewCard/AllReviewCard';
import {
  getCardLabelFromReview,
  getCardSubLabelFromReview,
  getImageUriFromReview,
  abbreviateNumber,
} from '../../util';
import stringStripHtml from 'string-strip-html';
import moment from 'moment';
import 'moment/locale/ko';

const ExhibitionScrollView = ({exhibitions, navigation}) => {
  return (
    <ScrollView style={{flexGrow: 1, paddingTop: 15, marginBottom: 15}}>
      {exhibitions && exhibitions.length > 0 ? (
        exhibitions.map((review, index) => {
          return (
            <>
              <AllReviewCard
                cardLabel={getCardLabelFromReview(review)}
                cardSubLabel={getCardSubLabelFromReview(review)}
                cardImageUri={getImageUriFromReview(review)}
                chatNum={abbreviateNumber(review.reply_count)}
                likeNum={abbreviateNumber(review.like_count)}
                content={stringStripHtml(review.content)}
                authorProfile={review.author.profile_image}
                interactionIcon={review.expression}
                starRateNum={review.rate}
                authorName={review.author.nickname}
                createdAt={moment(review.time).fromNow()}
                onPress={() =>
                  navigation.navigate('ExhibitionContent', {
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
  );
};

export default ExhibitionScrollView;
