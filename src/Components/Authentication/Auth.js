import React, { useContext, useRef, useState } from "react";
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../Store/MessageSlice";

const Auth = () => {
  const [isLogin, setIslogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const authCtx=useContext(AuthContext)
  const dispatch=useDispatch();
  const messSlice=useSelector(state => state.message)
  

  const switchAuthModeHandler = () => {
    setIslogin((prevstate) => !prevstate);
  };
  

  const authFormHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    localStorage.setItem('email',enteredEmail)
  const enteredPassword = passwordInputRef.current.value;
  const userEmailz=enteredEmail.split(/[@.]/).join("");

    setLoading(true);
    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCjf_6OaBAYfGFkAEhAsm9ieCsnYoow8Ng";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCjf_6OaBAYfGFkAEhAsm9ieCsnYoow8Ng";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          return res.json();
         
        } else {
          return res.json().then((data) => {
            let errormessage = "Email Exists";
            if (data && data.error && data.error.message) {
              errormessage = data.error.message;
            }
            throw new Error(errormessage);
          });
        }
      })
      .then((data) => {
        if (isLogin) {
          navigate("/welcome");
          if(isLogin){
            fetcMessageshandler();

          }
        }
        authCtx.login(data.idToken)
        authCtx.setPrf(data.email)
        
      })
      .catch((err) => {
        alert(err.message);
      });
      // const userEmailz=enteredEmail.split(/[@.]/).join("");
      
      const fetcMessageshandler=async()=>{
            const response= await fetch(`https://emailclient-16191-default-rtdb.firebaseio.com/${userEmailz}.json`)
            const data= await response.json();
            console.log(data)
            for(const key in data){
            //   messageCtx.loadedMessages.push({
            //     id:key,
            //     rb:data[key].from,
            //     sub:data[key].userSub,
            //     text:data[key].usertext
            //   })
            dispatch(addMessage({
                id:key,
                rb:data[key].from,
                sub:data[key].userSub,
                text:data[key].usertext,
                read:data[key].read
            }))
              
             }
             console.log('slice',messSlice)

          }
          
         


  };
 
//   
 
  return (
  
    <Container  className="d-block justify-content-center  mt-5" >
      <Form onSubmit={authFormHandler} className="border border-secondary rounded   p-5 mt-3 ">
        <h2 className="text-center pb-3">{isLogin ? "Login" : "SignUp"}</h2>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {isLogin ? "Login" : "SignUp"}
        </Button>
        <Button
          onClick={switchAuthModeHandler}
          type="button"
          variant="primary"
          className="d-block mx-auto mt-3"
        >
          {isLogin ? "Create Acount" : "Log in Existing User"}
        </Button>
        <br />
        {loading && (
          <div className="d-block justify-content-center ms-5">
            <Spinner className="ms-5" animation="border" />
          </div>
        )}
      </Form>
    </Container>
    
  );
};

export default Auth;
