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


export default async function connectAll(name, {components}){
    const types = `{ ${name.toUpperCase()}, ${name.toUpperCase()}_SUCCESS, ${name.toUpperCase()}_FAILED }`
     await addTypes(name)
     await addReducer(name, types, `${name.toUpperCase()}`, `${name.toUpperCase()}_SUCCESS`, `${name.toUpperCase()}_FAILED`)
     await addAction(name, types, `${name.toUpperCase()}`, `${name.toUpperCase()}_SUCCESS`, `${name.toUpperCase()}_FAILED`)
     await addSaga(name,types, `${name.toUpperCase()}`, `${name.toUpperCase()}_SUCCESS`, `${name.toUpperCase()}_FAILED`)
     await addScreen(name, { components, actions: [ name ], exprt: true })
     const res = findPath(`App/screens`)
     if(res.status){
         const screenPath = `${res.path}/${name}/${name.toLowerCase()}.screen.js`
         await appendToFile(
            screenPath,
            [ `return {`],
            `${name}: state.${name},`
        );
        formatFile(screenPath)
     }

 }