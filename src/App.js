import { lazy, Suspense } from "react";
import { Route,Routes,BrowserRouter } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

const Home = lazy(()=>import('./pages/Home'))
const Login = lazy(()=>import('./pages/Login'))
const Edit = lazy(()=>import('./pages/Edit'))
const Add = lazy(()=>import('./pages/Add'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>    
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/add" element={<Add />} />
          </Route>
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
