import { Link } from 'react-router';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { BsFillCreditCard2BackFill } from 'react-icons/bs';
import { IoIosSettings } from 'react-icons/io';

const navItems = [
  {
    label: 'Users',
    link: '/users',
    icon: <HiOutlineUserGroup />,
  },
  {
    label: 'Payments',
    link: '/payments',
    icon: <BsFillCreditCard2BackFill />,
  },
  {
    label: 'Settings',
    link: '/settings',
    icon: <IoIosSettings />,
  },
];

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-screen w-full'>
      <div className='relative flex w-[20rem] flex-col rounded-xl bg-white bg-clip-border p-4 text-gray-700 shadow-xl shadow-blue-gray-900/5'>
        <nav className='flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700'>
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className='flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'
            >
              <div className='grid mr-4 place-items-center'>{item.icon}</div>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <main className='flex-1 p-4 overflow-auto'>{children}</main>
    </div>
  );
};
