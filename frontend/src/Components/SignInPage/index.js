import React from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const isLoggedIn = require("../../util/auth").isLoggedIn;
const setToken = require("../../util/auth").setToken;

const useStyles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
  heading: {
    margin: theme.spacing(2),
  },
  button: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  caption: {
    marginLeft: theme.spacing(1),
  },
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", usertype: "student" };
    this.doLogin = this.doLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  doLogin() {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
    const data = this.state;
    console.log(data);
    axios
      .post("http://127.0.0.1:5000/api/v1/login", data, headers)
      .then((res) => {
        console.log(res.data);
        setToken(res.data);
      });
  }
  render() {
    const { classes } = this.props;
    if(isLoggedIn()) return <Redirect to='/'  />
    return (
      <Container maxWidth="sm">
        <Typography className={classes.heading} variant="h4">
          Sign In
        </Typography>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={this.doLogin}
        >
          <Grid container>
            <Grid container item>
              <TextField
                required
                id="outlined-required"
                label="Username"
                name="username"
                value={this.username}
                variant="outlined"
                onChange={this.handleChange}
              />
            </Grid>

            <Grid container item>
              <TextField
                required
                id="standard-password-input"
                label="Enter Password"
                type="password"
                name="password"
                value={this.password}
                autoComplete="current-password"
                variant="outlined"
                onChange={this.handleChange}
              />
            </Grid>

            <Grid container item>
              <Typography className={classes.caption} variant="caption">
                Don't have an account?{" "}
                <Link href="/signup" color="primary">
                  Click here
                </Link>
              </Typography>
            </Grid>
            <Grid container item>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}
export default withStyles(useStyles)(SignIn);
