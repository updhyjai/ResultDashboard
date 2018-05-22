import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link , NavLink} from 'react-router-dom';

import AquaTab from './tabs/Aqua';
import BlueTab from './tabs/Blue';
import RedTab from './tabs/Red';
import HomeTab from './tabs/Home';
import SuiteResults from './tabs/SuiteResults';
import EditResult from './tabs/EditResult';


class App extends Component {
  render() {
    return (
    <Router>
      <div>
        
        <nav className="navbar navbar-dark sticky-top navbar-expand-lg bg-dark flex-md-nowrap p-0">
        <a className="navbar-brand col-sm-3 col-md-2" style={{margin:10}} href="#"><h3><small>AUTOMATION DASHBOARD</small></h3></a>
        
        
         
        
      </nav>
      <div className="container-fluid">
      <div className="row">
      <nav className="col-md-2 d-none d-md-block bg-light sidebar border-right">
          <div className="sidebar-sticky">
          
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              <h4>SIEM Regression</h4></span>
          </h6>
          <ul className="nav flex-column mb-2">
          <li className="nav-item">
              <NavLink className="nav-link active" to={'/'}>
               
                Execution Summary
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to={'/SuiteResults'}>
               
                Suite Results
              </NavLink>
            </li>
             
            </ul>
            
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            
              <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-1"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                <h4>Feature Teams</h4></span>
            </h6>
            <ul className="nav flex-column mb-2">
            <li className="nav-item">
                <NavLink className="nav-link active" to={'/Aqua/AquaTrend'}>
                 
                  Aqua
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link"  to={'/Blue'}>
                 
                  Blue
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link"  to={'/Blue'}>
                
                  Orange
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link"   to={'/Red'}>
                
                  Red
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <main className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4" role="main" >
        <Switch>
            
            <Route exact path='/' component={HomeTab} />
            <Route exact path='/SuiteResults' component={SuiteResults} />
            <Route path='/Aqua/AquaTrend' component={AquaTab} />
            <Route path='/Blue' component={BlueTab} />
            <Route path='/Red' component={RedTab} />
            <Route path='/edit/:id' component={EditResult} />
            
        </Switch>
        </main>
      </div>
      </div>
      
          
        
          </div>
      </Router>
      
    );
  }
}

export default App;