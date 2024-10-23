"use client"
import { routes } from "@/constants/routes"
import useStore, { userSelector } from "@/store"
import Link from "next/link"
import styles from "./index.module.scss"

const Header = () => {
  const user = useStore(userSelector)

  return (
    <div className={styles.wrapper}>
      <nav className={styles["left-side"]}>
        <Link href={routes.home} className={styles["left-side__link"]}>
          Главная
        </Link>
        <Link href={routes.calculator} className={styles["left-side__link"]}>
          Калькулятор
        </Link>
        <Link href={routes.generator} className={styles["left-side__link"]}>
          Генератор
        </Link>
      </nav>
      <div className={styles["right-side"]}>
        <span className={styles["right-side__title"]}>{user}</span>
        <span className={styles["right-side__avatar"]}>{user[0]}</span>
      </div>
    </div>
  )
}

export default Header
