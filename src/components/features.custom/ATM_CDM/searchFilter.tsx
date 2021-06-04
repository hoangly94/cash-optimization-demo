import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { State, SELECT_UNITNAME, SELECT_ATMCDMSTATUS, REQUEST_QUERY } from '~stores/atmCdm/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as DropDown from "~commons/dropdown";

export type Props = Base.Props;

export const Element = (props: Props) => {
  console.log('=======================searchFilter');
  //create props
  const componentWrapperProps = {
    flex: Base.Flex.START,
    alignItems: Base.AlignItems.STRETCH,
    ...props,
  };
  const filters = useSelector((state: State) => state['atmCdmSearch'].filters);
  const dispatch = useDispatch();

  const handleOptionClick = (type, filter) => () => {
    dispatch({ type: type, filter: filter })
  }


  const managementUnitsProps: DropDown.Props = {
    $selectorWrapper: {
      defaultText: filters.managementUnitName.text,
    },
    $optionsWrapper: {
      $options: managementUnitsData.map(item => ({ ...item, onClick: handleOptionClick(SELECT_UNITNAME, item.$children) })),
      lineHeight: Base.LineHeight.L1,
    },
    width: Base.Width.PER_30,
    margin: Base.MarginRight.PX_18,
  };

  const atmCdmStatusProps: DropDown.Props = {
    $selectorWrapper: {
      defaultText: filters.atmCdmStatus.text,
    },
    $optionsWrapper: {
      $options: atmCdmStatusData.map(item => ({ ...item, onClick: handleOptionClick(SELECT_ATMCDMSTATUS, item.$children) })),
      lineHeight: Base.LineHeight.L1,
    },
    width: Base.Width.PER_30,
    margin: Base.MarginRight.PX_18,
  };

  const queryButtonProps: Button.Props = {
    text: 'Query',
    padding: Base.Padding.PX_38,
    width: Base.Width.PX_150,
    margin: Base.MarginRight.PX_38,
    backgroundColor: Base.BackgroundColor.GREEN,
    color: Base.Color.WHITE,
    borderRadius: Base.BorderRadius.PX_100,
    onClick: ()=> dispatch({ type: REQUEST_QUERY }),
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
      value: 'name1',
    },

  },
  {
    value: 2,
    $children: {
      text: 'name2',
      value: 'name2',
    },
  },
  {
    value: 3,
    $children: {
      text: 'name3',
      value: 'name3',
    },
  },
];


const atmCdmStatusData = [
  {
    value: 1,
    $children: {
      text: 'atm1',
      value: 'atm1',
    },
  },
  {
    value: 2,
    $children: {
      text: 'atm2',
      value: 'atm2',
    },
  },
  {
    value: 3,
    $children: {
      text: 'atm2',
      value: 'atm3',
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