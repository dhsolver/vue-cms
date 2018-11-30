<script>
import { Doughnut, mixins } from 'vue-chartjs'

export default {
    name: 'DonutChart',
    extends: Doughnut,
    mixins: [mixins.reactiveProp],
    props: ['options'],
    mounted () {
        Chart.defaults.global.legend.display = false;
        this.renderChart(this.chartData, this.options)
    }
}
</script>
