export const reducerRnSource: string = `
/**
 * created {{name}}Reducer at {{date}}
 */
import produce from 'immer';
import { {{type1}}, {{type2}}, {{type3}} } from './{{name}}.types';

const INITIAL_STATE = {
    /** initial state */
};

export default (state = INITIAL_STATE, { type, payload }) => {
  return produce(state, draft => {
    switch (type) {
      case {{type1}}:
        // draft = null;
        return draft
      case {{type2}}:
        draft = payload;
        return draft
      case {{type3}}:
        draft = payload;
        return draft
    }
  });
};
`;
