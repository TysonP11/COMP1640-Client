import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Hidden from '@material-ui/core/Hidden'
import { BASE_URL } from '../../environment/dev.env'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 200,
  },
}))

export default function FeaturedPost({ article }) {
  const classes = useStyles()

  return (
    <CardActionArea component='a' href={`/article/${article.id}`}>
      <Card className={classes.card}>
        <div className={classes.cardDetails}>
          <CardContent>
            <Typography component='h2' variant='h5'>
              {article.name}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {moment.unix(article.updated_at).format('yyyy-MM-DD')}
            </Typography>
            <Typography variant='subtitle1' paragraph>
              {article.message}
            </Typography>
          </CardContent>
        </div>
        <Hidden xsDown>
          <CardMedia
            className={classes.cardMedia}
            image={`${BASE_URL}/${article.image_url}`}
            title={article.imageTitle}
          />
        </Hidden>
      </Card>
    </CardActionArea>
  )
}

FeaturedPost.propTypes = {
  article: PropTypes.object,
}
