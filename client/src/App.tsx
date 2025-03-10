import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import "./App.css"; 
import { Routes, Route } from "react-router-dom"; // Import Routes here
import Navbar from './components/Navbar';
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', 
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<SearchBooks />} />
            <Route path="/saved" element={<SavedBooks />} />
            <Route path="*" element={<h1 className="display-2">Wrong page!</h1>} />
          </Routes>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;


















