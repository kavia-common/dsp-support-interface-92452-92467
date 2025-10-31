import { httpFetch } from './httpClient';
import { isMockMode } from '../utils/env';

/**
 * Mock data used when no backend URL is configured.
 */
const mock = {
  tickets: [
    { id: 'TCK-101', title: 'Login issues for user A', status: 'Open' },
    { id: 'TCK-102', title: 'Payment failure on checkout', status: 'Investigating' },
  ],
  conversations: [
    { id: 'C-1', subject: 'Follow-up on ticket TCK-101', participants: 3 },
  ],
  ticketDetail(id) {
    return {
      id,
      title: 'Sample ticket',
      status: 'Open',
      description:
        'Customer reports an issue with the system. This is placeholder content.',
    };
  },
};

// Utilities
function logMock(message, ...args) {
  if (isMockMode()) {
    // eslint-disable-next-line no-console
    console.info(`[DSP API - MOCK] ${message}`, ...args);
  }
}

// PUBLIC_INTERFACE
export async function getTickets() {
  /**
   * Returns list of tickets.
   * In mock mode, returns local data.
   */
  if (isMockMode()) {
    logMock('getTickets() returning mock data');
    await delay(250);
    return mock.tickets;
  }
  return httpFetch('/tickets', { method: 'GET' });
}

// PUBLIC_INTERFACE
export async function getTicket(id) {
  /**
   * Returns details for a specific ticket.
   * In mock mode, returns local data using id.
   */
  if (!id) throw new Error('id is required');
  if (isMockMode()) {
    logMock('getTicket(%s) returning mock data', id);
    await delay(240);
    return mock.ticketDetail(id);
  }
  return httpFetch(`/tickets/${encodeURIComponent(id)}`, { method: 'GET' });
}

// PUBLIC_INTERFACE
export async function getConversations() {
  /**
   * Returns list of conversations.
   * In mock mode, returns local data.
   */
  if (isMockMode()) {
    logMock('getConversations() returning mock data');
    await delay(220);
    return mock.conversations;
  }
  return httpFetch('/conversations', { method: 'GET' });
}

// PUBLIC_INTERFACE
export async function createPlaybook(payload) {
  /**
   * Create a playbook. Returns created playbook or server response.
   * In mock mode, echoes payload with an id.
   */
  if (isMockMode()) {
    logMock('createPlaybook(payload) returning mock data', payload);
    await delay(200);
    return { id: 'PB-' + Math.floor(Math.random() * 1000), ...payload };
  }
  return httpFetch('/playbooks', { method: 'POST', body: payload });
}

// PUBLIC_INTERFACE
export async function runPlaybook(id, params) {
  /**
   * Run a playbook by id with optional params.
   * In mock mode, returns a simple success result.
   */
  if (!id) throw new Error('id is required');
  if (isMockMode()) {
    logMock('runPlaybook(%s, params) returning mock result', id, params);
    await delay(180);
    return { id, status: 'queued', startedAt: new Date().toISOString() };
  }
  return httpFetch(`/playbooks/${encodeURIComponent(id)}/run`, {
    method: 'POST',
    body: params || {},
  });
}

// PUBLIC_INTERFACE
export async function search(query) {
  /**
   * Search endpoint. Returns mixed results depending on backend.
   * In mock mode, does a simple filter on tickets.
   */
  if (isMockMode()) {
    logMock('search(%o) returning mock results', query);
    await delay(160);
    const q = String(query?.q || '').toLowerCase();
    const hits = mock.tickets.filter(
      (t) => t.id.toLowerCase().includes(q) || t.title.toLowerCase().includes(q)
    );
    return { hits, total: hits.length };
  }
  return httpFetch('/search', { method: 'GET', query });
}

// helpers
function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
