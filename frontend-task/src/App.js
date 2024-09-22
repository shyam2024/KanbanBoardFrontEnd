import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KanbanColumn from './KanbanColumn';
import './App.css';

import DisplayIcon from './assets/icons/Display.svg';

const App = () => {
  const [tickets, setTickets] = useState([]);  
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  // Fetch data from API
  useEffect(() => {
    axios.get('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then((response) => {
        let { tickets, users } = response.data;

        const ticketsWithUsers = tickets.map(ticket => {
          const assignedUser = users.find(user => user.id === ticket.userId);
          return { ...ticket, user: assignedUser || null };
        });

        setTickets(ticketsWithUsers);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  // Handle sorting
  const sortedTickets = () => {
    if (tickets && Array.isArray(tickets)) {  
      if (sortBy === 'priority') {
        return [...tickets].sort((a, b) => b.priority - a.priority);
      } else if (sortBy === 'title') {
        return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
      }
    }
    return [];
  };

  // Save group and sort state to localStorage
  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  // Handle grouping
  const groupTickets = (tickets) => {
    switch (groupBy) {
      case 'status':
        return groupByStatus(tickets);
      case 'user':
        return groupByUser(tickets);
      case 'priority':
        return groupByPriority(tickets);
      default:
        return groupByStatus(tickets);
    }
  };

  const groupByStatus = (tickets) => {
    const grouped = {};
    tickets.forEach(ticket => {
      const status = ticket.status || 'Unassigned';
      if (!grouped[status]) {
        grouped[status] = [];
      }
      grouped[status].push(ticket);
    });
    return grouped;
  };

  const groupByUser = (tickets) => {
    const grouped = {};
    tickets.forEach(ticket => {
      const userName = ticket.user ? ticket.user.name : 'Unassigned';
      if (!grouped[userName]) {
        grouped[userName] = [];
      }
      grouped[userName].push(ticket);
    });
    return grouped;
  };

  const groupByPriority = (tickets) => {
    const grouped = {};
    tickets.forEach(ticket => {
      const priority = ticket.priority || 'No Priority';
      if (!grouped[priority]) {
        grouped[priority] = [];
      }
      grouped[priority].push(ticket);
    });
    return grouped;
  };

  const groupedTickets = groupTickets(sortedTickets());

  return (
    <div className="kanban-board">
      <div className="controls">
        <div className="dropdown-container">
          <button className="dropdown-button">
            <span className='display-icon'><img src={DisplayIcon} alt="Display Icon" /></span>
            <span className="dropdown-label">Display</span>
            <i className="dropdown-icon"></i>
          </button>
          <div className="dropdown-content">
            <div className="dropdown-group">
              <label>Grouping:</label>
              <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-group">
              <label>Ordering:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="columns">
        {Object.keys(groupedTickets).map((group) => (
          <KanbanColumn key={group} group={group} tickets={groupedTickets[group]} groupBy={groupBy} />
        ))}
      </div>
    </div>
  );
};

export default App;
