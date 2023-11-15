import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'image-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss'
})
export class ImageCardComponent {
  @Input() albumId!: number;
  @Input() photoId!: number;
  @Input() title!: string;
  @Input() photoNumber!: number;
  @Input() url!: string;
}
