import { Dispatch } from "redux";

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type Person = {
  id: number;
  name: string;
};

type AddPersonAction = {
  readonly type: "AddPerson";
  readonly payload: string;
};
export const addPerson = (personName: string) => async (
  dispatch: Dispatch<AddPersonAction>
) => {
  await wait(200);
  dispatch({
    type: "AddPerson",
    payload: personName,
  } as const);
};

type RemovePersonAction = {
  readonly type: "RemovePerson";
  readonly payload: number;
};
export const removePerson = (id: number) => async (
  dispatch: Dispatch<RemovePersonAction>
) => {
  await wait(200);
  dispatch({
    type: "RemovePerson",
    payload: id,
  } as const);
};

export type Actions = AddPersonAction | RemovePersonAction;
