import "./App.css";
import Gugudan from "./component/Gugudan";
import WordRelay from "./component/WordRelay";
import NumberBaseball from "./component/NumberBaseball";
import ResponseCheck from "./component/ResponseCheck";
import RSPHook from "./component/RSPHook";
import Lotto from "./component/Lotto";
import TicTacToe from "./component/TicTacToe";
import FineMine from "./component/finemine/MineSearch";

const app = () => {
  return (
    <div className="App">
      <FineMine />
      <TicTacToe />
      <Lotto />
      <RSPHook />
      <ResponseCheck />
      <NumberBaseball />
      <WordRelay />
      <Gugudan />
    </div>
  );
};

export default app;
