import React from 'react';
import './App.css';
// import { DefaultLayout } from './components/DefaultLayout';
import { AddTicket } from './pages/AddTicket.page';
import { Dashboard } from './pages/Dashboard.page';
import { Entry } from './pages/Entry.page';
import { Ticket } from './pages/Ticket.page';
import { TicketList } from './pages/TicketList.page';
import {
  Switch, Route
} from "react-router-dom"
import { PrivateRoute } from './components/PrivateRoute'
import { Registration } from './pages/Registration.page';
import { UserVerification } from './pages/UserVerification';
import { ResetPass } from './pages/ResetPass.page';
import { About } from './pages/About.page';

function App() {
  return (
    <div className="App">
      {/* <Router> */}
      <Switch>
        <Route exact path="/">
          <Entry />
        </Route>
        <Route exact path="/registration">
          <Registration />
        </Route>
        <Route exact path="/password-reset">
          <ResetPass />
        </Route>
        <Route exact path="/verification/:_id/:email">
          <UserVerification />
        </Route>

        <PrivateRoute exact path="/about"><About /></PrivateRoute>
        <PrivateRoute exact path="/dashboard"><Dashboard /></PrivateRoute>
        <PrivateRoute exact path="/add-ticket"><AddTicket /></PrivateRoute>
        <PrivateRoute exact path="/tickets"><TicketList /></PrivateRoute>
        <PrivateRoute exact path="/ticket/:tId"><Ticket /></PrivateRoute>
        <Route path="*">
          <h1>404 Page not found</h1>
        </Route>
      </Switch>
      {/* </Router> */}
    </div>
  );
}

export default App;
