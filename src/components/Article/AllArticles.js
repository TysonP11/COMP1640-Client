import React, { useState } from 'react'
import PropTypes from 'prop-types'

import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import ArticleItem from './ArticleItem'
import UpdateArticleForm from './UpdateArticleForm'
import { Pagination } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}))

export const AllArtilces = ({
  articles,
  updateArticle,
  getArticle,
  article,
  filterProps,
  facultyCode,
  page,
  user,
  campaign,
  setPage,
  pagination,
}) => {
  const classes = useStyles()

  const [showUpdateForm, setShowUpdateForm] = useState(false)

  const handleOpenUpdtForm = (e) => {
    setShowUpdateForm(true)
  }

  const handleCloseUpdtForm = (e) => {
    setShowUpdateForm(false)
  }

  return !articles || articles.length === 0 || !pagination ? (
    <Typography style={{ marginTop: 10, marginBottom: 10 }} variant='h5'>
      There is no article here!!!
    </Typography>
  ) : (
    <React.Fragment>
      <CssBaseline />

      <UpdateArticleForm
        showUpdateForm={showUpdateForm}
        handleCloseUpdtForm={handleCloseUpdtForm}
        updateArticle={updateArticle}
        article={article}
        filterProps={filterProps}
        facultyCode={facultyCode}
        page={page}
      />

      <main className={classes.cardGrid}>
        {/* End hero unit */}
        <Grid container spacing={4}>
          {articles.map((article) => (
            <ArticleItem
              article={article}
              key={article.id}
              handleOpenUpdtForm={handleOpenUpdtForm}
              getArticle={getArticle}
              user={user}
              campaign={campaign}
            />
          ))}
        </Grid>
      </main>

      <Pagination
        count={pagination.totalPages}
        onChange={(e, val) => setPage(val)}
      />
    </React.Fragment>
  )
}

AllArtilces.propTypes = {
  articles: PropTypes.array.isRequired,
  updateArticle: PropTypes.func.isRequired,
  getArticle: PropTypes.func.isRequired,
  article: PropTypes.object,
  filterProps: PropTypes.object.isRequired,
  facultyCode: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  campaign: PropTypes.object.isRequired,
}

export default AllArtilces
