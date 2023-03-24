import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../Layout';
import Home from '../screens/Home';
import Detalhes from '../screens/Details';
import Lists from '../screens/Lists';
import ListDetails from '../screens/ListDetails';
import PageNotFound from '../screens/PageNotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/star-wars" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":/pages/:pageNumber" element={<Home />} />
        <Route path=":category" element={<Home />} />
        <Route path=":category/pages/:pageNumber" element={<Home />} />
        <Route path=":category/search/:query/pages/:pageNumber" element={<Home />} />
        <Route path=":category/:id" element={<Detalhes />} />
        <Route path="lists" element={<Lists />} />
        <Route path="lists/:id" element={<ListDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}
