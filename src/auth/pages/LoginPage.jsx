import { Link } from "react-router-dom";
import { useForm } from "../../hooks";

export const LoginPage = () => {

  const { email, password , handleInputChange } = useForm({
    email: 'jrg@gmail.com',
    password: '123456',
  });

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({email,password})
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={onSubmit}>
        <h3 className="auth__title">Login:</h3>
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="auth__btn"
          //disabled={loading}
        >
          Login
        </button>

        <Link to="/auth/register" className="auth__link">
          Create new account
        </Link>
      </form>
    </div>
  );
};
