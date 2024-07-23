import RootLayout from "@/layout/RootLayout";
import AroundYou from "@/pages/AroundYou";
import Discover from "@/pages/Discover";
import TopChartsPage from "@/pages/TopChartsPage";
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<Discover />} />
      <Route path="/around-you" element={<AroundYou />} />
      <Route path="/top-charts" element={<TopChartsPage />} />
    </Route>
  )
);
const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
