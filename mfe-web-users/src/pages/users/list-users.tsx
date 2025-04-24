import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { getUsers, IUser } from '../../services/user.service';

export const ListUsersPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState<IUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Get page from query string or default to 1
  const getPageFromQuery = () => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page');
    return page ? parseInt(page) : 1;
  };
  
  const currentPage = getPageFromQuery();
  const perPage = 10;

  useEffect(() => {
    setLoading(true);
    getUsers({ page: currentPage, perPage })
      .then((response) => {
        setUsers(response.data);
        setTotalCount(response.totalCount);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  const handleUserClick = (userId: string) => {
    return navigate(`/users/${userId}`);
  };
  
  const handlePageChange = (page: number) => {
    navigate(`/users?page=${page}`);
  };

  // Calculate total pages based on total count and perPage
  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / perPage);
  }, [totalCount, perPage]);

  // Generate page numbers array for pagination
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxPageButtons = 5;
    
    if (totalPages <= maxPageButtons) {
      // If total pages less than max buttons, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);
      
      // Adjust start page if end page is maxed out
      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - maxPageButtons + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }, [currentPage, totalPages]);

  return (
    <div>
      <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                User Name
              </th>
              <th scope='col' className='px-6 py-3'>
                Email
              </th>
              <th scope='col' className='px-6 py-3'>
                phone
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className='px-6 py-4 text-center'>Loading...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={3} className='px-6 py-4 text-center'>No users found</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className='bg-white border-b border-gray-200 hover:bg-gray-100 cursor-pointer'
                  onClick={() => handleUserClick(user.id)}
                >
                  <td className='px-6 py-4'>{user.name}</td>
                  <td className='px-6 py-4'>{user.email}</td>
                  <td className='px-6 py-4'>{user.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1 || loading}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || loading}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              {totalCount > 0 ? (
                <>
                  Showing <span className="font-medium">{(currentPage - 1) * perPage + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(currentPage * perPage, totalCount)}</span> of{' '}
                  <span className="font-medium">{totalCount}</span> results
                </>
              ) : (
                'No results'
              )}
            </p>
          </div>
          {totalPages > 0 && (
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage <= 1 || loading}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                  </svg>
                </button>
                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={loading}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === page ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages || loading}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
