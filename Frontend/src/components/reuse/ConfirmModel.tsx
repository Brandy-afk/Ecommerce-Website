import { GoSync } from "react-icons/go";
import Button from "./Button";
import ReactModal from "react-modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  body: string;
  header?: string;
  cancelText?: string;
  confirmText?: string;
  isLoading?: boolean;
  loadingHeader?: string;
  risk?: boolean;
  formButton?: boolean;
}

export default function ConfirmModel({
  isOpen,
  onConfirm,
  onCancel,
  header = "Are you sure?",
  body,
  confirmText = "Yes",
  cancelText = "No",
  isLoading,
  loadingHeader = "Loading...",
  risk = false,
}: ConfirmModalProps) {
  const buttonClasses = "text-2xl";

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={isLoading ? undefined : onCancel}
      className="w-4/12 h-96 mx-auto mt-24 bg-white 
      flex flex-col gap-6 items-center justify-center p-4 
      rounded-xl shadow-2xl border-2"
      contentLabel="Confirm Action"
    >
      <h3 className="text-center font-bold tracking-tight text-5xl">
        {isLoading ? loadingHeader : header}
      </h3>
      <p className="text-center mb-4 text-xl leading-8">{body}</p>
      <div
        className={`${
          isLoading ? "flex justify-center" : "grid grid-cols-2"
        } w-full gap-6 px-8 h-16`}
      >
        {isLoading ? (
          <GoSync className="animate-spin h-full w-full" />
        ) : (
          <>
            <Button
              secondary
              rounded
              className={buttonClasses}
              onClick={onCancel}
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              primary={!risk}
              warning={risk}
              rounded
              className={buttonClasses}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>{" "}
          </>
        )}
      </div>
    </ReactModal>
  );
}
