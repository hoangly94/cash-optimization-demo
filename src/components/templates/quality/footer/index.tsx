import * as React from 'react'
import Classnames from 'classnames'
import * as Base from '_/_settings';
import styles from './styles.css';

import * as Footer from '../../../atoms/footer';
import * as FooterMenu from '../../../organisms/footerMenu';

type Props = Footer.Props & {
  $footerMenu: FooterMenu.Props,
}

const Element = (props: Props) => {
  const {
    $footerMenu,
  } = props;

  //create class props

  const footerProps = props;

  const footerMenuProps = {
    ...$footerMenu,
  }

  return (
    <Footer.Element {...footerProps}>
      <FooterMenu.Element {...footerMenuProps} />
    </Footer.Element>
  )
}

export {
  Element,
  Props,
};


