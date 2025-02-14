import React, { Component } from 'react';
import './Auth.css';
import AuthContext from '../context/auth-context';
class AuthPage extends Component { 

    state = {
        isLogin: true
    };

    static contextType =AuthContext;
    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }
    switchModeHandler = () => {
        this.setState(prevState => {
            return { isLogin: !prevState.isLogin };
        });
    };
    submitHandler = (event) => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        // Send the form data to the server
        // Perform the necessary authentication logic
        if (email.trim().length === 0 || password.trim().length === 0) { 
            return;
        }
        let requestBody = {
            query: `
                query login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        userId
                        token
                        tokenExpiration
                    }
                }
            `,
            variables: {
                email: email,
                password: password
            }
        };

        if (!this.state.isLogin) { 
            requestBody = {
              query: `
                mutation register($email: String!, $password: String!) {
                    createUser(userInput:{email: $email, password: $password}) {
                        _id
                        email
                    }
                }
            `,
            variables: {
                email: email,
                password: password
            }
            };
        }

         
        console.log(requestBody);
        fetch('http://localhost:3001/api', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Failed!');
            }
            return response.json();
        }).then(resData => {
            if(resData.data.login.token) {    
                if (resData.data.login.token) {
                    this.context.login(
                        resData.data.login.token,
                        resData.data.login.userId,
                        resData.data.login.tokenExpiration
                    );
                }
            }
        }).catch(err => {
            console.log(err);
        });

        // Reset the form inputs
        //this.emailEl.current.value = "";
        //this.passwordEl.current.value = "";
    };
    render() {
        return (
          <form className="auth-form" onSubmit={this.submitHandler}>   
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" ref={this.emailEl} />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={ this.passwordEl} />
                </div>
            <div className="form-actions">
                <button type="submit">Submit</button>
                    <button type="button" onClick={this.switchModeHandler}>Swtich to { this.state.isLogin ? 'Signup' : 'Login'}</button>
            </div>
            
          </form>
        );
    }
}

export default AuthPage;