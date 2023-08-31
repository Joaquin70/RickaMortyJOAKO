import {useState} from "react";
import {validar} from "../../helpers";
import style from "../login/login.module.css"
function Login({login}) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "Email required", //
    password: "Password required", //
  });

  function inputHandler(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validar({
        ...userData,
        [e.target.name]: e.target.value,
      })
    );
  }

  function submitHandler(e) {
    e.preventDefault();

    login(userData);
  }

  function diseableHandler() {
    let disabled;
    for (let error in errors) {
      if (errors[error] === "") disabled = false;
      else {
        disabled = true;
        break;
      }
    }

    return disabled;
  }

  return (
    <div className={style.container}>
      <form onSubmit={submitHandler}>
        <div className={style.email}>
          <label>USERNAME</label>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={inputHandler}
            placeholder="example@gmail.com"
          />
          <span>{errors.email}</span>
        </div>
        <div className={style.password}>
          <label>PASSWORD</label>
          <input
            name="password"
            type="password"
            value={userData.password}
            onChange={inputHandler}
            placeholder="Password"
          />
        </div>
        {errors.password &&(<h5 className={style.error}>{errors.password} </h5>) }
        {/* {errors.password || errors.email ? null : (
          <button type="submit">SUBMIT</button>
        )} */}
        <button disabled={diseableHandler()} type="submit" className={style.submit}>
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default Login;


