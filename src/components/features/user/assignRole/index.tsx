import React, { useCallback, useState, useEffect } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as Input from "~commons/input";
import * as Title from "~commons/title";
import * as Button from "~commons/button";
import * as DualTable from "~commons/dualTable";
import { CHANGE_ASSIGN_ROLE_INPUT, CHANGE_CHANGE_PASS_INPUT, FETCH_USER, REQUEST_ASSIGN_ROLE, REQUEST_ASSIGN_ROLE_QUERY, REQUEST_CHANGE_PASSWORD, SELECT_ROLE_CONTENT_ROW } from '~stores/auth/constants';
import { useDispatch, useSelector } from 'react-redux';

export enum Type {
  DEFAULT = 'assignRole',
}

export type Props = Base.Props & {
  type?: Type,
}

export const Element = (props: Props) => {
  const {
    type = Type.DEFAULT,
  } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: FETCH_USER });
  }, []);
  const [errorMsg, setErrorMsg] = useState('');

  const componentProps = {
    classNames: Classnames(
      styles[type],
    ),
    padding: Base.Padding.PX_38,
  };

  return (
    <Block.Element {...componentProps}>
      <Block.Element
        flex={Base.Flex.START}
        margin={Base.MarginBottom.PX_28}
      >
        <Input.Element
          placeholder='Username...'
          width={Base.Width.PX_300}
          margin={Base.MarginRight.PX_18}
          store={{
            selectorKeys: ['auth', 'assignRole', 'filters', 'username'],
            reducerType: CHANGE_ASSIGN_ROLE_INPUT,
          }}
          max={200}
        />

        <Button.Element
          text='Query'
          width={Base.Width.PX_200}
          backgroundColor={Base.BackgroundColor.GREEN}
          color={Base.Color.WHITE}
          store={{
            action: { type: REQUEST_ASSIGN_ROLE_QUERY },
          }}
        />
      </Block.Element>

      <DualTable.Element
        store={{
          selector1Keys: ['auth', 'assignRole', 'roleContent1'],
          selector2Keys: ['auth', 'assignRole', 'roleContent2'],
          row1ClickAction: { type: SELECT_ROLE_CONTENT_ROW },
          row2ClickAction: { type: SELECT_ROLE_CONTENT_ROW },
        }}
      />

      <Button.Element
        text='Update'
        width={Base.Width.PX_400}
        margin={Base.MarginTop.PX_18}
        color={Base.Color.WHITE}
        border={Base.Border.NONE}
        borderRadius={Base.BorderRadius.PX_3}
        backgroundColor={Base.BackgroundColor.GREEN}
        onClick={() => dispatch({ type: REQUEST_ASSIGN_ROLE })}
      />

      <Title.Element
        text={errorMsg}
        width={Base.Width.PX_400}
        color={Base.Color.RED}
        textAlign={Base.TextAlign.CENTER}
      />
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


Element.displayName = 'AssignRole'