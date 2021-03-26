import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyItemCardComponent } from './currency-item-card.component';

describe('CurrencyItemCardComponent', () => {
  let component: CurrencyItemCardComponent;
  let fixture: ComponentFixture<CurrencyItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [], 
      declarations: [ CurrencyItemCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
