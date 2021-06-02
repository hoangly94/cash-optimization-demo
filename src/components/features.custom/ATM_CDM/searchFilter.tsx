import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as DropDown from "~commons/dropdown";

export type Props = Base.Props;

export const Element = (props: Props) => {
  //create props
  const componentWrapperProps = {
    flex: Base.Flex.START,
    alignItems: Base.AlignItems.STRETCH,
    ...props,
  };

  const searchFilterLeftProps = {
    width: Base.Width.PER_60,
  }

  const managementUnitsProps: DropDown.Props = {
    $selectorWrapper: {
      defaultText: 'Tên đơn vị quản lý',
    },
    $optionsWrapper: {
      $options: managementUnitsData,
      lineHeight: Base.LineHeight.L1,
    },
    width: Base.Width.PER_30,
    margin: Base.MarginRight.PX_18,
  };


  const atmCdmStatusProps: DropDown.Props = {
    $selectorWrapper: {
      defaultText: 'Trạng thái ATM/CDM',
    },
    $optionsWrapper: {
      $options: atmCdmStatusData,
      lineHeight: Base.LineHeight.L1,
    },
    width: Base.Width.PER_30,
    margin: Base.MarginRight.PX_18,
  };

  const queryButtonProps:Button.Props = {
    type: Button.Type.SUBMIT,
    text: 'Query',
    padding: Base.Padding.PX_38,
    width: Base.Width.PX_150,
    margin: Base.MarginRight.PX_38,
  }

  return (
    <Block.Element {...componentWrapperProps}>

      <DropDown.Element {...managementUnitsProps} />
      <DropDown.Element {...atmCdmStatusProps} />
      <Button.Element {...queryButtonProps}></Button.Element>



      {/* <Block.Element {...searchFilterLeftProps}>
          <DropDownBlock.Element {...managementUnitsProps} />
          <DropDownBlock.Element {...atmCdmStatusProps} />
        </Block.Element>

        <Block.Element {...searchFilterRightProps}>
          <Button.Element {...searchFilterRightQueryButtonProps}></Button.Element>

        </Block.Element> */}
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




// const searchFilterLeftProps = {
//   width: Base.Width.PER_60,
// }

// const managementUnitsProps: DropDownBlock.Props = {
//   $title: {
//     text: 'Tên đơn vị quản lý',
//     width: Base.Width.PX_150,
//     padding: Base.Padding.PX_8,
//   },
//   $dropdown: {
//     $optionsWrapper: {
//       $options: managementUnitsData,
//       lineHeight: Base.LineHeight.L1,
//     },
//     width: Base.Width.PER_80,
//   },
//   flex: Base.Flex.BETWEEN,
//   margin: Base.MarginBottom.PX_10,
// };


// const atmCdmStatusProps: DropDownBlock.Props = {
//   $title: {
//     text: 'Trạng thái ATM/CDM',
//     width: Base.Width.PX_150,
//     padding: Base.Padding.PX_8,
//   },
//   $dropdown: {
//     $optionsWrapper: {
//       $options: atmCdmStatusData,
//       lineHeight: Base.LineHeight.L1,
//     },
//     width: Base.Width.PER_80,
//   },
//   flex: Base.Flex.BETWEEN,
// };

// const searchFilterRightProps = {
//   width: Base.Width.PER_40,
//   margin: Base.MarginLeft.PX_38,
// }
// const searchFilterRightQueryButtonProps = {
//   text: 'Query',
//   padding: Base.Padding.PX_38,
// }