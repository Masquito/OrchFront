import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterBarComponent } from './center-bar.component';

describe('CenterBarComponent', () => {
  let component: CenterBarComponent;
  let fixture: ComponentFixture<CenterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CenterBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CenterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
