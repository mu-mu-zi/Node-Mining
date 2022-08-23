import React, {useEffect} from 'react'
import { useLocation, useRoutes } from 'react-router-dom';
import { RouteObject } from "react-router/lib/router";
import Home from 'pages/Home/Home';
import Digital from 'pages/Digital/Digital';
import Metaverse from 'pages/Metaverse/Metaverse';
import Nodes from 'pages/Nodes';
import BuyNode from 'pages/Nodes/BuyNodes';
import MyNodes from 'pages/MyNodes';
import Aboutus from '../pages/Aboutus/Aboutus';
import NodeRevenue from 'pages/MyNodes/NodeRevenue'
import FundRecords from 'pages/MyNodes/FundRecords'
import Withdraw from 'pages/MyNodes/Withdraw';
import NodeRecord from 'pages/MyNodes/NodeRecord';
export default function Routers() {

  const history = useLocation()
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0)
  },[history.pathname])
  


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
      element: <Withdraw />,
      path: "/mynodes/withdrawingcoins",
    },
    {
      element: <NodeRevenue />,
      path: "/mynodes/noderevenue",
    },
    {
      element: <NodeRecord />,
      path: "/mynodes/noderecord",
    },
    {
      element: <FundRecords />,
      path: "/mynodes/fundrecords",
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