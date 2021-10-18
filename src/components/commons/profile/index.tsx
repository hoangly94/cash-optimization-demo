import * as React from 'react'
import Classnames from 'classnames'
import styles from './_styles.css'
import { useSelector } from 'react-redux';


export const Profile = (): React.ReactElement => {
  const selector = useSelector(state => state['auth'].user);
  return (
    <div className={Classnames(styles['profile'])}>
      <div>{selector.code}</div>
      <div>{selector.fullname}</div>
      <div>{selector.persTitle}</div>
      <div>{selector.orgsName}</div>
      <a href="/login">Thoát</a>
    </div>
  )
}

export default Profile