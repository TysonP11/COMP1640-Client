import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CreateArticleForm from '../../components/Article/CreateArticleForm'
import { createArticle } from '../../redux/actions/article'

export const CreateArticlePage = ({ createArticle }) => {
  return (
    <div>
      <CreateArticleForm createArticle={createArticle} />
    </div>
  )
}

CreateArticlePage.propTypes = {
  createArticle: PropTypes.func.isRequired,
}

export default connect(null, { createArticle })(CreateArticlePage)
