import {
  GET_CAMPAIGNS,
  GET_CAMPAIGN,
  CREATE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  CAMPAIGN_ERROR,
} from '../actions/types'

const initialState = {
  campaign: {},
  campaigns: [],
  loading: true,
  error: {},
}

export default function campaignReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_CAMPAIGNS:
      return {
        ...state,
        campaigns: payload,
        loading: false,
        error: {},
      }

    case GET_CAMPAIGN:
      return {
        ...state,
        campaign: payload,
        loading: false,
        error: {},
      }

    case CREATE_CAMPAIGN:
      return {
        ...state,
        campaign: payload,
        loading: false,
        error: {},
      }

    case UPDATE_CAMPAIGN:
      return {
        ...state,
        campaign: payload,
        loading: false,
        error: {},
      }

    case CAMPAIGN_ERROR: {
      return {
        ...state,
        loading: false,
        error: payload,
      }
    }

    default:
      return state
  }
}
