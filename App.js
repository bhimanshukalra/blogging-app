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
import {Router, Scene, Stack} from 'react-native-router-flux';
import PostList from './screens/PostList';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
            renderRightButton={<Icon name="add" size={30} />}
          />
        </Stack>
      </Router>
    </Provider>
  );
}
