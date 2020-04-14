/**
 * should add screen (name,style) & export to appnavigation
 * should add types & export to types/index
 * should add reducer & export to reducer/index
 * should add action & export to actions/index
 * should add saga & export to saga/index
 * should connect action with reducer into screen
 */

import addTypes from "./types";
import addReducer from "./reducer";
import addAction from "./action";
import addSaga from "./saga";
import addScreen from "./screen";
import { findPath, appendToFile } from "../../helper/helper";
import formatFile from "../format";


export default async function createReduxFiles(name, {redux_case}){
    if(!redux_case) redux_case = name
     await addTypes(name, redux_case)
     await addReducer(name, redux_case)
     await addAction(name, redux_case)
     await addSaga(name, redux_case)
 }