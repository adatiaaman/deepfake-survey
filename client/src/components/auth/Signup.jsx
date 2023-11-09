import React, { useState } from 'react';
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [error, setError] = useState('');
  const { signup, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  }

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  // const handleConfPasswordChange = (event) => {
  //   setConfPassword(event.target.value);
  // };

  const notifySuccess = (message) => {
    toast.success(message);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confPassword) {
      return setError('Passwords do not match');
    }
    else {
      setIsLoading(true);
      try {
        setError('');
        localStorage.setItem('currentVideoIndex', 0);

        // Assuming your signup function takes name, email, and password as arguments
        const checker = await signup(email, name , age, gender);
        console.log('ch', checker);
        
        if (checker == -1) {
          setError('Survey already filled.');
        }
        else {
          // notifySuccess("Account created successfully");
          console.log('111');
          await login(email, "123456");
          navigate('/survey');
        }
        
      } catch {
        setError('Failed to create an account');
      }
      setIsLoading(false);
    }
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-100 rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl text-center text-gray-800 mb-8">Sign up</h2>

        <form onSubmit={handleSubmit}>
        <div className="mb-6">
            <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
              Email*:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full py-2 px-4 bg-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-800 font-medium mb-2">
              Name (Optional):
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="w-full py-2 px-4 bg-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
              Age (Optional):
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={handleAgeChange}
              className="w-full py-2 px-4 bg-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-800 font-medium mb-2">
              Gender(M/F/O) (Optional):
            </label>
            <input
              type="text"
              id="gender"
              value={gender}
              onChange={handleGenderChange}
              className="w-full py-2 px-4 bg-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              
            />
          </div>

          {/* <div className="mb-6">
            <label htmlFor="password" className="block text-gray-800 font-medium mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full py-2 px-4 bg-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div> */}
          {/* <div className="mb-6">
            <label htmlFor="confpassword" className="block text-gray-800 font-medium mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confpassword"
              value={confPassword}
              onChange={handleConfPasswordChange}
              className="w-full py-2 px-4 bg-gray-500 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div> */}

          <div className="flex justify-center mb-6">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300"
            >
              Begin
            </button>
          </div>
        </form>

        {/* <div className="text-center">
          <p className="text-gray-800">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-500 font-medium">
              Log in
            </a>
          </p>
        </div> */}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>

      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-50 bg-gray-900">
          <div className="loader"> Processing...</div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
