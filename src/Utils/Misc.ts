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
    } else {
      runWithData(["nu s-au putut incarca"])
    }
  })
}

//returns the number of identical characters at the end, but 0 if the words are identical
function identicalEnding(word1: string, word2: string) {
  for (let i = 1; i < word1.length + 2; i++) {
    if (word1[word1.length - i] === word2[word2.length - i])
      continue

    return i - 1
  }

  // if(word1.length === word2.length)
  //   return word1.length

  return 0
}

export function findRhymes(wordList: string[], word: string) {

  const rhymes: Record<number, string[]> = {}
  
  for (let i = 0; i < word.length; i++)
    Object.assign(rhymes, { [i + 1]: [] })

  for (let i = 0; i < wordList.length; i++) {
    const potential = wordList[i]
    const x = identicalEnding(potential, word)
    if (x !== 0)
      rhymes[x].push(potential)
  }

  return rhymes
}