import { createContext, ReactNode, useContext, useState } from "react";
import { usePlanterList } from "../websocket/usePlanterList";

interface PlanterContextInterface {
  planters: string[];
  selectedPlanter: string | null;
  setPlanter: (planterID: string) => void;
}

const defaultValue = {
  planters: [],
  selectedPlanter: null,
  setPlanter: (planterID: string) => {},
};

const PlanterContext = createContext<PlanterContextInterface>(defaultValue);
PlanterContext.displayName = "PlanterContext";

type Props = {
  children: ReactNode;
};

export const PlanterContextProvider = (props: Props) => {
  const planterList = usePlanterList();

  const setPlanter = (planterID: string) => {
    setData((prevState) => {
      return {
        ...prevState,
        selectedPlanter: planterID,
      };
    });
  };

  const [data, setData] = useState<PlanterContextInterface>({
    planters: [],
    selectedPlanter: null,
    setPlanter: setPlanter,
  });

  return (
    <PlanterContext.Provider value={{ ...data, planters: planterList }}>
      {props.children}
    </PlanterContext.Provider>
  );
};

export const usePlantIDList = () => {
  const context = useContext(PlanterContext);
  if (context === undefined) {
    throw new Error(
      "usePlantIDList must be used within a PlanterContext Provider"
    );
  }
  return context;
};
