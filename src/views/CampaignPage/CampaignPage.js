import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getCampaigns,
  createCampaign,
  getCampaign,
  updateCampaign,
  updateCampaignStatus,
} from '../../redux/actions/campaign';
import { downloadAllArticl } from '../../redux/actions/article';
import CampaignTable from '../../components/Campaign/CampaignTable';
import CreateCampaignForm from '../../components/Campaign/CreateCampaignForm';
import CampaignBreadcrumbs from '../../components/Campaign/CampaignBreadcrumbs';
import { Button, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Spinner from '../../components/common/Spinner';

const useStyles = makeStyles((theme) => ({
  createButton: {
    marginTop: theme.spacing(2),
  },
}));

export const CampaignPage = ({
  getCampaigns,
  campaign: { campaigns, loading, campaign },
  auth,
  createCampaign,
  updateCampaign,
  getCampaign,
  updateCampaignStatus,
  downloadAllArticl,
}) => {
  const classes = useStyles();

  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleShowCreateForm = () => {
    setShowCreateForm(true);
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
  };

  useEffect(() => {
    getCampaigns();
    // eslint-disable-next-line
  }, []);

  return loading || auth.loading || !auth.user || !auth ? (
    <Spinner />
  ) : (
    <>
      <CampaignBreadcrumbs />
      <Button
        variant='outlined'
        size='large'
        color='primary'
        startIcon={<AddIcon />}
        className={classes.createButton}
        onClick={handleShowCreateForm}
      >
        Create Campaign
      </Button>

      <CreateCampaignForm
        handleClose={handleCloseCreateForm}
        adminUsername={auth.user.username}
        createCampaign={createCampaign}
        showCreateForm={showCreateForm}
      />

      <CampaignTable
        campaigns={campaigns}
        getCampaign={getCampaign}
        updateCampaign={updateCampaign}
        campaign={campaign && campaign}
        user={auth.user}
        updateStatus={updateCampaignStatus}
        downloadAllArticl={downloadAllArticl}
      />
    </>
  );
};

CampaignPage.propTypes = {
  getCampaigns: PropTypes.func.isRequired,
  campaign: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createCampaign: PropTypes.func.isRequired,
  getCampaign: PropTypes.func.isRequired,
  updateCampaign: PropTypes.func.isRequired,
  updateCampaignStatus: PropTypes.func.isRequired,
  downloadAllArticl: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  campaign: state.campaign,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCampaigns,
  createCampaign,
  getCampaign,
  updateCampaign,
  updateCampaignStatus,
  downloadAllArticl,
})(CampaignPage);
