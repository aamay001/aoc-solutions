import { BrowserRouter, Routes, Route } from 'react-router';

import Home from './home';
import Footer from './footer';
import { 
  Day1,
  Day2, 
} from './routes';

import './App.css'
import NotFound from './components/not-found';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/day-1" element={<Day1 />} />
          <Route path="/day-2" element={<Day2 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App
