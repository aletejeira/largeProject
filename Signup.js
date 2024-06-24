import React, { useState } from 'react';


// Add "Already have an account? Log in" at the top of the form below Sign up

function Signup()
{
    var username;
    // Probably shouldn't require these two.
    // var firstName; 
    // var lastName;
    var signupEmail;
    var signupPassword;
    const [message,setMessage] = useState('');

    const doSignup = async event =>
    {
        event.preventDefault();
        var obj = {signup:username.value,password:signupPassword.value};
        var js = JSON.stringify(obj);
        
        try
        {
            // Probably needs to be /api/signup
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


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="border border-solid  border-indigo-600 sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create your account
                </h2>
            </div>

            {/* space-y-6 */}

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-5 border border-solid border-indigo-600" action="#" method="POST" onSubmit={doSignup}>
                    <div>
                        {/* htmlFor indicates the form element that this label describes */}
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900"> 
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                            id="username"
                            name="username"
                            // type="email"
                            type="text"
                            autoComplete="username"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ref={(c) => username = c}
                            />
                        </div>
                    </div>
        
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
                            ref={(c) => signupEmail = c}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ref={(c) => signupPassword = c} // not sure if this is the best practice to get reference
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            // onClick={doLogin}
                        >
                            Signup
                        </button>
                    </div>
                </form>

                {/* Find a way to make the link go to the signup page*/}
                <p className="mt-10 text-center text-sm text-gray-500">
                    By signing up you agree to our {' '}
                    <a href="#" className="font-semibold leading-6 text-blue-500 hover:text-indigo-500">  
                    Terms of Service
                    </a>
                    {' '} and {' '}
                    <a href="#" className="font-semibold leading-6 text-blue-500 hover:text-indigo-500">  
                    Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    )
};

export default Signup;