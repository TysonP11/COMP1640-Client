import React from 'react'
import PropTypes from 'prop-types'
import { Divider, makeStyles, Paper, Typography } from '@material-ui/core'
import CommentForm from './CommentForm'
import AllComments from './AllComments'
import moment from 'moment'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

const FOURTEEN_DAYS = 86400 * 14
let isExpired = true

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: '#f5f5f5',
  },
}))

const ChatBox = ({
  comments,
  postComment,
  username,
  article: { id, created_at },
}) => {
  const classes = useStyles()

  return (
    <Paper elevation={1} className={classes.root}>
      <Typography variant='h5'>Join the discussion</Typography>

      {new Date().valueOf() / 1000 > created_at + FOURTEEN_DAYS ? (
        <>
          <CommentForm
            postComment={postComment}
            username={username}
            articleId={id}
            isExpired={isExpired}
          />

          <ErrorOutlineIcon fontSize='large' style={{ color: '#ff1744' }} />

          <Typography style={{ color: '#ff1744' }}>
            Comment time had expired since{' '}
            {moment.unix(created_at + FOURTEEN_DAYS).format('yyyy/MM/DD')}.
          </Typography>
        </>
      ) : (
        <>
          <CommentForm
            postComment={postComment}
            username={username}
            articleId={id}
            isExpired={!isExpired}
          />

          <ErrorOutlineIcon fontSize='large' style={{ color: '#ffcd38' }} />

          <Typography style={{ color: '#ffcd38' }}>
            You have to give comments before{' '}
            {moment.unix(created_at + FOURTEEN_DAYS).format('yyyy/MM/DD')}
          </Typography>
        </>
      )}

      <Typography></Typography>

      <Divider variant='middle' />
      <AllComments comments={comments} />
    </Paper>
  )
}

ChatBox.propTypes = {
  comments: PropTypes.array.isRequired,
  postComment: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default ChatBox
