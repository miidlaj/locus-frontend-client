export default class User {
    id: string;
    email: string;
    password: string;
    name: string;
    phone: string;
    role: string;
  
    constructor(
    id: string, 
    email: string, 
    password: string, 
    name: string, 
    phone: string, 
    role: string
) {
    this.id = id
    this.email = email
    this.password = password
    this.name = name
    this.phone = phone
    this.role = role
  }
}