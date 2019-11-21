import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PesslWeatherChartComponent } from './component/pessl-weather-chart/pessl-weather-chart.component';
import { PesslInstrumentsDataService } from './service/pessl-instruments-data.service';


@NgModule({
  declarations: [
    AppComponent,
    PesslWeatherChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PesslInstrumentsDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
