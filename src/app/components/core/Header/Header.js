import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Icon,
} from '@material-ui/core';
import Menu from './HeaderMenu';

const drawerWidth = 240;
const styles = theme => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

export class Header extends Component {
  static propTypes = {
    location: PropTypes.shape().isRequired,
    classes: PropTypes.shape().isRequired,
    toggleDrawer: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      title: '',
    };
  }

  componentDidMount() {
    this.updateTitle();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      this.updateTitle();
    }
  }

  updateTitle() {
    const { location } = this.props;
    const title = location.pathname.substr(1) || 'works';

    this.setState(state => ({
      ...state,
      title,
    }));

    document.title = `frank gairal -- ${title}`;
  }

  render() {
    const { classes, toggleDrawer } = this.props;
    const { title } = this.state;
    return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            className={classes.navIconHide}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography
            variant="display1"
            component="h1"
            color="inherit"
            style={{
              flex: 1,
            }}
          >
            {title}
          </Typography>
          <Menu />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(Header));
