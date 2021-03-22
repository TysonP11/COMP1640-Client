import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CreateArticleForm from '../../components/Article/CreateArticleForm'
import CreateArticleBreadcrumbs from '../../components/Article/CreateArticleBreadcrumbs'
import { createArticle } from '../../redux/actions/article'
import Spinner from '../../components/Common/Spinner'
import { getCurrentCampaign } from '../../redux/actions/campaign'

import { getFaculty } from '../../redux/actions/faculty'

export const CreateArticlePage = ({
  createArticle,
  getFaculty,
  auth: { loading, user },
  getCurrentCampaign,
  campaign,
  faculty,
  history,
}) => {
  useEffect(() => {
    getCurrentCampaign()

    getFaculty(user.details.faculty_code)

    // eslint-disable-next-line
  }, [loading])

  return (
    <div>
      <CreateArticleBreadcrumbs />
      {loading ||
      !user ||
      !user.details ||
      !user.username ||
      faculty.loading ||
      !faculty.faculty ||
      campaign.loading ||
      !campaign.campaign ||
      !faculty.faculty.coordinator ? (
        <Spinner />
      ) : (
        <CreateArticleForm
          createArticle={createArticle}
          userDetails={user.details}
          username={user.username}
          campaignCode={campaign.campaign.code}
          coordinatorEmail={faculty.faculty.coordinator.email}
          history={history}
        />
      )}
    </div>
  )
}

CreateArticlePage.propTypes = {
  createArticle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentCampaign: PropTypes.func.isRequired,
  faculty: PropTypes.object.isRequired,
  getFaculty: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  campaign: state.campaign,
  faculty: state.faculty,
})

export default connect(mapStateToProps, {
  createArticle,
  getCurrentCampaign,
  getFaculty,
})(CreateArticlePage)
