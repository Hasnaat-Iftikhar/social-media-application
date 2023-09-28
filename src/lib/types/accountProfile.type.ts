interface AccountProfileType {
  _id: string;
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
  bio: string;
  communities: string[];
  threads: string[];
  onboarded: boolean;
}

export default AccountProfileType;
