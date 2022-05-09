export const resolvers = {
    Query: {
      books: () => {
        const books = [
          {
            title: "The Awakening",
            author: "Hitesh Gupta",
          },
          {
            title: "City of Glass",
            author: "Paul Auster",
          },
        ];
        return books;
      },
    },
  };
  