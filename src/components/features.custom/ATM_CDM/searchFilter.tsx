import React, { useEffect } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import { createSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import { State, SELECT_UNITNAME, SELECT_ATMCDMSTATUS, REQUEST_QUERY, REQUEST_RESET, REQUEST_ORGS_LIST } from '~stores/atmCdm/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as DropDown from "~commons/dropdown";

export type Props = Base.Props;

export const Element = (props: Props) => {
  console.log('=======================searchFilter');
  useEffect(() => {
    dispatch({ type: REQUEST_ORGS_LIST });
    dispatch({ type: REQUEST_QUERY });
  }, [])

  const orgsListSelector = useSelector(state => state['atmCdm'].orgsList);

  //create props
  const componentWrapperProps = {
    flex: Base.Flex.START,
    alignItems: Base.AlignItems.STRETCH,
    ...props,
  };
  const filters = useSelector((state: State) => state['atmCdm'].filters);
  const isQueryButtonLoading = useSelector((state: State) => state['atmCdm'].filters.queryButton.isLoading);

  const dispatch = useDispatch();

  const handleOptionClick = (dispatch, type, filter) => () => {
    dispatch({ type: type, filter: filter })
  }
  
  const orgsOptions = orgsListSelector.map(item => {
    const children = { text: item.orgsName, value: item.id };
    return {
      ...{ $children: children },
      onClick: handleOptionClick(dispatch, SELECT_UNITNAME, children)
    };
  });

  const managementUnitsProps: DropDown.Props = {
    $selectorWrapper: {
      defaultText: filters.managementUnitName.text,
    },
    $optionsWrapper: {
      $options: orgsOptions,
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
      $options: atmCdmStatusData.map(item => ({ ...item, onClick: handleOptionClick(dispatch, SELECT_ATMCDMSTATUS, item.$children) })),
      lineHeight: Base.LineHeight.L1,
    },
    width: Base.Width.PER_30,
    margin: Base.MarginRight.PX_18,
  };

  const queryButtonProps: Button.Props = {
    ...buttonProps,
    text: 'Query',
    isLoading: isQueryButtonLoading,
    backgroundColor: Base.BackgroundColor.GREEN,
    onClick: () => dispatch({ type: REQUEST_QUERY }),
  }

  const resetButtonProps: Button.Props = {
    ...buttonProps,
    text: 'Reset',
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
    onClick: () => dispatch({ type: REQUEST_RESET }),
  }

  return (
    <Block.Element {...componentWrapperProps}>
      <DropDown.Element {...managementUnitsProps} />
      <DropDown.Element {...atmCdmStatusProps} />
      <Button.Element {...queryButtonProps}></Button.Element>
      <Button.Element {...resetButtonProps}></Button.Element>



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

const buttonProps: Button.Props = {
  // padding: Base.Padding.PX_38,
  width: Base.Width.PX_150,
  color: Base.Color.WHITE,
  borderRadius: Base.BorderRadius.PX_3,
  margin: Base.MarginRight.PX_8,
}

const managementUnitsData = [
  {
    $children: {
      text: '1',
      value: '1',
    },

  },
  {
    $children: {
      text: '2',
      value: '2',
    },
  },
  {
    $children: {
      text: '3',
      value: '3',
    },
  },
];


const atmCdmStatusData = [
  {
    value: 1,
    $children: {
      text: 'atm1',
      value: '1',
    },
  },
  {
    value: 2,
    $children: {
      text: 'atm2',
      value: '2',
    },
  },
  {
    value: 3,
    $children: {
      text: 'atm2',
      value: '3',
    },
  },
];

Element.displayName = 'SearchFilter'



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