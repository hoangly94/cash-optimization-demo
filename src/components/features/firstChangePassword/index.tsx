import React, { useCallback, useState } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Button from "~commons/button";
import { CHANGE_CHANGE_PASS_INPUT, CHANGE_REGISTER_INPUT, REQUEST_CHANGE_PASSWORD, REQUEST_REGISTER } from '~stores/auth/constants';
import { useDispatch, useSelector } from 'react-redux';

export enum Type {
  DEFAULT = 'changePassword',
}

export type Props = Base.Props & {
  type?: Type,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
  } = props;
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const selector = useSelector(state => state['auth'].changePassword);

  const handleSubmitButtonClick = useCallback(
    () => {
      const isValidForm = validateForm(selector, setErrorMsg);
      if (isValidForm) {
        setErrorMsg('');
        dispatch({ type: REQUEST_CHANGE_PASSWORD });
      }
    },
    [selector],
  );

  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles['changePassword-background'],
    ),
  };

  const componentProps = {
    classNames: Classnames(
      styles[type],
    ),
    padding: Base.Padding.PX_38,
  };

  return (
    <Block.Element {...componentWrapperProps}>
      <Block.Element {...componentProps}>
        <Title.Element
          text='Change Password'
          textAlign={Base.TextAlign.CENTER}
          tagType={Title.TagType.H1}
          margin={Base.MarginBottom.PX_38}
        />
        <Input.Element
          placeholder='Current Password...'
          name='currentPassword'
          valueType={Input.ValueType.PASSWORD}
          width={Base.Width.FULL}
          margin={Base.MarginTop.PX_18}
          border={Base.Border.NONE}
          borderRadius={Base.BorderRadius.PX_3}
          store={{
            selectorKeys: ['auth', 'changePassword', 'currentPassword'],
            reducerType: CHANGE_CHANGE_PASS_INPUT,
          }}
          max={50}
        />
        <Input.Element
          placeholder='New Password...'
          name='newPassword'
          valueType={Input.ValueType.PASSWORD}
          width={Base.Width.FULL}
          margin={Base.MarginTop.PX_18}
          border={Base.Border.NONE}
          borderRadius={Base.BorderRadius.PX_3}
          store={{
            selectorKeys: ['auth', 'changePassword', 'newPassword'],
            reducerType: CHANGE_CHANGE_PASS_INPUT,
          }}
          max={50}
        />
        <Input.Element
          placeholder='Confirm New Password...'
          name='reNewPassword'
          valueType={Input.ValueType.PASSWORD}
          width={Base.Width.FULL}
          margin={Base.MarginTop.PX_18}
          border={Base.Border.NONE}
          borderRadius={Base.BorderRadius.PX_3}
          store={{
            selectorKeys: ['auth', 'changePassword', 'reNewPassword'],
            reducerType: CHANGE_CHANGE_PASS_INPUT,
          }}
          max={50}
        />
        <Button.Element
          text='Update'
          width={Base.Width.FULL}
          margin={Base.MarginTop.PX_18}
          color={Base.Color.WHITE}
          border={Base.Border.NONE}
          borderRadius={Base.BorderRadius.PX_3}
          backgroundColor={Base.BackgroundColor.GREEN}
          onClick={handleSubmitButtonClick}
        />

        <Title.Element
          text={errorMsg}
          color={Base.Color.RED}
          textAlign={Base.TextAlign.CENTER}
        />
      </Block.Element >
    </Block.Element >
  )
}

const validateForm = (selector, setErrorMsg) => {
  if (!selector.currentPassword || !selector.newPassword) {
    setErrorMsg('Vui lòng nhập Username và Password');
    return false;
  }
  if (selector.newPassword != selector.reNewPassword) {
    setErrorMsg('New Password & Confirm New Password không khớp');
    return false;
  }
  return true;
}

Element.displayName = 'ChangePassword'