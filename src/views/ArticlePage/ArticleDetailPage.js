import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../components/common/Spinner';
import { Fragment } from 'react';
import { getArticle, updateArticleStatus } from '../../redux/actions/article';
import { getComments, postComment } from '../../redux/actions/comment';
import ArticleDetailsBreadcrumb from '../../components/Article/ArticleDetailsBreadcrumb';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import ArticleTop from '../../components/Article/ArticleTop';
import ChatBox from '../../components/Article/ChatBox';

const ArticleDetailPage = ({
  getArticle,
  getComments,
  postComment,
  article: { article, loading },
  comment,
  match,
  auth,
  updateArticleStatus,
}) => {
  useEffect(() => {
    getArticle(match.params.id);
    getComments(match.params.id);
  }, [getArticle, match.params.id, getComments, postComment]);

  return auth.loading || !auth.user || loading || article === null || !match ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <ArticleDetailsBreadcrumb />
      <Grid container spacing={4} direction='row' alignItems='flex-start'>
        <Grid item lg={9} md={12}>
          <ArticleTop
            article={article}
            updateArticleStatus={updateArticleStatus}
            user={auth.user}
          />
        </Grid>
        <Grid item lg={3} md={12}>
          {comment.loading ? (
            <Spinner />
          ) : (
            <ChatBox
              comments={comment.comments}
              postComment={postComment}
              username={auth.user.username}
              articleId={article.id}
            />
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

ArticleDetailPage.propTypes = {
  getArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  updateArticleStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.article,
  comment: state.comment,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getArticle,
  getComments,
  postComment,
  updateArticleStatus,
})(ArticleDetailPage);
