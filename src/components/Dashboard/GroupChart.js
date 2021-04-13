import React from 'react'
import PropTypes from 'prop-types'
import { VictoryChart, VictoryBar, VictoryGroup } from 'victory'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import Glossary from './Glossary'

const elements = [
  { color: '#76ff03', text: 'ACCEPTED' },
  { color: '#616161', text: 'PENDING' },
  { color: '#ff1744', text: 'DENIED' },
]

const useStyles = makeStyles((theme) => ({
  chartName: {
    textAlign: 'center',
  },
}))

function GroupChart({ articles }) {
  const classes = useStyles()

  console.log(articles.length)

  return (
    <>
      <Grid container spacing={4} justify='center' alignItems='center'>
        <Grid item xs={6}>
          <VictoryChart>
            <VictoryGroup offset={20}>
              <VictoryBar
                style={{ data: { fill: '#76ff03' } }}
                data={[
                  {
                    x: 'COMP',
                    y: articles.filter(
                      (articl) =>
                        articl.faculty_code === 'COMP' &&
                        articl.status === 'ACCEPTED',
                    ).length,
                  },
                  {
                    x: 'BUSI',
                    y: articles.filter(
                      (articl) =>
                        articl.faculty_code === 'BUSI' &&
                        articl.status === 'ACCEPTED',
                    ).length,
                  },
                  {
                    x: 'DESI',
                    y: articles.filter(
                      (articl) =>
                        articl.faculty_code === 'DESI' &&
                        articl.status === 'ACCEPTED',
                    ).length,
                  },
                ]}
              />
              <VictoryBar
                style={{ data: { fill: '#616161' } }}
                data={[
                  {
                    x: 'COMP',
                    y: articles.filter(
                      (articl) =>
                        articl.faculty_code === 'COMP' &&
                        articl.status === 'PENDING',
                    ).length,
                  },
                  {
                    x: 'BUSI',
                    y: articles.filter(
                      (articl) =>
                        articl.faculty_code === 'BUSI' &&
                        articl.status === 'PENDING',
                    ).length,
                  },
                  {
                    x: 'DESI',
                    y: articles.filter(
                      (articl) =>
                        articl.faculty_code === 'DESI' &&
                        articl.status === 'PENDING',
                    ).length,
                  },
                ]}
              />
              <VictoryBar
                style={{ data: { fill: '#ff1744' } }}
                data={[
                  {
                    x: 'COMP',
                    y: articles.filter(
                      (articl) =>
                        articl.faculty_code === 'COMP' &&
                        articl.status === 'DENIED',
                    ).length,
                  },
                  {
                    x: 'BUSI',
                    y: articles.filter(
                      (articl) =>
                        articl.faculty_code === 'BUSI' &&
                        articl.status === 'DENIED',
                    ).length,
                  },
                  {
                    x: 'DESI',
                    y: articles.filter(
                      (articl) =>
                        articl.faculty_code === 'DESI' &&
                        articl.status === 'DENIED',
                    ).length,
                  },
                ]}
              />
            </VictoryGroup>
          </VictoryChart>

          <Typography variant='h6' className={classes.chartName}>
            Chart 2: Bar chart of the number of articles by each state of the
            faculty across campaigns
          </Typography>
        </Grid>

        <Grid item xs={3}></Grid>

        <Grid item xs={3}>
          <Glossary elements={elements} />
        </Grid>
      </Grid>
    </>
  )
}

GroupChart.propTypes = {
  articles: PropTypes.array.isRequired,
}

export default GroupChart
