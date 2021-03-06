import component from '@/components/Interest';
import AbstractRoute from './AbstractRoute';
import { showLoader, hideLoader } from '../containers/Loader';

class Interest extends AbstractRoute {
  constructor(store) {
    super(store, 'interests', 'language', 'categories');
    this.component = component;
    this.initialState.travels = [];

    this.ACTIONS = {
      FETCH_SUCCESS: 'INTEREST_FETCH_SUCCESS',
      FETCH_FAILURE: 'INTEREST_FETCH_FAILURE',
    };

    this.init();
  }

  // actions
  static success({ json, travels }) {
    return {
      type: 'INTEREST_FETCH_SUCCESS',
      payload: {
        json,
        travels,
      },
    };
  }

  static fail(err) {
    return {
      type: 'INTEREST_FETCH_FAILURE',
      payload: {
        err,
      },
    };
  }

  static fetchSuccess(state, action) {
    return {
      ...state,
      data: action.payload.json,
      travels: action.payload.travels,
    };
  }

  loadFactory() {
    const API_URLS = [this.API_URL, `${this.API_URL_BASE}/travels`];

    return () => dispatch => {
      dispatch(showLoader());

      const fetchOptions = {
        method: 'GET',
      };

      return Promise.all(API_URLS.map(url => fetch(url, fetchOptions)))
        .then(responses =>
          Promise.all(responses.map(res => res.json())).then(jsons => {
            const payload = jsons.reduce((acc, e) => {
              if (e[0].name) {
                return { ...acc, json: e };
              }
              return { ...acc, travels: e };
            }, {});

            dispatch(Interest.success(payload));
            return dispatch(hideLoader());
          }),
        )
        .catch(err => {
          dispatch(Interest.fail(err));
          return dispatch(hideLoader());
        });
    };
  }

  init() {
    super.init();

    this.ACTION_HANDLERS[this.ACTIONS.FETCH_SUCCESS] = Interest.fetchSuccess;
    this.mapStateToProps.travels = 'travels';
  }
}

export default s => Interest.export(s);
