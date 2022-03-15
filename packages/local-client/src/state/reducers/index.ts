import { combineReducers } from "redux";
import cellsReducer from './cellsReducer'
import bundlesReducer from  './bundlesReducer'

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
}) 

export default reducers

/* Typescrip working with Redux, this is about applying some types 
to the Redux Store */
export type RootState = ReturnType<typeof reducers>