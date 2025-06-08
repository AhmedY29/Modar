import React from "react";
import { useTranslation } from "react-i18next";

function FormGroup(props) {
  const { t } = useTranslation();

  return (
    <div className="form-group flex flex-col gap-1">
      <label htmlFor={props.id}>{t(props.label)}</label>
      <input
        className="border rounded-xl p-2"
        required
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        id={props.id}
        minLength={props.min || 0}
        placeholder={t(props.placeholder)}
      />
      <span className="text-red-400">{props.err}</span>
    </div>
  );
}

export default FormGroup;
