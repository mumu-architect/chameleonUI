// import { Title } from '@solidjs/meta';
// import Counter from '../components/Counter';
// import logo from '../logo.svg';
// import "../App.css";

import { Title } from '@solidjs/meta';
import {createSignal, Loading, For} from 'solid-js';
import type { ParentProps } from 'solid-js';
import { paths, Router } from '../router';
import {Icon } from "@iconify-icon/solid";


export default function indexLayout(props: ParentProps) {
    // 侧边栏折叠状态
    const [sidebarCollapsed, setSidebarCollapsed] = createSignal(false);
    // 模拟打开的标签页
    const [tabs, setTabs] = createSignal([
        { id: "user",icon:"carbon:user-profile", label: "User", path: paths.users(1)},
        { id: "table",icon:"boxicons:table",  label: "Table", path: paths.table },
        { id: "about",icon:"cib:about-me",  label: "About", path: paths.about },
    ]);

    // 关闭tab
    const closeTab = (tabId: string) => {
        setTabs(tabs().filter((t) => t.id !== tabId));
    };
    return (

                <>
                    <Title>ChameleonUI</Title>
                    <div class="h-screen flex overflow-hidden bg-gray-50 text-gray-900">
                        {/* 左侧侧边栏，slide收缩动画 */}
                        <aside
                            class={`shrink-0 bg-slate-800 text-white flex flex-col transition-all duration-300 ease-in-out ${
                                sidebarCollapsed() ? "w-16" : "w-56"
                            }`}
                        >
                            {/*<aside class="w-56 shrink-0 bg-slate-800 text-white flex flex-col">*/}
                            {/* 侧边栏头部Logo区域 */}
                            <div class="px-4 py-4 text-xl font-bold border-b border-slate-700 flex items-center gap-2">
                                <Icon icon="lucide-lab:chameleon"/>
                                <span class={sidebarCollapsed() ? "hidden" : ""}>Chameleon‑UI</span>
                            </div>
                            <nav class="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
                                <a href={paths.dashboard} class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-slate-700 data-[active]:bg-slate-700">
                                    <Icon icon="ant-design:dashboard-outlined" width="24" height="24" />
                                    <span class={sidebarCollapsed() ? "hidden" : ""}>Dashboard</span>
                                </a>
                                <For each={tabs()}>
                                    {(item) => (
                                        <a href={item.path}
                                           class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-slate-700 data-[active]:bg-slate-700">
                                            <Icon icon={item.icon} width="24" height="24" />
                                            <span class={sidebarCollapsed() ? "hidden" : ""}>{item.label}</span>
                                        </a>
                                    )}
                                </For>
                            </nav>

                        </aside>
                        <div  class="flex-1 overflow-auto p-2 bg-amber-600">
                            <header class="h-14 shrink-0 bg-slate-800 text-white flex items-center justify-between px-4 border-b border-slate-700">
                                {/* 侧边栏折叠按钮 */}
                                <button
                                    onClick={() => setSidebarCollapsed(!sidebarCollapsed())}
                                    class="p-2 rounded hover:bg-slate-700 transition-colors"
                                >
                                    <svg class="w-5 h-5 stroke-white stroke-2 fill-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="3" y1="12" x2="21" y2="12"/>
                                        <line x1="3" y1="6" x2="21" y2="6"/>
                                        <line x1="3" y1="18" x2="21" y2="18"/>
                                    </svg>
                                </button>
                                {/* 用户头像 + 登录退出下拉 */}
                                <div class="relative group">
                                    <button class="flex items-center gap-2 p-1 rounded hover:bg-slate-700">
                                        <div class="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                                            <svg class="w-4 h-4 stroke-white stroke-2 fill-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                                <circle cx="12" cy="7" r="4"/>
                                            </svg>
                                        </div>
                                        <span class="hidden md:inline">Admin</span>
                                    </button>
                                    {/* 下拉菜单 */}
                                    <div class="absolute right-0 top-full mt-1 w-36 bg-white text-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-50">
                                        <div class="p-2 hover:bg-gray-100 cursor-pointer">登录</div>
                                        <div class="p-2 hover:bg-gray-100 cursor-pointer">退出登录</div>
                                    </div>
                                </div>


                            </header>
                            <nav class="p-2 shrink-0 bg-slate-100 flex items-center px-2 gap-1 overflow-x-auto border-b">

                                <div class="flex items-center gap-1 px-3 py-1 bg-white rounded border shadow-sm">
                                    <a href={paths.dashboard} class="text-sm">dashboard</a>
                                </div>
                                {tabs().map((tab) => (
                                    <div class="flex items-center gap-1 px-3 py-1 bg-white rounded border shadow-sm">
                                        <a href={tab.path} class="text-sm px-[15px]">{tab.label}</a>
                                        <button
                                            onClick={() => closeTab(tab.id)}
                                            class="w-4 h-4 rounded hover:bg-gray-200 flex items-center justify-center"
                                        >
                                            <Icon icon="iconamoon:close-circle-1-thin" width="20" height="20"/>
                                        </button>
                                    </div>
                                ))}
                            </nav>
                            <Loading fallback={<main>Loading…</main>} >{props.children}</Loading>
                            <footer class="flex-1 shrink-0  border-t bg-white items-center justify-center text-sm text-gray-500 ">
                                <h1 class="text-center font-thin p-1">Chameleon‑UI © 2026</h1>
                                <h3 class="text-center text-xs">Technical support:Wang Wei - Architect | WeChat:mumuago | Email:1211884772@qq.com</h3>
                            </footer>
                        </div>


                    </div>

                </>
    );
}
