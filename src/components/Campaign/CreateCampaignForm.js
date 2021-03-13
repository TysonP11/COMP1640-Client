import React, { useState } from 'react'
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
import TextField from '@material-ui/core/TextField'

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

export const CreateCampaignForm = ({
  showCreateForm,
  handleClose,
  createCampaign,
  adminUsername,
}) => {
  const classes = useStyles()

  const [code, setCode] = useState('')

  const [hasError, setHasError] = useState(false)

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

  const handleOnChangeCode = (e) => {
    setHasError(false)
    setCode(e.target.value)
  }

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

    if (code.trim() === '' || !code) {
      setHasError(true)
    } else {
      const formData = {
        code: code.toUpperCase(),
        submit_deadline: submitDeadlineInputValue,
        edit_deadline: editDeadlineInputValue,
        start_date: startDateInputValue,
        admin_username: adminUsername,
      }

      createCampaign(formData)

      handleClose()

      setCode('')
      setSubmitDeadlineInputValue(moment().format('yyyy-MM-DD'))
      setEditDeadlineInputValue(moment().format('yyyy-MM-DD'))
      setStartDateInputValue(moment().format('yyyy-MM-DD'))
    }
  }

  return (
    <Modal
      open={showCreateForm}
      aria-labelledby='Create Campaign Form'
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <Typography variant='h5' className={classes.title}>
          Create Campaign
        </Typography>

        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <TextField
            className={classes.input}
            id='code'
            label='Code'
            name='code'
            autoFocus
            value={code}
            onChange={handleOnChangeCode}
            error={hasError}
            helperText={
              hasError ? 'Invalid value!' : 'Code input format: SEMESTER_YEAR'
            }
          />

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
              value={submitDeadline}
              inputValue={submitDeadlineInputValue}
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
              inputValue={editDeadlineInputValue}
              value={editDeadline}
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
              inputValue={startDateInputValue}
              value={startDate}
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

CreateCampaignForm.propTypes = {
  showCreateForm: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  adminUsername: PropTypes.string.isRequired,
  createCampaign: PropTypes.func.isRequired,
}

export default CreateCampaignForm
