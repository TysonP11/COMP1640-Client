import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Grid, makeStyles, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
    marginTop: theme.spacing(2),
    backgroundColor: '#fff',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  form: {
    marginBottom: theme.spacing(2),
  },
  postButton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  divider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}))

const CommentForm = ({ username, articleId, postComment }) => {
  const classes = useStyles()

  const [content, setContent] = useState('')

  const handleOnChangeContent = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      content,
      username,
      article_id: articleId,
    }

    postComment(formData)
  }

  return (
    <Grid container spacing={3} className={classes.form}>
      <TextField
        name='message'
        id='standard-textarea'
        label='Message'
        placeholder='Enter your comment'
        multiline
        rows={4}
        value={content}
        className={classes.input}
        variant='outlined'
        onChange={handleOnChangeContent}
      />
      <Button
        className={classes.postButton}
        onClick={handleSubmit}
        variant='contained'
      >
        Post
      </Button>
    </Grid>
  )
}

CommentForm.propTypes = {
  username: PropTypes.string.isRequired,
  articleId: PropTypes.number.isRequired,
  postComment: PropTypes.func.isRequired,
}

export default CommentForm
