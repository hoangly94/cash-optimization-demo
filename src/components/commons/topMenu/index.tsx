import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css'
import * as Base from '~/_settings';
import * as Nav from "~commons/nav";
import * as Link from "~commons/link";

export enum Type {
  DEFAULT = 'menu',
  STACKED = 'menu-stacked',
}

export type Props = Base.Props & {
  type?: Type,
  $links?: Link.Props[],
};

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    $links,
  } = props;

  //create props
  const componentProps = {
    classNames: Classnames(
      styles[type],
    ),
  };

  return (
    <Nav.Element {...componentProps}>
      {$links?.map((mapPropsToLinkElemets))}
    </Nav.Element>
  )
}

const mapPropsToLinkElemets = ($link: Link.Props) => {
  const linkProps = {
    ...$link,
    key: $link.text,
  };
  return <Link.Element {...linkProps} />
}