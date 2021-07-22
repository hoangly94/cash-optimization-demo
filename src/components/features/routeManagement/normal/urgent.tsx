import React, { useEffect, useLayoutEffect } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as SearchFilter from "./searchFilter";
import * as SearchDataTable from "./searchDataTable";
import * as ApprovalActions from "./approvalActions";
import { useDispatch } from 'react-redux';
import { FETCH_CONFIG, FETCH_CURRENCIES, FETCH_PRIORITIES } from '~stores/dashboardRoot/constants';
import { FETCH_ORGS_CHILDREN, REQUEST_QUERY, RESET_FILTER_APPROVAL, RESET_FILTER_REGISTRATION } from '~stores/pyc/registration/constants';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const type = 'component';
  useLayoutEffect(() => {
    dispatch({ type: FETCH_CURRENCIES });
    dispatch({ type: FETCH_PRIORITIES });
  }, []);
  useLayoutEffect(() => {
    dispatch({ type: FETCH_ORGS_CHILDREN });
    dispatch({ type: RESET_FILTER_APPROVAL });
    dispatch({ type: REQUEST_QUERY });
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
      <ApprovalActions.Element />
    </Block.Element >
  )
}

Element.displayName = 'Approval'

