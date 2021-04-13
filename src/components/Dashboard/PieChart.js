import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { VictoryPie } from 'victory'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import Glossary from './Glossary'

const elements = [
  { color: 'gold', text: 'Computer Science' },
  { color: 'cyan', text: 'Business' },
  { color: 'navy', text: 'Design' },
]

const useStyles = makeStyles((theme) => ({
  chartName: {
    textAlign: 'center',
  },
}))

function PieChart({ articles, getAllCommentsByFaculty, commentCount }) {
  const classes = useStyles()

  useEffect(() => {
    getAllCommentsByFaculty(articles)

    // eslint-disable-next-line
  }, [articles])

  return (
    commentCount && (
      <>
        <Grid container spacing={4} justify='center' alignItems='center'>
          <Grid item xs={6}>
            <VictoryPie
              colorScale={['gold', 'cyan', 'navy']}
              data={[
                {
                  x: `${commentCount.compCmtsPer} %`,
                  y: commentCount.compCmtsPer,
                },
                {
                  x: `${commentCount.busiCmtsPer} %`,
                  y: commentCount.busiCmtsPer,
                },
                {
                  x: `${commentCount.desiCmtsPer} %`,
                  y: commentCount.desiCmtsPer,
                },
              ]}
            />

            <Typography variant='h6' className={classes.chartName}>
              Chart 3: Pie chart of the percentage of total comments by each faculty and campaign
            </Typography>
          </Grid>

          <Grid item xs={3}></Grid>

          <Grid item xs={3}>
            <Glossary elements={elements} />
          </Grid>
        </Grid>
      </>
    )
  )
}

PieChart.propTypes = {
  articles: PropTypes.array.isRequired,
  getAllCommentsByFaculty: PropTypes.func.isRequired,
  commentCount: PropTypes.object,
}

export default PieChart
