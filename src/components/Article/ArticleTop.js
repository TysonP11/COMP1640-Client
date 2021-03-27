import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core';
import { Fragment } from 'react';
import { BASE_URL } from '../../environment/dev.env';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { updateCampaignStatus } from '../../redux/actions/campaign';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: '#f5f5f5',
  },
  pending: {
    padding: theme.spacing(1),
    backgroundColor: '#b1b2b3',
  },
  approved: {
    padding: theme.spacing(1),
    backgroundColor: '#3DEC55',
  },
  denied: {
    padding: theme.spacing(1),
    backgroundColor: '#ff0505',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  title: {
    paddingLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  summary: {
    textAlign: 'justify',
  },
  pagination: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const GrayTextTypography = withStyles({
  root: {
    color: '#b1b2b3',
  },
})(Typography);

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

const ArticleTop = ({ article, user, updateArticleStatus }) => {
  const classes = useStyles();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages);
    setPageNumber(1);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGrade = (status) => {
    updateArticleStatus(status, article.id);

    handleClose();
  };

  return (
    <Fragment>
      <Grid
        container
        spacing={2}
        direction='row'
        justify='space-between'
        alignItems='center'
      >
        <Grid item>
          <Grid
            container
            spacing={2}
            direction='column'
            justify='space-between'
            alignItems='flex-start'
            className={classes.title}
          >
            <Typography variant='h3'>{article.name}</Typography>
            <GrayTextTypography>
              {article.user_username} • Feb 17
            </GrayTextTypography>
          </Grid>
        </Grid>
        <Grid item>
          {user.authorities.filter((el) => el === 'ROLE_MARKETING_COORDINATOR')
            .length >= 0 ? (
            <div>
              <Button
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}
              >
                {article.status}
              </Button>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleGrade('ACCEPTED')}>
                  ACCEPTED
                </MenuItem>
                <MenuItem onClick={() => handleGrade('PENDING')}>
                  PENDING
                </MenuItem>
                <MenuItem onClick={() => handleGrade('DENIED')}>
                  DENIED
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Paper
              elevation={1}
              className={
                article.status === 'PENDING'
                  ? classes.pending
                  : article.status === 'DENIED'
                  ? classes.denied
                  : classes.approved
              }
            >
              <Typography>{article.status}</Typography>
            </Paper>
          )}
        </Grid>
      </Grid>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={`${BASE_URL}/${article.image_url}`}
          title='Image title'
        />
      </Card>
      <Typography variant='body1' paragraph={true} className={classes.summary}>
        {article.message}
      </Typography>
      <Document
        // file={`${BASE_URL}/${article.document_url}`}
        file={`${BASE_URL}/${article.document_url}`}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        <Page key={`page_${pageNumber}`} pageNumber={pageNumber} />
      </Document>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='center'
        className={classes.pagination}
      >
        <Button
          disabled={pageNumber <= 1}
          variant='contained'
          onClick={previousPage}
        >
          Previous
        </Button>
        <Typography>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </Typography>
        <Button
          variant='contained'
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </Button>
      </Grid>
    </Fragment>
  );
};

ArticleTop.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleTop;
