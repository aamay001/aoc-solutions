import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { Helmet } from 'react-helmet';

import Home from './home';
import Footer from './components/footer';
import { SolutionForDay } from './components/day-solution-resolver';
import NotFound from './components/not-found';
import { getHomeMetaTags, getDayMetaTags } from './helpers/meta-tag';
import { scrollToTop } from './helpers/scroll-top';

import './App.css'

function App() {
  const location = useLocation();
  const [metaTags, setMetaTags] = useState<React.ReactNode[]>(getHomeMetaTags());

  const dayForRoute = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

  useEffect(() => {
    const day = parseInt(dayForRoute as string, 10);

    if (!isNaN(day)) {
      setMetaTags(getDayMetaTags(day));
    } else {
      setMetaTags(getHomeMetaTags());
    }

    scrollToTop();

  }, [dayForRoute]);

  return (
    <>
      <Helmet>
        {metaTags}
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/day/:id" element={<SolutionForDay />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
