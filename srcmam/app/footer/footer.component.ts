import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footer: string;

  constructor() { }

  ngOnInit(): void {
  this.footer=localStorage.getItem('footer')
  }

}
