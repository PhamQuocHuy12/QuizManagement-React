import "./style.css";
import { Routes, Route } from "react-router-dom";
import AllQuestion from "./frontend/screens/AllQuestion";
import AddQuestion from "./frontend/screens/AddQuestion";
import EditQuestion from "./frontend/screens/EditQuestion";
import SideBar from "./frontend/components/SideBar";

function App() {
  return (
    <div>
      <main>
        <SideBar />
        <Routes>
          <Route path={"/"} key={"all"} element={<AllQuestion />}></Route>
          <Route path={"/add"} key={"add"} element={<AddQuestion />}></Route>
          <Route
            path={"/edit/:id"}
            key={"edit"}
            element={<EditQuestion />}
          ></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
