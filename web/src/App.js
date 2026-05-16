import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";


import WithNav from "./components/WithNav";
import WithoutNav from "./components/WithoutNav";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

import "./App.css";
import AuthWrapper from "./AuthWrapper";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout';
import IssuesList from "./components/issues/ListIssues.js";
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;



function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthWrapper>
          <Layout>
            <Routes>


              <Route element={<WithoutNav />}>
                <Route path="/" element={<IssuesList />} />


              </Route>


            </Routes>
          </Layout>
        </AuthWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App;
