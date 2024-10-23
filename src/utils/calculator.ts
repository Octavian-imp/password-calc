export const rgxOperationCalculator = /[\/\%x\+\-]/g

export const rgxExpressionCalculator = /(\-\d+|\d+)/g
export default function calculator(expressionStr: string) {
  const operations = {
    "/": (a: number, b: number) => a / b,
    x: (a: number, b: number) => a * b,
    "+": (a: number, b: number) => a + b,
    "-": (a: number, b: number) => a - b,
    "%": (a: number, b: number) => a % b,
  }
  const args = expressionStr.match(rgxExpressionCalculator)!.filter(Boolean).map(Number)
  let operation
  if (args[0] < 0 || (args[0] < 0 && args[1] < 0)) {
    operation = expressionStr.match(rgxOperationCalculator)![1]
  } else if (args[1] < 0) {
    operation = expressionStr.match(rgxOperationCalculator)![0]
  } else {
    operation = expressionStr.match(rgxOperationCalculator)![0]
  }

  if (operation === null) return

  console.log(args, operation)

  return operations[operation as keyof typeof operations](args[0], args[1])
}
