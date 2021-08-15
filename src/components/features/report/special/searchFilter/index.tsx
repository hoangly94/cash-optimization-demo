import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_QUERY, CHANGE_CODE_FILTER, SELECT_ORGS_TYPE_FILTER, INPUT_ORGS_VALUE_FILTER,CHANGE_RADIO_FILTER, INPUT_DATE_FROM, INPUT_DATE_TO, SELECT_COMBOX_FILTER } from '~stores/report/special/constants';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Combox from "~commons/combox";
import * as Button from "~commons/button";
import * as Input from "~commons/input";
import * as Datepicker from "~commons/datepicker";
import * as Title from "~commons/title";
import * as Popup from "~commons/popup";
import MultiSelect from "react-multi-select-component";

export type Props = Base.Props;

export const Element = (props: Props) => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state['reportSpecial']);
  // useEffect
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
                selectorKeys: ['reportSpecial', 'filters', 'dateFrom'],
                reducerType: INPUT_DATE_FROM,
              },
              max: 10,
            }}
            $datepicker={{
              store: {
                selectorKeys: ['reportSpecial', 'filters', 'dateFrom'],
                action: { type: INPUT_DATE_FROM },
              },
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
                selectorKeys: ['reportSpecial', 'filters', 'dateTo'],
                reducerType: INPUT_DATE_TO,
              },
              max: 10,
            }}
            $datepicker={{
              store: {
                selectorKeys: ['reportSpecial', 'filters', 'dateTo'],
                action: { type: INPUT_DATE_TO },
              },
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
          <MultiSelect
            options={selector?.orgsChildren ?? []}
            value={selector?.filters?.orgCodeList}
            onChange={item => {
              dispatch({ type: SELECT_COMBOX_FILTER, keys: ["filters", "orgCodeList"], data: item });
            }}
            labelledBy="Chọn"
            selectAllLabel='All'
            overrideStrings={{
              allItemsAreSelected: 'All'
            }}
          />
        </Block.Element>

        <Block.Element {...filter1Props}
            width={Base.Width.PER_40}
        >
          <Title.Element
            text='Nhân viên áp tải'
            margin={Base.MarginBottom.PX_5}
            style={{
              fontSize: '15px',
            }}
          />
          <Block.Element
            flex={Base.Flex.START}
            margin={Base.MarginRight.PX_18}
            width={Base.Width.FULL}
          >
            <Combox.Element
              $selectorWrapper={{
                style: {
                  backgroundColor: '#e8e8e8',
                }
              }}
              width={Base.Width.PER_40}
              store={{
                defaultSelectorKeys: ['reportSpecial', 'filters', 'orgsType'],
                selectorKeys: ['reportSpecial', 'orgsTypes'],
                reducerType: SELECT_ORGS_TYPE_FILTER,
                reducerKeys: {
                  text: 'text',
                  value: 'value',
                },
              }}
              isInputDisabled={true}
            />

            <Input.Element
              placeholder='Nhập giá trị...'
              width={Base.Width.PER_60}
              store={{
                selectorKeys: ['reportSpecial', 'filters', 'orgsValue'],
                reducerType: INPUT_ORGS_VALUE_FILTER,
              }}
              max={200}
            />
          </Block.Element>
        </Block.Element>
        <Button.Element
          {...queryButtonProps}
          onClick={handleSubmitButtonClick}
          style={{
            marginTop: '29px',
          }}
        />
      </Block.Element >
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
  // if ( !selector.id) {
  //   dispatch({ type: ADD_NOTI, noti: { type: 'error', message: 'Chưa điền Số PYC HT' } });
  //   return false;
  // }
  return true;
}


Element.displayName = 'SearchFilter';
