import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  controller: FormGroup = new FormGroup({});
  numberPattern: string = '^[0-9]*$';
  enable: boolean = false;

  ngOnInit(): void {
    this.initController();
    this.controller.valueChanges.subscribe(() => (this.enable = false));
  }

  initController(): void {
    this.controller.addControl(
      'colums',
      new FormControl('', [
        Validators.required,
        Validators.pattern(this.numberPattern),
      ])
    );
    this.controller.addControl(
      'rows',
      new FormControl('', [
        Validators.required,
        Validators.pattern(this.numberPattern),
      ])
    );
  }

  submit(): void {
    console.log('this.controller.valid: ', this.controller.valid);
    this.enable = this.controller.valid;
  }

  gameOver(): void {
    this.enable = false;
  }
}
