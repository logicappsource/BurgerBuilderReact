import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
      showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
      this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
      this.setState((prevState) => {
          return {showSideDrawer: !prevState.showSideDrawer}
      });
    }

    render(){
      return (
        <Aux>
            <Toolbar
            isAuth={this.props.isAuthenticated}
            drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer
                open={this.state.showSideDrawer}
                closed={this.sideDrawerClosedHandler} />
          <main className={classes.Content}>
                {this.props.children}
          </main>
        </Aux>
      )
    }
}

const mapStateToProps = state => {
  return {
     isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
