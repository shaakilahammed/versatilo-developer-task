import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

import { setAuth, removeAuth } from '../features/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://mges.tech/api',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
  
    const token = Cookies.get('access_token');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    
return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/resources',
        method: 'POST',
        body: {
          resource: 'auth',
          action: 'login',
          ...credentials,
        },
      }),
      onQueryStarted: async (credentials, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          if (data?.results?.access_token && data?.results?.user) {
            Cookies.set('access_token', data?.results?.access_token, { expires: 7 });
            Cookies.set('authUser', JSON.stringify(data?.results?.user), { expires: 7 });
          }

          dispatch(setAuth({ 
            isAuthenticated: true, 
            user: data.user, 
          }));
        } catch (error) {
          console.error('Login failed', error);
        }
      },
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: '/resources',
        method: 'POST',
        body: {
          resource: 'auth',
          action: 'logout',
        },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;

          Cookies.remove('authUser');
          Cookies.remove('access_token');
          dispatch(removeAuth());
        } catch (error) {
          console.error('Logout failed', error);
        }
      },
    }),
  }),
});

export const { useLoginUserMutation, useLogoutUserMutation } = authApi;
