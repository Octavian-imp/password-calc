"use client"
import Button from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import calculator, {
  rgxExpressionCalculator,
  rgxOperationCalculator,
} from "@/utils/calculator"
import { useState } from "react"
import styles from "./index.module.scss"

const CalculatorPage = () => {
  const [historyVal, setHistoryVal] = useState("")
  const [activeValue, setActiveValue] = useState("0")

  function handleClear() {
    setHistoryVal("")
    setActiveValue("0")
  }

  function handleRemove() {
    if (activeValue.length > 1) {
      setActiveValue(activeValue.slice(0, -1))
    } else {
      setActiveValue("0")
    }
  }

  function handleChangeSignedValue() {
    if (activeValue === "0") {
      return
    }
    if (
      activeValue.match(rgxExpressionCalculator)!.filter(Boolean).map(Number)
        .length > 1
    ) {
      // меняем знак числа если перед числом стоит операция
      setActiveValue((prev) => {
        return prev.replace(/\d+$/, "-" + prev.match(/\d+$/)?.[0])
      })
    } else if (activeValue[0] === "-") {
      setActiveValue((prev) => prev.slice(1))
    } else {
      setActiveValue((prev) => "-" + prev)
    }
  }

  function handleAddOperation(operation: "+" | "-" | "x" | "/" | "%") {
    if (rgxOperationCalculator.test(activeValue)) {
      const args = activeValue
        .match(rgxExpressionCalculator)!
        .filter(Boolean)
        .map(Number)
      const operations = activeValue.match(rgxOperationCalculator)
      if (operations) {
        if (operations.length === 1 && args[0] >= 0 && args[1] >= 0) {
          // расчет если первое число положительное и второе отрицательное и нажата кнопка операции
          return handleResult()
        }
        if (operations.length === 2 && (args[0] < 0 || args[1] < 0)) {
          // расчет если первое число отрицательное или второе положительное и нажата кнопка операции
          return handleResult()
        }
        if (operations.length === 3 && args[0] < 0 && args[1] < 0) {
          // расчет если первое число отрицательное и второе отрицательное и нажата кнопка операции
          return handleResult()
        }
      }
    }
    setActiveValue((prev) => prev + operation)
  }

  function handleAddDot() {
    if (!activeValue.includes(".")) {
      setActiveValue((prev) => prev + ".")
    }
  }

  function handleAddNumber(number: string) {
    if (activeValue === "0") {
      setActiveValue(number)
    } else {
      setActiveValue((prev) => prev + number)
    }
  }

  function handleResult() {
    const calculated = calculator(activeValue)

    setHistoryVal(activeValue)
    setActiveValue(calculated?.toString() ?? "")
  }

  return (
    <div className="bg-gray-100 rounded-md h-[700px] px-5 py-16 max-w-[440px] self-center w-full flex flex-col gap-y-4">
      <span className={styles.calc_history}>{historyVal}</span>
      <span className={styles.calc_result}>{activeValue}</span>
      <div className={styles.calc_row}>
        <Button className={styles.calc_btn} onClick={handleClear}>
          C
        </Button>
        <Button className={styles.calc_btn} onClick={handleRemove}>
          <Icon name="delete" />
        </Button>
        <Button className={styles.calc_btn} onClick={handleChangeSignedValue}>
          +/-
        </Button>
        <Button
          className={styles.calc_btn}
          onClick={() => handleAddOperation("%")}
        >
          %
        </Button>
      </div>
      <div className={styles.calc_row}>
        <Button
          className={styles.calc_btn}
          onClick={() => handleAddNumber("7")}
        >
          7
        </Button>
        <Button
          className={styles.calc_btn}
          onClick={() => handleAddNumber("8")}
        >
          8
        </Button>
        <Button
          className={styles.calc_btn}
          onClick={() => handleAddNumber("9")}
        >
          9
        </Button>
        <Button
          className={styles.calc_btn}
          onClick={() => handleAddOperation("/")}
        >
          /
        </Button>
      </div>
      <div className={styles.calc_row}>
        <Button
          className={styles.calc_btn}
          onClick={() => handleAddNumber("4")}
        >
          4
        </Button>
        <Button
          className={styles.calc_btn}
          onClick={() => handleAddNumber("5")}
        >
          5
        </Button>
        <Button
          className={styles.calc_btn}
          onClick={() => handleAddNumber("6")}
        >
          6
        </Button>
        <Button
          className={styles.calc_btn}
          onClick={() => handleAddOperation("x")}
        >
          x
        </Button>
      </div>
      <div className={styles.calc_row}>
        <Button
          className={styles.calc_btn}
          onClick={() => handleAddNumber("1")}
        >
          1
        </Button>
        <Button
          className={styles.calc_btn}
          onClick={() => handleAddNumber("2")}
        >
          2
        </Button>
        <Button
          className={styles.calc_btn}
          onClick={() => handleAddNumber("3")}
        >
          3
        </Button>
        <Button
          className={styles.calc_btn}
          onClick={() => handleAddOperation("-")}
        >
          -
        </Button>
      </div>
      <div className={styles.calc_row}>
        <Button className={styles.calc_btn} onClick={handleAddDot}>
          .
        </Button>
        <Button
          className={styles.calc_btn}
          onClick={() =>
            setActiveValue((prev) => {
              if (prev[0] === "0") {
                return prev
              } else {
                return prev + "0"
              }
            })
          }
        >
          0
        </Button>
        <Button
          className={styles.calc_btn}
          onClick={() => handleAddOperation("+")}
        >
          +
        </Button>
        <Button className={styles.calc_btn} onClick={() => handleResult()}>
          =
        </Button>
      </div>
    </div>
  )
}

export default CalculatorPage
