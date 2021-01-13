exports.screenRnSource = `
/** 
 * created {{name}}Screen at {{date}}
*/

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {} from '@selectors'; // redux selectors
import {} from '@actions'; // redux actions

import { rw,rh, srw, srh, srd } from '@meterics'
import { TextSm } from '@styled'
import { ContainerBox } from './{{name}}.styles';


const {{name}}Screen = (props) => {

    const [state, setState] = useState(null)
    useEffect(() => {
        
        /** DidMount */
        
		return () => { /** UnMounted */ }
	},[])
	
    return(
        <ContainerBox>
            <TextSm variant={'appColor'}>{'{{name}} Screen'}</TextSm>
        </ContainerBox>
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