import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DashboardCharts from '../../components/Dashboard/Dashboard'
import { getUsersByRole } from '../../redux/actions/auth'
import { getCampaigns, getCurrentCampaign } from '../../redux/actions/campaign'
import { getArticlesWithoutPagin } from '../../redux/actions/article'
import { getAllCommentsByFaculty } from '../../redux/actions/comment'
import Spinner from '../../components/Common/Spinner'
import DashboardBreadcrumbs from '../../components/Dashboard/DashboardBreadcrumbs'

export const DashboardPage = ({
  getUsersByRole,
  auth: { loading, users },
  getCampaigns,
  campaign,
  getCurrentCampaign,
  getArticlesWithoutPagin,
  article,
  getAllCommentsByFaculty,
  comment,
}) => {
  useEffect(() => {
    getUsersByRole(2)

    getCampaigns()

    getCurrentCampaign()
    // eslint-disable-next-line
  }, [loading])

  return loading ||
    campaign.loading ||
    !campaign.campaigns ||
    !campaign.campaign ||
    !campaign.campaign.code ? (
    <Spinner />
  ) : (
    <div>
      <DashboardBreadcrumbs />
      <DashboardCharts
        users={users}
        campaigns={campaign.campaigns}
        currentCampaignCode={campaign.campaign.code}
        articles={article.articles}
        getArticlesByCampaign={getArticlesWithoutPagin}
        getAllCommentsByFaculty={getAllCommentsByFaculty}
        commentCount={comment.commentCount}
      />
    </div>
  )
}

DashboardPage.propTypes = {
  getUsersByRole: PropTypes.func.isRequired,
  getCampaigns: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  campaign: PropTypes.object.isRequired,
  getCurrentCampaign: PropTypes.func.isRequired,
  getArticlesWithoutPagin: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  getAllCommentsByFaculty: PropTypes.func.isRequired,
  commentCount: PropTypes.object,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  campaign: state.campaign,
  article: state.article,
  comment: state.comment,
})

export default connect(mapStateToProps, {
  getUsersByRole,
  getCampaigns,
  getCurrentCampaign,
  getArticlesWithoutPagin,
  getAllCommentsByFaculty,
})(DashboardPage)
