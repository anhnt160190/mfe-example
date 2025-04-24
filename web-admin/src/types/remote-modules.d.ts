declare module 'mfe-web-auth/pages' {
  export function LoginPage(): JSX.Element;
}

declare module 'mfe-web-auth/features' {
  export function AuthProvider({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element;

  export function ProtectedRoute({
    children,
    permissions,
  }: {
    children: React.ReactNode;
    permissions: string[];
  }): JSX.Element;
}

declare module 'mfe-web-users/pages' {
  export function ListUsersPage(): JSX.Element;
}
