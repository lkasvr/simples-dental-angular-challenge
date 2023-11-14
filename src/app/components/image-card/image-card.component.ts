import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FilteredPhoto } from '../../pages/gallery/gallery.component';

@Component({
  selector: 'image-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss'
})
export class ImageCardComponent implements OnInit {
  @Input() photo!: FilteredPhoto;
  @Input() photoIndex!: number;

  ngOnInit(): void {
      console.log(this.photo)
  }
}
