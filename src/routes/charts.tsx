import {createEffect, createSignal, onCleanup, onSettled, ParentProps, untrack} from 'solid-js';
import ApexCharts from "apexcharts";
import type { ApexOptions } from "apexcharts";

function ApexChartBar(props: {
  class?: string;
  options: ApexOptions;
}) {
  let chartDom: HTMLDivElement | undefined;
  let chartIns: ApexCharts | null = null;

  // Solid2 替代onMount：onSettled，只执行一次，ref已经赋值
  onSettled(() => {
    untrack(() => {
      if (!chartDom) return;
      chartIns = new ApexCharts(chartDom, props.options);
      chartIns.render();
    });
  });

  // Solid2标准双参数 createEffect：监听options更新图表
  createEffect(
      () => props.options,
      (newOptions) => {
        untrack(() => {
          if (!chartIns) return;
          chartIns.updateOptions(newOptions);
        });
      }
  );

  // 组件销毁，释放图表实例
  onCleanup(() => {
    chartIns?.destroy();
    chartIns = null;
  });

  return <div ref={chartDom} class={props.class} style="width:100%;height:100%" />;
}

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
      series: [68],
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
              // formatter: function (val) {
              //   return val
              // },
            },
          },
        },
      },
      labels: ['Speed'],
    };
  };

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
      <h1 class="font-medium text-red-800 border-b">Input</h1>
      <div class="flex flex-direction gap-12">
        <div class="w-full h-[420px] border border-gray-200 rounded-lg bg-white shadow-sm">
          <ApexChartBar class="p-4" options={getOptions()} />
        </div>
        <div class="w-full h-[420px] border border-gray-200 rounded-lg bg-white shadow-sm">
          <ApexChartBar class="p-4" options={getOptions2()} />
        </div>
      </div>
      <div class="flex flex-direction gap-12">
        <div class="w-full h-[420px] border border-gray-200 rounded-lg bg-white shadow-sm">
          <ApexChartBar class="p-4" options={getOptions3()} />
        </div>
        <div class="w-full h-[420px] border border-gray-200 rounded-lg bg-white shadow-sm">
          <ApexChartBar class="p-4" options={getOptions4()} />
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
