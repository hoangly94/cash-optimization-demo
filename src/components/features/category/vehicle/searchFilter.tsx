import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { SELECT_ORGS_FILTER, REQUEST_QUERY, REQUEST_RESET, CHANGE_CODE_FILTER } from '~stores/category/vehicle/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Button from "~commons/button";
import * as Input from "~commons/input";
import * as Combox from "~commons/combox";

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
      <Combox.Element
        {...orgsProps}
        store={{
          defaultSelectorKeys: ['vehicle', 'filters', 'orgsId'],
          selectorKeys: ['root', 'orgs'],
          reducerType: SELECT_ORGS_FILTER,
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

      <Input.Element
        placeholder='Biển số xe'
        {...orgsCodeProps}
        store={{
          selectorKeys: ['vehicle', 'filters', 'vehicleCode'],
          reducerType: CHANGE_CODE_FILTER,
        }}
        max={200}
      />

      <Button.Element
        {...queryButtonProps}
        store={{
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
