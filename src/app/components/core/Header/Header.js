import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { AppBar, Toolbar, Typography, IconButton, Icon } from 'material-ui';
import Menu, { MenuItem } from 'material-ui/Menu';

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

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    handleDrawerToggle: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      open: false,
    };
  }

  handleOpenMenu = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  handleRequestClose = () => {
    this.setState({ open: false });
  }

  render() {
    return (
      <AppBar position="fixed" color="primary" className={this.props.classes.appBar}>
        <Toolbar>
          <IconButton
            color="contrast"
            aria-label="open drawer"
            onClick={this.props.handleDrawerToggle}
            className={this.props.classes.navIconHide}
          >
            <Icon color="contrast">menu</Icon>
          </IconButton>
          <Typography type="headline" component="h1" color="inherit" style={{ flex: 1 }}>
            {this.props.title}
          </Typography>
          <IconButton
            color="contrast"
            aria-label="options"
            onClick={this.handleOpenMenu}
          >
            <Icon color="contrast">more_vert</Icon>
          </IconButton>
          <Menu
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
          >
            <MenuItem onClick={this.handleRequestClose}>
              <Icon>email</Icon> frank@gairal.com
            </MenuItem>
            <MenuItem onClick={this.handleRequestClose}>
              <Icon>phone</Icon> +33 95 67 65 87
            </MenuItem>
            <MenuItem onClick={this.handleRequestClose}>
              <Icon>link</Icon> +33 95 67 65 87
            </MenuItem>
            <MenuItem onClick={this.handleRequestClose}>
              <Icon>file_download</Icon> RESUME.PDF
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Header);
