import { loginEndpoint } from '../../spotify';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
       
        <a href={loginEndpoint} className="login-button">
          LOG IN
        </a>
      </div>
    </div>
  );
};

export default Login;
