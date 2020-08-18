import React, { useState } from "react";
import "./style.css";

type Props = {
  loading?: Boolean;
  multiple?: Boolean;
  icon?: Boolean;
  data?: any[];
  selectedValues?: any[];
  onChange: (key: string) => void;
  onSelect: (value: any) => void;
  onRemove?: (id: any) => void;
};

const Select: React.FC<Props> = ({
  multiple,
  icon,
  selectedValues,
  data,
  onChange,
  onSelect,
  onRemove,
  loading,
}: Props) => {
  const divEl = React.useRef<HTMLDivElement>(null);
  const inputEl = React.useRef<HTMLInputElement>(null);
  const [inputValue, setinputValue] = useState<string>("");
  const [hasValue, setHasValue] = useState<Boolean>(false);
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputEl && inputEl.current) {
      if (e.currentTarget.value.length) {
        setHasValue(true);
        setinputValue(e.currentTarget.value);
        onChange(e.currentTarget.value);
      } else {
        setHasValue(false);
        setinputValue("");
      }
    }
  };
  const onListClick = (e: any, item?: any) => {
    e.stopPropagation();
    onSelect(item);
    divEl.current?.classList.remove("active");
    multiple ? setinputValue("") : setinputValue(item.name);
  };
  const onDivClick = () => {
    inputEl.current?.focus();
    divEl.current?.classList.add("active");
  };
  const onRemoveItem = (id: any) => {
    onRemove && onRemove(id);
  };
  function handleClickOutside(event: any) {
    if (divEl.current && !divEl.current.contains(event.target)) {
      divEl.current?.classList.remove("active");
    }
  }
  document.addEventListener("mousedown", handleClickOutside);

  return (
    <div
      className="custom-select"
      ref={divEl}
      onClick={(e: any) => {
        e.preventDefault();
        onDivClick();
      }}
    >
      <div className="custom-selector-icon">
        <img
          alt="icon"
          src="https://img.icons8.com/ultraviolet/16/000000/marker.png"
        />
      </div>
      <div className="selector">
        {multiple &&
          selectedValues &&
          selectedValues.map((item, i) => (
            <div key={i} className="selected-item">
              {item.name}
              <span
                onClick={(e: any) => {
                  e.stopPropagation();
                  onRemoveItem(item.id);
                }}
              >
                x
              </span>
            </div>
          ))}
        <input
          type="text"
          className="selector-input"
          onChange={(e) => onInputChange(e)}
          ref={inputEl}
          value={inputValue}
          style={!multiple ? { width: "100%" } : undefined}
        />
        {hasValue && (
          <div className="dropdown">
            {data ? (
              data.map((drp_item, i) => (
                <div
                  key={i}
                  className="list"
                  onClick={(e) => onListClick(e, drp_item)}
                >
                  {drp_item.name},{" "}
                  <span style={{ color: "skyblue" }}>{drp_item.country}</span>
                </div>
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "15px",
                  color: "skyblue",
                }}
              >
                {loading ? "loading..." : "No data found!"}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
