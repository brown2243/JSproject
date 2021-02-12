import "./App.css";
import Gugudan from "./component/Gugudan";
import WordRelay from "./component/WordRelay";
import NumberBaseball from "./component/NumberBaseball";
import ResponseCheck from "./component/ResponseCheck";

const app = () => {
  return (
    <div className="App">
      <Gugudan />
      <WordRelay />
      <NumberBaseball />
      <ResponseCheck />
    </div>
  );
};

export default app;
