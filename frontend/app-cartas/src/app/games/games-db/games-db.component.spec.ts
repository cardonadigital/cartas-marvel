import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesDbComponent } from './games-db.component';

describe('GamesDbComponent', () => {
  let component: GamesDbComponent;
  let fixture: ComponentFixture<GamesDbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesDbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesDbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
