const statistikChart = ({
    id,
    namaSeri,
    data,
    labels,
    title
}) => {
    $(`#${id}`).empty();

    var options = {
        chart: {
            type: 'bar',
            toolbar: {show:false}
        },
        markers: {
            size: 0,
            color: undefined,
            strokeColors: '#fff',
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            shape: 'circle',
            radius: 2,
            discrete: []
        },
        series: [
            {name: namaSeri, data: data}
        ],
        title: {
            text: title
        },
        noData: {
            text: 'Loading...'
        },
        xaxis: {
            categories: labels
        }
    }

    var chart = new ApexCharts(document.getElementById(`${id}`), options);

    chart.render();
}