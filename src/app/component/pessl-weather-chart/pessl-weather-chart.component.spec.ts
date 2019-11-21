import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesslWeatherChartComponent } from './pessl-weather-chart.component';

describe('PesslWeatherChartComponent', () => {
  let component: PesslWeatherChartComponent;
  let fixture: ComponentFixture<PesslWeatherChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesslWeatherChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesslWeatherChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
