import { Actions } from "./actions";

interface InitialState {
  loading: Boolean;
  list: any;
  selected: any;
}

export function locationReducer(
  state: InitialState = { loading: false, list: [], selected: [] },
  action: Actions
) {
  switch (action.type) {
    case "location/loading":
      return { ...state, loading: action.payload };
    case "getLocations":
      return { ...state, list: action.payload };
    case "AddLocation":
      return {
        ...state,
        selected: state.selected.concat({ ...action.payload }),
      };
    case "RemoveLocation":
      console.log(action);

      return {
        ...state,
        selected: state.selected.filter(
          (itm: any) => itm.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
