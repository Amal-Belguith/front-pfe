export class Appointment {

    app_ky:any;
    first:string;
    last:string;
    gender:string;
    mobile:string;
    address:string;
    email:string;
    dob:Date;
    doctor:string;
    doa :Date;
    timeslot:string;
    injury:string;
    user_ky?:number;
    
  
    constructor(app: Appointment) {
     this.app_ky=app.app_ky;
     this.first=app.first;
     this.last=app.last;
     this.gender=app.gender;
     this.mobile=app.mobile;
     this.address=app.address;
     this.email=app.email;
     this.dob=app.dob;
     this.doa=app.doa;
     this.doctor=app.doctor;
     this.timeslot=app.timeslot;
     this.injury=app.injury;
     this.user_ky=app.user_ky;
    }
  }