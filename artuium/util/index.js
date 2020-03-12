export const getImageUriFromReview = review => {
  return review.artwork
    ? review.artwork.image
    : review.exhibition
    ? review.exhibition.images && review.exhibition.images.length > 0
      ? review.exhibition.images[0].image
      : ''
    : '';
};

export const abbreviateNumber = value => {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ['', 'k', 'm', 'b', 't'];
    var suffixNum = Math.floor(('' + value).length / 3);
    var shortValue = '';
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision),
      );
      var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
};

export const getCardLabelFromReview = review => {
  return review.artwork ? review.artwork.name : review.exhibition.name;
};

export const getCardSubLabelFromReview = review => {
  return review.artwork
    ? review.artwork.author.name
    : `${review.exhibition.open_date.slice(
        0,
        4,
      )}.${review.exhibition.open_date.slice(
        5,
        7,
      )}.${review.exhibition.open_date.slice(
        8,
        10,
      )}-${review.exhibition.close_date.slice(
        0,
        4,
      )}.${review.exhibition.close_date.slice(
        5,
        7,
      )}.${review.exhibition.close_date.slice(8, 10)} ${
        review.exhibition.gallery.name
      }`;
};
