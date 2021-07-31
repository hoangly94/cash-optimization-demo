import React, { useEffect, useRef } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { State, SELECT_AREA_FILTER, CHANGE_ORGS_CODE_FILTER, REQUEST_QUERY, REQUEST_RESET } from '~stores/category/orgs/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as Combox from "~commons/combox";
import * as Input from "~commons/input";

export type Props = Base.Props;

export const Element = (props: Props) => {
  useEffect(() => {
    dispatch({ type: REQUEST_RESET })
    // dispatch({ type: REQUEST_QUERY });
  })

  //create props
  const componentWrapperProps = {
    flex: Base.Flex.START,
    alignItems: Base.AlignItems.STRETCH,
    ...props,
  };

  const dispatch = useDispatch();

  const areaNameProps = {
    $optionsWrapper: {
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
    backgroundColor: Base.BackgroundColor.GREEN,
  }

  const resetButtonProps: Button.Props = {
    ...buttonProps,
    text: 'Reset',
    backgroundColor: Base.BackgroundColor.ULTIMATE_GRAY,
    onClick: () => dispatch({ type: REQUEST_RESET }),
  }

  return (
    <Block.Element {...componentWrapperProps}>
      <Combox.Element
        {...areaNameProps}
        store={{
          defaultSelectorKeys: ['orgs', 'filters', 'area'],
          selectorKeys: ['root', 'areas'],
          reducerType: SELECT_AREA_FILTER,
          reducerKeys: {
            text: 'areaName',
            value: 'areaCode',
          },
          defaultOptions:[{
            text: 'Tất cả',
            value: 0,
          }],
        }}
      />
      <Input.Element
        placeholder='Mã đơn vị'
        {...orgsCodeProps}
        store={{
          selectorKeys: ['orgs', 'filters', 'orgsCode'],
          reducerType: CHANGE_ORGS_CODE_FILTER,
        }}
        max={200}
      />
      <Button.Element
        {...queryButtonProps}
        store={{
          action: { type: REQUEST_QUERY },
        }}
      />
      <Button.Element {...resetButtonProps} />
    </Block.Element >
  )
}

const buttonProps: Button.Props = {
  width: Base.Width.PX_150,
  color: Base.Color.WHITE,
  borderRadius: Base.BorderRadius.PX_3,
  margin: Base.MarginRight.PX_8,
}


Element.displayName = 'SearchFilter';

