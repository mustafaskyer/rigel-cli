export const compRnSource: string =
  `
/*
* created {{name}} component at {{date}} 
*/

import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native'
import { View, Row, Spacer } from '@styled'
import {rw,rh} from '@meterics'
import {color} from '@colors'

export const {{name}} = (props) => {
   return(
       <ViewContainer>
           <Text>{'{{name}} Component'}</Text>
       </ViewContainer>
   )
}` + '\n\nconst ViewContainer = styled(View)``\n';
