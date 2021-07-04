import {baseUrl} from '../utils/Constants';

const posts = {
  state: [],
  reducers: {
    search(state, payload) {
      console.log('state');
    },
    setPosts(state, payload) {
      // I could't find a way to get  a non 200 response code. So, sending a common error msg.
      if (payload === null) {
        return state;
      }
      return [...state, ...payload];
    },
  },
  effects: dispatch => ({
    async getPosts(payload, rootState) {
      return await new Promise((resolve, reject) => {
        fetch(baseUrl + '/posts', {
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
  }),
};
export default posts;
