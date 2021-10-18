export const stylesRnSources: string =
  `
/** 
* created styles for component {{name}} screen at {{date}}
*/

import styled from 'styled-components/native';
import { rw, rh, srw, srh, srd, rwa, rha } from 'meterics';
import { Row, View, Touch } from 'components';
// import { getStatusBarHeight } from 'utils/statusBar.util';
import { color } from 'colors';\n\n
` + 'export const {{name}}Container = styled(View)`background-color: ${color};`';

export const stylesTypeScript: string =
  `
/** 
* created styles for {{name}} screen at {{date}}
*/

import styled from 'styled-components/native';
import { rw, rh, srw, srh, srd, rwa, rha } from 'meterics';
import { Row, View, Touch } from 'components';
// import { getStatusBarHeight } from 'utils/statusBar.util';
import { color } from 'colors';\n\n
` + 'export const {{name}}Container = styled(View)`background-color: ${color};`';
