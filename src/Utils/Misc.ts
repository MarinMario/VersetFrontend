import he from "he"
import { RequestGetDexDefinition } from "./Requests"


export function replaceAll(str: string, str1: string, str2: string) {
  let temp = str
  while (temp.includes(str1)) {
    temp = temp.replace(str1, str2)
  }

  return temp
}

export function getDefinition(type: "definitie" | "definitie-sinonime" | "definitie-antonime", input: string, runWithData: (defs: string[]) => void) {
  const savedDefs = localStorage.getItem(type)
  let parsedDefs: Record<string, string[]> = {}
  if (savedDefs !== null) {
    parsedDefs = JSON.parse(savedDefs)
    if (parsedDefs.hasOwnProperty(input)) {
      runWithData(parsedDefs[input])
      return
    }
  }

  RequestGetDexDefinition(type, input).then(response => {
    if (response.ok) {
      response.json().then(data => {
        const defs = data["definitions"] as Record<string, string>[]
        const strDefs = defs.map(def => def["htmlRep"])
        const newDefs = { ...parsedDefs, [input]: strDefs }
        localStorage.setItem(type, JSON.stringify(newDefs))

        runWithData(strDefs)
      })
    }
  })
}