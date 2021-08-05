import React, { useEffect } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as SearchFilter from "./searchFilter";
import * as SearchDataTable from "./searchDataTable";
import * as Actions from "./actions";
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_CONFIG } from '~/stores/dashboardRoot/constants';
import { REQUEST_QUERY, RESET_FILTER_REGISTRATION } from '~/stores/authority/registration/constants';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const type = 'component';
  const userSelector = useSelector(state => state['auth'].user);
  useEffect(() => {
    // dispatch({ type: REQUEST_QUERY });
  });

  const dispatch = useDispatch();

  //create props
  const componentWrapperProps = {
    classNames: Classnames(
      styles[type],
    ),
    ...props,
  };
  return (
    <Block.Element {...componentWrapperProps}>
      <SearchFilter.Element />
      <SearchDataTable.Element />
      <Actions.Element />
    </Block.Element >
  )
}

Element.displayName = 'Registration'

