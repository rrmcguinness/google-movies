import { createContext } from "react";
import { ConfigContext } from "../model/config";

const ConfigurationContext = createContext<ConfigContext>(null!)

export default ConfigurationContext