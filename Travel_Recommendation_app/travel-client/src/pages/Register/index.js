import React, { Component } from "react";
import { addNewUser, getUser } from "../../services/userService";
import MyNavLink from "../MyNavLink";
import "./register.scss";
import Background from "../../components/Background/Background";
import MapContainer from "../../components/MapContainer/MapContainer";
import {
  Button,
  ControlLabel,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
class Register extends Component {
  //set state of Register
  state = { isSame: false, existed: false, confirm: false };
  /** add user to database
   *
   * @param event
   * @returns {Promise<void>}
   */
  addUser = async (event) => {
    event.preventDefault();
    const { username, password, mail } = this;
    const { data } = await getUser(mail.value);
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    // Regex pattern for password - at least 8 characters including uppercase, lowercase, and numeric characters
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (data.length !== 0) {
      //check whether cur user is existed
      this.setState({ existed: true });
      return;
    }
    if (!this.state.isSame) return;
    // // Validate email using regex
    if (!mail.value.match(emailPattern)) {
      this.setState({ emailError: "Please enter a valid email address." });
        document.getElementById("emailError").style.display = "block";
      return;
    }
    else{
      document.getElementById("emailError").style.display = "none";
    }
    if (!password.value.match(passwordPattern)) {
      this.setState({ passwordError: "Please enter a valid email address." });
        document.getElementById("passwordError").style.display = "block";
      return;
    }
    else{
      document.getElementById("passwordError").style.display = "none";
    }
    await addNewUser({
      Username: username.value,
      Mail: mail.value,
      Password: password.value,
      isAdmin: (username.value === "Admin") ? true : false,
    });
    this.props.addUser();
  };
  /** confirm two passwords are same or not
   *
   */
  confirmPassword = () => {
    this.setState({ confirm: true });
    const { password, re_password } = this;
    if (password.value !== re_password.value) {
      this.setState({ isSame: false });
    } else {
      this.setState({ isSame: true });
    }
  };
  render() {
    return (
      <div>
        <Background className="bgimg" />
        <br />
        <div className="divLogin">
          <Row className="Register">
            <form onSubmit={this.addUser}>
              <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <FormControl
                  type="text"
                  name="username"
                  placeholder="Enter your user name"
                  inputRef={(c) => (this.username = c)}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  inputRef={(c) => (this.mail = c)}
                />
              </FormGroup>
              <span style={{"display": "none", color:"red"}} id="emailError">Please enter a valid email address.</span>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  inputRef={(c) => (this.password = c)}
                />
              </FormGroup>
              <span style={{"display": "none", color:"red"}} id="passwordError">Please Enter a valid Password.</span>
              <FormGroup>
                <ControlLabel>Confirm Password</ControlLabel>
                <FormControl
                  type="password"
                  name="password"
                  placeholder="Please confirm password here"
                  inputRef={(c) => (this.re_password = c)}
                  onChange={this.confirmPassword}
                />
                {/*control the visibility and content of warning line depending on user's input*/}
                <span
                  style={{
                    display:
                      (!this.state.isSame && this.state.confirm) ||
                      this.state.existed
                        ? "block"
                        : "none",
                  }}
                >
                  {this.state.existed ? (
                    <MyNavLink to="/login">
                      User already existed,please Login
                    </MyNavLink>
                  ) : (
                    "Please enter same password!"
                  )}
                </span>
              </FormGroup>
              <p></p>
              <Button type="submit" bsStyle="primary">
                Register
              </Button>
            </form>
          </Row>
        </div>
        <MapContainer />
      </div>
    );
  }
}
export default Register;