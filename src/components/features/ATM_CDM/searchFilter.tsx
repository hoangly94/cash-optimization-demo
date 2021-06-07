import React, { useEffect } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { State, SELECT_UNITNAME, SELECT_ATMCDMSTATUS, REQUEST_QUERY, REQUEST_RESET, FETCH_HISTORY } from '~stores/atmCdm/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as DropDown from "~commons/dropdown";

export type Props = Base.Props;

export const Element = (props: Props) => {
  useEffect(() => {
    // dispatch({ type: REQUEST_ORGS_LIST });
    dispatch({ type: REQUEST_QUERY });
  }, [])

  const orgsListSelector = useSelector(state => state['root'].orgs);
  const atmcdmStatusesSelector = useSelector(state => state['root'].atmcdmStatuses);

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
    const children = { text: item.orgsName, value: item.orgsCode };
    return {
      key: item.orgsCode,
      ...{ $children: children },
      onClick: handleOptionClick(dispatch, SELECT_UNITNAME, children)
    };
  });

  const orgsDefaultData = [
    {
      $children: {
        text: 'Tất cả',
        value: 0,
      },
      onClick: handleOptionClick(dispatch, SELECT_UNITNAME, { text: 'Tất cả', value: 0, })
    },
  ];

  const atmCdmStatusDefaultData = [
    {
      $children: {
        text: 'Tất cả',
        value: 0,
      },
      onClick: handleOptionClick(dispatch, SELECT_ATMCDMSTATUS, { text: 'Tất cả', value: 0, })
    },
  ];

  const managementUnitsProps: DropDown.Props = {
    $selectorWrapper: {
      defaultText: filters.managementUnitName.text,
    },
    $optionsWrapper: {
      $options: [ ...orgsDefaultData, ...orgsOptions ],
      lineHeight: Base.LineHeight.L1,
    },
    width: Base.Width.PER_30,
    margin: Base.MarginRight.PX_18,
  };

  const atmCdmStatusOptions = atmcdmStatusesSelector.map(item => {
    const children = { text: item.name, value: item.value };
    return {
      key: item.id,
      ...{ $children: children },
      onClick: handleOptionClick(dispatch, SELECT_ATMCDMSTATUS, children)
    };
  });
  const atmCdmStatusProps: DropDown.Props = {
    $selectorWrapper: {
      defaultText: filters.atmCdmStatus.text,
    },
    $optionsWrapper: {
      $options: [ ...atmCdmStatusDefaultData, ...atmCdmStatusOptions ],
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