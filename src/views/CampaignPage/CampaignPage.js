import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  getCampaigns,
  createCampaign,
  getCampaign,
  updateCampaign,
  updateCampaignStatus,
  restoreData,
} from '../../redux/actions/campaign';
import { downloadAllArticl } from '../../redux/actions/article';
import CampaignTable from '../../components/Campaign/CampaignTable';
import CreateCampaignForm from '../../components/Campaign/CreateCampaignForm';
import CampaignBreadcrumbs from '../../components/Campaign/CampaignBreadcrumbs';
import { Button, makeStyles, Typography, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Spinner from '../../components/Common/Spinner';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
  createButton: {
    marginLeft: theme.spacing(2),
  },
  buttonArea: {
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
  restoreData,
  history,
}) => {
  const classes = useStyles();

  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleShowCreateForm = () => {
    setShowCreateForm(true);
  };

  const handleCloseCreateForm = () => {
    setShowCreateForm(false);
  };

  const handleRestoreData = () => {
    restoreData(history);
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

      {auth.user.authorities && auth.user.authorities.includes('ROLE_ADMIN') && (
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
          className={classes.buttonArea}
        >
          <Grid item>
            <Button
              variant='outlined'
              size='large'
              color='primary'
              startIcon={<AddIcon />}
              //className={classes.createButton}
              onClick={handleShowCreateForm}
            >
              Create Campaign
            </Button>
          </Grid>
          <Grid item>
            <Grid
              container
              direction='row'
              justify='flex-end'
              alignItems='center'
            >
              <Grid item>
                <Typography>Your data was backed up 7 hours ago</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant='outlined'
                  size='medium'
                  color='inherit'
                  startIcon={<RefreshIcon />}
                  className={classes.createButton}
                  onClick={handleRestoreData}
                >
                  Restore
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

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
  restoreData: PropTypes.func.isRequired,
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
  restoreData,
})(CampaignPage);
