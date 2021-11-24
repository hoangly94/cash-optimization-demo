import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_QUERY, REQUEST_RESET, CHANGE_CODE_FILTER, CHANGE_RADIO_FILTER, INPUT_DATE_FROM, INPUT_DATE_TO, SELECT_COMBOX_FILTER, RESET_FILTER_REGISTRATION } from '~stores/pyc/registration/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import * as Button from "~commons/button";
import * as Input from "~commons/input";
import * as Radio from "~commons/radio";
import * as Datepicker from "~commons/datepicker";
import * as Title from "~commons/title";
import * as SearchOrgsPopup from "./searchOrgsPopup";
import * as SearchOrgsPopup2 from "./searchOrgsPopup2";
import { ADD_NOTI, HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import { RESET_SEARCHORGS_FILTER } from '~stores/authority/searchOrgs/constants';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state['pycRegistration'].filters);
  const userSelector = useSelector(state => state['auth'].user);


  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(dispatch, selector);
    if (isValidForm) {
      dispatch({ type: REQUEST_QUERY });
    }
  }

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
            selectorKeys: ['pycRegistration', 'filters', 'radio'],
            action: { type: CHANGE_RADIO_FILTER },
          }}
        />
        <Block.Element {...filter1Props}>
          <Title.Element
            text='Từ ngày'
            margin={Base.MarginBottom.PX_5}
            style={{
              fontSize: '15px',
            }}
          />
          <Datepicker.Element
            {...filter1Props}
            width={Base.Width.FULL}
            $input={{
              placeholder: 'Từ ngày(dd/mm/yyyy)',
              width: Base.Width.FULL,
              store: {
                selectorKeys: ['pycRegistration', 'filters', 'dateFrom'],
                reducerType: INPUT_DATE_FROM,
              },
              isDisabled: selector?.radio !== '1',
              max: 10,
            }}
            $datepicker={{
              store: {
                selectorKeys: ['pycRegistration', 'filters', 'dateFrom'],
                action: { type: INPUT_DATE_FROM },
              },
              isDisabled: selector?.radio !== '1',
            }}
          />
        </Block.Element>
        <Block.Element {...filter1Props}>
          <Title.Element
            text='Đến ngày'
            margin={Base.MarginBottom.PX_5}
            style={{
              fontSize: '15px',
            }}
          />
          <Datepicker.Element
            {...filter1Props}
            width={Base.Width.FULL}
            $input={{
              placeholder: 'Đến ngày(dd/mm/yyyy)',
              width: Base.Width.FULL,
              store: {
                selectorKeys: ['pycRegistration', 'filters', 'dateTo'],
                reducerType: INPUT_DATE_TO,
              },
              isDisabled: selector?.radio !== '1',
              max: 10,
            }}
            $datepicker={{
              store: {
                selectorKeys: ['pycRegistration', 'filters', 'dateTo'],
                action: { type: INPUT_DATE_TO },
              },
              isDisabled: selector?.radio !== '1',
            }}
          />
        </Block.Element>
        <Block.Element {...filter1Props}>
          <Title.Element
            text='Vai trò ĐV'
            margin={Base.MarginBottom.PX_5}
            style={{
              fontSize: '15px',
            }}
          />
          <Combox.Element
            {...filter1Props}
            width={Base.Width.FULL}
            store={{
              defaultSelectorKeys: ['pycRegistration', 'filters', 'orgsRole'],
              selectorKeys: ['root', 'pycOrgsRoles'],
              reducerType: SELECT_COMBOX_FILTER,
              reducerKeys: {
                text: 'name',
                value: 'value',
              },
            }}
            isDisabled={selector?.radio !== '1'}
            isInputDisabled={selector?.radio !== '1'}
          />
        </Block.Element>
        <Block.Element {...filter1Props}
          style={{
            display: userSelector.orgsCode === 9 ? 'block' : 'none'
          }}
        >
          <Title.Element
            text='Đơn vị'
            margin={Base.MarginBottom.PX_5}
            style={{
              fontSize: '15px',
            }}
          />
          <Button.Element
            {...filter1Props}
            width={Base.Width.FULL}
            border={Base.Border.SOLID}
            textAlign={Base.TextAlign.LEFT}
            text={userSelector.orgsName}
            store={{
              textSelectorKeys: ['pycRegistration', 'filters', 'orgs', 'text'],
              action: {
                type: HANDLE_POPUP,
                keys: ['pycRegistration', 'pycSearchOrgs', 'isShown'],
                value: true,
              }
            }}
            style={{
              color: '#2d2d2d',
            }}
            isDisabled={selector?.radio !== '1'}
            onClick={() => {
              dispatch({ type: RESET_SEARCHORGS_FILTER });
              // dispatch({ type: REQUEST_QUERY_ORGS });
              dispatch({ type: HANDLE_BUTTON, keys: ['searchOrgs', 'select', 'isDisabled'], value: true });
            }}
          />
        </Block.Element>
        <Block.Element {...filter1Props}
          style={{
            display: userSelector.orgsCode === 9 ? 'none' : 'block'
          }}
        >
          <Title.Element
            text='ĐVĐQ'
            margin={Base.MarginBottom.PX_5}
            style={{
              fontSize: '15px',
            }}
          />
          <Combox.Element
            {...filter1Props}
            width={Base.Width.FULL}
            store={{
              defaultSelectorKeys: ['pycRegistration', 'filters', 'orgs'],
              selectorKeys: ['pycRegistration', 'orgsChildren'],
              reducerType: SELECT_COMBOX_FILTER,
              reducerKeys: {
                text: 'orgsName',
                value: 'orgsCode',
              },
            }}
            isDisabled={selector?.radio !== '1'}
            isInputDisabled={selector?.radio !== '1'}
          />
        </Block.Element>
        <Block.Element {...filter1Props}>
          <Title.Element
            text='Đối tượng ĐQ'
            margin={Base.MarginBottom.PX_5}
            style={{
              fontSize: '15px',
            }}
          />
          <Combox.Element
            {...filter1Props}
            width={Base.Width.FULL}
            store={{
              defaultSelectorKeys: ['pycRegistration', 'filters', 'objectType'],
              selectorKeys: ['root', 'pycObjectTypes'],
              reducerType: SELECT_COMBOX_FILTER,
              reducerKeys: {
                text: 'name',
                value: 'value',
              },
              // defaultOptions: [{
              //   text: 'Tất cả',
              //   value: 0,
              // }],
            }}
            isDisabled={selector?.radio !== '1'}
            isInputDisabled={selector?.radio !== '1'}
          />
        </Block.Element>
        <Block.Element {...filter1Props}>
          <Title.Element
            text='Trạng thái'
            margin={Base.MarginBottom.PX_5}
            style={{
              fontSize: '15px',
            }}
          />
          <Combox.Element
            {...filter1Props}
            width={Base.Width.FULL}
            store={{
              defaultSelectorKeys: ['pycRegistration', 'filters', 'status'],
              selectorKeys: ['root', 'pycStatuses'],
              reducerType: SELECT_COMBOX_FILTER,
              reducerKeys: {
                text: 'name',
                value: 'value',
              },
              // defaultOptions: [{
              //   text: 'Tất cả',
              //   value: 0,
              // }],
            }}
            isDisabled={selector?.radio !== '1'}
            isInputDisabled={selector?.radio !== '1'}
          />
        </Block.Element>
      </Block.Element >
      <Block.Element {...componentWrapperProps}>
        <Radio.Element
          {...radioProps}
          name='2'
          store={{
            selectorKeys: ['pycRegistration', 'filters', 'radio'],
            action: { type: CHANGE_RADIO_FILTER },
          }}
        />
        <Input.Element
          placeholder='Số PYC HT'
          {...filter2Props}
          store={{
            selectorKeys: ['pycRegistration', 'filters', 'id'],
            reducerType: CHANGE_CODE_FILTER,
          }}
          isDisabled={selector?.radio !== '2'}
          max={200}
        />

        <Button.Element
          {...queryButtonProps}
          onClick={handleSubmitButtonClick}
        />
      </Block.Element>

      <SearchOrgsPopup.Element
        $title={{
          tagType: Title.TagType.H2,
          text: 'Tìm đơn vị',
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'pycSearchOrgs'],
        }}
      />

      <SearchOrgsPopup2.Element
        $title={{
          tagType: Title.TagType.H2,
          text: 'Tìm đơn vị',
        }}
        store={{
          isShownSelectorKeys: ['base', 'popups', 'pycRegistration', 'pycSearchOrgs2'],
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

const validateForm = (dispatch, selector) => {
  if (selector.radio == 2 && !selector.id) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Chưa điền Số PYC HT' } });
    return false;
  }
  return true;
}


Element.displayName = 'SearchFilter';
