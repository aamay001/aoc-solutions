import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { Helmet } from 'react-helmet';

import Home from './home';
import Footer from './components/footer';
import { 
  Day1,
  Day2, 
} from './routes';

import './App.css'
import NotFound from './components/not-found';
import { getHomeMetaTags, getMetaTagsForDay } from './helpers/meta-tag';
import { scrollToTop } from './helpers/scroll-top';

function App() {
  const location = useLocation();
  const [metaTags, setMetaTags] = useState<React.ReactNode[]>(getHomeMetaTags());

  useEffect(() => {
    const day = parseInt(location.pathname.substring(location.pathname.length - 1), 10);

    if (!isNaN(day)) {
      setMetaTags(getMetaTagsForDay(day));
    } else {
      setMetaTags(getHomeMetaTags());
    }
    scrollToTop();

  }, [location]);

  return (
    <>
      <Helmet>
        {metaTags}
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/day-1" element={<Day1 />} />
        <Route path="/day-2" element={<Day2 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
