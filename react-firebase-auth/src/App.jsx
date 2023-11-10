import React from "react";
import MenuHeader from "./components/MenuHeader";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import UserInfo from "./components/UserInfo";

const App = () => {
  const style = {
    whiteSpace: "nowrap",
  };
  const icons = {
    fontSize: "2rem",
  };

  return (
    <Router>
      <MenuHeader />
      <div className="container text-center">
        <h2>ケアメニュー</h2>
        <div className="row">
          <div
            className="col border border-1 border-dark rounded rounded-3 p-3 m-1"
            style={style}
          >
            <Link to="./userInfo">
              <h4>利用者情報</h4>
              <br />
              <i className="bi bi-person" style={icons}></i>
            </Link>
          </div>
          <div
            className="col border border-1 border-dark rounded rounded-3 p-3 m-1"
            style={style}
          >
            <Link to="/contact">
              <h4>連絡帳</h4>
              <br />
              <i className="bi bi-journal" style={icons}></i>
            </Link>
          </div>

          <div
            className="col border border-1 border-dark rounded rounded-3 p-3 m-1"
            style={style}
          >
            <Link to="/mail">
              <h4>メール</h4>
              <br />
              <i className="bi bi-envelope" style={icons}></i>
            </Link>
          </div>
          <div
            className="col border border-1 border-dark rounded rounded-3 p-3 m-1"
            style={style}
          >
            <Link to="/call">
              <h4>電話</h4>
              <br />
              <i className="bi bi-telephone" style={icons}></i>
            </Link>
          </div>

          <div
            className="col border border-1 border-dark rounded rounded-3 p-3 m-1"
            style={style}
          >
            <Link to="/timer">
              <h4>タイマー</h4>
              <br />
              <i className="bi bi-alarm" style={icons}></i>
            </Link>
          </div>
          <div
            className="col border border-1 border-dark rounded rounded-3 p-3 m-1"
            style={style}
          >
            <Link to="/find">
              <h4>探す</h4>
              <br />
              <i className="bi bi-binoculars" style={icons}></i>
            </Link>
          </div>
        </div>
        <Routes>
          <Route path="/userInfo" element={<UserInfo />} />
          <Route path="/contact" element={null} />
          <Route path="/mail" element={null} />
          <Route path="/call" element={null} />
          <Route path="/timer" element={null} />
          <Route path="/find" element={null} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
