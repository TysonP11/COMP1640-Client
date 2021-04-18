import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import PieChart from './PieChart'
import BarChart from './BarChart'
import GroupChart from './GroupChart'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  formControl: {
    width: '100%',
    minWidth: 200,
  },
  textInput: {
    width: '100%',
  },
  selectInput: {
    padding: 6,
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  chartName: {
    textAlign: 'center',
  },
}))

export const Dashboard = ({
  users,
  campaigns,
  currentCampaignCode,
  articles,
  getArticlesByCampaign,
  getAllCommentsByFaculty,
  commentCount,
}) => {
  const classes = useStyles()

  const [campaignCode, setCampaignCode] = useState(() => currentCampaignCode)

  useEffect(() => {
    getArticlesByCampaign(campaignCode)

    // eslint-disable-next-line
  }, [campaignCode])

  const handleCampaignCodeOnChange = (e) => {
    setCampaignCode(e.target.value)
  }

  const handleCancelCampaignFilter = (e) => {
    setCampaignCode('')
  }

  return (
    <>
      <Paper elevation={0} variant='outlined' className={classes.root}>
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          spacing={2}
        >
          <Grid item md={10}>
            <FormControl className={classes.formControl}>
              <NativeSelect
                className={classes.selectInput}
                name='campaignCode'
                value={campaignCode}
                onChange={handleCampaignCodeOnChange}
              >
                <option value=''>Campaign</option>
                {campaigns &&
                  campaigns.length > 0 &&
                  campaigns.map((campaign) => (
                    <option key={campaign.code} value={campaign.code}>
                      {campaign.code}
                    </option>
                  ))}
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item md={2}>
            <IconButton
              aria-label='delete'
              onClick={handleCancelCampaignFilter}
            >
              <CloseIcon fontSize='default' />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

      {articles && articles.length > 0 ? (
        <>
          <BarChart articles={articles} />
          <GroupChart articles={articles} />
          <PieChart
            articles={articles}
            getAllCommentsByFaculty={getAllCommentsByFaculty}
            commentCount={commentCount}
          />
        </>
      ) : (
        <Typography>This campaign has no submissions</Typography>
      )}
    </>
  )
}

Dashboard.propTypes = {
  users: PropTypes.array.isRequired,
  campaigns: PropTypes.array.isRequired,
  currentCampaignCode: PropTypes.string,
  articles: PropTypes.array.isRequired,
  getArticlesByCampaign: PropTypes.func.isRequired,
  commentCount: PropTypes.object,
}

export default Dashboard
