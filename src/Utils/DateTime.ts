
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

export function formatIsoDate(date: string) {
  const d = new Date(date)
  const formatted = d.getDate() + " " + getMonthRomanian(d) + " " + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes()

  return formatted
}