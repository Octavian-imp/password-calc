type PasswordConfig = {
  lowerLetters: boolean
  upperLetters: boolean
  decimal: boolean
  specialSymbols: boolean
  unique: boolean
}


export const initialFlagsConfigPassword: PasswordConfig = {
  decimal: false,
  lowerLetters: false,
  specialSymbols: false,
  unique: false,
  upperLetters: false,
}

export type ConfigPasswordKeys = Exclude<keyof typeof initialFlagsConfigPassword, "unique">

export default function genPassword(
  length = 8,
  config: PasswordConfig
) {
  const letters: string = "abcdefghijklmnopqrstuvwxyz"
  const configDict: Record<ConfigPasswordKeys, string> = {
    lowerLetters: letters,
    upperLetters: letters.toUpperCase(),
    decimal: "0123456789",
    specialSymbols: "%*)?@#$~",
  }
  let dictionary: string = ""
  // формируем словарь
  for (const key in configDict) {
    if (config[key as keyof PasswordConfig]) {
      dictionary += configDict[key as ConfigPasswordKeys]
    }
  }

  //генерируем пароль
  function _genPassword() {
    let res = ""
    for (let i = 0; i < length; i++) {
      res += dictionary.charAt(Math.floor(Math.random() * dictionary.length))
    }
    if (config.unique && res.length !== new Set(res.split("")).size) {
      return _genPassword()
    }
    return res
  }

  return _genPassword()
}
