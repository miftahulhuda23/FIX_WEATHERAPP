import React from "react";
import "./input.css";
import { useForm } from "react-hook-form";

const Input = (props) => {
  const { register, handleSubmit } = useForm();
  const { onSubmit } = props;

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="input"
          placeholder="Search Your City..."
          ref={register}
          name="city"
        />
        <button className="btn btn-success">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default Input;
