"use client"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import { routes } from "@/constants/routes"
import useStore, { setUserSelector } from "@/store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import styles from "./index.module.scss"

const IndexPage = () => {
  const setUser = useStore(setUserSelector)
  const router = useRouter()
  const [inputValue, setInputValue] = useState<string>("")

  function handleSaveUser() {
    const newUser = inputValue.trim()
    setUser(newUser)
    try {
      localStorage.setItem("user", JSON.stringify(newUser))
      router.push(routes.generator)
    } catch {
      console.error("Ошибка! не удалось сохранить пользователя в localStorage")
    }
  }

  return (
    <form className={styles["login-form"]}>
      <div className={styles["login-form__main"]}>
        <h1 className={styles["login-form__title"]}>Начать</h1>
        <Input
          label="Напишите ваше имя"
          placeholder="Ваше имя"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </div>
      <div className={styles["login-form__footer"]}>
        <Button type="button" onClick={handleSaveUser}>
          Сохранить пользователя
        </Button>
        <Link href={routes.calculator}>
          <Button type="button">Открыть калькулятор</Button>
        </Link>
        <Link href={routes.generator}>
          <Button type="button">Открыть генератор</Button>
        </Link>
      </div>
    </form>
  )
}

export default IndexPage
