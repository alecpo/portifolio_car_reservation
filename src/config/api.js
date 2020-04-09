const bucketURL = 'https://pickndrive.s3.amazonaws.com';

const endPoints = {
  token: '/token',
  user: '/user',
  address: '/address',
  updateUserPartial: '/user/partial',
  creditCard: '/creditCard',
  changePassword: '/user/changePassword',
  reservationsHistory: '/vehicle-request/by-user',
  feedbackReservation: '/feed-back',
  picturesReservation: '/formAnswered/vehicleRequest',
  BUCKET: bucketURL,
  bucket: {
    vehicleImg: `${bucketURL}/vehicles-img`
  }
};

export default endPoints;
