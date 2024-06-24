import React, { useState } from 'react';

function Login()
{
    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');

    const doLogin = async event =>
    {
        event.preventDefault();
        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        
        try
        {
            const response = await fetch('http://localhost:5000/api/login', 
                {method:'POST',body:js,headers:{'Content-Type':'application/json'}});
        
            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user =
                {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/Large Project';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Login to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST" onSubmit={doLogin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                            id="email"
                            name="email"
                            // type="email"
                            type="text"
                            autoComplete="email"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ref={(c) => loginName = c}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ref={(c) => loginPassword = c} // not sure if this is the best practice to get reference
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            // onClick={doLogin}
                        >
                            Login
                        </button>
                    </div>
                </form>

                {/* Find a way to  make the link go to the signup page*/}
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="/Signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">  
                    Create an account
                    </a>
                </p>
            </div>
        </div>
        
    )

    // return(
    //     <div id="loginDiv">
    //         <span id="inner-title">PLEASE LOG IN</span><br />
    //         <input type="text" id="loginName" placeholder="Username"
    //             ref={(c) => loginName = c} />
    //         <input type="password" id="loginPassword" placeholder="Password"
    //             ref={(c) => loginPassword = c} />
    //         <input type="submit" id="loginButton" class="buttons" value = "Do It" onClick={doLogin} />  
    //         <span id="loginResult"></span>
    //     </div>
    // );
};

export default Login;
