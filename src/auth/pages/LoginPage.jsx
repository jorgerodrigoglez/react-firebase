import { Link } from "react-router-dom";

export const LoginPage = () => {
  return (
    <div className="auth">
      <form className="auth__form">
        <h3 className="auth__title">Login:</h3>
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

        <button
          type="submit"
          className="auth__btn--login"
          //disabled={loading}
        >
          Login
        </button>

        <Link to="/auth/register" className="auth__link--register">
          Create new account
        </Link>
      </form>
    </div>
  );
};
