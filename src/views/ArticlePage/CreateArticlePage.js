import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CreateArticleForm from '../../components/Article/CreateArticleForm'
import CreateArticleBreadcrumbs from '../../components/Article/CreateArticleBreadcrumbs'
import { createArticle } from '../../redux/actions/article'
import Spinner from '../../components/Common/Spinner'

export const CreateArticlePage = ({
  createArticle,
  auth: { loading, user },
  match,
}) => {
  return (
    <div>
      <CreateArticleBreadcrumbs />
      {loading || !user || !user.details || !user.username ? (
        <Spinner />
      ) : (
        <CreateArticleForm
          createArticle={createArticle}
          userDetails={user.details}
          username={user.username}
          campaignCode={match.params.campaignCode}
        />
      )}
    </div>
  )
}

CreateArticlePage.propTypes = {
  createArticle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { createArticle })(CreateArticlePage)
