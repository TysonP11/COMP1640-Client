import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search'

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
}))

const ArticleToolbar = ({ campaigns, getArticlesByProps }) => {
  const classes = useStyles()

  const [username, setUsername] = useState('')
  const [campaignCode, setCampaignCode] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    getArticlesByProps({
      username: username,
      campaignCode: campaignCode,
      status: status,
    })
    // eslint-disable-next-line
  }, [campaignCode, status])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim() !== '') {
      getArticlesByProps({
        username: username,
        campaignCode: campaignCode,
        status: status,
      })
    }
  }

  const handleCampaignCodeOnChange = (e) => {
    setCampaignCode(e.target.value)
  }

  const handleStatusOnChange = (e) => {
    setStatus(e.target.value)
  }

  const handleCancelCampaignFilter = () => {
    setCampaignCode('')
  }

  const handleCancelStatusFilter = () => {
    setStatus('')
  }

  const handleCancelUserFilter = (e) => {
    setUsername('')
    e.preventDefault()
    getArticlesByProps({
      campaignCode: campaignCode,
      status: status,
    })
  }

  return (
    <Paper elevation={0} variant='outlined' className={classes.root}>
      <Grid container spacing={4} direction='row' alignItems='center'>
        <Grid item md={4}>
          <form
            noValidate
            autoComplete='off'
            className={classes.formControl}
            onSubmit={handleSubmit}
          >
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
              spacing={2}
            >
              <Grid item md={9}>
                <TextField
                  name='username'
                  label='Search by username'
                  className={classes.textInput}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item md={3}>
                <div className={classes.buttonGroup}>
                  <IconButton aria-label='delete' type='submit'>
                    <SearchIcon fontSize='default' />
                  </IconButton>

                  <IconButton
                    aria-label='delete'
                    onClick={handleCancelUserFilter}
                  >
                    <CloseIcon fontSize='default' />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </form>
        </Grid>

        <Grid item md={4}>
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
        </Grid>

        <Grid item md={4}>
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
                  name='status'
                  value={status}
                  onChange={handleStatusOnChange}
                >
                  <option value=''>Status</option>
                  <option value='PENDING'>PENDING</option>
                  <option value='ACCEPTED' style={{ color: '#00a152' }}>
                    ACCEPTED
                  </option>
                  <option value='DENIED' style={{ color: '#f44336' }}>
                    DENIED
                  </option>
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item md={2}>
              <IconButton
                aria-label='delete'
                onClick={handleCancelStatusFilter}
              >
                <CloseIcon fontSize='default' />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

ArticleToolbar.propTypes = {
  campaigns: PropTypes.array.isRequired,
  getArticlesByProps: PropTypes.func.isRequired,
}

export default ArticleToolbar
