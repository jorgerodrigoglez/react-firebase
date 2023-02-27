import { Link } from "react-router-dom";

export const RegisterPage = () => {
    return (
        <>
        <h3 className="auth__title">Register</h3>
  
        <form>
          {/* {msgError && <div className="auth__alert--error">{msgError}</div>} */}
  
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
  
          <button type="submit" className="btn btn-primary btn-block mb-5">
            Register
          </button>
  
          <Link to="/auth/login" className="link">
            Already register?
          </Link>
        </form>
      </>
    )
}
