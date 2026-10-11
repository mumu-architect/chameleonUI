import ApexCharts, {ApexOptions} from "apexcharts";
import {createEffect, onCleanup, onSettled, untrack} from "solid-js";


export function Q_ApexCharts(props: {
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