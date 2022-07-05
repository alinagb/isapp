//Paths
export const SIGN_UP_PAGE_URL_PATH = "/sign-up";
export const PROFILE_PAGE_URL_PATH = "/profile";
export const USER_PAGE_URL_PATH = "/user/:email";

export const MAP_PAGE_URL_PATH = "/map";

export const CREATE_POST_PAGE_URL_PATH = "/create-post";

export const DETAILS_POST_PAGE_URL_PATH = "/post/:postId"
export const VIEW_FAVORITE_POSTS_URL_PATH = "/favorite/posts"


export const CREATE_USER_ENDPOINT_URL = `http://localhost:8090/registration/users`;

export const GET_USER_ENDPOINT_URL = (email) => {
  return `http://localhost:8090/registration/users/${email}`;
};

export const GET_POST_ENDPOINT_URL = (postId) => {
  return `http://localhost:8090/posts/${postId}`;
};

export const UPDATE_USER_ENDPOINT_URL = (email) => {
  return `http://localhost:8090/registration/users/${email}`;
};

export const GET_UNIVERSITIES_ENDPOINT_URL = `http://localhost:8090/universities`;
export const GET_FACULTIES_ENDPOINT_URL = `http://localhost:8090/faculties`;
export const GET_USERS_ENDPOINT_URL = `http://localhost:8090/registration/users`;
export const GET_POSTS_ENDPOINT_URL = `http://localhost:8090/posts`;

export const GET_POSTS_BY_PRICE_ENDPOINT_URL = (price) => {
  return `http://localhost:8090/posts/price/${price}`;
};
export const GET_POSTS_BY_NO_ROOMS_ENDPOINT_URL = (rooms) => {
  return `http://localhost:8090/posts/rooms/${rooms}`;
};

export const GET_POSTS_BY_FACULTY_ENDPOINT_URL = (faculty) => {
  return `http://localhost:8090/posts/faculty/${faculty}`;
};

export const GET_PROFILE_ENDPOINT_URL = (userId) => {
  return `http://localhost:8090/registration/users/${userId}`;
};

export const CREATE_POST_ENDPOINT_URL = (userId) => {
  return `http://localhost:8090/posts/users/${userId}`;
};
export const UPDATE_FAVOURITES_USER_ENDPOINT_URL = (postId, userId) => {
  return `http://localhost:8090/registration/${postId}/${userId}`;
};
export const GET_FAVOURITES_POST_ENDPOINT_URL = (email) => {
  return `http://localhost:8090/registration/favorites/${email}`;
};