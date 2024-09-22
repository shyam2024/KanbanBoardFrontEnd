import React from 'react';
import './KanbanCard.css';
import LowPriorityIcon from './assets/icons/Img - Low Priority.svg';
import MediumPriorityIcon from './assets/icons/Img - Medium Priority.svg';
import HighPriorityIcon from './assets/icons/Img - High Priority.svg';
import UrgentPriorityIcon from './assets/icons/SVG - Urgent Priority grey.svg';
import StatusOpenIcon from './assets/icons/To-do.svg';
import StatusInProgressIcon from './assets/icons/in-progress.svg';
import StatusDoneIcon from './assets/icons/Done.svg';
import StatusBacklogIcon from './assets/icons/Backlog.svg';

const KanbanCard = ({ ticket, isGroupedByUser }) => {
  // Function to get the correct priority icon based on the ticket's priority
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4: return <img src={UrgentPriorityIcon} alt="Urgent Priority" />;
      case 3: return <img src={HighPriorityIcon} alt="High Priority" />;
      case 2: return <img src={MediumPriorityIcon} alt="Medium Priority" />;
      case 1: return <img src={LowPriorityIcon} alt="Low Priority" />;
      default: return null;
    }
  };

  // Function to get the correct status icon based on the ticket's status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Todo': return <img src={StatusOpenIcon} alt="Open Status" />;
      case 'In progress': return <img src={StatusInProgressIcon} alt="In Progress Status" />;
      case 'Done': return <img src={StatusDoneIcon} alt="Done Status" />;
      case 'Backlog': return <img src={StatusBacklogIcon} alt="Backlog Status" />;
      default: return null;
    }
  };

  return (
    <div className="kanban-card">
      {/* Display user details inside card if NOT grouped by user */}
      {!isGroupedByUser && ticket.user && (
        <div className="user-avatar">
          <div>{ticket.user.name}</div>
        </div>
      )}

      <div className="ticket-id">{ticket.id}</div>
      <div className="ticket-title"><span className='status-icon'>{getStatusIcon(ticket.status)}</span>{ticket.title}</div>
      
      <div className="ticket-meta">
        {/* Priority Icon */}
        <div className="priority-icon">
          {getPriorityIcon(ticket.priority)}
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;
