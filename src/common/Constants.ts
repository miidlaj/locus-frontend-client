export const BASE_API_URL = "http://localhost:9090";

export const RESORT_SERVICE = "http://localhost:9001";
export const ROOM_SERVICE = "http://localhost:9002";
export const BOOKING_SERVICE = "http://localhost:9004";


export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = BASE_API_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = BASE_API_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = BASE_API_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
