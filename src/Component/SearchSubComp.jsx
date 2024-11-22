import React from 'react'
import { SearchComp } from './SearchComp'
import { Subscribe } from './Subscribe'
import "../Styles/MainNavbar.css"


function SearchSubComp() {
  return (
    <div className="d-flex wrap-search" style={{gap:"25px",padding:"10px"}}>
    
    <SearchComp/>
    <Subscribe/>
    </div>
  )
}

export default React.memo(SearchSubComp)