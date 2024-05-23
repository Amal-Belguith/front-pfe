export interface UserDetails {
    user_ky: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string; // Note: Assurez-vous que vous ne renvoyez pas le mot de passe depuis le backend dans une application réelle.
    role: string;
    enabled: boolean;
    username: string;
    authorities: Authority[];
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
  }
  
  export interface Authority {
    authority: string;
  }
  