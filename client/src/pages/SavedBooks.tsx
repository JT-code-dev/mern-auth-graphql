import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import { removeBookId } from '../utils/localStorage';
import { getToken } from '../utils/auth';

const SavedBooks = () => {
  // Fetch user data with Apollo's useQuery hook
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me ?? { username: '', savedBooks: [] }; // ✅ Fixed fallback

  // Set up the removeBook mutation
  const [removeBook] = useMutation(REMOVE_BOOK, {
    update(cache, { data }) {
      if (data?.removeBook) {
        cache.writeQuery({
          query: GET_ME,
          data: {
            me: {
              ...userData,
              savedBooks: userData.savedBooks.filter((book: any) => book.bookId !== data.removeBook.bookId),
            },
          },
        });
      }
    },
  });

  // Function to handle deleting a book
  const handleDeleteBook = async (bookId: string) => {
    const token = getToken();
    if (!token) {
      console.error("⚠️ No token found! User must be logged in.");
      return false;
    }

    try {
      const { data } = await removeBook({
        variables: { bookId },
      });

      if (data?.removeBook) {
        removeBookId(bookId); // ✅ Remove from localStorage
        console.log(`✅ Successfully removed book with ID: ${bookId}`);
      }
    } catch (err) {
      console.error("❌ Error deleting book:", err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing {userData.username ? `${userData.username}'s` : 'saved'} books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved book${userData.savedBooks.length > 1 ? 's' : ''}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book: any) => (
            <Col md="4" key={book.bookId}>
              <Card border="dark">
                {book.image && <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant="top" />}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors?.join(', ')}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className="btn-block btn-danger" onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;

