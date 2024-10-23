import { cn } from "@/utils/clsx"
import { InputHTMLAttributes } from "react"
import styles from "./index.module.scss"

type Props = {
  label: string
  labelClassname?: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = ({ className, labelClassname, label, ...props }: Props) => {
  return (
    <label className={styles.wrapper}>
      <span className={cn(styles.label, labelClassname)}>{label}</span>
      <input className={cn(styles.input, className)} {...props} />
    </label>
  )
}

export default Input
