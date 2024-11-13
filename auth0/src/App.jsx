import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton, LogoutButton, Profile } from "./components";

export default function App() {
  const { isLoading, error } = useAuth0();
  return (
    <main className="column">
      <h1>Auth0 Login</h1>
      {error && <p>Authentication error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />
        </>
      )}
    </main>
  );
}
