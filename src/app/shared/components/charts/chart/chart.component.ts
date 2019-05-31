import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import * as Chart from 'chart.js';
import 'chartjs-plugin-dragdata';

@Component({
    selector: 'beerless-charts',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

    // required
    @Input() type: string;
    @Input() labels: Array<any>;
    @Input() datasets: Array<any>;

    // optional
    @Input() options = {};
    @Input() draggable = false;
    @Input() dragX = false;
    @Input() dragY = false;
    @Input() dragDataRound = 0;

    createdChart;
    @ViewChild('chart') chart: ElementRef;

    constructor(private cdRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        if (!this.type) {
            throw new TypeError('\'Type\' is required');
        }
        if (!this.labels) {
            throw new TypeError('\'Labels\' is required');
        }
        if (!this.datasets) {
            throw new TypeError('\'Datasets\' is required');
        }

        // create chart
        this.createChart({
            type: this.type,
            data: {
                labels: this.labels,
                datasets: this.datasets
            },
            options: this.options
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.createdChart) {
            this.updateChart();
        }
    }

    createChart(chartConfig) {
        const chart = this.chart.nativeElement;
        this.createdChart = new Chart(chart, {
            type: chartConfig.type,
            data: chartConfig.data,
            options: chartConfig.options,
        });
    }

    updateChart() {
        this.createdChart.update();
    }
}
