import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeteteButtonComponent } from './detete-button.component';

describe('DeteteButtonComponent', () => {
  let component: DeteteButtonComponent;
  let fixture: ComponentFixture<DeteteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeteteButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeteteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
