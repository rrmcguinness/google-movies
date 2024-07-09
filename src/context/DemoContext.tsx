import { createContext } from "react";
import { DemoModel } from "../model/model";

const DemoContext = createContext<DemoModel>(null!)

export default DemoContext
