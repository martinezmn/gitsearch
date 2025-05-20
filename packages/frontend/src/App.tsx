import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GithubSearch from "./components/GithubSearch";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GithubSearch />
    </QueryClientProvider>
  );
}
