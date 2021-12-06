import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { isEmail } from "validator";
import { register } from '../../common/AuthService'

export default function Register() {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault()
        if (!isEmail(email)) return toast.error('Pls enter a valid Email')

        if (email.length === 0) toast.error("Email must must not be Empty.")
        if (password.length < 8) toast.error("Password must be at least 8 characters")

        const data = {
            email,
            username,
            password
        }

        try {
            const registerData = await register(data)
            console.log(registerData)
            if (registerData.status < 300) {
                toast.success("Registered successfully")
                // history('/');
            }
        } catch (e) {
            console.log(e)
            console.log(e.message)
            // console.log(e.data.message)
            toast.error(e.message)
        }


    }

    return (
        <PageContainer>
            <Container>

                <FormContainer>
                    <h1>Register</h1>

                    <LoginForm onSubmit={(e) => submitForm(e.target.value)} >
                        <InputContainer>
                            <InputField placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />

                            <InputField placeholder="Email \ email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                            <InputField placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                            <SubmitButton onClick={submitForm} >Register</SubmitButton>
                        </InputContainer>
                    </LoginForm>
                </FormContainer>
            </Container>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height:100vh;
    justify-content:space-between;
`

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height:100vh;
    justify-content:center;
    justify-items:center;
    align-content: center;
    align-items:center;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    margin: 10px;
`

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
`

const LoginForm = styled.form`

`

const InputField = styled.input`
    margin:10px;
    width: 400px;
    border-radius: 10px;
    height: 50px;
    border: 1px solid grey;

    box-shadow: 1px 1px 5px 0px rgba(217,94,211,0.47);
-webkit-box-shadow: 1px 1px 5px 0px rgba(217,94,211,0.47);
-moz-box-shadow: 1px 1px 5px 0px rgba(217,94,211,0.47);

::placeholder,
::-webkit-input-placeholder {
  color: grey;
  margin-left: 30px;
  font-size: 1.5em;
  padding-left: 50px;

}
:-ms-input-placeholder {
   color: red;
   margin-left: 40px;
   padding-left: 50px;
}
`

const SubmitButton = styled.button`
    width: 400px;
    height: 50px;
    border-radius: 5px;
    border:none;
    color: white;
    font-size: 1.5em;
    background-color: purple;

    box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.32);
-webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.32);
-moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.32);


    &:hover {
box-shadow: 5px 5px 5px 0px rgba(217,94,211,0.47);
-webkit-box-shadow: 5px 5px 5px 0px rgba(217,94,211,0.47);
-moz-box-shadow: 5px 5px 5px 0px rgba(217,94,211,0.47);
    }
`