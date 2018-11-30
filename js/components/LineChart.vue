<script>
import { Line, mixins } from 'vue-chartjs'

export default {
    name: 'LineChart',
    extends: Line,
    mixins: [mixins.reactiveProp],
    props: ['options'],
    mounted () {
        Chart.defaults.global.legend.display = false;
        this.renderChart(this.chartData, this.options)
    }
}
</script>
