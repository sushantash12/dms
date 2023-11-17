import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDirModalComponent } from './create-dir-modal.component';

describe('CreateDirModalComponent', () => {
  let component: CreateDirModalComponent;
  let fixture: ComponentFixture<CreateDirModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDirModalComponent]
    });
    fixture = TestBed.createComponent(CreateDirModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
