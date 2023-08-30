// import * as Waypoint from 'waypoints/lib/noframework.waypoints.min.js';
import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent{
  
}
// export class AboutComponent implements OnInit {

//   constructor(private el: ElementRef) {}

//   ngOnInit() {
//     const skilsContent = this.el.nativeElement.querySelector('.skills-content');
//     if (skilsContent) {
//       const progressBars = this.el.nativeElement.querySelectorAll('.progress .progress-bar');
//       const waypoint = new Waypoint({
//         element: skilsContent,
//         offset: '80%',
//         handler: function (direction: any) {
//           progressBars.forEach((el: HTMLElement) => {
//             el.style.width = el.getAttribute('aria-valuenow') + '%';
//           });
//         }
//       });
//     }
//   }
// }
