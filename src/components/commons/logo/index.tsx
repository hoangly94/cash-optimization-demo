import React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Link from '~commons/link';
import * as Image from '~commons/image';

export type Props = Link.Props & {

}

export const Element = (props: Props) => {
  const {
  } = props;
 
  //create props
  const componentWrapperProps = {
    url: '/',
    classNames: Classnames(
      styles['logo'],
    ),
    type: Link.Type.LOGO_LINK,
    margin: Base.Margin.PX_28,
    ...props,
  };
  return (
    <Link.Element {...componentWrapperProps}>
      <Image.Element src={'/uploads/logo.png'}/>
    </Link.Element>
  )
}

Element.displayName = 'Logo';