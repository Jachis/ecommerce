import './App.css';
import { Home, Login, ProductDetail, Purchases } from './pages';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { LoadingScreen, NavBar, ProtectedRoutes } from './components';
import { useSelector } from 'react-redux';


function App() {

  const isLoading = useSelector(state => state.isLoading);

  return (
    <HashRouter>
      <NavBar />
      <Container>
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products/:id" element={<ProductDetail />} />
          <Route path="/Login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/Purchases" element={<Purchases />} />
          </Route>
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
