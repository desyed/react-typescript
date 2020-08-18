import { createStore, combineReducers, applyMiddleware } from "redux";
import { locationReducer } from "./location/reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

export type AppState = {
  location: any;
};

export default createStore(
  combineReducers<AppState>({
    location: locationReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);
