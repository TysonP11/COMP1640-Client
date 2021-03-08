import React, { useState } from 'react'
import axios from '../../api/axios'
import Dropzone from 'react-dropzone'
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined'
import { Typography } from '@material-ui/core'

const FileUpload = ({ refreshFunction }) => {
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
      console.error(err)
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
    <Dropzone onDrop={onDrop} multiple={false} maxSize={1000000000}>
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

export default FileUpload
