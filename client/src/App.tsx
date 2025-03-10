import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// Set up the GraphQL endpoint
const httpLink = createHttpLink({
  uri: '/graphql', // Our GraphQL API endpoint
});

// Attach token for authentication
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Initialize Apollo Client and wrap apollo around the rountes
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Attach auth middleware
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<SearchBooks />} />
            <Route path="/saved" element={<SavedBooks />} />
            <Route path="*" element={<h1 className="display-2">Wrong page!</h1>} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;


