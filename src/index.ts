import { ApolloServer } from 'apollo-server';
import { Resolvers, Photo, PhotoCategory, User } from './types/generated/graphql';
import { importSchema } from 'graphql-import';
import { initialPhotos, initialUsers } from './sampleData';

const typeDefs = importSchema('schema.graphql');

let _id = 0;
const photos = initialPhotos;
const users = initialUsers;

const resolvers: Resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos as Photo[],
  },

  Mutation: {
    postPhoto(_, args) {
      const id = _id++;
      const { category, ...res } = args.input;
      const githubUser = 'tmpGithubUser';
      const postedBy = users.find((user) => {
        return user.githubLogin === githubUser;
      });

      if (postedBy) {
        throw new Error('unknown error occurred');
      }

      const newPhoto: Omit<Photo, 'url' | 'postedBy'> = {
        id: id.toString(),
        githubUser,
        // FIXME: 初期値の設定方法を改善
        category: category || PhotoCategory['Portrait'],
        ...res,
      }
      photos.push(newPhoto);

      return {
        ...newPhoto,
        // FIXME: Trivial Resolver でやりたい
        url: `http://assets.zerosant.com/img/${id}.jpg`,
        // TODO: 多対多を実現する
        postedBy: postedBy as unknown as User,
      };
    }
  },

  // Photo: {
  //   url: (parent) => `http://assets.zerosant.com/img/${parent.id}.jpg`,
  //   postedBy: (parent) => {
  //     return users.find(user => {
  //       return user.githubLogin === parent.githubUser;
  //     })
  //   }
  // }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen(3001).then(({ url }) => {
  console.log(`GraphQL Service running on ${url}`);
})
