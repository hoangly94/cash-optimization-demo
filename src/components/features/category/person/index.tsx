import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as SearchFilter from "./searchFilter";
import * as SearchDataTable from "./searchDataTable";
import * as Actions from "./actions";
import { FETCH_ORGS, FETCH_TITLES } from '_/stores/dashboardRoot/constants';
import { useDispatch } from 'react-redux';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const type = 'component';
  
  const dispatch = useDispatch();
  dispatch({ type: FETCH_ORGS });
  dispatch({ type: FETCH_TITLES });

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

Element.displayName = 'Person'

