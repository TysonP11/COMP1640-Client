import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import HomePageComponent from '../../components/Home/HomePageComponent'
import Spinner from '../../components/Common/Spinner'
import {
  getArticlesByFacultyAndStatus,
  getArticlesByFacultyAndStatusAndCampaign,
  getArticleByCampaignAndStatus,
  getArticlesByStatus,
} from '../../redux/actions/article'

import { getCampaigns } from '../../redux/actions/campaign'
import { Redirect } from 'react-router'

export const HomePage = ({
  auth: { loading, user },
  article,
  getArticlesByFacultyAndStatus,
  getArticlesByFacultyAndStatusAndCampaign,
  getCampaigns,
  campaign,
  getArticleByCampaignAndStatus,
  getArticlesByStatus,
}) => {
  useEffect(() => {
    if (user && user.details && user.authorities) {
      if (user.authorities.includes('ROLE_MARKETING_MANAGER')) {
        getArticlesByStatus('ACCEPTED')
      } else {
        getArticlesByFacultyAndStatus(user.details.faculty_code, 'ACCEPTED')
      }
    }

    getCampaigns()

    // eslint-disable-next-line
  }, [loading, user])

  const [cpCode, setCpCode] = useState('')

  const handleGetArtcsByCampaign = (campaignCode) => {
    setCpCode(campaignCode)
    if (user.authorities.includes('ROLE_MARKETING_MANAGER')) {
      getArticleByCampaignAndStatus(campaignCode, 'ACCEPTED')
    } else {
      getArticlesByFacultyAndStatusAndCampaign(
        user.details.faculty_code,
        'ACCEPTED',
        campaignCode,
      )
    }
  }

  return loading ||
    !user ||
    !user.authorities ||
    !user.details ||
    article.loading ||
    !article.pagination ||
    campaign.loading ? (
    <Spinner />
  ) : user.authorities.includes('ROLE_ADMIN') ? (
    <Redirect to='/campaign' />
  ) : (
    <HomePageComponent
      articles={article.articles}
      getArtcsByCampaign={handleGetArtcsByCampaign}
      campaigns={campaign.campaigns}
      pagination={article.pagination}
      getArtcsByFaculty={getArticlesByFacultyAndStatus}
      userDetails={user.details}
      authorities={user.authorities}
      getArtcsByCampaignStatus={getArticleByCampaignAndStatus}
      cpCode={cpCode}
      getArticlesByStatus={getArticlesByStatus}
    />
  )
}

HomePage.propTypes = {
  auth: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  getArticlesByFacultyAndStatus: PropTypes.func.isRequired,
  getArticlesByFacultyAndStatusAndCampaign: PropTypes.func.isRequired,
  getCampaigns: PropTypes.func.isRequired,
  getArticlesByStatus: PropTypes.func.isRequired,
  getArticleByCampaignAndStatus: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  article: state.article,
  campaign: state.campaign,
})

export default connect(mapStateToProps, {
  getArticlesByFacultyAndStatus,
  getArticlesByFacultyAndStatusAndCampaign,
  getCampaigns,
  getArticlesByStatus,
  getArticleByCampaignAndStatus,
})(HomePage)
