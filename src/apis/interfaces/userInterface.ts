interface User {
  username: string,
  email: string,
  password: string,
  profileImage: string,
  profileThumbImage: string,
  accountCreatedDate,
  isDeleted: boolean,
  comparePasswordinDb(password: string, passwordDB: string): Promise<boolean>;
}




