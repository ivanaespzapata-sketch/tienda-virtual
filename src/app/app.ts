
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { Footer } from './components/footer/footer';
import { probarFirebase } from './firebase-test';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'tienda-virtual';

  ngOnInit(): void {
    probarFirebase();
  }
}
