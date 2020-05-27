import {Dimensions, DatePickerAndroid} from 'react-native';

export const deviceInfo = {
  OS: Platform.OS,
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
};

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

export const checkIsActiveExhibition = (openDate, closeDate) => {
  const today = new Date();
  const open = new Date(openDate);
  const close = new Date(closeDate);
  if (today < open || today > close) {
    return false;
  }
  return true;
};
export const getGroupedExhibitionList = exhibitions => {
  if (exhibitions.length === 0) {
    return [];
  }
  if (exhibitions.length === 1) {
    return [exhibitions];
  }

  const groups = [];
  let group = [];
  for (let i = 0; i < exhibitions.length; i++) {
    if (i === 0) {
      group.push(exhibitions[i]);
      continue;
    }
    if (i % 2 === 1) {
      group.push(exhibitions[i]);
      groups.push(group);
      group = [];
    } else {
      group.push(exhibitions[i]);
      if (exhibitions.length - 1 === i) {
        groups.push(group);
      }
    }
  }

  return groups;
};
