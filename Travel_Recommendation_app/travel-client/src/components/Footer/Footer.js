import React, { Component } from "react";
import "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <section className="section footer">
        {/*There are three columns for contents in footer*/}
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              {/*First Column*/}
              <h6>TRAVEL GLOBE</h6>
              <p className="text">
                Penguin Press <br />
                Travel Globe
                <br />
              </p>
            </div>
            {/*Second Column*/}
            <div className="col-md-4">
              <h6>Contact Info</h6>
              <div>
                <p className=" mb-1">
                  125 Park Drive , Boston, MA 02215
                </p>
              </div>
              <div>
                <p className=" mb-1">+1 857 370 8993</p>
              </div>
              <div>
                <p className=" mb-1">admin@travelglobe.com</p>
              </div>
            </div>
            {/*Third Column*/}
            <div className="col-md-4">
              <h6>Customer Service Hours</h6>
              <div>
                <p className=" mb-1">Monday - Thursday</p>
              </div>
              <div>
                <p className=" mb-1">10:00AM - 11:00PM</p>
              </div>
              <div>
                <p className=" mb-1">Friday - Sunday</p>
              </div>
              <div>
                <p className=" mb-1">12:00AM - 03:00AM</p>
              </div>
            </div>
            <hr />
            <p className="copy">© 2022 Travel Globe. All rights reserved.</p>
          </div>
        </div>
      </section>
    );
  }
}
export default Footer;
