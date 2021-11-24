import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_QUERY, CHANGE_CODE_FILTER, CHANGE_RADIO_FILTER, INPUT_DATE_FROM, INPUT_DATE_TO, SELECT_COMBOX_FILTER, FETCH_PERS, FETCH_ORGS_CHILDREN } from '~stores/report/orgs/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import * as Button from "~commons/button";
import * as Input from "~commons/input";
import * as Radio from "~commons/radio";
import * as Datepicker from "~commons/datepicker";
import * as Title from "~commons/title";
import * as Popup from "~commons/popup";
import { ADD_NOTI, HANDLE_BUTTON, HANDLE_POPUP } from '~stores/_base/constants';
import { RESET_FILTER } from '~stores/report/orgs/constants';
import MultiSelect from "react-multi-select-component";
import classNames from 'classnames';
import styles from '../_styles.css';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state['reportOrgs']);
  const userSelector = useSelector(state => state['auth'].user);
  
  useEffect(() => {
    console.log(selector?.filters?.orgCodeList);
    dispatch({ type: FETCH_ORGS_CHILDREN });
  }, [selector?.filters?.orgCodeList])


  const handleSubmitButtonClick = () => {
    const isValidForm = validateForm(dispatch, selector.filters);
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
            selectorKeys: ['reportOrgs', 'filters', 'radio'],
            action: { type: CHANGE_RADIO_FILTER, user: userSelector },
          }}
          style={{
            display: userSelector?.orgsCode == 9 ? 'flex' : 'none',
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
                selectorKeys: ['reportOrgs', 'filters', 'dateFrom'],
                reducerType: INPUT_DATE_FROM,
              },
              isDisabled: selector?.filters?.radio !== '1',
              max: 10,
            }}
            $datepicker={{
              store: {
                selectorKeys: ['reportOrgs', 'filters', 'dateFrom'],
                action: { type: INPUT_DATE_FROM },
              },
              isDisabled: selector?.filters?.radio !== '1',
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
                selectorKeys: ['reportOrgs', 'filters', 'dateTo'],
                reducerType: INPUT_DATE_TO,
              },
              isDisabled: selector?.filters?.radio != '1',
              max: 10,
            }}
            $datepicker={{
              store: {
                selectorKeys: ['reportOrgs', 'filters', 'dateTo'],
                action: { type: INPUT_DATE_TO },
              },
              isDisabled: selector?.filters?.radio != '1',
            }}
          />
        </Block.Element>
        <Block.Element {...filter1Props}>
          <Title.Element
            text='Tên đơn vị quản lý'
            margin={Base.MarginBottom.PX_5}
            style={{
              fontSize: '15px',
            }}
          />
          {
            selector?.orgsChildren?.length > 1
              ? <MultiSelect
                options={selector?.orgsChildren ?? []}
                value={selector?.filters?.orgCodeList}
                onChange={item => {
                  dispatch({ type: SELECT_COMBOX_FILTER, keys: ["filters", "orgCodeList"], data: item });
                  dispatch({ type: FETCH_ORGS_CHILDREN });
                }}
                labelledBy="Chọn"
                selectAllLabel='All'
                overrideStrings={{
                  allItemsAreSelected: 'All'
                }}
                disabled={selector?.filters?.radio != 1}
                className={"" + (selector?.filters?.radio != 1 && classNames(
                  styles['disabled'])
                )}
              />
              : <Input.Element
                placeholder='Nhập giá trị...'
                width={Base.Width.FULL}
                defaultValue={selector?.orgsChildren?.length ? selector?.orgsChildren[0].label : ''}
                isDisabled={true}
              />
          }
        </Block.Element>
        <Block.Element {...filter1Props}>
          <Title.Element
            text='Nhân viên áp tải'
            margin={Base.MarginBottom.PX_5}
            style={{
              fontSize: '15px',
            }}
          />
          <MultiSelect
            options={selector?.pers ?? []}
            value={selector?.filters?.persCodeList}
            onChange={item => {
              dispatch({ type: SELECT_COMBOX_FILTER, keys: ["filters", "persCodeList"], data: item });
            }}
            labelledBy="Chọn"
            selectAllLabel='All'
            overrideStrings={{
              allItemsAreSelected: 'All'
            }}
            disabled={selector?.filters?.radio != 1}
            className={"" + (selector?.filters?.radio != 1 && classNames(
              styles['disabled'])
            )}
          />
        </Block.Element>
        <Button.Element
          {...queryButtonProps}
          onClick={handleSubmitButtonClick}
          style={{
            marginTop: '30px',
            display: userSelector?.orgsCode == 9 ? 'none' : 'block',
          }}
        />
      </Block.Element >
      <Block.Element {...componentWrapperProps}
        style={{
          display: userSelector?.orgsCode == 9 ? 'flex' : 'none',
        }}
      >
        <Radio.Element
          {...radioProps}
          name='2'
          store={{
            selectorKeys: ['reportOrgs', 'filters', 'radio'],
            action: { type: CHANGE_RADIO_FILTER, user: userSelector },
          }}
        />
        <Input.Element
          placeholder='Mã nhân viên áp tải'
          {...filter2Props}
          store={{
            selectorKeys: ['reportOrgs', 'filters', 'persCode'],
            reducerType: CHANGE_CODE_FILTER,
          }}
          isDisabled={selector?.filters?.radio !== '2'}
          max={200}
        />

        <Button.Element
          {...queryButtonProps}
          onClick={handleSubmitButtonClick}
        />
      </Block.Element>
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
  if (selector.radio == 2 && !selector.persCode) {
    dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Chưa điền Mã nhân viên áp tải' } });
    return false;
  }
  return true;
}


Element.displayName = 'SearchFilter';
