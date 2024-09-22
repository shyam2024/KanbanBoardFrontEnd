import React from 'react';
import KanbanCard from './KanbanCard';
import './KanbanColumn.css';

// Import icons for priority and status
import LowPriorityIcon from './assets/icons/Img - Low Priority.svg';
import MediumPriorityIcon from './assets/icons/Img - Medium Priority.svg';
import HighPriorityIcon from './assets/icons/Img - High Priority.svg';
import UrgentPriorityIcon from './assets/icons/SVG - Urgent Priority grey.svg';

import StatusOpenIcon from './assets/icons/To-do.svg';
import StatusInProgressIcon from './assets/icons/in-progress.svg';
import StatusDoneIcon from './assets/icons/Done.svg';
import StatusBacklogIcon from './assets/icons/Backlog.svg';

import AddIcon from './assets/icons/add.svg';
import MoreOptionsIcon from './assets/icons/3 dot menu.svg';

const KanbanColumn = ({ group, tickets, isGroupedByUser, groupBy }) => {
  // Function to return the correct icon for priority or status based on grouping
  const getGroupIcon = (groupName) => {
    
    if (groupBy === 'priority') {
      switch (groupName) {
        case '4': return <img src={UrgentPriorityIcon} alt="Urgent Priority" />;
        case '3': return <img src={HighPriorityIcon} alt="High Priority" />;
        case '2': return <img src={MediumPriorityIcon} alt="Medium Priority" />;
        case '1': return <img src={LowPriorityIcon} alt="Low Priority" />;
        default: return null;
      }
    } else if (groupBy === 'status') {
      switch (groupName) {
        case 'Done': return <img src={StatusDoneIcon} alt="Done" />;
        case 'In progress': return <img src={StatusInProgressIcon} alt="In Progress" />;
        case 'Todo': return <img src={StatusOpenIcon} alt="Todo" />;
        case 'Backlog': return <img src={StatusBacklogIcon} alt="Backlog" />;
        default: return null;
      }
    }
    return null;
  };

  return (
    <div className="kanban-column">
      <div className="kanban-column-header">
        <div className="group-title">
          {/* Group Icon and Text */}
          <span>{getGroupIcon(group)}</span>
          <span>{group}</span>
        </div>

        {/* Right Corner with Add and More Options Icons */}
        <div className="header-actions">
          <button className="add-ticket-btn">
            <img src={AddIcon} alt="Add Ticket" />
          </button>
          <button className="more-options-btn">
            <img src={MoreOptionsIcon} alt="More Options" />
          </button>
        </div>
      </div>
      
      {/* Tickets in the column */}
      {tickets.map((ticket) => (
        <KanbanCard key={ticket.id} ticket={ticket} isGroupedByUser={isGroupedByUser} />
      ))}
    </div>
  );
};

export default KanbanColumn;
