import { useState } from "react";
import "../../App.css";
import "./css/form.css";

import { Link, useNavigate } from "react-router-dom";

export const Form = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    values: {
      fname: "",
      lname: "",
      phone: "",
      // sphone: "",
      email: "",
      dob: "",
      gender: "",
      address: "",
      hobbies: [],
      achievement: [{ title: "", date: "" }],
    },
    errors: {
      fname: "",
      lname: "",
      phone: "",
      // sphone: "",
      email: "",
      dob: "",
      gender: "",
      address: "",
      hobbies: "",
      achievement: "",
      errcolor: "red",
    },
  });

  const allvalidate = (e) => {
    e.preventDefault();
    let newform = e.target;

    // let allelements = document.getElementsByClassName("allvalidate");

    let allelements = [];
    console.log(typeof allelements);

    console.log(typeof newform);
    console.log(newform);

    // newform.forEach((item)=>{
    //   if (item.className.split(" ")[0] === "allvalidate") {
    //     allelements.push(item);
    //   }
    // })

    for (let i = 0; i < newform.length; i++) {
      if (newform[i].className.split(" ")[0] === "allvalidate") {
        allelements.push(newform[i]);
      }
    }

    allelements.forEach((item) => {
      let validatetype = item.classList[1];

      let name = item.name;

      let value = item.value;

      let errfield = item.classList[2];

      if (validatetype === "validate-type-name") {
        validatenames(name, value, errfield);
      }
      if (validatetype === "validate-type-checkempty") {
        validateempty(name, value, errfield);
      }
      if (validatetype === "validate-type-dob") {
        validatedob(name, value, errfield);
      }
      if (validatetype === "validate-type-phone") {
        validatephone(name, value, errfield);
      }
      if (validatetype === "validate-type-ischecked") {
        validatechecked(name, value, errfield, item);
      }
      if (validatetype === "validate-type-email") {
        validateemail(name, value, errfield);
      }
      if (validatetype === "validate-type-achievement") {
        validateachievement(name, value, errfield);
      }
    });

    let allvalues = form.values;
    let allerrors = form.errors;

    let errflag = 0;

    // allvalues.forEach((item)=>{
    //   if (item === "") {
    //     errflag = 1;
    //   }
    // })

    // allerrors.forEach((item,index)=>{
    //   if (item === "" || index==='errcolor') {
    //     errflag = 1;
    //   }
    // })

    for (let i in allvalues) {
      if (allvalues[i] === "") {
        errflag = 1;
      }
    }

    for (let i in allerrors) {
      if (allerrors[i] !== "" && i !== "errcolor") {
        errflag = 1;
      }
    }

    if (errflag !== 1) {
      navigate(`/users`);
    } else {
      alert("There are some errors..!");
    }
  };

  let phone_regex = /^[0-9]{10}$/;
  let letters = /^[a-zA-Z\s]*$/;
  let num_regex = /[0-9]+/;
  let mailformat = /^[a-z0-9]+[@]{1}([a-z]+[.]{1})+[a-zA-Z]{2,3}$/;

  function validatenames(name, value, errfield) {
    let newerrors = form.errors;
    let newvalues = form.values;

    if (value === "") {
      newerrors[name] = `**${errfield} can't be empty..!`;
    } else {
      if (value.match(num_regex)) {
        newerrors[name] = `**${errfield} contains numbers!`;
      } else {
        if (value.match(letters)) {
          newerrors[name] = "";
          newvalues[name] = value;
        } else {
          newerrors[name] = `**${errfield} contains special characters!`;
        }
      }
    }

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  function validateempty(name, value, errfield) {
    let newerrors = form.errors;
    let newvalues = form.values;

    if (value === "") {
      newerrors[name] = `**${errfield} can't be empty..!`;
    } else {
      newerrors[name] = "";

      newvalues[name] = value;
    }

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  function validatephone(name, value, errfield) {
    let newerrors = form.errors;
    let newvalues = form.values;

    if (value === "") {
      newerrors[name] = `**${errfield} can't be empty..!`;
    } else {
      if (value.match(phone_regex)) {
        newerrors[name] = "";
        newvalues[name] = value;
      } else {
        newerrors[name] = `**${errfield} is not valid..!`;
      }
    }

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  function validateemail(name, value, errfield) {
    let newerrors = form.errors;
    let newvalues = form.values;

    if (value === "") {
      newerrors[name] = `**${errfield} can't be empty..!`;
    } else {
      if (!value.match(mailformat)) {
        newerrors[name] = `**Please enter valid email!`;
      } else {
        newerrors[name] = "";
        newvalues[name] = value;
      }
    }

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  function validatedob(name, value, errfield) {
    let newerrors = form.errors;
    let newvalues = form.values;

    if (value === "") {
      newerrors[name] = `**${errfield} can't be empty..!`;
    } else {
      let dob = new Date(value);
      let today = new Date();

      let validdate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );

      if (validdate.toDateString() === dob.toDateString() || dob < validdate) {
        newerrors[name] = "";
        newvalues[name] = value;
      } else {
        if (dob > validdate) {
          newerrors[name] = "**Your age should be greater than 18..!";
        }
      }
    }

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  let checkflag = 0;

  function validatechecked(name, value, errfield, element) {
    let newerrors = form.errors;
    let newvalues = form.values;

    if (element.checked === true) {
      if (!newvalues[name].includes(element.value)) {
        newvalues[name].push(element.value);
      }
      checkflag = 1;
    } else {
      if (newvalues[name].includes(element.value)) {
        newvalues[name].splice(newvalues[name].indexOf(element.value), 1);
      }
      if (checkflag !== 1) {
        checkflag = 0;
      }
    }

    if (checkflag !== 0) {
      newerrors[name] = ``;
    } else {
      newerrors[name] = `**Plz select at-least 1 ${errfield}..!`;
    }

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  function validateachievement(name, value, errfield) {
    let newvalues = form.values;
    let newerrors = form.errors;

    let newachievement = newvalues.achievement;

    let flag = 0;

    newachievement.forEach((item) => {
      if (item.title === "" || item.date === "") {
        newerrors[name] = `**Plz fill ${errfield} properly..!`;
        flag = 1;
        return;
      }
    });

    if (flag === 0) {
      newerrors[name] = ``;
    }

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  function addAchievement() {
    let newvalues = form.values;
    let newerrors = form.errors;

    newvalues.achievement.push({ title: "", date: "" });

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  function removeAchievement(index) {
    let newvalues = form.values;
    let newerrors = form.errors;

    let newachievement = newvalues.achievement;

    newachievement.splice(index, 1);

    newvalues.achievement = newachievement;

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  function addDataInAchievement(e, index, type) {
    let newvalues = form.values;
    let newerrors = form.errors;

    newvalues.achievement[index][type] = e.target.value;

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  console.log(form);

  return (
    <div className="container">
      <div className="formdiv">
        <form className="form" onSubmit={(event) => allvalidate(event)}>
          <div className="fieldsrow">
            <div className="fields">
              <label>Firstname :-</label>
              <input
                type="text"
                name="fname"
                className="allvalidate validate-type-name First-name"
              />
            </div>

            {form.errors.fname !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.fname}
                </p>
              </div>
            )}
          </div>
          <div className="fieldsrow">
            <div className="fields">
              <label>Lastname :-</label>
              <input
                type="text"
                name="lname"
                className="allvalidate validate-type-name Last-name"
              />
            </div>
            {form.errors.lname !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.lname}
                </p>
              </div>
            )}
          </div>
          <div className="fieldsrow">
            <div className="fields">
              <label>Phone no. :-</label>
              <input
                type="text"
                name="phone"
                className="allvalidate validate-type-phone Phone-no."
              />
            </div>
            {form.errors.phone !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.phone}
                </p>
              </div>
            )}
          </div>

          {/* <div className="fieldsrow">
            <div className="fields">
              <label>Secondary Phone no. :-</label>
              <input
                type="text"
                name="sphone"
                className="allvalidate validate-type-phone Second-Phone-no."
              />
            </div>
            {form.errors.sphone !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.sphone}
                </p>
              </div>
            )}
          </div> */}

          <div className="fieldsrow">
            <div className="fields">
              <label>Email :-</label>
              <input
                type="text"
                name="email"
                className="allvalidate validate-type-email Email"
              />
            </div>
            {form.errors.email !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.email}
                </p>
              </div>
            )}
          </div>
          <div className="fieldsrow">
            <div className="fields">
              <label>D.O.B. :-</label>
              <input
                type="date"
                name="dob"
                className="allvalidate validate-type-dob D.O.B."
              />
            </div>
            {form.errors.dob !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>{form.errors.dob}</p>
              </div>
            )}
          </div>
          <div className="fieldsrow">
            <div className="fields">
              <label>Gender :-</label>
              <div className="fields">
                <select
                  name="gender"
                  className="allvalidate validate-type-checkempty Gender"
                >
                  <option value={""}>Select gender</option>
                  <option value={"Male"}>Male</option>
                  <option value={"Female"}>Female</option>
                  <option value={"Other"}>Other</option>
                </select>
              </div>
            </div>
            {form.errors.gender !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.gender}
                </p>
              </div>
            )}
          </div>
          <div className="fieldsrow">
            <div className="fields">
              <label>Address :-</label>
              <textarea
                name="address"
                className="allvalidate validate-type-checkempty Address"
              />
            </div>
            {form.errors.address !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.address}
                </p>
              </div>
            )}
          </div>
          <div className="fieldsrow">
            <div className="fields">
              <label>Hobbies :-</label>
              <div className="boxes">
                <div className="fields">
                  <label>Games :-</label>
                  <input
                    type="checkbox"
                    name="hobbies"
                    value={"Games"}
                    className="allvalidate validate-type-ischecked Hobby"
                  />
                </div>
                <div className="fields">
                  <label>Reading :-</label>
                  <input
                    type="checkbox"
                    name="hobbies"
                    value={"Reading"}
                    className="allvalidate validate-type-ischecked Hobby"
                  />
                </div>
                <div className="fields">
                  <label>Writing :-</label>
                  <input
                    type="checkbox"
                    name="hobbies"
                    value={"Writing"}
                    className="allvalidate validate-type-ischecked Hobby"
                  />
                </div>
              </div>
            </div>
            {form.errors.hobbies !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.hobbies}
                </p>
              </div>
            )}
          </div>
          <div className="fieldsrow">
            <div className="fields">
              <label>Achievements :-</label>
              <div className="fields">
                {form.values.achievement.map((element, i) => (
                  <div key={i} className="fields">
                    <div>
                      <label>Title </label>
                      <input
                        type="text"
                        // value={element.title}
                        name={`achievement`}
                        onChange={(e) => addDataInAchievement(e, i, "title")}
                        className="allvalidate validate-type-achievement Achievements"
                      />
                    </div>
                    <div>
                      <label>Date </label>
                      <input
                        type="date"
                        // value={element.date}
                        name={`achievement`}
                        onChange={(e) => addDataInAchievement(e, i, "date")}
                        className="allvalidate validate-type-achievement Achievements"
                      />
                    </div>
                    {form.values.achievement.length - 1 > 0 ? (
                      <div>
                        <input
                          type="button"
                          value={"-"}
                          onClick={() => removeAchievement(i)}
                        />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div>
                <input
                  type="button"
                  value={"+"}
                  onClick={() => addAchievement()}
                />
              </div>
              {form.errors.achievement !== "" && (
                <div className="fields">
                  <p style={{ color: form.errors.errcolor }}>
                    {form.errors.achievement}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="fieldsrow">
            <div className="actions">
              <input type="submit" name="submit" value={"Submit"} />
              <input type="reset" name="reset" value={"Reset"} />
            </div>
          </div>
        </form>
      </div>
      <Link to={`/users`}>Go to Users..!</Link>
    </div>
  );
};
