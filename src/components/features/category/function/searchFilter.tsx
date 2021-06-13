import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { REQUEST_QUERY, REQUEST_RESET, CHANGE_CODE_FILTER } from '~stores/category/function/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as Input from "~commons/input";

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

  const orgsCodeProps: Input.Props = {
    width: Base.Width.PER_30,
    margin: Base.MarginRight.PX_18,
  };


  return (
    <Block.Element {...componentWrapperProps}>
      <Input.Element
        placeholder='Mã mức độ ưu tiên'
        {...orgsCodeProps}
        store={{
          selectorKeys: ['function', 'filters', 'functionCode'],
          reducerType: CHANGE_CODE_FILTER,
        }}
        max={200}
      />

      <Button.Element
        {...queryButtonProps}
        store={{
          isLoadingSelectorKeys: ['base', 'buttons', 'function', 'query'],
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
