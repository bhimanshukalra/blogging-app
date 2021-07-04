import React, {useEffect, useRef, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {View, Text} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';
import {baseUrl} from '../utils/Constants';

const PostList = ({posts, getPosts}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setLoading(true);
    await getPosts();
    setLoading(false);
    let text = 'Posts fetched!';
    if (posts.length === 0) {
      text = 'An error occured trying to fetch posts!';
    }
    Snackbar.show({
      text,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  return (
    <View style={styles.parentView}>
      {loading ? <ActivityIndicator /> : <Text>{JSON.stringify(posts)}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
});

const mapState = state => ({
  posts: state.posts,
});

const mapDispatch = dispatch => ({
  getPosts: dispatch.posts.getPosts,
});

export default connect(mapState, mapDispatch)(PostList);
