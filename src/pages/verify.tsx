'use client';
import React, { useState } from 'react';

interface VerificationFormData {
  verificationCode: string;
}

const page: React.FC = () => {
  const [formData, setFormData] = useState<VerificationFormData>({
    verificationCode: '',
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.verificationCode.trim()) {
      setError('Verification code is required');
      return;
    }

    try {
      // Here you would typically send a request to your API to verify the code
      // For this example, we'll just simulate a successful verification
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      setSuccess('Verification successful!');
    } catch (error) {
      setError('Failed to verify code. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 text-red-600 text-sm">{error}</div>
          )}
          {success && (
            <div className="mb-4 text-green-600 text-sm">{success}</div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <div className="mt-1">
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={formData.verificationCode}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
