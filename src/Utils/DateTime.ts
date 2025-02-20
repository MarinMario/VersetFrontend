
export function getMonthRomanian(date: Date) {
  const month = date.getMonth()
  switch (month) {
    case 0: return "Ianuarie"
    case 1: return "Februarie"
    case 2: return "Martie"
    case 3: return "Aprilie"
    case 4: return "Mai"
    case 5: return "Iunie"
    case 6: return "Iulie"
    case 7: return "August"
    case 8: return "Septembrie"
    case 9: return "Octombrie"
    case 10: return "Noiembrie"
    case 11: return "Decembrie"
  }

  return "Invalid"
}

export function compareIsoDates(date1: string, date2: string) {
  const d1 = new Date(date1 + "Z").getTime()
  const d2 = new Date(date2 + "Z").getTime()

  if (d1 === d2)
    return 0

  if (d1 > d2)
    return 1

  return -1
}

function formatMinutes(x: number) {
  if (x < 10)
    return "0" + x.toString()

  return x.toString()
}

export function formatIsoDate(date: string) {
  const d = new Date(date)

  const formatted = d.getDate() + " " + getMonthRomanian(d) + " " + d.getFullYear() + " " + d.getHours() + ":" + formatMinutes(d.getMinutes())

  return formatted
}

export function isoToText(date: string) {
  const d = new Date(date)
  const dateUnix = d.getTime()
  const nowUnix = new Date().getTime()
  const timeDiff = nowUnix - dateUnix

  if (timeDiff < 60000) // 1 minute
    return "chiar acum"

  if (timeDiff < 86400000) { // 24 hours
    const hours = Math.floor(timeDiff / 3600000)
    const minutes = Math.floor(timeDiff / 60000)
    if (hours === 0)
      return "acum " + minutes + (minutes === 1 ? " minut" : " minute")
    if (hours === 1)
      return "acum o ora"
    return "acum " + hours + " ore"
  }

  if (timeDiff < 172800000) {
    return "ieri la " + d.getHours() + formatMinutes(d.getMinutes())
  }

  return d.getDate() + " " + getMonthRomanian(d) + " " + d.getFullYear() + " " + d.getHours() + ":" + formatMinutes(d.getMinutes())

}