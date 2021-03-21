import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Divider,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import CommentForm from './CommentForm';
import AllComments from './AllComments';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
  },
}));

const ChatBox = ({ comments, postComment, username, articleId }) => {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.root}>
      <Typography variant='h5'>Join the discussion</Typography>
      <CommentForm
        postComment={postComment}
        username={username}
        articleId={articleId}
      />
      <Divider variant='middle' />
      <AllComments comments={comments} />
    </Paper>
  );
};

ChatBox.propTypes = {};

export default ChatBox;
