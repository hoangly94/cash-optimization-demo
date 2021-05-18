import * as React from 'react'
import Classnames from 'classnames'
import * as Base from '_/_settings';
import styles from './styles.css';

import * as  Header from '_atoms/header';
import * as HeaderBarMobile from '_organisms/headerBarMobile';

export type Props = Header.Props & {
  $headerBar: HeaderBarMobile.Props,
}

export const Element = (props: Props) => {
  const {
    $headerBar,
  } = props;

  //create class props
  const headerProps = props;

  const headerBarMobileProps = {
    ...$headerBar,
  }

  return (
    <Header.Element {...headerProps}>
      <HeaderBarMobile.Element {...headerBarMobileProps} />
    </Header.Element>
  )
}


