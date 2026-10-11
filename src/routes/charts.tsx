import {createEffect, createSignal, onCleanup, onSettled, ParentProps, untrack} from 'solid-js';
import ApexCharts, {ApexChartContext, ApexFormatterOpts} from "apexcharts";
import type { ApexOptions } from "apexcharts";
import {Q_ApexCharts} from "../components/Charts";

export default function ChartPage() {
  const [data, setData] = createSignal([
    [31, 40, 28, 51, 42, 109, 100],
    [22, 35, 45, 38, 60, 70, 85],
    [18, 26, 33, 44, 55, 62, 78],
  ]);
  const getOptions = (): ApexOptions => {
    const [sales, cost, profit] = data();
    return {
      chart: { type: "bar", height: "100%" },
      xaxis: { categories: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"] },
      series: [
        { name: "销售额", data: sales },
        { name: "成本", data: cost },
        { name: "利润", data: profit },
      ],
      tooltip: { shared: true,
        intersect: false, },
      legend: { position: "top" },
    };
  };

  const getOptions2 = (): ApexOptions => {
    return {
      series: [
        {
          name: 'Sign-ups',
          data: [210, 380, 340, 520, 480, 610, 700, 880, 820, 1040, 1180, 1520],
        },
      ],
      chart: {
        height: "100%",
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'New Sign-ups by Month',
        align: 'left',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    };
  };
  const getOptions3 = (): ApexOptions => {
    return {
      series: [42, 23, 15, 12, 8],
      chart: {
        height: "100%",
        type: 'pie',
      },
      labels: ['Organic Search', 'Direct', 'Social', 'Referral', 'Email'],
      title: {
        text: 'Website Traffic by Source',
        align: 'center',
      },
      legend: {
        position: "top",
        show: true,
      },
      plotOptions: {
        pie: {
          dataLabels: {
            external: {
              show: true,
            },
          },
        },
      },
      responsive: [
        {
          breakpoint: undefined,
          options: {
            chart: {
              width: undefined,
            },
          },
        },
      ],
    };
  };
  const getOptions4 = (): ApexOptions => {
    return {
      series: [50],
      chart: {
        height: "100%",
        type: 'gauge',
      },
      legend: {
        position: "top",
        show: true,
      },
      plotOptions: {
        radialBar: {
          shape: 'needle',
          startAngle: -135,
          endAngle: 135,
          min: 0,
          max: 100,
          bands: [
            { from: 0, to: 30, color: '#FF4560' },
            { from: 30, to: 70, color: '#FEB019' },
            { from: 70, to: 100, color: '#00E396' },
          ],
          bandsStyle: {
            strokeWidth: '50%',
            gap: 1,
          },
          ticks: {
            show: true,
            major: {
              count: 11,
              length: 8,
              width: 2,
              color: '#334155',
              placement: 'outside',
            },
            minor: {
              count: 1,
              length: 4,
              width: 1,
              color: '#94A3B8',
              placement: 'outside',
            },
            labels: {
              show: true,
              offset: 6,
              fontSize: '11px',
              color: '#334155',
            },
          },
          needle: {
            color: '#0F172A',
            length: '60%',
            baseWidth: 6,
            tipWidth: 1,
          },
          hollow: {
            margin: 0,
            size: '70%',
          },
          dataLabels: {
            name: { show: false },
            value: {
              offsetY: 32,
              fontSize: '28px',
              fontWeight: 700,
              formatter: function (val:number,opts:ApexChartContext | undefined):string {
                return opts ? opts.globals.labels[0]+':'+val+'%' : val+''
              },
            },
          },
        },
      },
      labels: ['CPU'],
    };
  };

  const getOptions5=():ApexOptions=>{
    return {
      series: [76, 67, 61, 90],
      chart: {
        height: 390,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
          barLabels: {
            enabled: true,
            useSeriesColors: true,
            offsetX: -8,
            fontSize: '16px',
            formatter: function (seriesName:string, opts:ApexFormatterOpts|undefined):string {
              return (
                  opts?seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex] + '%':seriesName
              )
            },
          },
        },
      },
      colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
      labels: ['Email', 'Push', 'In-App', 'SMS'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false,
            },
          },
        },
      ],
    }
  }

  function mulberry32(seed:any) {
    return function () {
      seed |= 0
      seed = (seed + 0x6d2b79f5) | 0
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
  }
  function channel(seed:any, base:any, spread:any) {
    let rand = mulberry32(seed)
    let series = []
    let ts = new Date('01 Jun 2025 GMT').getTime()
    let val = base
    for (var i = 0; i < 20; i++) {
      val += (rand() - 0.5) * spread
      val += (base - val) * 0.15
      series.push([ts, Math.max(2, Math.round(val))])
      ts += 86400000
    }
    return series
  }
  const getOptions6=():ApexOptions=> {
    return {
      series: [
        {
          name: 'Organic Search',
          data: channel(11, 42, 14),
        },
        {
          name: 'Direct',
          data: channel(23, 26, 9),
        },
        {
          name: 'Social',
          data: channel(35, 15, 8),
        },
      ],
      chart: {
        type: 'area',
        height: 350,
        stacked: true,
        events: {
          selection: function (chart, e) {
            e&&e.xaxis?console.log(new Date(e.xaxis.min)):''
          },
        },
      },
      colors: ['#008FFB', '#00E396', '#FEB019'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'monotoneCubic',
      },
      title: {
        text: 'Website Visits by Channel',
        align: 'left',
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val + 'k'
          },
        },
      },
      xaxis: {
        type: 'datetime',
      },
    }
  }

  function refresh() {
    setData([
      [55, 22, 67, 33, 88, 66, 120],
      [30, 44, 22, 50, 40, 90, 77],
      [20, 33, 40, 25, 45, 55, 60],
    ]);
  }

  return (
    <main class="flex-1 p-6 border rounded-xl">
      <h1>Charts</h1>
      <h1 class="font-medium text-red-800 border-b">Charts components</h1>
      <div class="flex flex-direction gap-12">
        <div class="m-4 w-full h-[420px] border border-gray-200 rounded-lg bg-white shadow-sm">
          <Q_ApexCharts class="" options={getOptions()} />
        </div>
        <div class="m-4 w-full h-[420px] border border-gray-200 rounded-lg bg-white shadow-sm">
          <Q_ApexCharts class="" options={getOptions2()} />
        </div>
      </div>
      <div class="flex flex-direction gap-12">
        <div class=" m-4 w-full h-[420px] border border-gray-200 rounded-lg bg-white shadow-sm">
          <Q_ApexCharts class="" options={getOptions3()} />
        </div>
        <div class="m-4 w-full h-[420px] border border-gray-200 rounded-lg bg-white shadow-sm">
          <Q_ApexCharts class="" options={getOptions4()} />
        </div>
      </div>
      <div class="flex flex-direction gap-12">
        <div class=" m-4 w-full h-[420px] border border-gray-200 rounded-lg bg-white shadow-sm">
          <Q_ApexCharts class="" options={getOptions5()} />
        </div>
        <div class="m-4 w-full h-[420px] border border-gray-200 rounded-lg bg-white shadow-sm">
          <Q_ApexCharts class="" options={getOptions6()} />
        </div>
      </div>

      <button
        onClick={refresh}
        class="mt-4 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        刷新数据
      </button>
    </main>
  );
}
