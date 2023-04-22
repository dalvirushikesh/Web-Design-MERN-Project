import React, { Component } from "react";
import MyNavLink from "../../pages/MyNavLink";
import "./Navbar.scss";
//import Logo from "../../img/images/Logo.gif";
//import Logo from "../../img/images/travel.gif";
import Logo from "../../img/images/dog.webp";
class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: localStorage.getItem("user")
      
      
    };}
  //set state of Navbar
  state = { user: null };

 

  /** put user into state
   *
   */
  getUser = () => {
    this.setState({ user: localStorage.getItem("user") });
    console.log("Navbar", this.state.user);
  };

  /** initialize state
   *
   */
  componentDidMount() {
    this.getUser();
  }

  render() {
    const isAdmin = (this.state.user === "Andrea.se@northeastern.edu")  ? true : false ;
    const { user } = this.state;
    console.log(user);
    console.log("isAdmin", isAdmin);
    return (
      //List all pages in Nav menu
      <nav className="NavbarItems">
        <MyNavLink to="/home" className="nav-item1">
          <img src={Logo} alt="Loading" className="logo" />
          <h1 className="navbar-logo">Travel Globe</h1>
        </MyNavLink>

        <ul className="nav-menu active">
          <li>
            <MyNavLink to="/home" className="nav-item">
              Home
            </MyNavLink>
          </li>
          <li>
           {isAdmin? null : <MyNavLink to="/Search" className="nav-item">
              Search
            </MyNavLink>} 
          </li>
          <li>
          {isAdmin? null :
            <MyNavLink to="/dashboard" className="nav-item">
              Explore Places
            </MyNavLink>}
          </li>

          <li>
            <MyNavLink to="/viewblog" className="nav-item">
              View Blogs
            </MyNavLink>
          </li>
          {/*control the accessibility of view and create combo page*/}
          <li>
          {isAdmin? null :
            <MyNavLink
              to={user === null ? "/login" : "/newPost"}
              onClick={this.getUser}
              className="nav-item"
            >
              Add Experience
            </MyNavLink>}
          </li>

          <li>
            {user === null ? (
              <MyNavLink
                to={user === null ? "/login" : "/account"}
                onClick={this.getUser}
                className="nav-item"
              >
                My Account
              </MyNavLink>
            ) : (
              <MyNavLink
                to={user === null ? "/login" : "/account"}
                onClick={this.getUser}
                className="nav-item"
              >
                {user.toUpperCase()}
              </MyNavLink>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
