import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css'
import * as Base from '~/_settings';
import * as Nav from "~commons/nav";
import * as Link from "~commons/link";

export enum Type {
  DEFAULT = 'menu',
}
export enum Size {
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
}

export type Props = Base.Props & {
  type?: Type,
  size?:Size,
  $links?: Link.Props[],
};

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    size = Size.M,
    $links,
  } = props;

  //create props
  const componentProps = {
    classNames: Classnames(
      styles[type],
      styles[size],
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
    color:Base.Color.WHITE,
    padding: Base.PaddingH.PX_28,
    key: $link.text,
    ...$link,
  };
  return <Link.Element {...linkProps} />
}