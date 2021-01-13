exports.compRnSource = `
/*
* created {{name}} component at {{date}} 
*/

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import publicStyles, {  } from '@styles';

export const {{name}} = (props) => {
   return(
       <View style={styles.container}>
           <Text>{'{{name}} Component'}</Text>
       </View>
   )
}

const styles = StyleSheet.create({
   container: {
       flex:1,
       justifyContent: 'center',
       alignItems: 'center'
   }
})
`