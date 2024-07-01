import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from '@material-tailwind/react'
import Layout from './components/Layout/Layout'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import NotFound from './pages/Not Found/NotFound'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home/Home'
import Protectedroute from './components/Protectedroute/Protectedroute'
import UserProvider from './components/Context/User.context'
import ProductDetails from './components/ProductDetails/ProductDetails'
import ProudctCart from './pages/ProudctCart/ProudctCart'
import WishList from './pages/WishList/WishList'
import CartProvider from './components/Context/Cart.context'
import Checkout from './pages/Checkout/Checkout'
import WishListProvider from './components/Context/WishList.context'
import Orders from './pages/Orders/Orders'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Proudcts from './pages/Proudcts/Proudcts'
import Categories from './pages/Categories/Categories'




function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Protectedroute>
        <Layout />
      </Protectedroute>,
      children: [
        {
          index: true, element: <Home />

        },
        {
          path: "/productDetails/:id", element: <ProductDetails />

        },
        {
          path: "/chekout", element: <Checkout />

        },
        {
          path: "/products", element: <Proudcts/>

        },
        {
          path: "/categories", element: <Categories/>

        },
        {
          path: "/cart", element: <ProudctCart />

        },
        {
          path: "/allorders", element: <Orders />

        },
        {
          path: "/WishList", element: <WishList />

        },

        {
          path: "*", element: <NotFound />
        }
      ]
    },
    {
      path: "/auth", element: <Layout />
      , children: [
        {
          path: "Login", element: <Login />
        },
        {
          path: "Signup", element: <Signup />
        },

      ]
    }



  ])
  const myClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserProvider>
          <WishListProvider>
            <CartProvider>
              <RouterProvider router={routes}></RouterProvider>
              <Toaster />
            </CartProvider>
          </WishListProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
