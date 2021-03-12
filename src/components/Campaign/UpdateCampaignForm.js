import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, Modal } from '@material-ui/core'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  input: {
    width: '100%',
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  title: {
    borderBottom: '1px solid #c0c0c0',
    paddingBottom: theme.spacing(1),
  },
}))

export const UpdateCampaignForm = ({
  showUpdateForm,
  handleClose,
  updateCampaign,
  username,
  campaign,
}) => {
  const classes = useStyles()

  const [submitDeadline, setSubmitDeadline] = useState(moment())
  const [submitDeadlineInputValue, setSubmitDeadlineInputValue] = useState(
    moment().format('yyyy-MM-DD'),
  )

  const [editDeadline, setEditDeadline] = useState(moment())
  const [editDeadlineInputValue, setEditDeadlineInputValue] = useState(
    moment().format('yyyy-MM-DD'),
  )

  const [startDate, setStartDate] = useState(moment())
  const [startDateInputValue, setStartDateInputValue] = useState(
    moment().format('yyyy-MM-DD'),
  )

  useEffect(() => {
    if (campaign) {
      setSubmitDeadline(moment.unix(campaign.submit_deadline))
      setSubmitDeadlineInputValue(
        moment.unix(campaign.submit_deadline).format('yyyy-MM-DD'),
      )
      setEditDeadline(moment.unix(campaign.edit_deadline))
      setEditDeadlineInputValue(
        moment.unix(campaign.edit_deadline).format('yyyy-MM-DD'),
      )
      setStartDate(moment.unix(campaign.start_date))
      setStartDateInputValue(moment.unix(campaign.start_date).format('yyyy-MM-DD'))
    }
  }, [campaign])

  const handleOnChangeSubmitDeadline = (date, value) => {
    setSubmitDeadline(date)
    setSubmitDeadlineInputValue(value)
  }

  const handleOnChangeEditDeadline = (date, value) => {
    setEditDeadline(date)
    setEditDeadlineInputValue(value)
  }

  const handleOnChangeStartDate = (date, value) => {
    setStartDate(date)
    setStartDateInputValue(value)
  }

  const dateFormatter = (str) => str

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      submit_deadline: submitDeadlineInputValue,
      edit_deadline: editDeadlineInputValue,
      start_date: startDateInputValue,
      admin_username: username,
    }

    updateCampaign(formData, campaign.code)

    handleClose()
  }

  return (
    <Modal
      open={showUpdateForm}
      aria-labelledby='Update Campaign Form'
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <Typography variant='h5' className={classes.title}>
          Update Campaign
        </Typography>

        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
            <KeyboardDatePicker
              className={classes.input}
              name='submit_deadline'
              disableToolbar
              variant='inline'
              format='yyyy-MM-DD'
              margin='normal'
              id='date-picker-submit-deadline'
              label='Submit Deadline'
              value={submitDeadline || moment()}
              inputValue={
                submitDeadlineInputValue || moment.format('yyyy-MM-DD')
              }
              onChange={handleOnChangeSubmitDeadline}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              rifmFormatter={dateFormatter}
            />

            <KeyboardDatePicker
              disableToolbar
              className={classes.input}
              name='edit_deadline'
              variant='inline'
              format='yyyy-MM-DD'
              margin='normal'
              id='date-picker-edit-deadline'
              label='Edit Deadline'
              inputValue={
                editDeadlineInputValue || moment().format('yyyy-MM-DD')
              }
              value={editDeadline || moment()}
              onChange={handleOnChangeEditDeadline}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              rifmFormatter={dateFormatter}
            />

            <KeyboardDatePicker
              disableToolbar
              className={classes.input}
              name='start_date'
              variant='inline'
              format='yyyy-MM-DD'
              margin='normal'
              id='date-picker-start-date'
              label='Start Date'
              inputValue={startDateInputValue || moment().format('yyyy-MM-DD')}
              value={startDate || moment()}
              onChange={handleOnChangeStartDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              rifmFormatter={dateFormatter}
            />
          </MuiPickersUtilsProvider>
          <Button
            variant='contained'
            color='primary'
            className={classes.submitButton}
            type='submit'
          >
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  )
}

UpdateCampaignForm.propTypes = {
  showUpdateForm: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  updateCampaign: PropTypes.func.isRequired,
  campaign: PropTypes.object.isRequired,
}

export default UpdateCampaignForm
