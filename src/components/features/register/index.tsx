import React, { useCallback, useState } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Button from "~commons/button";
import { CHANGE_REGISTER_INPUT, REQUEST_REGISTER } from '~stores/auth/constants';
import { useDispatch, useSelector } from 'react-redux';

export enum Type {
  DEFAULT = 'register',
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
  const selector = useSelector(state => state['auth'].register);

  const handleSubmitButtonClick = useCallback(
    () => {
      const isValidForm = validateForm(selector, setErrorMsg);
      if (isValidForm) {
        setErrorMsg('');
        dispatch({ type: REQUEST_REGISTER });
      }
    },
    [selector],
  );

  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles['register-background'],
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
          text='Register'
          textAlign={Base.TextAlign.CENTER}
          tagType={Title.TagType.H1}
          margin={Base.MarginBottom.PX_38}
        />
        <Input.Element
          placeholder='Username...'
          width={Base.Width.FULL}
          margin={Base.MarginTop.PX_18}
          border={Base.Border.NONE}
          borderRadius={Base.BorderRadius.PX_3}
          store={{
            selectorKeys: ['auth', 'register', 'username'],
            reducerType: CHANGE_REGISTER_INPUT,
          }}
          max={50}
        />
        <Input.Element
          placeholder='Password...'
          valueType={Input.ValueType.PASSWORD}
          width={Base.Width.FULL}
          margin={Base.MarginTop.PX_18}
          border={Base.Border.NONE}
          borderRadius={Base.BorderRadius.PX_3}
          store={{
            selectorKeys: ['auth', 'register', 'password'],
            reducerType: CHANGE_REGISTER_INPUT,
          }}
          max={50}
        />
        <Input.Element
          placeholder='Confirm Password...'
          valueType={Input.ValueType.PASSWORD}
          width={Base.Width.FULL}
          margin={Base.MarginTop.PX_18}
          border={Base.Border.NONE}
          borderRadius={Base.BorderRadius.PX_3}
          store={{
            selectorKeys: ['auth', 'register', 'rePassword'],
            reducerType: CHANGE_REGISTER_INPUT,
          }}
          max={50}
        />
        <Button.Element
          text='Register'
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
  if (!selector.username || !selector.password) {
    setErrorMsg('Vui lòng nhập Username và Password');
    return false;
  }
  if (selector.password != selector.rePassword) {
    setErrorMsg('Password & Confirm Password không khớp');
    return false;
  }
  return true;
}


Element.displayName = 'Register'