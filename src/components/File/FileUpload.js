import React, { useState } from 'react'
import axios from '../../api/axios'
import Dropzone from 'react-dropzone'
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined'
import { Typography } from '@material-ui/core'
import { setAlert } from '../../redux/actions/alert'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const FileUpload = ({ refreshFunction, setAlert }) => {
  const [files, setFiles] = useState([])

  const onDrop = async (files) => {
    const formData = new FormData()

    formData.append('file', files[0])

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    try {
      const res = await axios.post('/api/file/upload', formData, config)

      console.log(res)

      setFiles([res.data.data.file_name, ...files])
      refreshFunction([res.data.data.file_path, ...files])
    } catch (err) {
      setAlert('Upload file error', 'error')
    }
  }

  const onDelete = (image) => {
    const currentIndex = files.indexOf(image)

    let newFiles = [...files]
    newFiles.splice(currentIndex, 1)

    setFiles(newFiles)
    refreshFunction(newFiles)
  }

  return (
    <Dropzone onDrop={onDrop} multiple={false} maxSize={8 * 1000000 / 2}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()}>
          <PublishOutlinedIcon fontSize='large' />
          <Typography>Drag 'n' Drop your file here</Typography>
          <input {...getInputProps()} />
          <div>
            {files.map((image, index) => (
              <div onClick={() => onDelete(image)} key={index}></div>
            ))}
          </div>
        </div>
      )}
    </Dropzone>
  )
}

FileUpload.propTypes = {
  setAlert: PropTypes.func.isRequired,
}

export default connect(null, { setAlert })(FileUpload)
