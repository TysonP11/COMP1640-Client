import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../components/Common/Spinner';
import { Fragment } from 'react';
import { getArticle } from '../../redux/actions/article';
import ArticleDetailsBreadcrumb from '../../components/Article/ArticleDetailsBreadcrumb';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import ArticleTop from '../../components/Article/ArticleTop';
import ChatBox from '../../components/Article/ChatBox';

const ArticleDetailPage = ({
  getArticle,
  article: { article, loading },
  match,
}) => {
  useEffect(() => {
    getArticle(match.params.id);
  }, [getArticle, match.params.id]);

  return loading || article === null || !match ? (
    <Spinner></Spinner>
  ) : (
    <Fragment>
      <ArticleDetailsBreadcrumb />
      <Grid container spacing={4} direction='row' alignItems='flex-start'>
        <Grid item md={9} xs={9}>
          <ArticleTop article={article} />
        </Grid>
        <Grid item md={3} xs={3}>
          <ChatBox />
        </Grid>
      </Grid>
    </Fragment>
  );
};

ArticleDetailPage.propTypes = {
  getArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  article: state.article,
});

export default connect(mapStateToProps, { getArticle })(ArticleDetailPage);
