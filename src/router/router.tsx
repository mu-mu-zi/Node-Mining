import React from 'react'
import { useRoutes } from 'react-router-dom';
import { RouteObject } from "react-router/lib/router";
import Home from 'pages/Home/Home';
import Digital from 'pages/Digital/Digital';
import Metaverse from 'pages/Metaverse/Metaverse';
import Nodes from 'pages/Nodes';
import BuyNode from 'pages/Nodes/BuyNodes';
import MyNodes from 'pages/MyNodes';
import Aboutus from '../pages/Aboutus/Aboutus';

export default function Routers() {

  const routes: RouteObject[] = [
    {
      element: <Home />,
      path: "/",
    },
    {
      element: <Digital />,
      path: "/digital",
    },
    {
      element: <Metaverse />,
      path: "/metaverse",
    },
    {
      element: <Nodes />,
      path: "/nodes",
    },
    {
      path: "/nodes/buy",
      element: <BuyNode />
    },
    {
      element: <MyNodes />,
      path: "/mynodes",
    },
    {
      element: <Aboutus />,
      path: "/aboutus",
    },
  ]

  return (
    <>
      {useRoutes(routes)}
    </>
  )
}