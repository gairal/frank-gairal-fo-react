import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue, green, red } from 'material-ui/colors';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header';
import SideNav from '../SideNav';
import Loader from '../../../containers/Loader';

const drawerWidth = 240;
const styles = theme => ({
  content: {
    [theme.breakpoints.up('md')]: {
      marginLeft: drawerWidth,
    },
  },
});

class Layout extends Component {
  static propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  }

  constructor(props) {
    super(props);

    this.state = {
      mobileOpen: false,
    };

    this.palette = {
      palette: {
        // type: 'dark',
        primary: blue, // Purple and green play nicely together.
        secondary: {
          ...green,
          A400: '#00e677',
        },
        error: red,
      },
    };
  }

  toggleDrawer = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const StoredLoader = Loader(this.props.store);
    return (
      <MuiThemeProvider theme={createMuiTheme(this.palette)}>
        <SideNav
          mobileOpen={this.state.mobileOpen}
          routes={this.props.routes}
          toggleDrawer={this.toggleDrawer}
        />
        <Header
          toggleDrawer={this.toggleDrawer}
        />
        <StoredLoader />
        <main className={this.props.classes.content}>
          <Switch>
            {this.props.routes
              .map(e => <Route path={e.path} component={e.component} key={e.path} />)
              .concat(<Redirect to={this.props.routes[0].path} key="default" />)
            }
          </Switch>
        </main>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Layout);
