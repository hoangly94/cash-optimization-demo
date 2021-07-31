import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_QUERY, REQUEST_RESET, CHANGE_CODE_FILTER, CHANGE_RADIO_FILTER, SELECT_STATUS_FILTER, INPUT_DATE_FROM, INPUT_DATE_TO } from '~stores/authority/registration/constants';
import { REQUEST_QUERY as REQUEST_QUERY_ORGS, RESET_SEARCHORGS_FILTER } from '~stores/authority/searchOrgs/constants';
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
import * as SearchPersPopup from "./searchPersPopup";
import { HANDLE_BUTTON, HANDLE_POPUP } from '~/stores/_base/constants';

export type Props = Base.Props;

export const Element = (props: Props) => {
  useEffect(() => {
    // dispatch({ type: REQUEST_QUERY });
  })
  const radioSelector = useSelector(state => state['registration'].filters.radio);
  const userSelector = useSelector(state => state['auth'].user);
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
    onClick: () => dispatch({ type: REQUEST_RESET, user: userSelector }),
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
    flex: Base.Flex.BETWEEN,
    margin: Base.MarginRight.PX_18,
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
            placeholder: 'Từ ngày(dd/mm/yyyy)',
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
            placeholder: 'Đến ngày(dd/mm/yyyy)',
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
          text={userSelector.orgsName}
          store={{

            textSelectorKeys: ['registration', 'filters', 'orgs', 'text'],
            action: {
              type: HANDLE_POPUP,
              keys: ['registration', 'searchOrgs', 'isShown'],
              value: true,
            }
          }}
          style={{
            color: '#828282',
          }}
          isDisabled={radioSelector !== '1' || userSelector.orgsCode != 9}
          onClick={() => {
            dispatch({ type: RESET_SEARCHORGS_FILTER });
            dispatch({ type: REQUEST_QUERY_ORGS });
            dispatch({ type: HANDLE_BUTTON, keys: ['searchOrgs', 'select', 'isDisabled'], value: true });
          }}
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
          isInputDisabled={radioSelector !== '1'}
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
          placeholder='Số UQ'
          {...filter2Props}
          store={{
            selectorKeys: ['registration', 'filters', 'id'],
            reducerType: CHANGE_CODE_FILTER,
          }}
          isDisabled={radioSelector !== '2'}
          max={200}
        />

        <Button.Element
          {...queryButtonProps}
          store={{
            action: { type: REQUEST_QUERY },
          }}
        />
        {/* <Button.Element {...resetButtonProps}></Button.Element> */}
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
      <SearchPersPopup.Element
        $title={{
          tagType: Title.TagType.H2,
          text: 'Tìm nhân viên',
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'registration', 'searchPers'],
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
