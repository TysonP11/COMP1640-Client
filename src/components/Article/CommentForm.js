import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
    marginTop: theme.spacing(2),
    backgroundColor: '#fff',
  },
}));

const CommentForm = (props) => {
  const classes = useStyles();
  return (
    <div>
      <TextField
        name='message'
        id='standard-textarea'
        label='Message'
        placeholder='Enter your comment'
        multiline
        rows={4}
        className={classes.input}
        variant='outlined'
      />
    </div>
  );
};

CommentForm.propTypes = {};

export default CommentForm;
