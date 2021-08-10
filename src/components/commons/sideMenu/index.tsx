import React, { useState } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css'
import * as Base from '~/_settings';
import * as Svg from "~commons/svg";
import * as Nav from "~commons/nav";
import * as Link from "~commons/link";
import * as Block from "~commons/block";
import { useLocation } from 'react-router';
import _ from 'lodash';

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
  size?: Size,
  $links?: ItemType[],
  roleCodeList?: string[],
};

type ItemType = Link.Props & {
  $subs?: Link.Props[],
}

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    $links,
    roleCodeList,
  } = props;
  const location = useLocation();
  // const isActive = $links ? $links?.filter($link => hasActiveChildren(location, $link)).length > 0 : false;
  //create props
  const componentProps = {
    classNames: Classnames(
      styles[type],
      // isActive ? styles['active'] : null,
    ),
  };

  return (
    <Nav.Element {...componentProps}>
      {$links?.map(mapPropsToLinkElemets(location, props))}
    </Nav.Element>
  )
}

const mapPropsToLinkElemets = (location, props: Props) => ($link: ItemType, index: number) => {
  const isActive = hasActiveChildren(location, $link);
  const [isChoosen, setIsChoosen] = useState(isActive);
  const subProps = $link.$subs
    ? {
      $caret: {
        classNames: Classnames(
          styles[props?.size ?? Size.M],
          styles['caret'],
        ),
        fill: 'white',
      }
    }
    : {};

  const onClick = $link.$subs ? {
    onClick: () => {
      setIsChoosen(!isChoosen)
    }
  } : {};

  const ItemWrapperProps = {
    key: index,
    classNames: Classnames(
      isActive ? styles['active'] : null,
    ),
  };

  const linkProps = {
    classNames: Classnames(
      styles[props?.size ?? Size.M],
      location.pathname === $link.url ? styles['item-active'] : null,
      // $link.$subs && $link.$subs.filter(item => item.url === location.pathname).length > 0 ? styles['active'] : null,
    ),
    color: Base.Color.WHITE,
    padding: Base.PaddingH.PX_28,
    $icon: {
      name: 'circle',
      size: Svg.Size.S2,
      width: Base.Width.PER_30,
    },
    ...subProps,
    ...$link,
    ...onClick,
  };

  if ($link.$subs) {
    const childrenWrapperProps = {
      classNames: Classnames(
        styles['menu-item-subs'],
      ),
      style: {
        overflow: 'hidden',
        transition: 'max-height 0.5s',
        maxHeight: isChoosen ? '500px' : '0px',
      }
    };
    const children = $link.$subs.filter((item: any) => {
      if (item.accessedRoles)
        for (const accessedRole of item.accessedRoles) {
          if (props.roleCodeList?.includes(accessedRole))
            return true;
        }
      return false;
    }).map(mapPropsToLinkElemets(location, props));
    if ($link.$subs && _.isEmpty(children)) {
      return <></>
    }
    return <Block.Element {...ItemWrapperProps}>
      <Link.Element {...linkProps} />
      <Block.Element {...childrenWrapperProps}>
        {children}
      </Block.Element>
    </Block.Element>
  }


  return <Block.Element key={index}><Link.Element {...linkProps} /></Block.Element>
}

const hasActiveChildren = (location, $link: ItemType) => {
  return $link.$subs && $link.$subs.filter(item => item.url === location.pathname).length > 0;
}