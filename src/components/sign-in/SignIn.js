import './SignIn.css'
import {
  BrowserRouter as Router, Switch, Route, Link, withRouter
} from "react-router-dom";
import FooterPage from "../footer-page/FooterPage";
import Error from "../error/Error";
import {useState} from "react";
import postFetch from "../../services/postFetch";
import {useSelector} from "react-redux";


function SignIn({history}) {

  const loggedIn = useSelector(({user: {loggedIn}}) => loggedIn)
  loggedIn && history.push("/")


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errors, setErrors] = useState('')

  const ClickSignIn = () => {

    const option ={
      method: "post",
      data : {
        user: {email, password}}
    }

    postFetch('/api/users/login', option)
                .then(({data:{user}}) =>{

          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("token", JSON.stringify(user.token))
        })
        .catch(({response:{data:{errors}}}) => {
          setErrors(errors)
        })

  }

  return (
      <div className='modal-wrapper'>

        <div className='sign'>
          <div className='sign-form'>

            <p className='sign-title'>Sign in</p>
            <Link className='sign-link' to='/register'>Need an account?</Link>

            <div className='errors-wrapper'>
              {errors && <Error errors={errors}/>}
            </div>

            <input onChange={(e) => setEmail(e.currentTarget.value)}
                   className='sign-input' type='email' placeholder='Email'/>
            <input onChange={(e) => setPassword(e.currentTarget.value)}
                   className='sign-input' type='password' placeholder='Password'/>
            <div className='btn-wrapper'>
              <input onClick={() => ClickSignIn()} className='sign-btn' type="button" value='Sign in'/>
            </div>
          </div>
        </div>

        <FooterPage/>

      </div>
  );
}
export default  withRouter(SignIn)
