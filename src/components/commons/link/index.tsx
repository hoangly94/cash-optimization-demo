import * as React from 'react'
import { Link } from "react-router-dom";
import * as Base from '~/_settings';
import styles from './_styles.css'
import Caret from "~svg/caret";
import * as Svg from "~svg/index";

export enum Type {
  DEFAULT = 'link',
  EXTERNAL = 'link-external',
  LOGO_LINK = 'logo-link',
  BREADCRUMBS_LINK = 'breadcrumbs-link',
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
  $icon?: Svg.Props & {
    name?: string,
  },
  $caret?: Svg.Props,
  onClick?: React.MouseEventHandler,
  children?: React.ReactNode,
}

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    text,
    url = '',
    size = Size.M,
    $icon,
    $caret,
    onClick,
    children,
  } = props;

  const href = url ? { href: url } : {};
  const handleClick = onClick ? {onClick:onClick} : {};
  //create props
  const linkProps = {
    ...Base.mapProps({
      ...props,
    }, styles, [type, size]),
    ...handleClick,
    ...href,
  };
  const caretProps = {
    ...$caret,
  };

  const CaretElement = $caret ? <Caret {...caretProps} /> : '';
  const child = <>{getIcon($icon)}{text}{children}{CaretElement}</>
  const linkElement = url
  ? (type === Type.EXTERNAL || type === Type.LOGO_LINK ? <a {...linkProps}>{child}</a> : <Link  {...linkProps} to={url}>{child}</Link>)
    : <span {...linkProps}>{child}</span>;

  return (
    linkElement
  )
}

const getIcon = ($icon) => {
  const iconProps = {
    margin: Base.MarginRight.PX_8,
    fill: 'white',
    ...$icon,
  };

  if ($icon) {
    const iconName = $icon.name ?? 'user';
    const Icon = require('~svg/' + iconName).default;
    return <Icon {...iconProps} />;
  }
  return '';
}

Element.displayName = 'Link'