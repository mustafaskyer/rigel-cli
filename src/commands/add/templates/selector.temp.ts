export const selectorRnSource: string = `
/** 
 * created {{name}}Selector at {{date}}
*/

import { createSelector } from 'reselect';
const select{{name}} = (state) => state.{{name}};

/**
    export const select{{name}}Next = createSelector(
        [select{{name}}],
        (props) => props
    )
*/
`;
