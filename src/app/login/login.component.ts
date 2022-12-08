import { Component, OnInit } from "@angular/core";
import { HttpService } from "../Shared/http.service";
import { FormControl, Validators } from "@angular/forms";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loading = false;
  buttonText = "Submit";

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  nameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);

  messageFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);


  constructor(public http: HttpService) {}

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.buttonText = "Submiting...";
    let user = {
      name: this.nameFormControl.value,
      email: this.emailFormControl.value,
      message: this.messageFormControl.value
    }
    this.http.sendEmail("http://localhost:3000/sendmail", user).subscribe(
      data => {
        console.log(
          `The email has been sent`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttonText = "Submit";
      },() => {
        this.loading = false;
        this.buttonText = "Submit";
      }
    );
  }

}
