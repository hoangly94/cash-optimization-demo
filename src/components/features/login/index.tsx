import React, { useCallback, useState } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Input from "~commons/input";
import * as Link from "~commons/link";
import * as Radio from "~commons/radio";
import * as Title from "~commons/title";
import * as Label from "~commons/label";
import * as Button from "~commons/button";
import { CHANGE_LOGIN_INPUT, REQUEST_LOGIN } from '~/stores/auth/constants';
import { useDispatch, useSelector } from 'react-redux';

export enum Type {
  DEFAULT = 'login',
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
  const loginSelector = useSelector(state => state['auth'].login);

  const handleSubmitButtonClick = useCallback(
    () => {

      const isValidForm = validateForm(loginSelector, setErrorMsg);
      if (isValidForm) {
        setErrorMsg('');
        dispatch({ type: REQUEST_LOGIN });
      }
    },
    [loginSelector],
  );

  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles['login-background'],
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
          text='Login'
          textAlign={Base.TextAlign.CENTER}
          tagType={Title.TagType.H1}
          margin={Base.MarginBottom.PX_38}
        />
        <Block.Element
          flex={Base.Flex.BETWEEN}
        >
          <Block.Element
            flex={Base.Flex.START}
            alignItems={Base.AlignItems.STRETCH}
          >
            <Radio.Element
              name='1'
              store={{
                selectorKeys: ['auth', 'login', 'loginType'],
                action: { type: '' },
              }}
              margin={Base.MarginRight.PX_8}
            />
            <Label.Element text='Login by User of Project' />
          </Block.Element>
          <Block.Element
            flex={Base.Flex.START}
            alignItems={Base.AlignItems.STRETCH}
          >
            <Radio.Element
              name='2'
              margin={Base.MarginRight.PX_8}
            />
            <Label.Element text='Login by User of Bank' />
          </Block.Element>
        </Block.Element>
        <Input.Element
          placeholder='Username...'
          name='username'
          width={Base.Width.FULL}
          margin={Base.MarginTop.PX_18}
          border={Base.Border.NONE}
          borderRadius={Base.BorderRadius.PX_3}
          store={{
            selectorKeys: ['auth', 'login', 'username'],
            reducerType: CHANGE_LOGIN_INPUT,
          }}
          max={50}
        />
        <Input.Element
          placeholder='Password...'
          name='password'
          valueType={Input.ValueType.PASSWORD}
          width={Base.Width.FULL}
          margin={Base.MarginTop.PX_18}
          border={Base.Border.NONE}
          borderRadius={Base.BorderRadius.PX_3}
          store={{
            selectorKeys: ['auth', 'login', 'password'],
            reducerType: CHANGE_LOGIN_INPUT,
          }}
          max={50}
        />
        <Block.Element
          flex={Base.Flex.BETWEEN}
          alignItems={Base.AlignItems.STRETCH}
          margin={Base.MarginTop.PX_18}
        >
          {/* <Block.Element
            flex={Base.Flex.BETWEEN}
          >
            <Link.Element
              text='Forgot Pass'
              url='/forgot'
              margin={Base.MarginRight.PX_18} />
            <Link.Element
              text='Register'
              url='/register'
              margin={Base.MarginRight.PX_8}
            />
          </Block.Element> */}
          <Button.Element
            text='Login'
            width={Base.Width.FULL}
            color={Base.Color.WHITE}
            border={Base.Border.NONE}
            borderRadius={Base.BorderRadius.PX_3}
            backgroundColor={Base.BackgroundColor.GREEN}
            onClick={handleSubmitButtonClick}
          />
        </Block.Element >

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
    setErrorMsg('Vui lòng điền Username và Password');
    return false;
  }
  return true;
}


Element.displayName = 'Login'