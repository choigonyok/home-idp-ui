import React from 'react';
import styled from 'styled-components';
import { FaUserAlt, FaCog, FaShieldAlt, FaUserShield, FaFolderOpen, FaSignOutAlt, FaSignInAlt, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #2f3542;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 9999;
`;

const Logo = styled.div`
  margin-top: 30px;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 30px;
`;

const Menu = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const SignInOut = styled.ul`
  list-style: none;
  padding: 0;
  width: inherit;
  position: fixed;
  left: 0;
  bottom: 0;
`;

const MenuItem = styled.li`
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 30px;
  display: flex;
  align-items: center;
  color: #dcdde1;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #57606f;
  }
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 20px;
`;

const Sidebar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("jwt_token")
    window.location.reload();
  }

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <SidebarContainer>
      <Logo>HOME IDP</Logo>
      <Menu>
        <MenuItem onClick={() => handleNavigation('/projects')}>
          <Icon>
            <FaFolderOpen />
          </Icon>
          Projects
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/roles')}>
          <Icon>
            <FaUserShield />
          </Icon>
          Roles
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/policies')}>
          <Icon>
            <FaShieldAlt />
          </Icon>
          Policies
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/users')}>
          <Icon>
            <FaUserAlt />
          </Icon>
          Users
        </MenuItem>
        <MenuItem onClick={() => handleNavigation('/settings')}>
          <Icon>
            <FaCog />
          </Icon>
          Settings
        </MenuItem>
      </Menu>
      <SignInOut>
      {localStorage.getItem("jwt_token") === null ? 
        <MenuItem onClick={() => handleNavigation('/login')}>
          <Icon>
            <FaSignInAlt />
          </Icon>
          SignIn / SignUp
        </MenuItem>
          :
          <MenuItem onClick={handleSignOut}>
            <Icon>
              <FaSignOutAlt />
            </Icon>
            SignOut
          </MenuItem>
         }
      </SignInOut>
    </SidebarContainer>
  );
};

export default Sidebar;
