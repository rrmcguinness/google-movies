import { useState } from "react"
import { Outlet } from "react-router-dom"
import DemoContext from "../context/DemoContext"
import { DemoModel } from "../model/model"

const Demo = () => {
  const [getDemoModel,] = useState<DemoModel>({default_language: "EN"} as DemoModel)

  return(
    <DemoContext.Provider value={getDemoModel}>
      <Outlet />
    </DemoContext.Provider>
  )

}

export default Demo