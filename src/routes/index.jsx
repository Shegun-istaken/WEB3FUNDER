import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/homePage";

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="*" element={
    <div>
        <h1>This path does not exist</h1>
    </div>
    } />
  </Routes>
);

export default AppRouter;
