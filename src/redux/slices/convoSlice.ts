"use client"

import { createSlice, PayloadAction, createAsyncThunk  } from '@reduxjs/toolkit';
import { APIConstants } from '@/constants/api';
import { ErrorConstants } from '@/constants/errors';

export interface Conversation {
  URLs: string[];
  created_at: string;
  email: string;
  id: number;
  intent: string;
  notes: string;
  role: string;
}

export interface ConvosState {
  convos: Conversation[];
  loading: boolean;
  error: string | null;
}

interface fetchConvoParams {
  email: string;
  csrfToken: string;
}

const initialState: ConvosState = {
  convos: [],
  loading: false,
  error: null,
};

export const fetchConversations = createAsyncThunk(
  'convos/fetchConversations',
  async ({email, csrfToken}: fetchConvoParams) => {
    if (email && csrfToken) {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${apiBaseUrl}/api/conversations/email`, {
        method: APIConstants.POST,
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': APIConstants.CONTENT_JSON,
        },
        body: JSON.stringify({
          email: email,
        }),
        credentials: APIConstants.CRED_INCLUDE
      });
      const data = await response.json()
      console.log(data);
  
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

const convosSlice = createSlice({
  name: 'convos',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.convos = action.payload;
    },
    deleteConversation: (state, action: PayloadAction<number>) => {
      state.convos = state.convos.filter(
        (convo) => convo.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("pending");
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.convos = action.payload;
        console.log("fulfilled");
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || ErrorConstants.CONVO_GET
        console.error(state.error);
      })
  }
});

export const { setConversations, deleteConversation } = convosSlice.actions;
export default convosSlice.reducer;
