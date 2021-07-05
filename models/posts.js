import {baseUrl} from '../utils/Constants';

const posts = {
  state: [],
  reducers: {
    setPosts(state, payload) {
      if (payload === null) {
        return state;
      }
      return [...payload, ...state];
    },
  },
  effects: dispatch => ({
    async getPosts(payload, rootState) {
      return await new Promise((resolve, reject) => {
        fetch(`${baseUrl}/posts`, {
          method: 'GET',
        })
          .then(res => res.json())
          .then(json => {
            dispatch.posts.setPosts(json);
            resolve({data: json});
          })
          .catch(error => {
            dispatch.posts.setPosts(null);
            resolve(null);
          });
      });
    },
    async addPost(payload, rootState) {
      return await new Promise((resolve, reject) => {
        fetch(baseUrl + '/posts', {
          method: 'POST',
          body: payload,
        })
          .then(res => res.json())
          .then(json => {
            dispatch.posts.setPosts(json);
            resolve({data: json});
          })
          .catch(error => {
            dispatch.posts.setPosts(null);
            resolve(null);
          });
      });
    },
  }),
};
export default posts;
