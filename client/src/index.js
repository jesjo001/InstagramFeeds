import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Feeds from "./pages/Feeds";
// import Upload from "./pages/Upload";
// import Upload from "./components/upload/Upload";
import Upload from "./pages/Upload";
import NotFound from "./pages/404";
import ImageClassifier from "./pages/classifier/ImageClasifierer";

import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import { store } from './store/_helpers';
import { history } from "./store/_helpers";
import { loggedInCheck } from "./common/loginCheck";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Routes>
          <Route path="/" element={<App />} >
            {loggedInCheck() ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/feeds" element={<Feeds />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/image" element={<ImageClassifier />} />
              </>
            ) : (
              <>
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Login />} />
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
