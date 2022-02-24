import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuarioLogin = false;

  constructor(public auth :AuthService) { }

  ngOnInit(): void {
    this.usuarioLogin = this.auth.isLogeado('');
    this.auth.changeLoginStatus.subscribe((statusLogin) => {
      this.usuarioLogin = statusLogin;
    })  
  }
}
