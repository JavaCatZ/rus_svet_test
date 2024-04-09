/* eslint-disable */
export const saveAccessTokenToCache = (token) => {
  document.cookie = 'access_token=' + token + ';secure=true;max-age=3600;SameSite=None';
};

export const saveUserProfileToCache = (profile) => {
  localStorage.removeItem('user_profile');
  localStorage.setItem('user_profile', JSON.stringify(profile));
};

export const getAccessTokenFromCache = () => {

  let name = 'access_token';
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const getUserProfileFromCache = () => JSON.parse(localStorage.getItem('user_profile'));

export const clearCache = () => {
  localStorage.clear();
  document.cookie = 'access_token="";secure=true;max-age=-1;SameSite=None';
};
