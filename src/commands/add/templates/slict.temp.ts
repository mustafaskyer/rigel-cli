export const sliceTempTs: string = `
/** 
 * created {{name}} at {{date}}
*/

import {createSlice} from "@reduxjs/toolkit";

export interface I{{name}} {}

const initialState: I{{name}} = {}

const {{name}}Slice = createSlice({
    name: "{{name}}_slice",
    initialState,
    reducers: {
        set: (state: I{{name}}, action: { payload: any }) => {},
        get: (state: I{{name}}, action: { payload: any }) => {},
    }
})

export const {set, get} = {{name}}Slice.actions;
export default {{name}}Slice;
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
        set: (state, action) => {},
        get: (state, action) => {},
    }
})

export const {set, get} = {{name}}Slice.actions;
export default {{name}}Slice;
`;
