exports.stylesRnSources = `
/** 
* created styles for {{name}} screen at {{date}}
*/

import styled from 'styled-components/native';
import { rw, rh, srw, srh, srd } from '@meterics';
import { Container, Row } from '@styled';
import { getStatusBarHeight } from '@utils/statusBar.util';
import { color } from '@colors';\n\n` + "export const ContainerBox = styled.View` \n flex: 1; \n justify-content: center; \n align-items: center; \n `";