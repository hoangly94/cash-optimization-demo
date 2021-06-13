import React, { useEffect } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { State, SELECT_UNITNAME, SELECT_ATMCDMSTATUS, REQUEST_QUERY, REQUEST_RESET, FETCH_HISTORY } from '~stores/category/atmCdm/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as Combox from "~commons/combox";

export type Props = Base.Props;

export const Element = (props: Props) => {
  useEffect(() => {
    dispatch({ type: REQUEST_RESET })
    dispatch({ type: REQUEST_QUERY });
  })

  //create props
  const componentWrapperProps = {
    flex: Base.Flex.START,
    alignItems: Base.AlignItems.STRETCH,
    ...props,
  };

  const dispatch = useDispatch();

  const orgsProps = {
    $optionsWrapper: {
      lineHeight: Base.LineHeight.L1,
    },
    width: Base.Width.PER_30,
    margin: Base.MarginRight.PX_18,
  };

  const atmCdmStatusProps = {
    $optionsWrapper: {
      lineHeight: Base.LineHeight.L1,
    },
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
        {...orgsProps}
        store={{
          defaultSelectorKeys: ['atmCdm', 'filters', 'orgs'],
          selectorKeys: ['root', 'orgs'],
          reducerType: SELECT_UNITNAME,
          reducerKeys: {
            text: 'orgsName',
            value: 'id',
          },
          defaultOptions:[{
            text: 'Tất cả',
            value: 0,
          }],
        }}
      />

      <Combox.Element
        {...atmCdmStatusProps}
        store={{
          defaultSelectorKeys: ['atmCdm', 'filters', 'atmCdmStatus'],
          selectorKeys: ['root', 'atmcdmStatuses'],
          reducerType: SELECT_ATMCDMSTATUS,
          reducerKeys: {
            text: 'name',
            value: 'value',
          },
          defaultOptions:[{
            text: 'Tất cả',
            value: '',
          }],
        }}
      />

      <Button.Element
        {...queryButtonProps}
        store={{
          isLoadingSelectorKeys: ['base', 'buttons', 'atmCdm', 'query'],
          action: { type: REQUEST_QUERY },
        }}
      />
      <Button.Element {...resetButtonProps}></Button.Element>
    </Block.Element >
  )
}

const buttonProps: Button.Props = {
  width: Base.Width.PX_150,
  color: Base.Color.WHITE,
  borderRadius: Base.BorderRadius.PX_3,
  margin: Base.MarginRight.PX_8,
}

Element.displayName = 'SearchFilter'
