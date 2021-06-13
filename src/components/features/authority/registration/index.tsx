import React, { useEffect } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css';
import * as Base from '~/_settings';
import * as Block from "~commons/block";
import * as SearchFilter from "./searchFilter";
import * as SearchDataTable from "./searchDataTable";
import * as Actions from "./actions";
import { useDispatch } from 'react-redux';
import { FETCH_CONFIG } from '_/stores/dashboardRoot/constants';

export type Props = Base.Props;

export const Element = (props: Props) => {
  const type = 'component';
  useEffect(() => {
    dispatch({ type: FETCH_CONFIG })

  }, []);
  // dispatch({ type

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

Element.displayName = 'Ảea'

