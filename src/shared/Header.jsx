import { hot } from 'react-hot-loader/root'
import React from 'react'
import styles from "./header.module.scss"

function HeaderComponent() {
  return (
    <header>
      <h1 className={styles.example}>
        Reddit for our ow
      </h1>
    </header>
  )
}

export const Header = hot(HeaderComponent)
