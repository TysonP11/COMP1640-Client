import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { BASE_URL } from '../../environment/dev.env'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileWord,
  faFilePdf,
  faFileAlt,
} from '@fortawesome/free-regular-svg-icons'
import { Link } from '@material-ui/core'

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

export const AllArtilces = ({ articles }) => {
  const classes = useStyles()

  return !articles || articles.length === 0 ? (
    <Typography>There is no article here!!!</Typography>
  ) : (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.cardGrid}>
        {/* End hero unit */}
        <Grid container spacing={4}>
          {articles.map((article) => (
            <Grid item key={article.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={`${BASE_URL}/${article.image_url}`}
                  title='Image title'
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant='h5' component='h2' noWrap>
                    {article.name}
                  </Typography>
                  <Typography style={{ marginBottom: 8 }} noWrap>
                    {article.message}
                  </Typography>
                  {!article.status || article.status === 'PENDING' ? (
                    <Typography style={{ marginBottom: 8 }}>
                      {article.status}
                    </Typography>
                  ) : article.status === 'ACCEPTED' ? (
                    <Typography style={{ marginBottom: 8, color: '#00a152' }}>
                      {article.status}
                    </Typography>
                  ) : (
                    <Typography style={{ marginBottom: 8, color: '#f44336' }}>
                      {article.status}
                    </Typography>
                  )}
                  {article.document_url.endsWith('.docx') ||
                  article.document_url.endsWith('.doc') ? (
                    <Typography>
                      <FontAwesomeIcon
                        icon={faFileWord}
                        size='2x'
                        color='#2196f3'
                      />{' '}
                      <Link href={`${BASE_URL}/${article.document_url}`}>
                        Document
                      </Link>
                    </Typography>
                  ) : article.document_url.endsWith('.pdf') ? (
                    <Typography>
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        size='2x'
                        color='#d50000'
                      />{' '}
                      <Link href={`${BASE_URL}/${article.document_url}`}>
                        Document
                      </Link>
                    </Typography>
                  ) : (
                    <Typography>
                      <FontAwesomeIcon icon={faFileAlt} size='2x' />{' '}
                      <Link href={`${BASE_URL}/${article.document_url}`}>
                        Document
                      </Link>
                    </Typography>
                  )}
                </CardContent>
                <CardActions>
                  <Button size='small' color='primary'>
                    View
                  </Button>
                  <Button size='small' color='primary'>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>
    </React.Fragment>
  )
}

AllArtilces.propTypes = {
  articles: PropTypes.array.isRequired,
}

export default AllArtilces
