import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CreateArticleForm from '../../components/Article/CreateArticleForm'
import CreateArticleBreadcrumbs from '../../components/Article/CreateArticleBreadcrumbs'
import { createArticle } from '../../redux/actions/article'
import Spinner from '../../components/Common/Spinner'
import { getCurrentCampaign } from '../../redux/actions/campaign'

export const CreateArticlePage = ({
  createArticle,
  auth: { loading, user },
  getCurrentCampaign,
  campaign,
}) => {
  useEffect(() => {
    getCurrentCampaign()
    // eslint-disable-next-line
  }, [loading])

  return (
    <div>
      <CreateArticleBreadcrumbs />
      {loading ||
      !user ||
      !user.details ||
      !user.username ||
      campaign.loading ||
      !campaign.campaign ? (
        <Spinner />
      ) : (
        <CreateArticleForm
          createArticle={createArticle}
          userDetails={user.details}
          username={user.username}
          campaignCode={campaign.campaign.code}
        />
      )}
    </div>
  )
}

CreateArticlePage.propTypes = {
  createArticle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentCampaign: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  campaign: state.campaign,
})

export default connect(mapStateToProps, { createArticle, getCurrentCampaign })(
  CreateArticlePage,
)
