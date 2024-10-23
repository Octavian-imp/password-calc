"use client"
import useStore, { passwordsListSelector } from "@/store"
import { memo } from "react"
import styles from "./index.module.scss"
import PasswordItem from "./passwordItem"

const PasswordsList = memo(function PasswordsList() {
  const passwordsList = useStore(passwordsListSelector)

  return (
    <ul className={styles.container}>
      {passwordsList.map((password) => (
        <PasswordItem key={password.id} password={password.value} />
      ))}
    </ul>
  )
})

export default PasswordsList
