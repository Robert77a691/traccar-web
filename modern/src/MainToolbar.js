import t from './common/localization'
import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';

const styles = theme => ({
  flex: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  list: {
    width: 250
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  }
});

class MainToobar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer: false
    };
    this.openDrawer = this.openDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  openDrawer() {
    this.setState({
      drawer: true
    });
  };

  closeDrawer() {
    this.setState({
      drawer: false
    });
  };

  handleLogout() {
    fetch("/api/session", {
      method: "DELETE"
    }).then(response => {
      if (response.ok) {
        this.props.history.push('/login');
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              onClick={this.openDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Traccar
            </Typography>
            <Button color="inherit" onClick={this.handleLogout}>{t('loginLogout')}</Button>
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.drawer} onClose={this.closeDrawer}>
          <div
            tabIndex={0}
            className={classes.list}
            role="button"
            onClick={this.closeDrawer}
            onKeyDown={this.closeDrawer}>
            <List>
              <ListItem button onClick={() => this.props.history.push('/')}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={t('mapTitle')} />
              </ListItem>
            </List>
            <Divider />
            <List
              subheader={
                <ListSubheader>
                  {t('reportTitle')}
                </ListSubheader>
              }>
              <ListItem button onClick={() => this.props.history.push('/reports/route')}>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary={t('reportRoute')} />
              </ListItem>
              <ListItem button disabled>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary={t('reportEvents')} />
              </ListItem>
              <ListItem button disabled>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary={t('reportTrips')} />
              </ListItem>
              <ListItem button disabled>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary={t('reportStops')} />
              </ListItem>
              <ListItem button disabled>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary={t('reportSummary')} />
              </ListItem>
              <ListItem button disabled>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary={t('reportChart')} />
              </ListItem>
            </List>
            <Divider />
            <List
              subheader={
                <ListSubheader>
                  {t('settingsTitle')}
                </ListSubheader>
              }>
              <ListItem button disabled>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={t('settingsUser')} />
              </ListItem>
              <ListItem button disabled>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={t('settingsServer')} />
              </ListItem>
              <ListItem button disabled>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={t('sharedNotifications')} />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </Fragment>
    );
  }
}

export default withStyles(styles)(MainToobar);
