// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
  name: string;
  username: string;
  location: string;
  avatar_url: string;
  email: string |  null;
  html_url: string;
  company: string | null;
  bio: string | null;
}