import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-detete-button',
  imports: [],
  templateUrl: './detete-button.component.html',
  styleUrl: './detete-button.component.css'
})
export class DeteteButtonComponent {
  disabled=input<Boolean>();
  clickEvent=output<Event>();
  onClick(event:Event){
    this.clickEvent.emit(event);
  }
}
