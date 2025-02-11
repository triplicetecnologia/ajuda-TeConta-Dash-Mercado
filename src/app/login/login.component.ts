import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MatGridListModule, MatCardModule, MatIconModule, MatInputModule,
    MatRadioModule, 
    MatSelectModule,
    MatButtonModule, 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(private router: Router){

  }


  getAssetUrl(img: string) {
    return `assets/${img}`;
  }


  cadastrar(){
    this.router.navigate(['cadastrar']);

  }

}
