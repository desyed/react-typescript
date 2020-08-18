import { Dispatch } from "redux";

type loadingLocationAction = {
  readonly type: "location/loading";
  readonly payload: boolean;
};
export const loadingLocation = (isLoading: boolean) => async (
  dispatch: Dispatch<loadingLocationAction>
) => {
  dispatch({
    type: "location/loading",
    payload: isLoading,
  } as const);
};

type getAllLocations = {
  readonly type: "getLocations";
  readonly payload: any;
};
export const getLocations = (key: String) => async (
  dispatch: Dispatch<getAllLocations>
) => {
  loadingLocation(true);

  let location: any = await fetch(
    `https://www.meteoblue.com/en/server/search/query3?query=${key}`
  );
  location = await location.json();
  if (location) {
    dispatch({
      type: "getLocations",
      payload: location["results"].slice(0, 5) || [],
    } as const);
  }
  loadingLocation(false);
};

type AddLocationAction = {
  readonly type: "AddLocation";
  readonly payload: any;
};
export const addLocation = (location: any) => async (
  dispatch: Dispatch<AddLocationAction>
) => {
  dispatch({
    type: "AddLocation",
    payload: location,
  } as const);
};

type RemoveLocationAction = {
  readonly type: "RemoveLocation";
  readonly payload: number;
};
export const removeLocation = (id: any) => async (
  dispatch: Dispatch<RemoveLocationAction>
) => {
  dispatch({
    type: "RemoveLocation",
    payload: id,
  } as const);
};

export type Actions =
  | loadingLocationAction
  | getAllLocations
  | AddLocationAction
  | RemoveLocationAction;
