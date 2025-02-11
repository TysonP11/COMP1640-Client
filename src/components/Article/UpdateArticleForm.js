import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Container,
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
import { Modal } from '@material-ui/core'

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

const UpdateArticleForm = ({
  updateArticle,
  showUpdateForm,
  handleCloseUpdtForm,
  article,
  loading,
  filterProps,
  facultyCode,
  page,
}) => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const [document, setDocument] = useState([])
  const [image, setImage] = useState([])

  useEffect(() => {
    console.log('UseEff Running')
    if (article) {
      setName(
        !article.name || article.name === '' || loading ? '' : article.name,
      )
      setMessage(
        !article.message || article.message === '' || loading
          ? ''
          : article.message,
      )
      setDocument(
        !article.document_url || article.document_url === '' || loading
          ? []
          : [article.document_url],
      )
      setImage(
        !article.image_url || article.image_url === '' || loading
          ? []
          : [article.image_url],
      )
    }
  }, [article, loading])

  const uploadDocument = (newDocument) => {
    setDocument(newDocument)
  }

  const uploadImage = (newImage) => {
    setImage(newImage)
  }

  const handleOnChangeName = (e) => {
    setName(e.target.value)
  }

  const handleOnChangeMessage = (e) => {
    setMessage(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      name: name,
      message: message,
      image_url: image[0],
      document_url: document[0],
    }

    const getArtcsProps = {
      props: filterProps,
      code: facultyCode,
      page,
    }

    updateArticle(formData, article.id, getArtcsProps)

    // getArticlesByProps(filterProps, facultyCode, page)

    handleCloseUpdtForm()
  }

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
    <Modal open={showUpdateForm} onClose={handleCloseUpdtForm}>
      <Container maxWidth='md'>
        <Paper elevation={3} className={classes.root}>
          <Typography variant='h4' gutterBottom>
            Update Your Article
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
                  <div className={classes.fileInputContent}>
                    {uploadedImage}
                  </div>
                </Paper>
              </Grid>
            </Grid>

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
      </Container>
    </Modal>
  )
}

UpdateArticleForm.propTypes = {
  updateArticle: PropTypes.func.isRequired,
  article: PropTypes.object,
  showUpdateForm: PropTypes.bool.isRequired,
  handleCloseUpdtForm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  filterProps: PropTypes.object.isRequired,
}

export default UpdateArticleForm
