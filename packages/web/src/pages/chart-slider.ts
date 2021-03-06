import { Page } from '../page';
import '@mazdik-lib/chart-slider';
import { ChartSliderComponent, ChartInterval, ChartSliderHandleDates } from '@mazdik-lib/chart-slider';

export default class ChartSliderDemo implements Page {

  get template(): string {
    return `<web-chart-slider class="chart-slider-demo scrollbar"></web-chart-slider>
    <button class="dt-button" id="button-zoom">zoom 2</button>
    <button class="dt-button" id="button-offset">set offset</button>
    <span id="result"></span>`;
  }

  load() {
    const component = document.querySelector('web-chart-slider') as ChartSliderComponent;
    component.handleMultiplier = 6;
    const now = new Date();
    component.dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
    component.dateTo = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    component.intervals = getTestChartIntervals();

    const resultElement = document.querySelector('#result') as HTMLElement;
    component.addEventListener('sliderChange', (event: CustomEvent<ChartSliderHandleDates>) => {
      const dateFrom = event.detail.dateFrom.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
      const dateTo = event.detail.dateTo.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
      resultElement.textContent = dateFrom + ' - ' + dateTo;
    });

    const buttonZoom = document.querySelector('#button-zoom') as HTMLButtonElement;
    buttonZoom.addEventListener('click', () => {
      component.zoom = 2;
    });
    const buttonOffset = document.querySelector('#button-offset') as HTMLButtonElement;
    buttonOffset.addEventListener('click', () => {
      const dateFrom = new Date(now.getFullYear(), now.getMonth(), 5);
      const dateTo = new Date(now.getFullYear(), now.getMonth(), 7)
      component.setOffsetX(dateFrom, dateTo, component.zoom);
    });
  }

}

function getTestChartIntervals(): ChartInterval[] {
  const now = new Date();
  return [
    {
      dtFrom: new Date(now.getFullYear(), now.getMonth(), 1),
      dtTo: new Date(now.getFullYear(), now.getMonth(), 2),
      label: 'Test1',
      color: '#F5A363',
    },
    {
      dtFrom: new Date(now.getFullYear(), now.getMonth(), 4),
      dtTo: new Date(now.getFullYear(), now.getMonth(), 5),
      label: 'Test2',
      color: '#7FB6EA',
    },
    {
      dtFrom: new Date(now.getFullYear(), now.getMonth(), 10),
      dtTo: new Date(now.getFullYear(), now.getMonth(), 11),
      label: 'Test3',
      color: '#7FB6EA',
    },
    {
      dtFrom: new Date(now.getFullYear(), now.getMonth(), 15),
      dtTo: new Date(now.getFullYear(), now.getMonth(), 17),
      label: 'Test4',
      color: '#B87FE5',
    },
    {
      dtFrom: new Date(now.getFullYear(), now.getMonth(), 16),
      dtTo: new Date(now.getFullYear(), now.getMonth(), 17),
      label: 'Test5',
      color: '#F5A363',
    },
    {
      dtFrom: new Date(now.getFullYear(), now.getMonth(), 16),
      dtTo: new Date(now.getFullYear(), now.getMonth(), 17),
      label: 'Test6',
      color: '#7FB6EA',
    },
    {
      dtFrom: new Date(now.getFullYear(), now.getMonth(), 22),
      dtTo: new Date(now.getFullYear(), now.getMonth(), 26),
      label: 'Test7',
      color: '#7FB6EA',
    },
  ];
}
