/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {Actions, Router, Scene, Stack} from 'react-native-router-flux';
import PostList from './screens/PostList';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PostForm from './screens/PostForm';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Stack key="rootStack">
          <Scene
            key="posts"
            initial
            component={PostList}
            title="Posts"
            renderRightButton={
              <Icon name="add" size={30} onPress={() => Actions.addPost()} />
            }
          />
          <Scene
            key="addPost"
            component={PostForm}
            title="Add post"
            renderLeftButton={
              <Icon
                name="chevron-left"
                size={30}
                onPress={() => Actions.pop()}
              />
            }
          />
        </Stack>
      </Router>
    </Provider>
  );
}
