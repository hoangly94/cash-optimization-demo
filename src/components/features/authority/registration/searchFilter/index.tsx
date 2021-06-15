import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_QUERY, REQUEST_RESET, CHANGE_CODE_FILTER, CHANGE_RADIO_FILTER, SELECT_STATUS_FILTER, INPUT_DATE_FROM, INPUT_DATE_TO } from '~stores/authority/registration/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import * as Button from "~commons/button";
import * as Input from "~commons/input";
import * as Radio from "~commons/radio";
import * as Datepicker from "~commons/datepicker";
import * as Title from "~commons/title";
import * as Popup from "~commons/popup";
import * as SearchOrgsPopup from "./searchOrgsPopup";
import { HANDLE_POPUP } from '_/stores/_base/constants';

export type Props = Base.Props;

export const Element = (props: Props) => {
  useEffect(() => {
    // dispatch({ type: UPDATE_CONFIG })
    // dispatch({ type: REQUEST_QUERY });
  })
  const rootSelector = useSelector(state => state['root']);
  const radioSelector = useSelector(state => state['registration'].filters.radio);
  const dispatch = useDispatch();

  //create props
  const componentWrapperProps = {
    flex: Base.Flex.START,
    alignItems: Base.AlignItems.STRETCH,
    margin: Base.MarginBottom.PX_8,
    ...props,
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

  const filter1Props = {
    width: Base.Width.PER_20,
    margin: Base.MarginRight.PX_18,
  };

  const filter2Props = {
    width: Base.Width.PER_30,
    margin: Base.MarginRight.PX_18,
  };


  const radioProps = {
    margin: Base.MarginRight.PX_18,
    style: {
      lineHeight: '44px',
    },
  }

  const datepickerProps = {
    style: {
      position: 'absolute',
    }
  }

  return (
    <Block.Element>
      <Block.Element {...componentWrapperProps}>
        <Radio.Element
          {...radioProps}
          name='1'
          store={{
            selectorKeys: ['registration', 'filters', 'radio'],
            action: { type: CHANGE_RADIO_FILTER },
          }}
        />
        <Datepicker.Element
          {...filter1Props}
          $input={{
            placeholder: 'Từ ngày(dd-mm-yyy)',
            width: Base.Width.FULL,
            store: {
              selectorKeys: ['registration', 'filters', 'dateFrom'],
              reducerType: INPUT_DATE_FROM,
            },
            isDisabled: radioSelector !== '1',
            max: 10,
          }}
          $datepicker={{
            store: {
              selectorKeys: ['registration', 'filters', 'dateFrom'],
              action: { type: INPUT_DATE_FROM },
            },
            isDisabled: radioSelector !== '1',
          }}
        />
        <Datepicker.Element
          {...filter1Props}
          $input={{
            placeholder: 'Đến ngày(dd-mm-yyy)',
            width: Base.Width.FULL,
            store: {
              selectorKeys: ['registration', 'filters', 'dateTo'],
              reducerType: INPUT_DATE_TO,
            },
            isDisabled: radioSelector !== '1',
            max: 10,
          }}
          $datepicker={{
            store: {
              selectorKeys: ['registration', 'filters', 'dateTo'],
              action: { type: INPUT_DATE_TO },
            },
            isDisabled: radioSelector !== '1',
          }}
        />
        <Button.Element
          {...filter1Props}
          border={Base.Border.SOLID}
          textAlign={Base.TextAlign.LEFT}
          text='ĐVUQ'
          store={{
            action: {
              type: HANDLE_POPUP,
              keys: ['registration', 'searchOrgs', 'isShown'],
              value: true,
            }
          }}
          style={{
            color: '#828282',
          }}
          isDisabled={radioSelector !== '1'}
        />
        <Combox.Element
          {...filter1Props}
          store={{
            defaultSelectorKeys: ['registration', 'filters', 'status'],
            selectorKeys: ['root', 'authorityStatuses'],
            reducerType: SELECT_STATUS_FILTER,
            reducerKeys: {
              text: 'name',
              value: 'value',
            },
            // defaultOptions: [{
            //   text: 'Tất cả',
            //   value: 0,
            // }],
          }}
          isDisabled={radioSelector !== '1'}
        />
      </Block.Element>
      <Block.Element {...componentWrapperProps}>
        <Radio.Element
          {...radioProps}
          name='2'
          store={{
            selectorKeys: ['registration', 'filters', 'radio'],
            action: { type: CHANGE_RADIO_FILTER },
          }}
        />
        <Input.Element
          placeholder='Mã cụm'
          {...filter2Props}
          store={{
            selectorKeys: ['area', 'filters', 'areaCode'],
            reducerType: CHANGE_CODE_FILTER,
          }}
          isDisabled={radioSelector !== '2'}
          max={200}
        />

        <Button.Element
          {...queryButtonProps}
          store={{
            isLoadingSelectorKeys: ['base', 'buttons', 'area', 'query'],
            action: { type: REQUEST_QUERY },
          }}
        />
        <Button.Element {...resetButtonProps}></Button.Element>
      </Block.Element>

      <SearchOrgsPopup.Element
        $title={{
          tagType: Title.TagType.H2,
          text: 'Tìm đơn vị',
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'registration', 'searchOrgs'],
        }}
      />
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
