

export function replaceAll(str: string, str1: string, str2: string) {
  let temp = str
  while (temp.includes(str1)) {
    temp = temp.replace(str1, str2)
  }

  return temp
}