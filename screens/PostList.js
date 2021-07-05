import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {View, FlatList, Text} from 'react-native';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';

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

  const getItemView = ({id, userId, title, body}) => (
    <View style={styles.item}>
      <View>
        <Text>{`${id}.  `}</Text>
      </View>
      <View>
        <Text style={styles.itemTitle}>{`${title}\n`}</Text>
        <Text>{body}</Text>
      </View>
    </View>
  );

  const getSeperatorView = () => <View style={styles.itemSeperator} />;

  return (
    <View style={styles.parentView}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          keyExtractor={({id}) => id}
          data={posts}
          initialNumToRender={15}
          renderItem={({item}) => getItemView(item)}
          ItemSeparatorComponent={getSeperatorView}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  item: {margin: 5, flexDirection: 'row'},
  itemTitle: {fontWeight: '600'},
  itemSeperator: {borderWidth: 0.5},
});

const mapState = state => ({
  posts: state.posts,
});

const mapDispatch = dispatch => ({
  getPosts: dispatch.posts.getPosts,
});

export default connect(mapState, mapDispatch)(PostList);
