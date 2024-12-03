import { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router';
import { Helmet } from 'react-helmet';

import Home from './home';
import Footer from './components/footer';
import { SolutionForDay } from './routes';
import NotFound from './components/not-found';
import { getHomeMetaTags, getDayMetaTags } from './helpers/meta-tag';
import { scrollToTop } from './helpers/scroll-top';

import './App.css'

function App() {
  const params = useParams();
  const [metaTags, setMetaTags] = useState<React.ReactNode[]>(getHomeMetaTags());

  useEffect(() => {
    const day = parseInt(params?.id as string, 10);

    if (!isNaN(day)) {
      setMetaTags(getDayMetaTags(day));
    } else {
      setMetaTags(getHomeMetaTags());
    }

    scrollToTop();

  }, [params?.id]);

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
