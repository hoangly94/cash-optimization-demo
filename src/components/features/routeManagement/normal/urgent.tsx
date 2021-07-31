import React, { useEffect, useLayoutEffect } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as SearchFilter from "./searchFilter";
import * as SearchDataTable from "./searchDataTable";
import * as UrgentActions from "./urgentActions";
import { useDispatch } from 'react-redux';
import { FETCH_CONFIG, FETCH_CURRENCIES, FETCH_PRIORITIES } from '~stores/dashboardRoot/constants';
import { FETCH_ORGS_CHILDREN, REQUEST_QUERY } from '~stores/routeManagement/normal/constants';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const type = 'component';
  useLayoutEffect(() => {
    dispatch({ type: FETCH_CURRENCIES });
    dispatch({ type: FETCH_PRIORITIES });
  }, []);
  useLayoutEffect(() => {
    dispatch({ type: FETCH_ORGS_CHILDREN });
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
      <UrgentActions.Element />
    </Block.Element >
  )
}

Element.displayName = 'Approval'

