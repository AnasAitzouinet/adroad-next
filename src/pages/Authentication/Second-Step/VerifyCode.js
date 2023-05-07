import { useState  } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from 'next/router';

export default function VerifyCode() {
  const router = useRouter();
    const [enteredCode, setEnteredCode] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("/api/VerificationCode/VerifyCode", {
            enteredCode,
          });
          // Display success message
          Swal.fire({
            icon: "success",
            title: "Registration successful!",
            text: "Thank you for registering.",
          }).then(() => {
            // Redirect to another page after alert is closed
            router.push('/Authentication/login');
          });
        } catch (error) {
          console.error(error);
    
          // Display error message
          Swal.fire({
            icon: "error",
            title: "Registration error",
            text: error.response.data.message,
          });
        }
      };
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className="mx-auto mt-10 max-w-3xl">
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6">
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-gray-900">
              Verify Your Account
            </h1>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit} method="post">
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-500">
                Please check your email for the verification code. Enter the
                code to complete your account verification :
              </p>
              <div className="mb-6">
                <label
                  for="default-input"
                  className="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Default input
                </label>
                <input
                  type="text"
                  id="enteredCode"
                  required
                  onChange={(e) => setEnteredCode(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5 dark:bg-gray-700
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                    dark:focus:ring-gray-900 dark:focus:border-gray-900
                    text-center
                    "
                />
                <button
                  type="submit"
                  className="mt-5 px-10 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm  py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Verify
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Resend code
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
