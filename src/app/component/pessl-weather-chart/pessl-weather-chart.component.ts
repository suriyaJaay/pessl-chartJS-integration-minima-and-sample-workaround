import { PesslInstrumentsDataService } from './../../service/pessl-instruments-data.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-pessl-weather-chart',
  templateUrl: './pessl-weather-chart.component.html',
  styleUrls: ['./pessl-weather-chart.component.css']
})
export class PesslWeatherChartComponent implements OnInit {

  public lessThanOrGreaterThan = 'lessThan';
  public filterRange = 50;
  public demoBarChart;

  public levelsArr = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug'];
  public months = [{ month: 'Jan', value: '0' },
  { month: 'Feb', value: '1' },
  { month: 'Mar', value: '2' },
  { month: 'Apr', value: '3' },
  { month: 'May', value: '4' },
  { month: 'Jun', value: '5' },
  { month: 'Jul', value: '6' },
  { month: 'Aug', value: '7' }];

  public from = '0';
  public toMonth = '7';

  public randomChartSource = {
    'dataSource1': Array.from({ length: 8 }, () => Math.floor(Math.random() * 590) + 10),
    'dataSource2': Array.from({ length: 8 }, () => Math.floor(Math.random() * 590) + 10)
  };
  public dropDownList: any;
  constructor(private weatherData: PesslInstrumentsDataService) { }

  ngOnInit() {

    this.loadResponse();
    // below static data needs to be converted into dynamic based on api response.
    this.demoBarChart = new Chart('bar', {
      type: 'bar',
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Student Admission Data'
        },
      },
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug'],
        datasets: [
          {
            type: 'bar',
            label: 'Static Range 1',
            data: this.randomChartSource.dataSource1,
            backgroundColor: 'rgba(20,200,10,0.4)',
            borderColor: 'rgba(20,200,10,0.4)',
            fill: false,
          }, {
            type: 'bar',
            label: 'Static Range 2',
            data: this.randomChartSource.dataSource2,
            backgroundColor: 'rgba(100,189,200,0.4)',
            borderColor: 'rgba(100,189,200,0.4)',
            fill: false,
          }
        ]
      }
    });
  }
  callFilter(value: any) {
    this.demoBarChart.data.datasets[0].data = this.randomChartSource.dataSource1;
    this.demoBarChart.data.datasets[1].data = this.randomChartSource.dataSource2;

    this.demoBarChart.data.datasets.forEach((data, i) => {
      if (this.lessThanOrGreaterThan === 'greaterThan') {
        this.demoBarChart.data.datasets[i].data = data.data.map(v => {
          if (v >= value) {
            return v;
          } else {
            return 0;
          };
        });
      } else {
        this.demoBarChart.data.datasets[i].data = data.data.map(v => {
          if (v <= value) {
            return v;
          } else {
            return 0;
          }
        });
      }
    });
    this.demoBarChart.update();
  }
  updateChartview(chart: any, data: any, dataSetIndex: any) {
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
  }

  clearData(chart: any) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset: any) => {
      dataset.data.pop();
    });
    chart.update();
  }

  loadResponse() {
    this.weatherData.loadData().subscribe(resp => {
      console.log('TYPE of RESPONSE', typeof (resp));
      this.dropDownList = resp;
      console.log('resolution List 1 ', this.dropDownList.data);
      console.log('date List 2 ', this.dropDownList.dates);
    });
  }

}
