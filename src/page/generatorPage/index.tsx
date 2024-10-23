"use client"
import PasswordsList from "@/components/passwordList"
import Button from "@/components/ui/button"
import Checkbox from "@/components/ui/checkbox"
import Input from "@/components/ui/input"
import useStore, { addPasswordListSelector } from "@/store"
import genPassword, {
  initialFlagsConfigPassword,
} from "@/utils/generatePassword"
import { useReducer, useState } from "react"
import styles from "./index.module.scss"

function reducerConfigPass(
  state: Record<keyof typeof initialFlagsConfigPassword, boolean>,
  action: { type: keyof typeof initialFlagsConfigPassword }
) {
  switch (action.type) {
    case "decimal":
      return { ...state, decimal: !state.decimal }
    case "lowerLetters":
      return { ...state, lowerLetters: !state.lowerLetters }
    case "specialSymbols":
      return { ...state, specialSymbols: !state.specialSymbols }
    case "unique":
      return { ...state, unique: !state.unique }
    case "upperLetters":
      return { ...state, upperLetters: !state.upperLetters }
  }
}

const GeneratorPage = () => {
  const [passwordLength, setPasswordLength] = useState<number>(8)
  const [configPass, dispatch] = useReducer(
    reducerConfigPass,
    initialFlagsConfigPassword
  )
  const addPasswordList = useStore(addPasswordListSelector)

  function handleClickGenPassword() {
    const password = genPassword(passwordLength, configPass)
    addPasswordList(password)
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Генератор паролей</h1>
      <div className={styles.content}>
        <div className={styles.password_config}>
          <Input
            type="number"
            label="Длина пароля:"
            className={styles.field}
            labelClassname={styles.label}
            onChange={(e) => setPasswordLength(parseInt(e.target.value))}
          />
          <Checkbox
            label="Использовать прописные буквы"
            onClick={() => dispatch({ type: "upperLetters" })}
          />
          <Checkbox
            label="Использовать строчные буквы"
            onClick={() => dispatch({ type: "lowerLetters" })}
          />
          <Checkbox
            label="Использовать цифры"
            onClick={() => dispatch({ type: "decimal" })}
          />
          <Checkbox
            label="Использовать символы: %, *, ), ?, @, #, $, ~"
            onClick={() => dispatch({ type: "specialSymbols" })}
          />
          <Checkbox
            label="Избегать повторения символов"
            onClick={() => dispatch({ type: "unique" })}
          />

          <Button onClick={handleClickGenPassword} className={styles.button}>
            Сгенерировать пароль
          </Button>
        </div>
        <PasswordsList />
      </div>
    </main>
  )
}

export default GeneratorPage
