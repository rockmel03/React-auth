import { LoginButton, LogoutButton } from "./components";

export default function App() {
  return (
    <main className="column">
      <h1>Auth0 Login</h1>
      <LoginButton />
      <LogoutButton />
    </main>
  );
}
