import { ReactNode } from "react"


interface StatusProps<T extends string> {
  status: T,
  contentByStatus: Record<T, ReactNode>
}

function Status<T extends string>(props: StatusProps<T>) {
  return props.contentByStatus[props.status]
}

export default Status