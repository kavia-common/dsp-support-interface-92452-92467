import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LayoutShell from '../components/layout/LayoutShell';
import Dashboard from '../pages/Dashboard';
import Tickets from '../pages/Tickets';
import TicketDetail from '../pages/TicketDetail';
import Conversations from '../pages/Conversations';
import Playbooks from '../pages/Playbooks';
import Settings from '../pages/Settings';
import NotFound from '../pages/NotFound';

/**
 * PUBLIC_INTERFACE
 * AppRoutes defines all application routes and wraps them with the dashboard layout.
 * Routes:
 *  - / (Dashboard)
 *  - /tickets (Tickets list)
 *  - /tickets/:id (Ticket details)
 *  - /conversations (Conversations)
 *  - /playbooks (Playbooks)
 *  - /settings (Settings)
 *  - * (404)
 */
export default function AppRoutes({ onToggleTheme }) {
  return (
    <LayoutShell onToggleTheme={onToggleTheme}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/:id" element={<TicketDetail />} />
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/playbooks" element={<Playbooks />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LayoutShell>
  );
}
