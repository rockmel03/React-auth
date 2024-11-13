import { LoginButton, LogoutButton, Profile } from "./components";

export default function App() {
  return (
    <main className="column">
      <h1>Auth0 Login</h1>
      <LoginButton />
      <LogoutButton />
      <Profile />
    </main>
  );
}
