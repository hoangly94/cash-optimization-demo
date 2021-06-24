import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css'
import * as Base from '~/_settings';
import * as Svg from "~commons/svg";
import Chevron from "~commons/svg/chevron";
import * as Nav from "~commons/nav";
import * as Link from "~commons/link";
import { useLocation } from 'react-router';

export enum Type {
  DEFAULT = 'breadcrumbs',
}
export enum Size {
  S = 'size-s',
  M = 'size-m',
  L = 'size-l',
}

export type Props = Base.Props & {
  type?: Type,
  size?: Size,
  mapper: Object,
};

export const Element = (props: Props): React.ReactElement => {
  const {
    type = Type.DEFAULT,
    size = Size.M,
    mapper,
  } = props;

  const location = useLocation();

  //create props
  const componentProps = {
    classNames: Classnames(
      styles[type],
      styles[size],
    ),
    style:{
      borderBottom: '1px solid #cdcdcd',
    }
  };
  return (
    <Nav.Element {...componentProps}>
      {location.pathname.split('/').reduce(reducePathnameToLinkElemets, { elements: [], mapper: mapper }).elements}
    </Nav.Element>
  )
}

const reducePathnameToLinkElemets = (result, currentKey) => {
  if (!currentKey && result.mapper){
    return {
      ...result,
      elements:[
        <Link.Element key={'link'+currentKey} {...homeLinkProps} />
      ]
    };
  }
  const newMapper = result.mapper[currentKey];
  const linkProps = {
    type: Link.Type.BREADCRUMBS_LINK,
    text: newMapper._name ?  newMapper._name :currentKey,
    url: newMapper._url,
  };
  return {
    elements: [
      ...result.elements,
      <Chevron key={'key'+currentKey} {...chevronProps} />,
      <Link.Element key={'link'+currentKey} {...linkProps} />
    ],
    mapper: newMapper
  }
}

const homeLinkProps ={
  url: '/',
  $icon:{
    name:'homeLove',
    size: Svg.Size.L1,
    fill: '#383838',
  },
}
const chevronProps ={
  size: Svg.Size.S1,
  direction: Svg.Direction.RIGHT,
}