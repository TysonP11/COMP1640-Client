import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import FileUpload from '../File/FileUpload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFileWord,
  faFilePdf,
  faFileAlt,
} from '@fortawesome/free-regular-svg-icons'
import Avatar from '@material-ui/core/Avatar'
import defaultImage from '../Common/DefaultImage.png'
import { BASE_URL } from '../../environment/dev.env'
import emailjs from 'emailjs-com'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '100%',
    marginTop: theme.spacing(2),
    backgroundColor: '#fff',
  },
  fileInput: {
    '@media (max-width: 768px)': {
      height: 150,
    },
    width: '100%',
    height: 100,
    marginTop: theme.spacing(2),
    textAlign: 'center',
    position: 'relative',
  },
  imageInput: {
    '@media (max-width: 768px)': {
      height: 150,
    },
    width: '100%',
    height: 300,
    textAlign: 'center',
    marginTop: theme.spacing(2),
    position: 'relative',
  },
  fileInputContent: {
    textAlign: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  submitButton: {
    marginTop: theme.spacing(2),
    display: 'block',
  },
  uploadedImage: {
    '@media (max-width: 768px)': {
      width: 120,
      height: 100,
    },
    width: 300,
    height: 280,
  },
}))

const CreateArticleForm = ({
  createArticle,
  userDetails,
  username,
  campaignCode,
  history,
  coordinatorEmail,
}) => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const [nameErr, setNameErr] = useState(false)
  const [messageErr, setMessageErr] = useState(false)

  const [document, setDocument] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    if (name !== '') {
      setNameErr(false)
    }

    if (message !== '') {
      setMessageErr(false)
    }

  }, [name, message])

<<<<<<< HEAD
=======
  const uploadDocument = (newDocument) => {
    setDocument(newDocument)
  }

  const uploadImage = (newImage) => {
    setImage(newImage)
  }

>>>>>>> f27ed7dd0b51f764c27b14b1de159617b9e6d54b
  const handleOnChangeName = (e) => {
    setName(e.target.value)
  }

  const handleOnChangeMessage = (e) => {
    setMessage(e.target.value)
  }

  const uploadDocument = (newDocument) => {
    setDocument(newDocument);
  };

  const uploadImage = (newImage) => {
    setImage(newImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      name: name,
      message: message,
      image_url: image[0],
      document_url: document[0],
      user_username: username,
      faculty_code: userDetails.faculty_code,
      campaign_code: campaignCode,
<<<<<<< HEAD
    };

    const emailData = {
      reply_to: 'phamthaison11@gmail.com',
      from_name: 'G_mag',
      to_name: 'Coordinator',
      message: `Your faculty just received a new submission from ${username}. You have 14 days to comment.`,
      to_email: coordinatorEmail,
    };

    emailjs
      .send(
        'coordinator_contact',
        'coordinator_contact_form',
        emailData,
        'user_b3WPLwZ5Bam6FFUi3vfVF'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    createArticle(formData, history);
  };
=======
    }

    let hasErr = false

    if (formData.name === '') {
      setNameErr(true)
      hasErr = true
    }

    if (formData.message === '') {
      setMessageErr(true)
      hasErr = true
    }

    if (!formData.document_url || !formData.image_url) {
      hasErr = true
    }

    if (!hasErr) {
      const emailData = {
        reply_to: 'phamthaison11@gmail.com',
        from_name: 'G_mag',
        to_name: 'Coordinator',
        message: 'This is a test message',
        to_email: coordinatorEmail,
      }

      emailjs
        .send(
          'coordinator_contact',
          'coordinator_contact_form',
          emailData,
          'user_b3WPLwZ5Bam6FFUi3vfVF',
        )
        .then(
          (result) => {
            console.log(result.text)
          },
          (error) => {
            console.log(error.text)
          },
        )

      createArticle(formData, history)
    }
  }
>>>>>>> f27ed7dd0b51f764c27b14b1de159617b9e6d54b

  const uploadedFile =
    document[0] && document[0] !== '' ? (
      document[0].endsWith('.docx') || document[0].endsWith('.doc') ? (
        <Typography>
          <FontAwesomeIcon icon={faFileWord} size='2x' color='#2196f3' />{' '}
          {document[0].slice(8)}
        </Typography>
      ) : document[0].endsWith('.pdf') ? (
        <Typography>
          <FontAwesomeIcon icon={faFilePdf} size='2x' color='#d50000' />{' '}
          {document[0].slice(8)}
        </Typography>
      ) : (
        <Typography>
          <FontAwesomeIcon icon={faFileAlt} size='2x' /> {document[0].slice(8)}
        </Typography>
      )
    ) : (
      <Typography>
        <FontAwesomeIcon icon={faFileAlt} size='2x' /> File
      </Typography>
    )

  const uploadedImage =
    image[0] && image[0] !== '' ? (
      <Avatar
        variant='rounded'
        className={classes.uploadedImage}
        alt='article'
        src={`${BASE_URL}/${image[0]}`}
      />
    ) : (
      <Avatar
        className={classes.uploadedImage}
        alt='default'
        src={defaultImage}
      />
    )

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant='h4' gutterBottom>
        Submit Your Article
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          name='name'
          id='outlined-basic'
          label='Name'
          variant='outlined'
          className={classes.input}
          value={name}
          onChange={handleOnChangeName}
          error={nameErr}
          helperText={nameErr ? 'Invalid input!' : ''}
        />

        <TextField
          name='message'
          id='standard-textarea'
          label='Message'
          placeholder='Placeholder'
          multiline
          rows={4}
          className={classes.input}
          value={message}
          onChange={handleOnChangeMessage}
          variant='outlined'
          error={messageErr}
          helperText={messageErr ? 'Invalid input!' : ''}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper elevation={0} className={classes.fileInput}>
              <div className={classes.fileInputContent}>
                <FileUpload refreshFunction={uploadDocument} />
              </div>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper elevation={0} className={classes.fileInput}>
              <div className={classes.fileInputContent}>{uploadedFile}</div>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper elevation={0} className={classes.imageInput}>
              <div className={classes.fileInputContent}>
                <FileUpload refreshFunction={uploadImage} />
              </div>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper elevation={0} className={classes.imageInput}>
              <div className={classes.fileInputContent}>{uploadedImage}</div>
            </Paper>
          </Grid>
        </Grid>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <FormControlLabel
            control={<Checkbox value='allowExtraEmails' color='primary' />}
            label='I agree with terms and conditions of G-Mag'
          />
          <Link to='#'>
            <Typography>G-Mag Term and Conditions</Typography>
          </Link>
        </div>

        <Button
          className={classes.submitButton}
          variant='contained'
          color='primary'
          type='submit'
        >
          Submit
        </Button>
      </form>
    </Paper>
  )
}

CreateArticleForm.propTypes = {
  createArticle: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  campaignCode: PropTypes.string.isRequired,
}

export default CreateArticleForm
