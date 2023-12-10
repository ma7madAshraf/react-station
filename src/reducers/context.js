import { createContext, useReducer } from "react";
import reducer from "./reducer";
import { useAuth0 } from "@auth0/auth0-react";

const initialState = {
  userName: "",
  isLoading: false,
  sidebar: false,
};
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useAuth0();
  const openSidebar = () => {
    dispatch({ type: "OPEN_SIDEBAR" });
  };
  const closeSidebar = () => {
    dispatch({ type: "CLOSE_SIDEBAR" });
  };

  const setScoreInLocalStorage = (game, gameScore, theWins, theLoses) => {
    if (user) {
      const keyName = `${user.email || user.name}-${game}`;
      const isExist = localStorage.getItem(keyName);
      if (isExist) {
        const oldScore = JSON.parse(isExist);
        const newScore = {
          ...oldScore,
          played: oldScore.played + 1,
          score: oldScore.score > gameScore ? oldScore.score : gameScore,
          wins: oldScore.wins + theWins,
          loses: oldScore.loses + theLoses,
        };
        localStorage.setItem(keyName, JSON.stringify(newScore));
      } else {
        const theScore = {
          played: 1,
          score: gameScore,
          wins: theWins,
          loses: theLoses,
        };
        localStorage.setItem(keyName, JSON.stringify(theScore));
      }
    }
  };

  const getScoresFromLocalStorage = (game) => {
    if (user) {
      const data = localStorage.getItem(`${user.email || user.name}-${game}`);
      if (data) {
        const theScore = JSON.parse(data);
        return theScore;
      } else {
        return null;
      }
    }
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        setScoreInLocalStorage,
        getScoresFromLocalStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
