import React, { Fragment, useState } from "react";
import { api } from "../axios";

const ProfileForm = () => {
  const [name, setName] = useState("");

  let formData = {};

  const handleSubmitForm = async (event) => {
    formData = {
      Name: name,
    };

    try {
      let res = await api.post("profile", formData);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormChange = (event) => {
    let targetValue = event.target.value;
    switch (event.target.name) {
      case "name":
        setName(targetValue);
        break;
      default:
        break;
    }
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-lg-8 m-auto">
          <div className="card shadow p-2">
            <h2 className="p-2">Please choose a display name to get started</h2>
            <form className="p-3" action="">
              <input
                className="w-100 p-2 mb-2"
                name="name"
                type="text"
                placeholder="Justin Gates"
                onChange={handleFormChange}
              />
              <div className="px-5 mx-5 pt-3">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleSubmitForm}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileForm;
