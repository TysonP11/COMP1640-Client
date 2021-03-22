import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search'
import Spinner from '../../components/Common/Spinner'

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

const ArticleToolbar = ({
  campaigns,
  getArticlesByProps,
  facultyCode,
  page,
  setFilterProps,
  user,
  currentCampaignCode,
  loading,
}) => {
  const classes = useStyles()

  const [username, setUsername] = useState('')
  const [campaignCode, setCampaignCode] = useState(currentCampaignCode ? currentCampaignCode : '')
  const [status, setStatus] = useState('')

  const props = {
    username: user.authorities.includes('ROLE_STUDENT')
      ? user.username
      : username,
    campaignCode: campaignCode,
    status: status,
  }

  useEffect(() => {
    getArticlesByProps(props, facultyCode, page === 0 ? page : page - 1)

    setFilterProps(props)
    // eslint-disable-next-line
  }, [campaignCode, status, page])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim() !== '') {
      getArticlesByProps(props, facultyCode, page === 0 ? page : page - 1)

      setFilterProps(props)
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
    getArticlesByProps(
      {
        username: username,
        campaignCode: campaignCode,
        status: status,
      },
      facultyCode,
    )
  }

  return loading ? (
    <Spinner />
  ) : (
    <Paper elevation={0} variant='outlined' className={classes.root}>
      <Grid container spacing={4} direction='row' alignItems='center'>
        {user.authorities.includes('ROLE_MARKETING_COORDINATOR') && (
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
        )}

        <Grid item md={user.authorities.includes('ROLE_STUDENT') ? 6 : 4}>
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

        <Grid item md={user.authorities.includes('ROLE_STUDENT') ? 6 : 4}>
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
  facultyCode: PropTypes.string.isRequired,
  setFilterProps: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  currentCampaignCode: PropTypes.string,
  loading: PropTypes.bool.isRequired,
}

export default ArticleToolbar
