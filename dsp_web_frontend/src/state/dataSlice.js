export const dataInitialState = {
  tickets: [],
  conversations: [],
  playbooks: [],
  // status maps: 'idle' | 'loading' | 'succeeded' | 'failed'
  requestStatus: {
    tickets: 'idle',
    conversations: 'idle',
    playbooks: 'idle',
  },
  errors: {
    tickets: null,
    conversations: null,
    playbooks: null,
  },
};

// Action types
const SET_TICKETS = 'data/setTickets';
const SET_CONVERSATIONS = 'data/setConversations';
const SET_PLAYBOOKS = 'data/setPlaybooks';
const SET_STATUS = 'data/setStatus';
const SET_ERROR = 'data/setError';

// Action creators
export const dataActions = {
  setTickets: (items) => ({ type: SET_TICKETS, payload: items }),
  setConversations: (items) => ({ type: SET_CONVERSATIONS, payload: items }),
  setPlaybooks: (items) => ({ type: SET_PLAYBOOKS, payload: items }),
  setStatus: (key, status) => ({ type: SET_STATUS, payload: { key, status } }),
  setError: (key, error) => ({ type: SET_ERROR, payload: { key, error } }),
};

// Reducer
export function dataReducer(state = dataInitialState, action) {
  switch (action.type) {
    case SET_TICKETS:
      return { ...state, tickets: action.payload || [] };
    case SET_CONVERSATIONS:
      return { ...state, conversations: action.payload || [] };
    case SET_PLAYBOOKS:
      return { ...state, playbooks: action.payload || [] };
    case SET_STATUS: {
      const { key, status } = action.payload || {};
      return {
        ...state,
        requestStatus: { ...state.requestStatus, [key]: status ?? 'idle' },
      };
    }
    case SET_ERROR: {
      const { key, error } = action.payload || {};
      return {
        ...state,
        errors: { ...state.errors, [key]: error ?? null },
      };
    }
    default:
      return state;
  }
}
