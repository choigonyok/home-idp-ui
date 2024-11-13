import { BrowserRouter, Route, Routes, Link, Router } from "react-router-dom";
import "./App.css";
import GitHubLogin from "./GitHubLogin";
import React, { useState } from 'react';
import RoleList from "./Roles/RoleList";
import Home from "./Home";
import ProjectL from "./Projects/ProjectL";
import Project from "./Projects/Project";
import UserList from "./Users/UserList";
import DockerfileInput from "./Projects/DockerfileInput";
import Dockerfiles from "./Projects/Dockerfiles/Dockerfiles";
import Resources from "./Resources/Resources";
import Ingress from "./Resources/Ingress";
import Configmap from "./Resources/Configmap";
import TraceBar from "./Projects/TraceBar";
import ProjectList from "./Projects/ProjectList";
import PolicyList from "./Policies/PolicyList";
import Policy from "./Policies/Policy";
import Sidebar from "./Components/Sidebar";
import styled from 'styled-components';
import Login from "./Login/Login";
import Callback from "./Login/Callback";
import Table from "./Components/Table";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: 250px;
  height: 100%;
`;

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Sidebar />
        <MainContent>
          <Routes>
            <Route path="/traces/:trace_id" element={<Dockerfiles/>}></Route>
            <Route path="/policies/:policy_Id" element={<Policy/>}></Route>
            <Route path="/dockerfiles" element={<Dockerfiles/>}></Route>
            <Route path="/resources" element={<Resources/>}></Route>
            <Route path="/resources/ingresses/:name" element={<Ingress/>}></Route>
            <Route path="/users" element={<UserList/>}></Route>
            <Route path="/resources/configmaps/:name" element={<Configmap/>}></Route>
            <Route path="/projects/:namespace" element={<Project />}></Route>
            <Route path="/projects" element={<ProjectList />}></Route>
            <Route path="/roles" element={<RoleList />} />
            <Route path="/policies" element={<PolicyList />} />
            <Route path="/test" element={<ProjectL />} />
            <Route path="/trace" element={<TraceBar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/github/callback" element={<Callback />} />
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </MainContent>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
