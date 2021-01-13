exports.screenRnSource = `
/** 
 * created {{name}}Screen at {{date}}
*/

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import publicStyles, { rw, rh, appcolor } from 'styles'
import typography from 'styles/typography'

import styles from './{{styleName}}.styles';


const {{name}}Screen = (props) => {

    const [state, setState] = useState(null)
    useEffect(() => {

		/** DidMount */

		return () => { /** UnMounted */ }

	},[])
	
    return(
        <View style={publicStyles.container}>
            <View style={styles.container}>
                <Text>{'{{name}} Screen'}</Text>
            </View>
        </View>
    )
}


/**
 * @param {any} state 
 * @returns 
 */
const mapProps = state => {
    return {
    }
}

/** 
 * actions should assign here
*/
const actions = {

}

export default connect(mapProps, actions)({{name}}Screen)
`;