import React, { useCallback, useState } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Button from "~commons/button";
import { CHANGE_FORGOT_INPUT, CHANGE_REGISTER_INPUT, REQUEST_FORGOT, REQUEST_REGISTER, REQUEST_RESET_PASSWORD } from '~stores/auth/constants';
import { useDispatch, useSelector } from 'react-redux';

export enum Type {
  DEFAULT = 'forgot',
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
  const selector = useSelector(state => state['auth'].forgot);

  const handleSubmitButtonClick = useCallback(
    () => {
      const isValidForm = validateForm(selector, setErrorMsg);
      if (isValidForm) {
        setErrorMsg('');
        dispatch({ type: REQUEST_RESET_PASSWORD });
      }
    },
    [selector],
  );

  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles['forgot-background'],
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
          text='Reset Password'
          width={Base.Width.PX_400}
          textAlign={Base.TextAlign.CENTER}
          tagType={Title.TagType.H1}
          margin={Base.MarginBottom.PX_38}
        />
        <Input.Element
          placeholder='Username...'
          width={Base.Width.PX_400}
          margin={Base.MarginTop.PX_18}
          border={Base.Border.NONE}
          borderRadius={Base.BorderRadius.PX_3}
          store={{
            selectorKeys: ['auth', 'forgot', 'username'],
            reducerType: CHANGE_FORGOT_INPUT,
          }}
          max={50}
        />
        <Button.Element
          text='RESET'
          width={Base.Width.PX_400}
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
  if (!selector.username) {
    setErrorMsg('Vui lòng nhập Username');
    return false;
  }
  return true;
}


Element.displayName = 'Forgot'