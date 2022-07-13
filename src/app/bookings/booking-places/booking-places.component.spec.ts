import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPlacesComponent } from './booking-places.component';

describe('BookingPlacesComponent', () => {
  let component: BookingPlacesComponent;
  let fixture: ComponentFixture<BookingPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingPlacesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
