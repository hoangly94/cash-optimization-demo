import * as React from 'react'
import Classnames from 'classnames'
import * as Base from '~/_settings';
import * as Block from "~atoms/block";
import * as Dropdown from "~molecules/dropdown";
import styles from './styles.css';

export enum Type {
  DEFAULT = 'orgs-section',
}

export type Props = Base.Props & {
  type?: Type,
  $managementUnitName: Dropdown.Props,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
    $managementUnitName, 
  } = props;

  //create props
  const blockWrapperProps = {
    ...props,
    classNames: Classnames(
      styles[type],
    ),
  };

  const dropdownProps = {
    ...$managementUnitName,
  };


  return (
    <Block.Element {...blockWrapperProps}>
      <Dropdown.Element {...dropdownProps}/>
    </Block.Element>
  )
}
