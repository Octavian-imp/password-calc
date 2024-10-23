"use client"
import { cn } from "@/utils/clsx"
import { ButtonHTMLAttributes, PropsWithChildren } from "react"
import styles from "./index.module.scss"

type Props = PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, className, ...props }: Props) => {
  return (
    <button className={cn(styles.el, className)} {...props}>
      {children}
    </button>
  )
}

export default Button
