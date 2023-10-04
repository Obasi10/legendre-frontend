import React, {useEffect, useState} from "react";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import {AnimatePresence} from 'framer-motion';

// pages & components
import Home from './pages/Home';
import Log from './pages/Log';
import Login from './pages/Login';
import Logout from './pages/Logout';
import News from "./pages/news";
import Solution from './solution/solution1';
import Navbar from './components/Navbar';
import Ready from './pages/ready';
import Profile from './pages/profile';
import Selector from "./components/selector";
import Contact from './pages/contact';
import Calculation from "./calculator/calculator1";
import Available from "./components/available";
import Copyright from "./components/copyright";
import Submit from "./pages/submit";
import Reviewer from "./pages/reviewer";
import Error from "./components/error";
import Offcanvas from "./components/offcanvas";

const w=document.documentElement.clientWidth;
const h=document.documentElement.clientHeight;

const App =()=>{
  const [dim, setdim]=useState({w,h})
  const [count, setc]=useState(0)
  const [page, setp]=useState(0)
  const [error, setErrorr]= useState('')
  const [modal, setm]=useState({logpage: false, logOutpage: false, News: false, Ready: false, D: false, S:false, av: false, submit: false, alert: false, logSub: false, review: false, error: false,
                              logged: false, signed: false, offcanvas: false, saved: false, delete: false})
  const location =useLocation()
  const {user}=useAuthContext()
  const [search, sets]=useState(false)
  const [input, setInput]=useState("")
  const [nav, setnav]=useState("")
  const [n, setn]=useState(0)
  const [n1, setn1]=useState(undefined)
  const [lock, setl]=useState("")
  const [calc, setcalc]=useState(false)
  const [tab, settab]=useState(false)
  const [log, setlog]=useState(true)
  useEffect(()=>{
    function handle(){
    setdim({
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    })
    }
    window.addEventListener('resize', handle)
    
    return _=>{
      window.removeEventListener('resize', handle)
    }
  });

  useEffect(()=>{
    setTimeout(()=>{
      if (!user || !user.suscribe){
        setm({...modal, News: true})
      }
    },300000)
    setTimeout(()=>{
      if (!user || !user.review){
        setm({...modal, review: true})
      }
    },700000)
    setTimeout(()=>{
      if (!user && count>20){
        setm({...modal, logpage: true})
      }
    },9000000)
  },[])
  useEffect(()=>{
    if (error){
      setm({...modal, error: true})
    }
  },[error])

  return(
    <>
      <Offcanvas lock={lock} dim={dim} modal={modal} setm={setm}/>
      <Error modal= {modal} dim={dim} setm={setm} setErrorr={setErrorr} error={error} lock={lock}/>
      <Reviewer modal= {modal} dim={dim} count={count} setm={setm} setc={setc} setErrorr={setErrorr}/>
      <Submit dim={dim} modal={modal} count={count} setm={setm}/>
      <Available modal={modal} dim={dim}/>
      <Selector modal={modal} count={count} setc={setc} setm={setm} input={input} setnav={setnav} nav={nav}/>
      <Log modal={modal} count={count} setm={setm} setc={setc} setlog={setlog} setErrorr={setErrorr}/>
      <Logout modal={modal} dim={dim} setm={setm} setl={setl}/>
      <News modal={modal} count={count} setm={setm} dim={dim} setc={setc}/>
      <Ready modal={modal} setm={setm} dim={dim}/>
      <Navbar page={page} dim={dim} search={search} setm={setm} sets={sets} modal={modal} settab={settab}
      input={input} setInput={setInput} nav={nav} setnav={setnav} lock={lock}/>
        <AnimatePresence mode="wait" onExitComplete={()=>{
          setm({...modal, News: false, D: false, S:false, av:false, submit: false, alert: false, logSub: false, review:false, error:false})
        }
        }>
          <Routes location={location} key={location.key}>
            <Route 
              path="/"
              element={<Home dim={dim} setm={setm} modal={modal} count={count} setc={setc} setp={setp} setErrorr={setErrorr}
              setnav={setnav} setInput={setInput} setn={setn} setn1={setn1} setl={setl} lock={lock} setcalc={setcalc}/>}
            />
            <Route
              path="/solution"
              element={ (n || n===0)?
                <Solution dim={dim} setm={setm} count={count} setc={setc} setp={setp} n={n} setdim={setdim}
                setn={setn} setl={setl} tab={tab} settab={settab} setErrorr={setErrorr}/>: <Navigate to="/calculation"/>
              }
            />
            <Route
              path="/profile"
              element={(user && lock!="ss")?<Profile setp={setp} setl={setl} lock={lock} setm={setm} modal={modal} dim={dim} 
              setdim={setdim} setn={setn} n={n} setErrorr={setErrorr} />: <Navigate to="/"
              />}
            />
            <Route
              path="/contact"
              element={<Contact setp={setp} setl={setl} lock={lock} dim={dim} setdim={setdim} setErrorr={setErrorr}
               modal={modal} setm={setm}/>}
            />
            <Route
              path="/login"
              element={!user?<Login setp={setp} setnav={setnav} setl={setl} setErrorr={setErrorr}
               lock={lock} setm={setm} modal={modal} log={log} setlog={setlog}/>:<Navigate to="/"/>}
            />
            <Route 
              path="/calculation"
              element={<Calculation setp={setp} dim={dim} n={n} setn={setn} modal={modal} setm={setm}
                setcalc={setcalc} calc={calc} setn1={setn1} n1={n1} settab={settab} setdim={setdim} setErrorr={setErrorr}
              />}
            />
          </Routes>
          {(page===0 && lock!=="p") && (<footer className='mb-3 row col-12'>
            <Copyright dim={dim}/>
          </footer>)}
        </AnimatePresence>
    </>
  )
}

export default App;
