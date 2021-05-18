const React = require('react')
const Classnames = require('classnames')
const styles = require("./style.css");

const baseStyles = require('../../_settings/_base.css')


const Type = {
  DEFAULT: '',
}

type Props = {
  type: string,
  children: React.ReactNode,
  className: string,
}

const Element = (props: Props): React.ReactElement => {
  const { type, children, className } = props;

  //create props
  const classProps: string = Classnames(
    styles[type],
    className
  );

  return (
    <select className={classProps}>{children}</select>
  )
}

Element.defaultProps = {
  className: [],
  children: '',
}

export {
  Element as SelectItem,
  Type as SelectItemType,
};