"use client"

import { createSlice, PayloadAction, createAsyncThunk  } from '@reduxjs/toolkit';
import { APIConstants } from '@/constants/api';
import { ErrorConstants } from '@/constants/errors';
import { toast } from 'sonner';
import { Conversation, ConvosState } from './types';

interface fetchConvoParams {
  user_id: number;
  csrfToken: string;
}

interface deleteConvoParams {
  user_id: number;
  convo_id: number;
  csrfToken: string;
}

const initialState: ConvosState = {
  convos: [],
  loading: false,
  error: null,
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchConversations = createAsyncThunk(
  'convos/fetchConversations',
  async ({user_id, csrfToken}: fetchConvoParams) => {
    if (user_id && csrfToken) {
      const response = await fetch(`${apiBaseUrl}/api/conversations/user_id`, {
        method: APIConstants.POST,
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': APIConstants.CONTENT_JSON,
        },
        body: JSON.stringify({
          'user_id': user_id,
        }),
        credentials: APIConstants.CRED_INCLUDE
      });
      const data = await response.json()
  
      if (response.ok) {
        return data
      }
      else {
        console.error(response);
      }
    }
    return [];
  }
);

export const deleteConversation = createAsyncThunk(
  'convos/deleteConversation',
  async ({user_id, convo_id, csrfToken}: deleteConvoParams) => {
    if (user_id && csrfToken) {
      const response = await fetch(`${apiBaseUrl}/api/conversation/delete/${convo_id}`, {
        method: APIConstants.DELETE,
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': APIConstants.CONTENT_JSON,
        },
        body: JSON.stringify({
          'user_id': user_id,
        }),
        credentials: APIConstants.CRED_INCLUDE
      });
      const data = await response.json()

      if (response.ok) {
        return data
      }
      else {
        console.error(response);
      }
    }
    return [];
  }
)

const convosSlice = createSlice({
  name: 'convos',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.convos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.convos = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || ErrorConstants.CONVO_GET
        toast.error(state.error)
        console.error(state.error);
      })
      .addCase(deleteConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteConversation.fulfilled, (state, action) => {
        const data = action.payload
        state.loading = false;
        state.convos = data.conversations
        toast.success(data.message);
      })
      .addCase(deleteConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || ErrorConstants.CONVO_GET
        toast.error(state.error);
        console.error(state.error);
      })
  }
});

export const { setConversations } = convosSlice.actions;
export default convosSlice.reducer;
