import Header from "@/components/header"
import { PropsWithChildren } from "react"

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-y-16">
      <Header />
      {children}
    </div>
  )
}

export default layout
