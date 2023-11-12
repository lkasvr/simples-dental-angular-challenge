import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';

describe('Initiating Components', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ToolbarComponent', () => expect(component).toBeTruthy());

  it('should call toggleTheme emitter', () => {
    spyOn(component.toggleTheme, 'emit');

    const nativeEl = fixture.nativeElement;
    const slideToggle = nativeEl.querySelector('.slide-toggle-theme button');
    slideToggle.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.toggleTheme.emit).toHaveBeenCalled();
  });
});
