import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as SearchFilter from "./searchFilter";
import * as SearchDataTable from "./searchDataTable";
import * as Actions from "./actions";
import { useDispatch } from 'react-redux';
import { FETCH_AREAS, FETCH_FUNCTIONS, FETCH_ORGS, FETCH_PERS } from '_/stores/dashboardRoot/constants';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const type = 'component';
  
  const dispatch = useDispatch();
  dispatch({ type: FETCH_ORGS });
  dispatch({ type: FETCH_AREAS });
  dispatch({ type: FETCH_PERS });
  dispatch({ type: FETCH_FUNCTIONS });

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

Element.displayName = 'Vehicle'

