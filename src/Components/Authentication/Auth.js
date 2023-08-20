import React, { useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";

const Auth = () => {

    const emailInputRef=useRef();
    const passwordInputRef=useRef();

const authFormHandler=(e)=>{
   e.preventDefault();
   const enteredEmail=emailInputRef.current.value;
   const enteredPassword=passwordInputRef.current.value;
   let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCjf_6OaBAYfGFkAEhAsm9ieCsnYoow8Ng'
   fetch(
    url,
    {
    method: 'POST',
    body: JSON.stringify({
      email: enteredEmail,
      password: enteredPassword,
      returnSecureToken: true,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }
).then((res) => {

  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((data) => {
      let errormessage='Email Exists';
      if(data && data.error && data.error.message){
        errormessage=data.error.message;
      }
      throw new Error(errormessage)
    
    });
  }
}).then((data)=>{
  console.log(data)
})
.catch((err)=>{
  alert(err.message)

})
   

}
  return (
    <Container className="d-block justify-content-center mt-5 w-25 sm-w-100">
      <Form onSubmit={authFormHandler} className="border rounded p-5 mt-3 ">
      <h2 className="text-center pb-3">Sign Up</h2>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" ref={emailInputRef} />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" ref={passwordInputRef} />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          SignUp
        </Button>
      </Form>
    </Container>
  );
};

export default Auth;
