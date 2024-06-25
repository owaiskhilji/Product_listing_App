import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import { BrowserRouter } from 'react-router-dzom'
import Admin from '../SaylaniTest/Admin'
import AdminTable from '../SaylaniTest/AdminTable';
import Customer from '../SaylaniTest/Customer';
import DetailPage from '../SaylaniTest/DetailPage';
import Pagenotfound from '../SaylaniTest/Pagenotfound'
function Router() {
    
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Customer/>}/>
        <Route path='/adminTable' element={<AdminTable/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/detailPage/:id' element={<DetailPage/>}/>
        <Route path='*' element={<Pagenotfound/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Router