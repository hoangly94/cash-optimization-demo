import * as React from 'react'
import { Link } from "react-router-dom";
import * as Base from '~/_settings';
import styles from './_styles.css'

export enum Type {
  DEFAULT = 'link',
  EXTERNAL = 'link-external',
}

export enum Size {
  S1 = 's1',
  S = 's',
  M = 'm',
  L = 'l',
  L1 = 'l1',
}

export type Props = Base.Props & {
  type?: Type,
  size?: Size,
  url?: string,
  text?: string,
  isExternalLink?: boolean,
}

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    text,
    url,
    isExternalLink = false,
    size = Size.M,
  } = props;

  const href = url ? { href: url } : {};

  //create props
  const linkProps = {
    ...Base.mapProps(props, styles, [type, size]),
    ...href,
  };

  const linkElement = !isExternalLink && url
    ? <Link  {...linkProps} to={url}>{text}</Link>
    : <a {...linkProps}>{text}</a>;

  return (
    linkElement
  )
}