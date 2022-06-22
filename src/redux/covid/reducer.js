const FETCH_STATS = 'covid/FETCH_STATS';

const initialState = [];

const fetchStats = (payload) => ({
  type: FETCH_STATS,
  payload,
});

const covidReducer = (state = initialState, action = { type: 'action' }) => {
  switch (action.type) {
    case FETCH_STATS:
      return [...state, ...action.payload];

    default:
      return state;
  }
};

export { fetchStats, covidReducer };
