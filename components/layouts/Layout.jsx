import React from 'react'
import Navbar from './Navbar'
import { node } from 'prop-types'

const propTypes = { children: node }

const Layout = ({ children ,room}) => (
    <>
      <Navbar/>
      {children }
    </>
)

Layout.propTypes = propTypes

export default Layout
