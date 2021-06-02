import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as DropDownBlock from "~commons/dropdownBlock";

export type Props = Base.Props;

export const Element = (props: Props) => {
  const type = 'orgs-section';
  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles[type],
    ),
    ...props,
  };
  
  const searchFilterProps = {
    flex: Base.Flex.BETWEEN
  }

  const searchFilterLeftProps = {
    width: Base.Width.PER_70,
  }

  const managementUnitsProps: DropDownBlock.Props = {
    $title: {
      text: 'Tên đơn vị quản lý',
      width: Base.Width.PER_30,
      padding: Base.Padding.PX_8,
    },
    $dropdown: {
      $optionsWrapper: {
        $options: managementUnitsData,
        lineHeight: Base.LineHeight.L1,
      },
      width: Base.Width.PER_70,
    },
    flex: Base.Flex.BETWEEN,
    margin: Base.MarginBottom.PX_10,
  };


  const atmCdmStatusProps: DropDownBlock.Props = {
    $title: {
      text: 'Trạng thái ATM/CDM',
      width: Base.Width.PER_30,
      padding: Base.Padding.PX_8,
    },
    $dropdown: {
      $optionsWrapper: {
        $options: atmCdmStatusData,
        lineHeight: Base.LineHeight.L1,
      },
      width: Base.Width.PER_70,
    },
    flex: Base.Flex.BETWEEN,
  };

  const searchFilterRightProps = {
    width: Base.Width.PER_30,
    textAlign: Base.TextAlign.CENTER,
  }
  const searchFilterRightQueryButtonProps = {
    text: 'Query',
    padding: Base.Padding.PX_38,
  }
  return (
    <Block.Element {...componentWrapperProps}>
      <Block.Element {...searchFilterProps}>

        <Block.Element {...searchFilterLeftProps}>
          <DropDownBlock.Element {...managementUnitsProps} />
          <DropDownBlock.Element {...atmCdmStatusProps} />
        </Block.Element>

        <Block.Element {...searchFilterRightProps}>
          <Button.Element {...searchFilterRightQueryButtonProps}></Button.Element>

        </Block.Element>
      </Block.Element>
    </Block.Element >
  )
}



const managementUnitsData = [
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


const atmCdmStatusData = [
  {
    value: 1,
    $children: {
      text: 'atm1',
    },
  },
  {
    value: 2,
    $children: {
      text: 'atm2',
    },
    active: true,
  },
  {
    value: 3,
    $children: {
      text: 'atm3',
    },
  },
];