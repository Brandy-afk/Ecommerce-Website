export type InputEvents =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export type HandleChangeType = (
  event: InputEvents,
  customEdit?: (value: string) => string
) => void;

export default function createHandleChange<T extends Record<string, any>>(
  setState: React.Dispatch<React.SetStateAction<T>>
) {
  return (event: InputEvents, customEdit?: (value: string) => string) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: customEdit ? customEdit(value) : value,
    }));
  };
}
