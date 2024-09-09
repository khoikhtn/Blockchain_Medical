import React from "react";

interface ModalProps {
  id: string;
  title: string;
  fields: { name: string; label: string; placeholder: string; type: string }[];
  info: Record<string, string>;
  handleChangeInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  closeModal: (id: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  id,
  title,
  fields,
  info,
  handleChangeInfo,
  handleSubmit,
  closeModal
}) => {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h1 className="font-bold text-3xl">{title}</h1>
        <p className="py-4 text-xl">Please fill in your information</p>
        <form method="dialog" onSubmit={handleSubmit}>
          <div className="mb-16 space-y-5">
            {fields.map(field => (
              <div key={field.name} className="form-control mr-60 w-full">
                <label className="label">
                  <span className="label-text">{field.label}</span>
                </label>

                <input
                  type={field.type}
                  name={field.name}
                  className="input input-bordered w-full"
                  placeholder={field.placeholder}
                  value={info[field.name]}
                  onChange={handleChangeInfo}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center">
            <button className="btn btn-error text-xl">
              {title === "Patient" ? "Register" : title === "Doctor" ? "Request admin" : "Submit"}
            </button>
          </div>
        </form>

        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => closeModal(id)}>X</button>
      </div>
    </dialog>
  )
}

export default Modal