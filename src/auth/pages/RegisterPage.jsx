import { Link } from "react-router-dom";

export const RegisterPage = () => {
  return (
    <div className="auth">
      <form className="auth__form">
        {/* {msgError && <div className="auth__alert--error">{msgError}</div>} */}
        <h3 className="auth__title">Register:</h3>

        <input
          type="text"
          placeholder="Nombre"
          name="name"
          className="auth__input"
          //value={name}
          //onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          //value={email}
          //onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          //value={password}
          //onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          //value={password2}
          //onChange={handleInputChange}
        />

        <button type="submit" className="auth__btn">
          Register
        </button>

        <Link to="/auth/login" className="auth__link">
          Already register?
        </Link>
      </form>
    </div>
  );
};
