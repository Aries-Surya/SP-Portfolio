import { Component, OnInit } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const typed = document.querySelector('.typed');
    if (typed) {
      let typed_strings = typed.getAttribute('data-typed-items');
      if (typed_strings) {
        const stringsArray = typed_strings.split(','); // Split the string into an array
        new Typed('.typed', {
          strings: stringsArray, // Use the array of strings
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000,
        });
      }
    }
  }
}
