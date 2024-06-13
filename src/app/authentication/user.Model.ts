
export class User {
    user_ky:any;
    firstname: string;
    lastname: string;
    email: string; 
    password: string; 
    role?: Role;
  
    constructor(user: User) {
      this.user_ky=user.user_ky;
      this.firstname = user.firstname || '';
      this.lastname = user.lastname || '';
      this.email = user.email ; 
      this.password = user.password; 
      this.role = user.role ; 
    
    }
}  

export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
  NURSE = 'NURSE'
}

