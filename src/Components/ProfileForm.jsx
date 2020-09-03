import React, { Fragment, useState } from "react";
import { api } from "../axios";

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  let formData = {};

  const handleSubmitForm = async () => {
    // setLoading(true);a
    formData = {
      Name: name,
      Email: email,
      PhoneNumber: phoneNumber,
      LogoUrl: logoUrl,
      State: state,
      City: city,
      Address: address,
    };
    try {
      let res = await api.post("organization", formData);
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
      case "email":
        setEmail(targetValue);
        break;
      case "phoneNumber":
        setPhoneNumber(targetValue);
        break;
      case "logoUrl":
        setLogoUrl(targetValue);
        break;
      case "state":
        setState(targetValue);
        break;
      case "city":
        setCity(targetValue);
        break;
      case "address":
        setAddress(targetValue);
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
            <h2 className="p-2">Fill out this form to get started</h2>
            <form className="p-3" action="">
              <label className="p-0 m-0 pl-1 pt-2">Organization name</label>
              <input
                className="w-100 p-2 mb-2"
                name="name"
                type="text"
                placeholder="Organization name"
                onChange={handleFormChange}
              />
              <label className="p-0 m-0 pl-1 pt-2">E-mail</label>
              <input
                className="w-100 p-2 mb-2"
                name="email"
                type="text"
                placeholder="Email"
                onChange={handleFormChange}
              />
              <label className="p-0 m-0 pl-1 pt-2">Logo Url</label>
              <input
                className="w-100 p-2 mb-2"
                name="logoUrl"
                type="text"
                placeholder="Logo Url"
                onChange={handleFormChange}
              />
              <label className="p-0 m-0 pl-1 pt-2">State</label>
              <input
                className="w-100 p-2 mb-2"
                name="state"
                type="text"
                placeholder="State"
                onChange={handleFormChange}
              />
              <label className="p-0 m-0 pl-1 pt-2">City</label>
              <input
                className="w-100 p-2 mb-2"
                name="city"
                type="text"
                placeholder="City"
                onChange={handleFormChange}
              />
              <label className="p-0 m-0 pl-1 pt-2">Address</label>
              <input
                className="w-100 p-2 mb-2"
                name="address"
                type="text"
                placeholder="Address"
                onChange={handleFormChange}
              />
              <label className="p-0 m-0 pl-1 pt-2">Phone Number</label>
              <input
                className="w-100 p-2 mb-2"
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
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
