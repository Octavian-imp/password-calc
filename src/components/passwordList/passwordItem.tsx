"use client"
import { useState } from "react"
import Icon from "../ui/icon"
import styles from "./index.module.scss"

type Props = {
  password: string
}

const PasswordItem = ({ password }: Props) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(password)
    setIsCopied(true)
    const timer = setTimeout(() => {
      setIsCopied(false)
      clearTimeout(timer)
    }, 3000)
  }

  return (
    <li className={styles.password_item}>
      <span>{password}</span>
      <button onClick={copyToClipboard}>
        {isCopied ? (
          <Icon name="copy-check" className="text-primary" />
        ) : (
          <Icon name="copy" className="text-primary" />
        )}
      </button>
    </li>
  )
}

export default PasswordItem
