import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';

import { useAuth } from '../../contexts/Auth.context';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      await login(values.email, values.password);
      return navigate('/landing');
    },
  });

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <h2 className='mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
        Sign in to your account
      </h2>

      <div className='mt-4 sm:mx-auto sm:w-full sm:max-w-sm'>
        {error && (
          <div className='rounded-md p-2 bg-red-100 mb-2'>
            <p className='text-red-800'>{error}</p>
          </div>
        )}
        <form className='space-y-5' onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor='email'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Email address
            </label>
            <div className='mt-1.5'>
              <input
                id='email'
                name='email'
                type='email'
                onChange={formik.handleChange}
                value={formik.values.email}
                autoComplete='email'
                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
              {formik.touched.email && formik.errors.email && (
                <label className='text-red-500'>{formik.errors.email}</label>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Password
            </label>
            <div className='mt-1.5'>
              <input
                id='password'
                name='password'
                type='password'
                onChange={formik.handleChange}
                value={formik.values.password}
                autoComplete='current-password'
                className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
              />
              {formik.touched.password && formik.errors.password && (
                <label className='text-red-500'>{formik.errors.password}</label>
              )}
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
