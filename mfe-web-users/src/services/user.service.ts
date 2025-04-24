export interface IBasePagination {
  page?: number;
  perPage?: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IPaginatedResponse<T> {
  data: T[];
  totalCount: number;
}

export const getUsers = async (params: IBasePagination): Promise<IPaginatedResponse<IUser>> => {
  const { page = 1, perPage = 10 } = params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${perPage}`
  );
  
  // Get total count from response headers
  // JSONPlaceholder API provides X-Total-Count header
  const totalCount = parseInt(response.headers.get('X-Total-Count') || '0');
  const data = await response.json();
  
  return {
    data,
    totalCount
  };
};

export const getUserById = async (userId: string) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return response.json();
};
