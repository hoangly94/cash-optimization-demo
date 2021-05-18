import * as React  from 'react'
import styles from './styles.css'
import * as Base from '_/_settings';
import styled from 'styled-components';

const Block = styled.div`
  text-align: center;
  color: palevioletred;
`;

export type Props = Base.Props & {
  children?: React.ReactNode,
};

export const Element = (props: Props): React.ReactElement => {
  const { 
    theme = Base.Theme.DEFAULT,
    children,
  } = props;

  //create props
  const blockProps = Base.mapProps(props, styles, [ theme]);

  return (
    <Block {...blockProps}>{children}</Block>
  )
}
