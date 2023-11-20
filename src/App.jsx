/*import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import Blogs from './Router/Blogs';
import Contact from './Router/Contact';
import Home from './Router/Home';


 function App() {
  return (
    <div >
      <ul className=" container nav justify-content-center bg-black p-2">
          <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link text-white" to="/Blogs">Blogs</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link text-white " to="/Contact">Contact</Link>
          </li>
      </ul>

      <div>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/Blogs' element ={<Blogs />} />
          <Route path='/Contact' element ={<Contact />} />
        </Routes>
      </div>
    </div>
  )
}
export default App ;
*/

import React from 'react'
import QuizApp from './Quiz/Quiz'


export default function App() {
  return (
    <div>
      <QuizApp />
    </div>
  )
}
