import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import { Fragment } from 'react';

const AllComments = ({ comments }) => {
  return (
    <List>
      {comments.map((comment) => (
        <Fragment key={comment.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={comment.username}
              secondary={comment.content}
            />
          </ListItem>
          <Divider variant='inset' component='li' />
        </Fragment>
      ))}
    </List>
  );
};

AllComments.propTypes = {};

export default AllComments;
