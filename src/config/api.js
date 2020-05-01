const bucketURL = 'https://pickndrive.s3.amazonaws.com';

const endPoints = {
  token: '/token',
  user: '/user',
  address: '/address',
  updateUserPartial: '/user/partial',
  creditCard: '/creditCard',
  changePassword: '/user/changePassword',
  reservations: '/vehicle-request/by-user',
  feedbackReservation: '/feed-back',
  picturesReservation: '/formAnswered/vehicleRequest',
  BUCKET: bucketURL,
  bucket: {
    vehicleImg: `${bucketURL}/vehicles-img`,
    vehicleSidesImg: `${bucketURL}/vehicles-sides-img`
  },
  cancelReservation: '/vehicleRequest/cancel',
  reservationConfig: '/formField',
  configuration: '/configuration',
  photo: 'formAnswered/photo',
  newFormAnswered: '/newFormAnswered',
  changeStatus: '/vehicle/change-status',
  forgotPassword: '/forgot-password'
};

export const SERVER_URL = 'https://api.develop.pickndrive.com.br/api/v1';

export const BUCKET = bucketURL;

export const API = endPoints;
