import React from 'react';
import PropTypes from 'prop-types';
import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import CommentForm from './CommentForm';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
  },
}));

const ChatBox = (props) => {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.root}>
      <Typography variant='h5'>Join the discussion</Typography>
      <CommentForm />
      <Button variant='contained'>Post</Button>

      <Typography variant='body1' className='comment-count'>
        View Comments
      </Typography>
    </Paper>
  );
};

ChatBox.propTypes = {};

export default ChatBox;
