"use client"
import { InputHTMLAttributes, useId } from "react"
import styles from "./index.module.scss"
import { cn } from "@/utils/clsx"
type Props = { label: string } & InputHTMLAttributes<HTMLInputElement>

const Checkbox = ({ label, ...props }: Props) => {
  const id = useId()
  return (
    <>
      <input
        id={id}
        type="checkbox"
        hidden
        className={cn(styles.input, props.className)}
        {...props}
      />
      <label htmlFor={id} className={styles.wrapper}>
        <span className={styles.icon}></span>
        {label}
      </label>
    </>
  )
}

export default Checkbox
