"use client"
import { workSans } from "@/app/layout"
import Button from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import { useState } from "react"
import styles from "./index.module.scss"

const operations = {
  "/": (a: number, b: number) => a / b,
  "*": (a: number, b: number) => a * b,
  "+": (a: number, b: number) => a + b,
  "-": (a: number, b: number) => a - b,
}
const rgx = /(\d+|[\/\%\*\+\-])/g

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
    if (activeValue[0] === "-") {
      setActiveValue((prev) => prev.slice(1))
    } else {
      setActiveValue((prev) => "-" + prev)
    }
  }

  function handleReminder() {
    let counter = 1

    return () => {
      const expression = activeValue.split(rgx)
      console.log(expression)
      if (counter === 2) {
        setHistoryVal(activeValue)
        setActiveValue(expression + "%")
        counter = 1
      } else {
        setActiveValue((prev) => prev + "%")
        counter++
      }
    }
  }

  function handleDivide() {
    let counter = 1

    return () => {
      if (counter === 2) {
        const calculated = eval(activeValue)
        setHistoryVal(activeValue)
        setActiveValue(calculated + "/")
        counter = 1
      } else {
        setActiveValue((prev) => prev + "/")
        counter++
      }
    }
  }
  function handleMultiply() {
    let counter = 1

    return () => {
      console.log(activeValue)

      if (counter === 2) {
        const calculated = eval(activeValue.replace("x", "*"))
        setHistoryVal(activeValue)
        setActiveValue(calculated + "x")
        counter = 1
      } else {
        setActiveValue((prev) => prev + "x")
        counter++
      }
    }
  }
  function handleDecrease() {
    let counter = 1

    return () => {
      if (counter === 2) {
        const calculated = eval(activeValue)
        setHistoryVal(activeValue)
        setActiveValue(calculated + "-")
        counter = 1
      } else {
        setActiveValue((prev) => prev + "-")
        counter++
      }
    }
  }

  function handleAddDot() {
    if (!activeValue.includes(".")) {
      setActiveValue((prev) => prev + ".")
    }
  }

  function handleSumm() {
    let counter = 1

    return () => {
      if (counter === 2) {
        const calculated = eval(activeValue)
        setHistoryVal(activeValue)
        setActiveValue(calculated + "+")
        counter = 1
      } else {
        setActiveValue((prev) => prev + "+")
        counter++
      }
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
    const calculated = eval(activeValue)

    setHistoryVal("")
    setActiveValue(calculated)
  }

  return (
    <div className="bg-gray-100 rounded-md h-[700px] px-5 py-16 max-w-[440px] self-center w-full flex flex-col gap-y-4">
      <span
        className={`${workSans.className} font-light text-[40px] leading-[auto] text-zinc-500 self-end min-h-12`}
      >
        {historyVal}
      </span>
      <span
        className={`${workSans.className} font-light text-8xl self-end min-h-24`}
      >
        {activeValue}
      </span>
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
        <Button className={styles.calc_btn} onClick={() => handleReminder()()}>
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
        <Button className={styles.calc_btn} onClick={() => handleDivide()()}>
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
        <Button className={styles.calc_btn} onClick={() => handleMultiply()()}>
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
        <Button className={styles.calc_btn} onClick={() => handleDecrease()()}>
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
        <Button className={styles.calc_btn} onClick={() => handleSumm()()}>
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
