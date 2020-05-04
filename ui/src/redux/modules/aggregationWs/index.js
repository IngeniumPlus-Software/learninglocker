import { fromJS, Map, OrderedMap } from 'immutable';
import { createSelector } from 'reselect';
import { handleActions } from 'redux-actions';
import { SETIN_AGGREGATION_RESULT } from 'ui/redux/modules/aggregation';
import * as fetchAggregationDuck from 'ui/redux/modules/aggregationWs/fetchAggregation';
import { get } from 'lodash';

/*
 * Reducers
 */
const handler = handleActions({
  ...fetchAggregationDuck.reducers,
  [SETIN_AGGREGATION_RESULT]: (state, action) => {
    const { keyPath, value } = action;
    return state.setIn(keyPath, value);
  }
});

const initialState = new Map();
export default function reducer(state = initialState, action = {}) {
  if (!Map.isMap(state)) return reducer(fromJS(state), action); // ensure immutability
  return handler(state, action);
}

/*
 * Actions
 */
export const setInAggregationResult = (keyPath, value) => ({
  type: SETIN_AGGREGATION_RESULT,
  keyPath,
  value
});

export const fetchAggregation = fetchAggregationDuck.actions.start;

/*
 * Selectors
 */
export const aggregationSelector = state => state.aggregationWs;
export const aggregationRequestStateSelector = fetchAggregationDuck.selectors.aggregationRequestStateSelector;
export const aggregationShouldFetchSelector = fetchAggregationDuck.selectors.aggregationShouldFetchSelector;
export const aggregationResultsSelector = pipeline => createSelector(
  aggregationSelector,
  aggregations => aggregations.getIn([pipeline, 'result'])
);

export const aggregationHasResultSelector = pipeline => createSelector(
  aggregationSelector,
  aggregations => OrderedMap.isOrderedMap(aggregations.getIn([pipeline, 'result']))
);

export const aggregationWsResultsSelector = (pipeline, timeInterval) => createSelector(
    aggregationSelector,
    aggregations => aggregations.getIn([
      new Map({
        pipeline,
        timeIntervalSinceToday: get(timeInterval, 'timeIntervalSinceToday'),
        timeIntervalUnits: get(timeInterval, 'timeIntervalUnits'),
        ...(get(timeInterval, 'timeIntervalSincePreviousTimeInterval')
            ? {
              timeIntervalSincePreviousTimeInterval: get(timeInterval, 'timeIntervalSincePreviousTimeInterval')
            }
            : {}
        )
      }),
      'result'
    ])
  );

export const aggregationWsModelsSelector = (pipeline, timeInterval) => createSelector(
    aggregationSelector,
    (aggregations) => {
      const out = aggregations.getIn([
        new Map({
          pipeline,
          timeIntervalSinceToday: get(timeInterval, 'timeIntervalSinceToday'),
          timeIntervalUnits: get(timeInterval, 'timeIntervalUnits'),
          ...(get(timeInterval, 'timeIntervalSincePreviousTimeInterval')
              ? {
                timeIntervalSincePreviousTimeInterval: get(timeInterval, 'timeIntervalSincePreviousTimeInterval')
              }
              : {}
          )
        })
      ]);
      // console.log('201 -------------------');
      // console.log('201.1', pipeline);
      // console.log('201.2', timeInterval);
      // console.log('201.3', aggregations);
      // console.log('201.4 out', out);
      return out;
    }
  );

export const aggregationWsHasResultSelector = (
  pipeline,
  timeInterval
) => createSelector(
  aggregationSelector,
  aggregations => OrderedMap.isOrderedMap(aggregations.getIn([new Map({
    pipeline,
    timeIntervalSinceToday: get(timeInterval, 'timeIntervalSinceToday'),
    timeIntervalUnits: get(timeInterval, 'timeIntervalUnits')
  }), 'result']))
);

/*
 * Sagas
 */
export const sagas = fetchAggregationDuck.sagas;
