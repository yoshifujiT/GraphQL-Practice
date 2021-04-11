import { Photo, PhotoCategory, User } from './types/generated/graphql';

export const initialUsers: Omit<User, 'postedPhotos'>[] = [
  {
    githubLogin: 'testUser1',
    name: 'testUserName1',
    avatar: 'avatar1',
  },
  {
    githubLogin: 'testUser2',
    name: 'testUserName2',
    avatar: 'avatar2',
  },
  {
    githubLogin: 'testUser3',
    name: 'testUserName3',
    avatar: 'avatar3',
  },
];

export const initialPhotos: Omit<Photo, 'url' | 'postedBy'>[] = [
  {
    id: '111',
    name: 'photo1',
    description: 'description1',
    category: PhotoCategory['Action'],
    githubUser: 'testUser2',
  },
  {
    id: '222',
    name: 'photo2',
    category: PhotoCategory['Selfie'],
    githubUser: 'testUser3',
  },
  {
    id: '333',
    name: 'photo3',
    description: 'description3',
    category: PhotoCategory['Landscape'],
    githubUser: 'testUser3',
  },
];
