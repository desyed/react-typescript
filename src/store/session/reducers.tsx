import { Person, Actions } from "./actions";

export function peopleReducer(state: Person[] = [], action: Actions) {
  switch (action.type) {
    case "AddPerson":
      return state.concat({ id: state.length + 1, name: action.payload });
    case "RemovePerson":
      return state.filter((person) => person.id !== action.payload);
    default:
      return state;
  }
}
