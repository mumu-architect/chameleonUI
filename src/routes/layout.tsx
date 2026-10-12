
import type { ParentProps } from 'solid-js';
import {Q_Col, Q_Row} from "../components/Layout";

// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function layoutLayout(props: ParentProps) {
    const blockClass = "h-8 rounded bg-slate-200";
    const blockActive = "h-8 rounded bg-slate-400";
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Icon</h1>
            <h1 class="font-medium text-red-800 border-b"> Q_Row Q_Col components</h1>
            <div class="font-bold">
                {/* ========== 基础布局 ========== */}
                <section class="mb-10">
                    <h2 class="text-lg font-medium mb-2">基础布局</h2>
                    <p class="text-sm text-gray-500 mb-4">使用单一分栏创建基础的栅格布局。</p>
                    <div class="border rounded p-4">
                        <Q_Row class="mb-3">
                            <Q_Col span={24}><div class={blockActive}>4444444</div></Q_Col>
                        </Q_Row>
                        <Q_Row class="mb-3">
                            <Q_Col span={12}><div class={blockClass}>11111111</div></Q_Col>
                            <Q_Col span={12} ><div class={blockClass}>55555</div></Q_Col>
                        </Q_Row>
                        <Q_Row class="mb-3">
                            <Q_Col span={8}><div class={blockClass}>1</div></Q_Col>
                            <Q_Col span={8}><div class={blockClass}>2</div></Q_Col>
                            <Q_Col span={8}><div class={blockClass}>3</div></Q_Col>
                        </Q_Row>
                        <Q_Row class="mb-3">
                            <Q_Col span={6}><div class={blockClass}>1</div></Q_Col>
                            <Q_Col span={6}><div class={blockClass}>2</div></Q_Col>
                            <Q_Col span={6}><div class={blockClass}>3</div></Q_Col>
                            <Q_Col span={6}><div class={blockClass}>4</div></Q_Col>
                        </Q_Row>
                        <Q_Row>
                            <Q_Col span={4}><div class={blockClass}>1</div></Q_Col>
                            <Q_Col span={4}><div class={blockClass}>2</div></Q_Col>
                            <Q_Col span={4}><div class={blockClass}>3</div></Q_Col>
                            <Q_Col span={4}><div class={blockClass}>4</div></Q_Col>
                            <Q_Col span={4}><div class={blockClass}>5</div></Q_Col>
                            <Q_Col span={4}><div class={blockClass}>6</div></Q_Col>
                        </Q_Row>
                    </div>
                </section>

                {/* ========== 分栏间隔 ========== */}
                <section class="mb-10">
                    <h2 class="text-lg font-medium mb-2">分栏间隔</h2>
                    <p class="text-sm text-gray-500 mb-4">分栏之间存在间隔。</p>
                    <div class="border rounded p-4">
                        {/* gutter: [水平间距, 垂直间距] */}
                        <Q_Row gutter={[16,16]} rowGap={16}>
                            <Q_Col span={8} gutter={[16, 16]}>
                                <div class="h-8 rounded bg-slate-200">1</div>
                            </Q_Col>
                            <Q_Col span={8} gutter={[16, 16]}>
                                <div class="h-8 rounded bg-slate-200">2</div>
                            </Q_Col>
                            <Q_Col span={8} gutter={[16, 16]}>
                                <div class="h-8 rounded bg-slate-200">3</div>
                            </Q_Col>
                            <Q_Col span={8} gutter={[16, 16]}>
                                <div class="h-8 rounded bg-slate-200">4</div>
                            </Q_Col>
                        </Q_Row>
                    </div>
                </section>

                {/* ========== 混合布局 ========== */}
                <section class="mb-10">
                    <h2 class="text-lg font-medium mb-2">混合布局</h2>
                    <p class="text-sm text-gray-500 mb-4">通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。</p>
                    <div class="border rounded p-4">
                        <Q_Row gutter={[16,16]} rowGap={16}>
                            <Q_Col span={16} gutter={[16,16]}><div class={blockClass}>1</div></Q_Col>
                            <Q_Col span={8} gutter={[16,16]}><div class={blockClass}>2</div></Q_Col>
                        </Q_Row>
                        <Q_Row gutter={[16,16]} rowGap={16}>
                            <Q_Col span={6} gutter={[16,16]}><div class={blockClass}>1</div></Q_Col>
                            <Q_Col span={8} gutter={[16,16]}><div class={blockClass}>2</div></Q_Col>
                            <Q_Col span={4} gutter={[16,16]}><div class={blockClass}>3</div></Q_Col>
                            <Q_Col span={6} gutter={[16,16]}><div class={blockClass}>4</div></Q_Col>
                        </Q_Row>
                        <Q_Row gutter={[16,16]} rowGap={16}>
                            <Q_Col span={4} gutter={[16,16]}><div class={blockClass}>1</div></Q_Col>
                            <Q_Col span={14} gutter={[16,16]}><div class={blockClass}>2</div></Q_Col>
                            <Q_Col span={6} gutter={[16,16]}><div class={blockClass}>3</div></Q_Col>
                        </Q_Row>
                    </div>
                </section>

                {/* ========== 分栏偏移 ========== */}
                <section class="mb-10">
                    <h2 class="text-lg font-medium mb-2">分栏偏移</h2>
                    <p class="text-sm text-gray-500 mb-4">支持偏移指定的栏数。</p>
                    <div class="border rounded p-4">
                        <Q_Row gutter={[16,16]} rowGap={16}>
                            <Q_Col span={6} gutter={[16,16]}><div class={blockClass}></div></Q_Col>
                            <Q_Col span={6} offset={6} gutter={[16,16]}><div class={blockClass}>1</div></Q_Col>
                        </Q_Row>
                        <Q_Row gutter={[16,16]} rowGap={16}>
                            <Q_Col span={6} offset={6} gutter={[16,16]}><div class={blockClass}>1</div></Q_Col>
                            <Q_Col span={6} offset={6} gutter={[16,16]}> <div class={blockClass}>2</div></Q_Col>
                        </Q_Row>
                        <Q_Row gutter={[16,16]} rowGap={16}>
                            <Q_Col span={12} offset={6} gutter={[16,16]}><div class={blockClass}>1</div></Q_Col>
                        </Q_Row>


                    </div>
                </section>

                {/* ========== 对齐方式 ========== */}
                <section class="mb-10">
                    <h2 class="text-lg font-medium mb-2">对齐方式</h2>
                    <p class="text-sm text-gray-500 mb-4">通过 flex 布局来对分栏进行灵活的对齐。</p>
                    <div class="border rounded p-4 space-y-4">
                        {/* justify-start */}
                        <Q_Row justify="start">
                            <Q_Col span={6}><div class={blockClass}>1</div></Q_Col>
                            <Q_Col span={6}><div class={blockClass}>2</div></Q_Col>
                            <Q_Col span={6}><div class={blockClass}>3</div></Q_Col>
                        </Q_Row>
                        {/* justify-center */}
                        <Q_Row justify="center">
                            <Q_Col span={6}><div class={blockClass}>1</div></Q_Col>
                            <Q_Col span={6}><div class={blockClass}>2</div></Q_Col>
                            <Q_Col span={6}><div class={blockClass}>3</div></Q_Col>
                        </Q_Row>
                        {/* justify-end */}
                        <Q_Row justify="end">
                            <Q_Col span={6}><div class={blockClass}>1</div></Q_Col>
                            <Q_Col span={6}><div class={blockClass}>2</div></Q_Col>
                            <Q_Col span={6}><div class={blockClass}>3</div></Q_Col>
                        </Q_Row>
                        {/* justify-between */}
                        <Q_Row justify="between">
                            <Q_Col span={6}><div class={blockClass}>1</div></Q_Col>
                            <Q_Col span={6}><div class={blockClass}>2</div></Q_Col>
                            <Q_Col span={6}><div class={blockClass}>3</div></Q_Col>
                        </Q_Row>
                        {/* justify-around */}
                        <Q_Row justify="around">
                            <Q_Col span={6}><div class={blockClass}>1</div></Q_Col>
                            <Q_Col span={6}><div class={blockClass}>2</div></Q_Col>
                            <Q_Col span={6}><div class={blockClass}>3</div></Q_Col>
                        </Q_Row>
                    </div>
                </section>

                {/* ========== 响应式布局 ========== */}
                <section>
                    <h2 class="text-lg font-medium mb-2">响应式布局 有bug</h2>
                    <p class="text-sm text-gray-500 mb-4">参照了 Bootstrap 的响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl。</p>
                    <div class="border rounded p-4">
                        <Q_Row gutter={[16,16]}>
                            <Q_Col
                                span={24}
                                responsive={{ sm:12, md:6, lg:6, xl:6 }}
                            >
                                <div class="h-16 rounded bg-slate-200">1</div>
                            </Q_Col>
                            <Q_Col
                                span={24}
                                responsive={{ sm:12, md:6, lg:6, xl:6 }}
                            >
                                <div class="h-16 rounded bg-slate-100">2</div>
                            </Q_Col>
                            <Q_Col
                                span={24}
                                responsive={{ sm:12, md:6, lg:6, xl:6 }}

                            >
                                <div class="h-16 rounded bg-slate-200">3</div>
                            </Q_Col>
                            <Q_Col
                                span={24}
                                responsive={{ sm:12, md:6, lg:6, xl:6 }}
                            >
                                <div class="h-16 rounded bg-slate-100">4</div>
                            </Q_Col>
                        </Q_Row>
                        <Q_Row gutter={[16,16]}>
                            <Q_Col span={12} responsive={{sm:12}} gutter={[16,16]}>
                                <div class="h-10 bg-slate-200 rounded">测试</div>
                            </Q_Col>
                            <Q_Col span={12} responsive={{sm:12}} gutter={[16,16]}>
                                <div class="h-10 bg-slate-200 rounded">测试</div>
                            </Q_Col>
                        </Q_Row>
                    </div>
                </section>
            </div>
        </main>
    );
}





