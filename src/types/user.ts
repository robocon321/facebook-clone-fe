export interface IUser
{
  fullname: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  dp: string;
  cover: string;
  hometown: string;
  currentCity: string;
  relationship: string;
  phone?: string;
}

export interface IStory
{
  _id: string;
  image: string;
  user: {
    _id: string;
    fullname: string;
    dp?: string;
  };
  createdAt: Date;
}
