import React, { useEffect, useLayoutEffect } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as SearchFilter from "./searchFilter";
import * as SearchDataTable from "./searchDataTable";
import * as Actions from "./actions";
import { useDispatch, useSelector } from 'react-redux';
import { FETCH_CONFIG, FETCH_CURRENCIES, FETCH_ORGS, FETCH_PRIORITIES } from '~/stores/dashboardRoot/constants';
import { REQUEST_QUERY, RESET_FILTER, FETCH_ORGS_CHILDREN, FETCH_PYC } from '~stores/routeManagement/normal/constants';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const type = 'component';
  const userSelector = useSelector(state => state['auth'].user);
  useLayoutEffect(() => {
    dispatch({ type: FETCH_PYC });
    dispatch({ type: FETCH_ORGS_CHILDREN });
    dispatch({ type: RESET_FILTER, user: userSelector });
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

Element.displayName = 'RouteManagement';

