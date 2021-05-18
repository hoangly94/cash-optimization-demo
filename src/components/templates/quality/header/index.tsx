import * as React from 'react'
import Classnames from 'classnames'
import * as Base from '_/_settings';
import styles from './styles.css';

import * as  Header from '../../../atoms/header';
import * as HeaderBar from '../../../organisms/headerBar';

type Props = Header.Props & {
  $headerBar: HeaderBar.Props,
}

const Element = (props: Props) => {
  const {
    $headerBar,
  } = props;

  //create class props

  const headerProps = props;

  const headerBarProps = {
    ...$headerBar,
  }

  return (
    <Header.Element {...headerProps}>
      <HeaderBar.Element {...headerBarProps} />
    </Header.Element>
  )
}

export {
  Element,
  Props,
};


