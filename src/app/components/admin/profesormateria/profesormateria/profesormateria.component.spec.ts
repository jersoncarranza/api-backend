import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesormateriaComponent } from './profesormateria.component';

describe('ProfesormateriaComponent', () => {
  let component: ProfesormateriaComponent;
  let fixture: ComponentFixture<ProfesormateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesormateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesormateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
