exports.stylesRnSources = `
/** 
 * created styles for {{name}} screen at {{date}}
*/

import { StyleSheet } from "react-native";

import public, { rw, rh, appcolor } from 'styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
`;