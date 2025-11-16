import React from 'react';
import { NavLink } from 'react-router-dom';

interface UserTabsProps {
  userId: string;
}

export const UserTabs: React.FC<UserTabsProps> = ({ userId }) => {
  return (
    <nav className="user-tabs">
      <NavLink 
        to={`/users/${userId}/posts`}
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Posts
      </NavLink>
      <NavLink 
        to={`/users/${userId}/albums`}
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Albums
      </NavLink>
      <NavLink 
        to={`/users/${userId}/todos`}
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Todos
      </NavLink>
    </nav>
  );
};

export default UserTabs;

