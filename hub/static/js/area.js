import $ from 'jquery/dist/jquery.slim'
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js'
import trackEvent from './analytics.esm.js'
import Collapse from 'bootstrap/js/dist/collapse'
import Dropdown from 'bootstrap/js/dist/dropdown'

Chart.register( BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip);

Chart.defaults.font.family = '"Public Sans", sans-serif'
Chart.defaults.font.size = 12
Chart.defaults.plugins.legend.labels.boxHeight = 10
Chart.defaults.plugins.legend.labels.boxWidth = 20
Chart.defaults.plugins.legend.labels.padding = 20
Chart.defaults.animation.duration = 0
Chart.defaults.responsive = true

import setUpAreaPage from './area.esm.js'

$(function(){
    if( 'geolocation' in navigator ) {
        $('.js-geolocate').removeClass('d-none');
        $('.js-geolocate').on('click', function(e){
            e.preventDefault();
            var $a = $(this);
            var $icon = $a.find('.js-geolocate-icon');
            var $spinner = $a.find('.js-geolocate-spinner');

            $icon.addClass('d-none');
            $spinner.removeClass('d-none');

            trackEvent('homepage_geolocate_click');

            navigator.geolocation.getCurrentPosition(function(position){
                var params = {
                    lon: position.coords.longitude.toFixed(6),
                    lat: position.coords.latitude.toFixed(6)
                };
                window.location = $a.attr('href') + '?' + $.param(params);
            }, function(err){
                if (err.code === 1) {
                    var text = 'You declined location sharing.';
                } else {
                    var text = 'Your location could not be found.'
                }
                var $p = $('<p>').attr({
                    role: 'alert',
                    class: 'mb-0 text-muted'
                }).text(text);
                $a.replaceWith($p);
            }, {
                enableHighAccuracy: true,
                timeout: 10000
            });
        })
    }

    $('.js-chart').each(makeChart);

    $('body.js-area-page').each(setUpAreaPage);

    $('[data-copy-text]').on('click', function(e){
        e.stopPropagation();
        if (navigator.clipboard) {
            var $el = $(this);
            var $feedback = $el.find('[data-copy-feedback]');
            var copyText = $el.attr('data-copy-text');
            var successHTML = $el.attr('data-copy-success');
            var originalHTML = $feedback.html();
            navigator.clipboard.writeText(copyText).then(function(){
                $feedback.html(successHTML);
                $el.attr('data-copied', true);
                setTimeout(function(){
                    $feedback.html(originalHTML);
                    $el.removeAttr('data-copied');
                }, 2000);
            });
        }
    });

    $('.js-email-your-mp').on('click', function(e){
        e.preventDefault()
        let href = $(this).attr('href')
        trackEvent('email_your_mp', {
            area_name: $('#area_name').text(),
            area_mp_name: $('#mp_name').text()
        }).always(function(){
            window.location.href = href
        })
    })
})

var makeChart = function() {
    var $table = $(this)
    var chartType = $table.data('chart-type') || 'bar'
    var chartWidth = $table.data('chart-width') || 600
    var rowHeight = $table.data('row-height') || 40
    var legendHeight = 60
    var labelHeight = 60
    var $div = $('<div>').attr({'class': 'chartwrapper'})
    var $canvas = $('<canvas>').attr({
        'width': chartWidth,
        'height': (rowHeight * $table.find('tbody tr').length) + legendHeight + labelHeight,
        'class': 'mt-n3',
        'role': 'img',
        'aria-label': chartType + ' chart'
    }).wrap('<div>').attr({'class': 'chartwrapper'}).insertBefore($table)

    var primaryAxis = $table.data('chart-direction') || 'x'
    var crossAxis = ( primaryAxis == 'x' ) ? 'y' : 'x'

    var config = {
        type: chartType,
        data: {
            labels: extractLabelsFromTable($table),
            datasets: extractDatasetsFromTable($table, primaryAxis)
        },
        options: {
            indexAxis: primaryAxis,
            scales: {
                [crossAxis]: {
                    ticks: {
                        callback: function (value) {
                            return (value / 100).toLocaleString('en-GB', { style: 'percent' })
                        }
                    }
                },
                [primaryAxis]: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: false,
                    external: function(context){
                        var $canvas = $(context.chart.canvas);
                        var $tooltip = $canvas.data('tooltip');
                        if ( typeof $tooltip === 'undefined' ) {
                            $tooltip = $('<div>').addClass('js-chart-tooltip').appendTo('body');
                            $canvas.data('tooltip', $tooltip);
                        }
                        $tooltip.toggle(context.tooltip.opacity == 1);
                        $tooltip.text(context.tooltip.body[0].lines[0]);
                    },
                    callbacks: {
                        label: function(context){
                            return context.dataset.label + ': ' + (context.raw / 100).toLocaleString('en-GB', { style: 'percent' });
                        }
                    }
                }
            }
        }
    }

    $canvas.on('mousemove', function(e){
        var $tooltip = $canvas.data('tooltip');
        if ( $tooltip ) {
            $tooltip.css({
                'left': '' + e.clientX + 'px',
                'top': '' + e.clientY + 'px'
            });
        }
    });

    new Chart($canvas, config)
}

var extractLabelsFromTable = function($table) {
    return $table.find('tbody tr').map(function(){
        return $(this).find('th').text().trim()
    }).get()
}

var extractDatasetsFromTable = function($table, primaryAxis) {
    return $table.find('thead th').not(':first-child').map(function(i){
        var $th = $(this)
        return {
            label: $(this).text(),
            axis: primaryAxis,
            data: $table.find('tbody tr').map(function(){
                return parseInt( $(this).children().eq(i + 1).text() )
            }).get(),
            backgroundColor: $th.data('color'),
            barPercentage: 1,
            categoryPercentage: 0.7
        }
    }).get()
}
