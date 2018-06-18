import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { NavLink as RRNavLink } from 'react-router-dom';
import './style/style.css';
import AquaTab from './tabs/Aqua';
import BlueTab from './tabs/Blue';

import HomeTab from './tabs/Home';
import SuiteResults from './tabs/SuiteResults';
import EditResult from './tabs/EditResult';
import SmokeTab from './tabs/Smoke';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,  
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


class App extends Component {
  
  render() {
    return (
    <Router>
      <div >
        
      <div>
        <Navbar dark  expand="lg" className="sticky-top shadow" style ={{paddingTop :30, paddingBottom:0}}>
          <NavbarBrand href="/">
         
         
         <h1 className="font-weight-light">Automation Dashboard</h1>
              </NavbarBrand>
         
         
            <Nav className="ml-auto mb-none border-none"  tabs>
            <NavItem >
              <NavLink  tag={RRNavLink} className="nav-link" activeClassName="active" exact path="/"  to="/">
              <h3 className="font-weight-light">
                Regressions</h3>
               </NavLink>
               </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} className="nav-link" activeClassName="active"  to='/Aqua'>
              <h3 className="font-weight-light">
                Aqua</h3>
               </NavLink>
               </NavItem>
              <NavItem>
              <NavLink tag={RRNavLink} className="nav-link" activeClassName="active"  to='/Blue'>
              <h3 className="font-weight-light">Blue</h3>
                 </NavLink>
              </NavItem>              
              <NavItem>
              <NavLink tag={RRNavLink} className="nav-link" activeClassName="active"  to='/Smoke'>
              <h3 className="font-weight-light">Smoke</h3>
                 </NavLink>
              </NavItem>
            </Nav>
        
        </Navbar>
      </div>
      <div className="container-fluid">
      <div className="row">
      <nav className="col-sm-1 bg-dark text-light sidebar"></nav>
        <main className="col-md-10 col-sm-10 text-light bg-dark font-weight-light " role="main"  >
        <Switch>
            
            <Route exact path='/' component={HomeTab} />
            
            <Route path='/Aqua' component={AquaTab} />
            <Route path='/Blue' component={BlueTab} />
            <Route path='/Smoke' component={SmokeTab} />
            <Route path='/edit/:id' component={EditResult} />
            
        </Switch>
        </main>
        <nav className="col-sm-1 bg-dark text-light sidebar"></nav>
      </div>
      </div>
      
          
        
          </div>
      </Router>
      
    );
  }
}

export default App;