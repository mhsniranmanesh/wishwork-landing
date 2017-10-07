//
import './../vendor/bootstrap/css/bootstrap.min.css';
import './../vendor/bootstrap-rtl/css/bootstrap-rtl.min.css';
import './../vendor/font-awesome/css/font-awesome.min.css';
import './../css/fontiran.css';
import './../css/wish.css';
import './../js/wish.js';
import './../img/nav-logo.png';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
// import 'font-awesome/css/font-awesome.min.css';
// import './../css/fontiran.css';
// import './../css/wish.css';
// import './../js/wish.js';

import React from 'react';
import ReactDOM from 'react-dom';

var NewComponent = React.createClass({
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src="img/nav-logo.png" height={30} className="d-inline-block align-top" alt="nav-logo" />
              Wish-Work
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav navbar-right">
                <li className="nav-item">
                  <a className="nav-link" href="#">کاربر سایت هستید؟ وارد شوید.</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <section className="signin">
          <div className="container con">
            <div className="con-title">
              <h4>نام کاربری و رمز عبورتان را انتخاب کنید.</h4>
            </div>
            <div className="con-body">
              <form id="signup-form" className="signup-form" action="javascript:gotonext();">
                <div id="usn" className="form-group">
                  {/*   class="form-group has-danger"*/}
                  {/* <label for="signupPassInput" class="col-form-label">نام کاربری</label> */}
                  <input type="username" className="form-control form-control-danger" id="signupUsernameInput" placeholder="نام کاربری" />
                  <div id="form-control-feedback-username" className="form-control-feedback" style={{display: 'none'}}>نام کاربری باید شامل حروف و اعداد انگلیسی باشد!</div>
                </div>
                <div id="pas" className="form-group ">
                  {/* <label for="signupPassInput" class="col-form-label">رمز عبور</label> */}
                  <input type="password" className="form-control form-control-danger" id="signupPassInput" placeholder="رمز عبور" />
                  <div id="form-control-feedback-pass" className="form-control-feedback" style={{display: 'none'}}><span>رمز عبور باید شامل ترکیبی از حداقل 8 حرف و عدد انگلیسی باشد!</span></div>
                </div>
                <label className="form-check-label">
                  <input id="checkBox" className="form-check-input" type="checkbox" />
                  <span>من تمامی <a href="#">قوانین Wish-Work</a> را مطالعه کرده ام و با آن ها موافق هستم.</span>
                </label>
                <span id="error-msg" className="error-msg" style={{display: 'none'}}>
                  <i className="fa fa-times" aria-hidden="true" />
                  انتخاب نام کاربری و رمز عبور مناسب و همچنین تایید قوانین الزامی است!
                </span>
                <button id="submit-signup-btn" type="submit" className="btn btn-primary btn-rec">ثبت نام</button>
              </form>
            </div>
          </div>
        </section>
        <footer className="main-footer">
          Wish-Work
        </footer>
      </div>
    );
  }
});
module.exports = NewComponent;
