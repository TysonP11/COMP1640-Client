import axios from '../../api/axios';
import backupAxios from '../../api/backupAxios';
import {
  GET_CAMPAIGNS,
  GET_CAMPAIGN,
  CREATE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  CAMPAIGN_ERROR,
} from './types';
import { setAlert } from './alert';

// get all campaigns
export const getCampaigns = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/campaign');

    dispatch({
      type: GET_CAMPAIGNS,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: CAMPAIGN_ERROR,
      payload: { msg: err.message },
    });
    dispatch(setAlert('Get campaign error', 'error'));
  }
};

//restore data
export const restoreData = (history) => async (dispatch) => {
  try {
    //const res = await backupAxios.get('/api/back-up');

    //await axios.post('/api/back-up', res.data.data);

    history.push('/campaign');
    dispatch(setAlert('Database restored to previous version', 'success'));
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: CAMPAIGN_ERROR,
      payload: { msg: err.message },
    });
    dispatch(setAlert('Restore Data Error', 'error'));
  }
};

// get campaign by code
export const getCampaign = (code) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/campaign/${code}`);

    dispatch({
      type: GET_CAMPAIGN,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: CAMPAIGN_ERROR,
      payload: { msg: err.message },
    });
    dispatch(setAlert('Get campaign error', 'error'));
  }
};

// create campaign
export const createCampaign = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/campaign', formData);

    dispatch({
      type: CREATE_CAMPAIGN,
      payload: res.data.data,
    });

    dispatch(getCampaigns());

    dispatch(setAlert('Create campaign successfully', 'success'));
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: CAMPAIGN_ERROR,
      payload: { msg: err.message },
    });
    dispatch(setAlert('Create campaign error', 'error'));
  }
};

// update campaign
export const updateCampaign = (formData, code) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/campaign/update/${code}`, formData);

    dispatch({
      type: UPDATE_CAMPAIGN,
      payload: res.data.data,
    });

    dispatch(getCampaigns());

    dispatch(setAlert('Update campaign successfully', 'success'));
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: CAMPAIGN_ERROR,
      payload: { msg: err.message },
    });
    dispatch(setAlert('Update campaign error', 'error'));
  }
};

// get current campaign
export const getCurrentCampaign = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/campaign/get-current-campaign');

    dispatch({
      type: GET_CAMPAIGN,
      payload: res.data.data,
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: CAMPAIGN_ERROR,
      payload: { msg: err.message },
    });
    dispatch(setAlert('Get campaign error', 'error'));
  }
};

// update campaign status
export const updateCampaignStatus = (code) => async (dispatch) => {
  try {
    const config = {
      params: {
        code: code,
      },
    };

    const res = await axios.get('/api/campaign/update-status', config);

    dispatch({
      type: GET_CAMPAIGN,
      payload: res.data.data,
    });

    dispatch(getCampaigns());
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: CAMPAIGN_ERROR,
      payload: { msg: err.message },
    });
    dispatch(setAlert('Update campaign error', 'error'));
  }
};
