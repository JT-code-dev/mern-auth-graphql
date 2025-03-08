import { GraphQLError } from 'graphql';
import User, { UserDocument } from '../models/User.js';
import { signToken } from '../services/auth.js';

// Define Context Type
interface ContextType {
    user?: UserDocument;
}

const resolvers = {
    Query: {
        me: async (_parent: unknown, _args: unknown, context: ContextType): Promise<UserDocument | null> => {
            if (!context.user) {
                throw new GraphQLError('Please log in!', { extensions: { code: 'UNAUTHENTICATED' } });
            }
            return await User.findById(context.user._id).exec();
        },
    },
    Mutation: {
        login: async (
            _parent: unknown,
            { email, password }: { email: string; password: string }
        ): Promise<{ token: string; user: UserDocument }> => {
            const user = await User.findOne({ email }).exec();
            if (!user || !(await user.isCorrectPassword(password))) {
                throw new GraphQLError(
                    'Oops! Incorrect username or password. . .please try again!',
                    { extensions: { code: 'UNAUTHENTICATED' } }
                );
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (
            _parent: unknown,
            { username, email, password }: { username: string; email: string; password: string }
        ): Promise<{ token: string; user: UserDocument }> => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (
            _parent: unknown,
            { book }: { book: any },
            context: ContextType
        ): Promise<UserDocument | null> => {
            if (!context.user) {
                throw new GraphQLError('You must be logged in to save a book!', {
                    extensions: { code: 'UNAUTHENTICATED' }
                });
            }
            return await User.findByIdAndUpdate(
                context.user._id,
                { $addToSet: { savedBooks: book } },
                { new: true, runValidators: true }
            ).exec();
        },
        removeBook: async (
            _parent: unknown,
            { bookId }: { bookId: string },
            context: ContextType
        ): Promise<UserDocument | null> => {
            if (!context.user) {
                throw new GraphQLError('You must be logged in to edit your book list!', {
                    extensions: { code: 'UNAUTHENTICATED' }
                });
            }
            return await User.findByIdAndUpdate(
                context.user._id,
                { $pull: { savedBooks: { bookId } } },
                { new: true }
            ).exec();
        },
    },
};

export default resolvers;
