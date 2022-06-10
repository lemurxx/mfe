import React from 'react';
import MarketingApp from './components/MarketingApp';
import UserList from './components/UserList';
import './App.css';

export default () => {
    return <div className="app-container">
        <div className="users-container">
            <UserList count="20" />
        </div>
        <div>
            <MarketingApp />
        </div>
    </div>

}