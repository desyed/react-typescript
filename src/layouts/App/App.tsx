import React from "react";
import "./App.css";
import Select from "../../components/select";

import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../../store";
import {
  getLocations,
  addLocation,
  removeLocation,
} from "../../store/location/actions";

function App() {
  const locations: any = useSelector((state: AppState) => state.location);
  const { loading, list, selected } = locations;
  const dispatch = useDispatch();

  const onSelectChange = (key: String) => {
    dispatch(getLocations(key));
  };
  const onSelect = (value: any) => {
    dispatch(addLocation(value));
  };
  const onSelectSingle = (value: any) => {
    // dispatch(addLocation(value));
    console.log("single select value", value);
  };
  const onRemove = (id: any) => {
    dispatch(removeLocation(id));
  };
  return (
    <div className="app">
      <div>
        <p>Select multiple Locations</p>
        <Select
          multiple
          onChange={onSelectChange}
          onSelect={onSelect}
          data={list}
          selectedValues={selected}
          onRemove={onRemove}
          loading={loading}
        />
      </div>
      <div>
        <p>Select single Location</p>
        <Select
          onChange={onSelectChange}
          data={list}
          onSelect={onSelectSingle}
          loading={loading}
        />
      </div>
      <div className="footer">Author: Syed Shihab</div>
    </div>
  );
}

export default App;
