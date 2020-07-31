import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainLayout from './component/Layout/MainLayout';
import Pages from './pages';
const { Schedules, UploadReport, ScheduleDetails } = Pages;

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <MainLayout>
          <Route exact path="/schedules" component={Schedules}/>
          <Route exact path="/" component={UploadReport}/>
          <Route exact path="/schedule_details" component={ScheduleDetails}/>
        </MainLayout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
