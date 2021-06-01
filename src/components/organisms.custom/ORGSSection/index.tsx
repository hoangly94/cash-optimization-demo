import * as React from 'react'
import Classnames from 'classnames'
import * as Base from '~/_settings';
import * as Block from "~atoms/block";
import * as DropDownBlock from "~molecules/dropdownBlock";
import styles from './styles.css';

export const Element = () => {
  const type = 'orgs-section';
  //create props
  const blockWrapperProps = {
    classNames: Classnames(
      styles[type],
    ),
  };

  const dropdownBlockProps: DropDownBlock.Props = {
    $title: {
      text: 'Tên đơn vị quản lý',
    },
    $dropdown: {
      $itemList: $managementUnitName_$dropdown_$items,
    },
  };


  return (
    <Block.Element {...blockWrapperProps}>
      <DropDownBlock.Element {...dropdownBlockProps} />
    </Block.Element>
  )
}



const $managementUnitName_$dropdown_$items = [
  {
    value: 1,
    $children: {
      text: 'name1',
    },
  },
  {
    value: 2,
    $children: {
      text: 'name2',
    },
    active: true,
  },
  {
    value: 3,
    $children: {
      text: 'name3',
    },
  },
];