import React from 'react'
import PropTypes from 'prop-types'
import { VictoryChart, VictoryBar, VictoryTheme } from 'victory'
import { makeStyles, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  chartName: {
    textAlign: 'center',
  },
}))

function BarChart({ articles }) {
  const classes = useStyles()

  return (
    <Grid container spacing={4} justify='center' alignItems='center'>
      <Grid item xs={3}></Grid>

      <Grid item xs={6}>
        <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
          <VictoryBar
            style={{ data: { fill: "#c43a31" } }}
            data={[
              {
                x: 'COMP',
                y: articles.filter((articl) => articl.faculty_code === 'COMP')
                  .length,
              },
              {
                x: 'BUSI',
                y: articles.filter((articl) => articl.faculty_code === 'BUSI')
                  .length,
              },
              {
                x: 'DESI',
                y: articles.filter((articl) => articl.faculty_code === 'DESI')
                  .length,
              },
            ]}
          />
        </VictoryChart>

        <Typography variant='h6' className={classes.chartName}>
          Chart 1: Bar chart of total articles by faculty and campaign.
        </Typography>
      </Grid>

      <Grid item xs={3}></Grid>
    </Grid>
  )
}

BarChart.propTypes = {
  articles: PropTypes.array.isRequired,
}

export default BarChart
