import { combineReducers } from 'redux';
import authReducers from './auth';

import posts from './posts';


export const reducers = combineReducers({ posts  , authReducers });
