import t from './common/localization'
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing(3)}px`,
  },
  logo: {
    margin: `${theme.spacing(2)}px 0 ${theme.spacing(1)}px`
  },
  buttons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  button: {
    flex: '1 1 0',
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px 0`
  },
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filled: false,
      loading: false,
      failed: false,
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleRegister() {
    // TODO implement registration
  }

  handleLogin(event) {
    event.preventDefault();
    const { email, password } = this.state;
    fetch("/api/session", {
      method: "POST",
      body: new URLSearchParams(`email=${email}&password=${password}`)
    }).then(response => {
      if (response.ok) {
        this.props.history.push('/'); // TODO avoid calling sessions twice
      } else {
        this.setState({
          failed: true,
          password: ""
        });
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { failed, email, password } = this.state;
    return (
      <main className={classes.root}>
        <Paper className={classes.paper}>

          <img className={classes.logo} src="/logo.svg" alt="Traccar" />

          <form onSubmit={this.handleLogin}>

            <FormControl margin="normal" required fullWidth error={failed}>
              <InputLabel htmlFor="email">{t('userEmail')}</InputLabel>
              <Input
                id="email"
                value={email}
                autoComplete="email"
                autoFocus
                onChange={this.handleChange} />
              { failed && <FormHelperText>Invalid username or password</FormHelperText> }
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">{t('userPassword')}</InputLabel>
              <Input
                id="password"
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={this.handleChange} />
            </FormControl>

            <div className={classes.buttons}>

              <Button
                type="button"
                variant="contained"
                disabled
                className={classes.button}
                onClick={this.handleRegister}>
                {t('loginRegister')}
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!email || !password}
                className={classes.button}>
                {t('loginLogin')}
              </Button>

            </div>

          </form>

        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(LoginPage);
