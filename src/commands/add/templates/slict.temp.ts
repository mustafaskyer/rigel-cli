export const sliceTempTs: string = `
/** 
 * created {{name}} at {{date}}
*/

import {createSlice} from "@reduxjs/toolkit";

export interface I{{interface}} {}

const initialState: I{{interface}} = {}

const {{name}}Slice = createSlice({
    name: "{{name}}_slice",
    initialState,
    reducers: {
        set{{name}}: (state: I{{interface}}, action: { payload: any }) => {},
        get{{name}}: (state: I{{interface}}, action: { payload: any }) => {},
    }
})

export const {set{{name}}, get{{name}}, } = {{name}}Slice.actions;
export default {{name}}Slice.reducer;
`;
export const sliceTempJs: string = `
/** 
 * created {{name}} at {{date}}
*/

import {createSlice} from "@reduxjs/toolkit";

const initialState = {}

const {{name}}Slice = createSlice({
    name: "{{name}}_slice",
    initialState,
    reducers: {
        set{{name}}: (state, action) => {},
        get{{name}}: (state, action) => {},
    }
})

export const {set{{name}}, get{{name}}} = {{name}}Slice.actions;
export default {{name}}Slice.reducer;
`;
