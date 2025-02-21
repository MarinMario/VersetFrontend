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
    } else {
      runWithData(["nu s-au putut incarca"])
    }
  })
}

//finds rhymes based on arbitrary number of identical letters at the end
function find_rhymes(word_list: string[], word: string) {
  let rhymes: Record<number, string[]> = {}
  word_list.forEach(e => {
      let level = 0;
      let found_word = false
      while (level + 1 < word.length && !found_word) {
          if (e.slice(-word.length + level) == word.slice(-word.length + level)) {
              let exists = false
              const rhymesKeys = Object.keys(rhymes)
              for (let i = 0; i < rhymesKeys.length; i++) {
                  if (parseInt(rhymesKeys[i]) === word.length - level) {
                      exists = true
                      rhymes[i] = [...rhymes[i], e]
                      found_word = true
                  }
              }
              if (!exists) {
                  rhymes[word.length - level] = [e]
              }
          }
          level += 1
      }
  })

  return rhymes
}

function find_ending_words(word_list: string[], end_letters: string) {
  if (end_letters == "")
    return []

  let end_list: string[] = []
  word_list.forEach(element => {
    if (element.endsWith(end_letters)) {
      end_list.push(element)
    }
  });

  return end_list.sort((a, b) => a.length - b.length)
}

//finds rhymes based on last syllable
export function findRhymingWords(word_list: string[], word: string) {
  const rhyme_list: string[] = []
  const word_s = separate_syllables(word)
  word_list.forEach(element => {
    const s = separate_syllables(element)
    if (s[s.length - 1] === word_s[word_s.length - 1]) {
      rhyme_list.push(element)
    }
  });

  return rhyme_list
}


function separate_syllables(word: string) {
  let s = word.split('')

  //rule 1: when a consoana is between 2 vocale, it gets in the next syllable
  for (let i = s.length - 1; i >= 2; i--) {
    if (is_vowel(s[i]) && is_consonant(s[i - 1]) && is_vowel(s[i - 2])) {
      s.splice(i - 1, 0, "-")
    }
    if (s.length >= 3 && "ie".includes(s[i]) && s[i - 1] == "h" && "gc".includes(s[i - 2]) && is_vowel(s[i - 3])) {
      s.splice(i - 2, 0, "-")
    }
  }

  //rule 2: when 2 consoane ar between 2 vocals, the first consoana is in precedent syllable while the second consoana in the next syllable
  for (let i = s.length - 1; i >= 3; i--) {
    if (is_vowel(s[i]) && is_consonant(s[i - 1]) && is_consonant(s[i - 2]) && is_vowel(s[i - 3])) {
      if ("bcdfghptv".includes(s[i - 2]) && "lr".includes(s[i - 1])) {
        s.splice(i - 2, 0, "-")
      } else {
        s.splice(i - 1, 0, "-")
      }
    }
  }
  //rule 3: when 2 ore more consoane are between 2 vocals, first consoana goes in the precedent syllable and the rest consoane in the next syllable
  for (let i = s.length - 1; i >= 3; i--) {
    if (is_vowel(s[i]) && is_consonant(s[i - 1]) && is_consonant(s[i - 2]) && is_consonant(s[i - 3])) {
      let first_vocal_index = i - 1
      while (first_vocal_index > 0 && is_consonant(s[first_vocal_index])) {
        first_vocal_index -= 1
      }
      let c_group = s[i - 3] + s[i - 2] + s[i - 1]
      if (is_vowel(s[first_vocal_index]))
        if (["lpt", "mpt", "nct", "ncț", "ncș", "ndv", "rct", "rtf", "stm"].includes(c_group)) {
          s.splice(first_vocal_index + 3, 0, "-")
        } else {
          s.splice(first_vocal_index + 2, 0, "-")
        }
    }
  }

  //rule 4: hiat
  for (let i = s.length - 1; i > 0; i--) {
    if (i >= 3 && is_vowel(s[i]) && is_vowel(s[i - 1]) && is_vowel(s[i - 2]) && is_vowel(s[i - 3])) {
      s.splice(i - 2, 0, "-")
    } else if (i >= 2 && is_vowel(s[i]) && is_vowel(s[i - 1]) && is_vowel(s[i - 2])) {
      s.splice(i - 1, 0, "-")
    } else if (i >= 1 && is_vowel(s[i]) && is_vowel(s[i - 1])) {
      s.splice(i, 0, "-")
    }
  }

  return s.join('').split('-')
}

function is_vowel(letter: string) {
  // letter = letter.toLowerCase()
  const vocals = "aeiouăîâ"
  for (let i = 0; i < vocals.length; i++) {
    if (letter == vocals[i]) return true;
  }

  return false;
}

function is_consonant(letter: string) {
  // letter = letter.toLowerCase()
  const consonants = "bcdfghjklmnpqrsștțvwxyz"
  for (let i = 0; i < consonants.length; i++) {
      if (letter == consonants[i]) return true;
  }

  return false;
}