import React, { useState } from 'react'
import Classnames from 'classnames'
import styles from './_styles.css'
import * as Base from '~/_settings';
import { useDispatch, useSelector } from 'react-redux';
import * as Block from '~commons/block';
import * as Button from '~commons/button';
import * as Item from './item';
import Chevron from '~svg/chevron';
import * as SVG from '~commons/svg';
import Config from '@config';
import { _Array } from '@utils';

export enum Type {
  DEFAULT = 'pagination',
}

export enum Size {
  S1 = 's1',
  S = 's',
  M = 'm',
  L = 'l',
  L1 = 'l1',
}

export type Props = Block.Props & {
  type?: Type,
  store: Store,
  totalItems?: number,
  pageRange?: number,
  numberOfItemsPerPage?: number,
}

type Store = {
  totalSelectorKeys?: string[],
  action?: {},
}

export const Element = ({
  type = Type.DEFAULT,
  store,
  totalItems = 1,
  pageRange = 5,
  numberOfItemsPerPage = Config.numberOfItemsPerPage,
}: Props): React.ReactElement => {
  const dispatch = useDispatch();
  const selector = store && store.totalSelectorKeys ? useSelector(state => _Array.getArrayValueByKey(state as [], store.totalSelectorKeys ?? [])) : null;
  const total = selector?.total || totalItems;

  // const currentPage = selector?.currentPage;
  const [currentPage, setCurrentPage] = React.useState(0);
  const maxPage = Math.ceil((total as number ?? 1) / numberOfItemsPerPage);
  //create props
  const componentProps = {
    classNames: Classnames(
      styles[type],
    ),
    // ...props,
  };
  const pageButtonProps = {
    classNames: Classnames(
      styles['pagination-page-button'],
    ),
  };
  
  const isFirst = currentPage > 0;
  const isLast = currentPage < maxPage - 1;
  const [firstPageInRange, pageSize] = (() => {
    const range = Math.floor(pageRange / 2);
    if (maxPage <= pageRange)
      return [0, maxPage];
    if (range > currentPage) {
      return [0, pageRange];
    }
    if (currentPage >= maxPage - range) {
      return [maxPage - pageRange, pageRange];
    }
    return [currentPage - range, pageRange];
  })();
  const itemElements = Array(pageSize).fill(0).map((item, index) => {
    const pageNumber = firstPageInRange + index;
    const style = currentPage === pageNumber ? { style: { border: '1px solid #cdcdcd' } } : {};

    return <Button.Element
      key={pageNumber}
      border={Base.Border.NONE}
      {...pageButtonProps}
      text={'' + (pageNumber + 1)}
      {...style}
      onClick={handlePageButtonClick(dispatch, store, pageNumber,currentPage, setCurrentPage)}
    />;
  });

  return (
    <Block.Element {...componentProps}
    // flex={Base.Flex.START}
    // alignItems={Base.AlignItems.STRETCH}
    >
      <Block.Element
        style={{
          cursor: 'pointer',
          display: pageSize < pageRange ? 'none' : 'block',
        }}
      >
        <Chevron
          direction={SVG.Direction.LEFT}
          size={SVG.Size.S1}
          margin={Base.MarginRight.PX_18}
          onClick={() => isFirst && dispatch({ ...store.action, page: currentPage - 1 })}
          fill={isFirst ? '#383838' : '#cdcdcd'}
        />
      </Block.Element>
      {itemElements.length > 1 && itemElements}
      <Block.Element
        style={{
          cursor: 'pointer',
          display: pageSize < pageRange ? 'none' : 'block',
        }}
      >
        <Chevron
          direction={SVG.Direction.RIGHT}
          size={SVG.Size.S1}
          margin={Base.MarginLeft.PX_18}
          onClick={() => isLast && dispatch({ ...store.action, page: currentPage + 1 })}
          fill={isLast ? '#383838' : '#cdcdcd'}
        />
      </Block.Element>
    </Block.Element>
  )
}

const handlePageButtonClick = (dispatch, store: Store, page, currentPage, setCurrentPage) => () => {
  dispatch({ ...store.action, page: page });
  setCurrentPage(page);
}
Element.displayName = 'Notification';
