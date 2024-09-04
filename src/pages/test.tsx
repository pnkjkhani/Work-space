import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitError, setSubmitError] = useState<string>('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key as keyof FormData] = 'This field is required';
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');
  
    if (!validateForm()) {
      return;
    }
  
    try {
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        
        const otpResponse = await fetch('/api/storeOtp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: formData.email }),
        });
  
        if (otpResponse.ok) {
          const otpData = await otpResponse.json();
          console.log('OTP stored successfully:', otpData.message);
        } else {
          console.error('Failed to store OTP');
        }
  
        router.push('/verify');
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {submitError && (
            <div className="mb-4 text-red-600 text-sm">{submitError}</div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <div className="mt-1">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <div className="mt-1">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
