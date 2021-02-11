import "./App.css";
import Gugudan from "./component/Gugudan";
import WordRelay from "./component/WordRelay";
import NumberBaseball from "./component/NumberBaseball";
const app = () => {
  return (
    <div className="App">
      <Gugudan />
      <WordRelay />
      <NumberBaseball />
    </div>
  );
};

export default app;
