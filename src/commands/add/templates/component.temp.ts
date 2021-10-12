export const compRnSource: string = `
/*
* created {{name}} component at {{date}} 
*/

import React from 'react';
import { /** View, Row, Spacer, ...others */ } from 'components'
import { {{name}}Container } from './{{name}}.styles';
import { /** rw, rh, srw, srh, srd, rwa, rha */ } from 'meterics'
import {/** color */} from 'colors'

export const {{name}} = (props) => {
   return(
       <{{name}}Container variant={'white'}>
        {/** ADD YOU STAFF HERE */}
       </{{name}}Container>
   )
}`;

export const componentTypeScript: string = `
/*
* created {{name}} component at {{date}} 
*/

import React from 'react';
import { /** View, Row, Spacer, ...others */ } from 'components'
import { {{name}}Container } from './{{name}}.styles';
import { /** rw, rh, srw, srh, srd, rwa, rha */ } from 'meterics'
import {/** color */} from 'colors'

interface I{{name}}Props {}

export const {{name}}:React.FC<I{{name}}Props> = (props: I{{name}}Props): React.ReactElement => {
   return(
       <{{name}}Container variant={'white'}>
          {/** ADD YOU STAFF HERE */}
       </{{name}}Container>
   )
}`;
