import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyItemListComponent } from './currency-item-list.component';

describe('CurrencyItemListComponent', () => {
  let component: CurrencyItemListComponent;
  let fixture: ComponentFixture<CurrencyItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyItemListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
