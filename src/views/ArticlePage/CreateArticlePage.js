import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CreateArticleForm from '../../components/Article/CreateArticleForm'
import CreateArticleBreadcrumbs from '../../components/Article/CreateArticleBreadcrumbs'
import { createArticle } from '../../redux/actions/article'
import Spinner from '../../components/common/Spinner'
import { getFaculty } from '../../redux/actions/faculty'

export const CreateArticlePage = ({
  createArticle,
  getFaculty,
  auth: { loading, user },
  match,
  faculty
}) => {

  useEffect(() => {
    if(!loading) {
      getFaculty(user.details.faculty_code);
    }
    // eslint-disable-next-line
  }, [loading])
  return (
    <div>
      <CreateArticleBreadcrumbs />
      {loading || !user || !user.details || !user.username || faculty.loading || !faculty.faculty? (
        <Spinner />
      ) : (
        <CreateArticleForm
          createArticle={createArticle}
          userDetails={user.details}
          username={user.username}
          campaignCode={match.params.campaignCode}
          coordinatorEmail={faculty.faculty.coordinator_username}
        />
      )}
    </div>
  )
}

CreateArticlePage.propTypes = {
  createArticle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  faculty: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  faculty: state.faculty
})

export default connect(mapStateToProps, { createArticle, getFaculty })(CreateArticlePage)
