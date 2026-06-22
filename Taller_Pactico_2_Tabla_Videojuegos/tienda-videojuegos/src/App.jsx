import TablaVideojuegos from "./components/TablaVideojuegos";
import { data } from "./videojuegos";
function App() {
  return (
    <div>
      <h1>Videojuegos</h1>
      <TablaVideojuegos videojuegos={data} />
    </div>
  );
}

export default App;