import React, { Component } from "react";
import imagebg from "../../img/images/Miami.jpg";

class Background extends Component {
  render() {
    return (
      <div
        id="carouselExampleCaptions"
        className="carousel slide1"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={imagebg} className=" w-100" alt="..." />
          </div>
        </div>
      </div>
    );
  }
}

export default Background;
