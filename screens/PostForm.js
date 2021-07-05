import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-elements';
import {Input} from 'react-native-elements/dist/input/Input';
import {Actions} from 'react-native-router-flux';
import Snackbar from 'react-native-snackbar';
import {connect} from 'react-redux';

const PostForm = ({addPost}) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const setPost = async () => {
    setLoading(true);
    const params = {title, desc};
    await addPost(params);
    setLoading(false);
    Snackbar.show({
      text: 'Post added!',
      duration: Snackbar.LENGTH_SHORT,
    });
    Actions.pop();
  };

  return (
    <View style={styles.parentView}>
      <Input
        placeholder="Post"
        label="Post"
        labelStyle={styles.inputLabel}
        leftIcon={{
          type: 'materialicons',
          name: 'create',
          color: '#999',
        }}
        onChangeText={setTitle}
      />
      <Input
        placeholder="Description"
        label="Description"
        labelStyle={styles.inputLabel}
        leftIcon={{
          type: 'materialicons',
          name: 'description',
          color: '#999',
        }}
        onChangeText={setDesc}
      />

      <Button
        onPress={setPost}
        title="Add"
        iconRight
        disabled={loading}
        icon={{
          type: 'materialicons',
          name: 'chevron-right',
          color: 'white',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    height: '80%',
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputLabel: {color: '#999'},
});

const mapDispatch = dispatch => ({
  addPost: dispatch.posts.addPost,
});

export default connect(null, mapDispatch)(PostForm);
