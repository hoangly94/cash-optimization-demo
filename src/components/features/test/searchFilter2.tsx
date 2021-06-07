import React, { useEffect, useRef } from 'react'

export type Props = {
  refs: any,
}

export const Element = (props: Props) => {
  console.log("-------children2");
  props.refs.current++;
  console.log(props.refs.current);
  const click= ()=>{
    props.refs.current++;
  }
  return (
    <div onClick={click}>aaaaaaaaaaaaaaaaa</div>
  )
}