import component from '@/components/Work';
import AbstractRoute from './AbstractRoute';

class Work extends AbstractRoute {
  constructor(store) {
    super(store, 'works', 'work');
    this.component = component;

    this.ACTIONS = {
      FETCH_SUCCESS: 'WORK_FETCH_SUCCESS',
      FETCH_FAILURE: 'WORK_FETCH_FAILURE',
    };
    this.init();
  }

  static success(json) {
    return {
      type: 'WORK_FETCH_SUCCESS',
      payload: {
        json,
      },
    };
  }

  static fail(err) {
    return {
      type: 'WORK_FETCH_FAILURE',
      payload: {
        err,
      },
    };
  }
}

export default s => Work.export(s);
