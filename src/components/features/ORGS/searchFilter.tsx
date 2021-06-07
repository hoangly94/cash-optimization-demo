import React, { useEffect, useRef } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { State, SELECT_AREA_FILTER, CHANGE_ORGS_CODE_FILTER, REQUEST_QUERY, REQUEST_RESET } from '~stores/orgs/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as DropDown from "~commons/dropdown";
import * as Input from "~commons/input";

export type Props = Base.Props;

export const Element = (props: Props) => {
  useEffect(() => {
    dispatch({ type: REQUEST_QUERY })
  }, [])

  const areasSelector = useSelector((state: State) => state['root'].areas);
  
  //create props
  const componentWrapperProps = {
    flex: Base.Flex.START,
    alignItems: Base.AlignItems.STRETCH,
    ...props,
  };

  const filters = useSelector((state: State) => state['orgs'].filters);
  const isQueryButtonLoading = useSelector((state: State) => state['orgs'].filters.queryButton.isLoading);
  const orgsCodeRef = useRef(null);

  const dispatch = useDispatch();

  const handleOptionClick = (dispatch, type, filter) => () => {
    dispatch({ type: type, filter: filter })
  }
  
  const areaDefaultData = [
    {
      $children: {
        text: 'Tất cả',
        value: 0,
      },
      onClick: handleOptionClick(dispatch, SELECT_AREA_FILTER, { text: 'Tất cả', value: 0, })
    },
  ];
  
  const areaOptions = areasSelector.map(item => {
    const children = { text: item.areaName, value: item.areaCode };
    return {
      key: item.areaCode,
      ...{ $children: children },
      onClick: handleOptionClick(dispatch, SELECT_AREA_FILTER, children)
    };
  });

  const areaNameProps: DropDown.Props = {
    $selectorWrapper: {
      defaultText: filters.area.text,
    },
    $optionsWrapper: {
      $options: [ ...areaDefaultData, ...areaOptions ],
      lineHeight: Base.LineHeight.L1,
    },
    width: Base.Width.PER_30,
    margin: Base.MarginRight.PX_18,
  };

  const orgsCodeProps: Input.Props = {
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

  const orgsCodeOnChange = handleInputChange(dispatch);

  return (
    <Block.Element {...componentWrapperProps}>
      <DropDown.Element {...areaNameProps} />
      <Input.Element placeholder='Mã đơn vị' refs={orgsCodeRef} {...orgsCodeProps} onChange={orgsCodeOnChange} />
      <Button.Element {...queryButtonProps} />
      <Button.Element {...resetButtonProps} />
    </Block.Element >
  )
}

const handleInputChange = (dispatch) => debounce((e) => {
  dispatch({ type: CHANGE_ORGS_CODE_FILTER, data:  e.target.value });
}, 300)

const buttonProps: Button.Props = {
  // padding: Base.Padding.PX_38,
  width: Base.Width.PX_150,
  color: Base.Color.WHITE,
  borderRadius: Base.BorderRadius.PX_3,
  margin: Base.MarginRight.PX_8,
}

const managementUnitsData = [
  {
    value: 1,
    $children: {
      text: '1',
      value: '1',
    },

  },
  {
    value: 2,
    $children: {
      text: '2',
      value: '2',
    },
  },
  {
    value: 3,
    $children: {
      text: '3',
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