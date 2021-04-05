import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HomePageComponent from '../../components/Home/HomePageComponent';
import Spinner from '../../components/common/Spinner';
import {
  getArticlesByFacultyAndStatus,
  getArticlesByFacultyAndStatusAndCampaign,
} from '../../redux/actions/article';

import { getCampaigns } from '../../redux/actions/campaign';

export const HomePage = ({
  auth: { loading, user },
  article,
  getArticlesByFacultyAndStatus,
  getArticlesByFacultyAndStatusAndCampaign,
  getCampaigns,
  campaign,
}) => {
  useEffect(() => {
    if (user && user.details) {
      getArticlesByFacultyAndStatus(user.details.faculty_code, 'ACCEPTED');
    }

    getCampaigns();

    // eslint-disable-next-line
  }, [loading, user]);

  const handleGetArtcsByCampaign = (campaignCode) => {
    getArticlesByFacultyAndStatusAndCampaign(
      user.details.faculty_code,
      'ACCEPTED',
      campaignCode
    );
  };

  return loading ||
    !user ||
    !user.authorities ||
    !user.details ||
    article.loading ||
    campaign.loading ? (
    <Spinner />
  ) : (
    <HomePageComponent
      articles={article.articles}
      getArtcsByCampaign={handleGetArtcsByCampaign}
      campaigns={campaign.campaigns}
      pagination={article.pagination}
      getArtcsByFaculty={getArticlesByFacultyAndStatus}
      userDetails={user.details}
    />
  );
};

HomePage.propTypes = {
  auth: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  getArticlesByFacultyAndStatus: PropTypes.func.isRequired,
  getArticlesByFacultyAndStatusAndCampaign: PropTypes.func.isRequired,
  getCampaigns: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  article: state.article,
  campaign: state.campaign,
});

export default connect(mapStateToProps, {
  getArticlesByFacultyAndStatus,
  getArticlesByFacultyAndStatusAndCampaign,
  getCampaigns,
})(HomePage);
