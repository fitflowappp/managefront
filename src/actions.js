/**
 * Created by john on 2017/6/6.
 */
import { actionFactory, reducerFactory } from './common/index';

const reducerObject = {};
function resource(name, url, keys = [], option = {}) {
  const actionOption = option.actions;
  const reducerOption = option.reducers;
  reducerObject[name.toLowerCase()] = reducerFactory(name, reducerOption);
  exports[`${name.toLowerCase()}Actions`] = { ...actionFactory(name, url, keys, actionOption) };
}
resource(
  'Account', '/api/user', [],
  {
    actions: [
      ['login', 'post', '/api/manage/admin/login', 'result'],
    ],
    reducers: {
      // TEST_ADD_ACTIONS: function (state, action) {
      //     console.log(state, action);
      // return something
      // return Object.assign({}, state, {isLoading: true, error: false})
      // }
    },
  },
);
resource(
  'Users', '/api/manage/admin/user/:id', [],
  {
    actions: [
      ['putSuper', 'put', '/api/manage/admin/user/:uid/super'],
      ['deleteSuper', 'delete', '/api/manage/admin/user/:uid/super'],
    ],
  },
);
resource(
  'Dashboard', '/api/manage/yoga/dashboard', [],
  {
    actions: [

    ],
  },
);
resource(
  'Routines', '/api/manage/yoga/routine/:id', [],
  {
    actions: [

    ],
  },
);
resource(
  'Workouts', '/api/manage/yoga/workout/:id', [],
  {
    actions: [
      ['copyWorkout', 'put', '/api/manage/yoga/workout/:id/copy/:title', 'risk'],
    ],
  },
);
resource(
  'Challenges', '/api/manage/yoga/challenge/:id', [],
  {
    actions: [

    ],
  },
);
resource(
  'ChallengeOrders', '/api/manage/yoga/challengeset/:id', [],
  {
    actions: [

    ],
  },
);
resource(
  'SinglesOrders', '/api/manage/yoga/singles/:id', [],
  {
    actions: [
      ['updateSinglesSort', 'post', '/api/manage/yoga/singles/:id/sort/:sort'],
      ['addSinglesWorkout', 'post', '/api/manage/yoga/singles/addSingles/:id'],
      ['saveSinglesOrders', 'post', '/api/manage/yoga/singles/orders'],

    ],
  },
);
resource(
  'MileStones', '/api/manage/yoga/milestone/:id', [],
  {
    actions: [

    ],
  },
);
exports.reducers = reducerObject;

