import React, { useEffect, useRef } from 'react'

export type Props = {
  refs: any,
}

export const Element = (props: Props) => {
  console.log("-------children");
  props.refs.current++;
  console.log(props.refs.current);
  return (
    <div>aaaaaaaaaaaaaaaaa</div>
  )
}