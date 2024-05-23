import { User } from "app/authentication/user.Model";

export class Personal extends User {
    department: string;
    uploadedFile: string;

    constructor(personal: Personal) {
        super(personal); // Appel du constructeur de la classe parente (User)
        this.department = personal.department;
        this.uploadedFile = personal.uploadedFile;
    }
}


  