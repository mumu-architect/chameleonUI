// import { Title } from '@solidjs/meta';
// import Counter from '../components/Counter';
// import logo from '../logo.svg';
// import "../App.css";

import { Title } from '@solidjs/meta';
import {createSignal, Loading, For, lazy } from 'solid-js';
import type { ParentProps } from 'solid-js';
import { paths } from '../router';
import {Icon } from "@iconify-icon/solid";
import {DefaultSearchTypes, PathEnd} from "@solidjs/router";


export default  function indexLayout(props: ParentProps) {
    // 侧边栏折叠状态
    const [sidebarCollapsed, setSidebarCollapsed] = createSignal(false);
    // 模拟打开的标签页
    const [tabs, setTabs] = createSignal([
        {id: "dashboard", icon: "ant-design:dashboard-outlined", label: "Dashboard", path: paths.dashboard,content:lazy(() => import(paths.table.toString()))},
        {id: "user", icon: "carbon:user-profile", label: "User", path: paths.users(1),content:lazy(() => import(paths.users(1).toString()))},
        {id: "table", icon: "boxicons:table", label: "Table", path: paths.table,content:lazy(() => import(paths.table.toString()))},
        {id: "about", icon: "cib:about-me", label: "About", path: paths.about,content: lazy(() => import(paths.about.toString()))},
    ]);
    const [navTabs,setNavTabs] = createSignal([
        {id: "dashboard", icon: "ant-design:dashboard-outlined", label: "Dashboard",display:true,close:false, path: paths.dashboard,content:lazy(() => import(paths.table.toString()))},
    ]);
    //页面点击事件，不走路径，直接创建dom文档，插入对应位置就行
    const  openPage=(id :string,path :string)=>{
        // <>
        //     <button onClick={addTab}>Add tab</button>
        //     <button onClick={removeTab}>Remove tab</button>
        //     <Tabs>
        //         <Tabs.List>
        //             <For each={tabs()}>{tab => <Tabs.Trigger value={tab.id}>{tab.title}</Tabs.Trigger>}</For>
        //             <Tabs.Indicator />
        //         </Tabs.List>
        //         <For each={tabs()}>{tab => <Tabs.Content value={tab.id}>{tab.content}</Tabs.Content>}</For>
        //     </Tabs>
        // </>
    };
    const addTabPage = (tabId :string):boolean => {
        //判断是否已经打开
       // (navTabs )
        for(let item of navTabs()) {
            if(item.id===tabId){
                //当前页面已打开，只需选中当前页面
            setNavTabs(prev => prev.map(item => {
                if (item.id === tabId) {
                    return { ...item, display: true };
                }else {
                    return { ...item, display: false };
                }
            }));
                return true
            }
        }
        setNavTabs(prev => prev.map(item => {
            if (item.id === tabId) {
                return { ...item, display: true };
            }else {
                return { ...item, display: false };
            }
        }));
        for (let item of tabs()){
            if(item.id===tabId){
                setNavTabs(prev => [...prev,{id:item.id, icon: item.icon, label: item.label, display:true,close:true,path: item.path,content:item.content}]);
            }
        }
        return true
    };

    const removeTab = () => {
        if (tabs().length > 1) {
            setTabs(prev => prev.slice(0, -1));
        }
    };

    // 关闭tab
    const closeTab = (tabId: string) => {
        setNavTabs(navTabs().filter((t) => t.id !== tabId));
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
                        {/*<a  onClick={()=>addTabPage("dashboard")}*/}
                        {/*   class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-slate-700 data-[active]:bg-slate-700">*/}
                        {/*    <Icon icon="ant-design:dashboard-outlined" width="24" height="24"/>*/}
                        {/*    <span class={sidebarCollapsed() ? "hidden" : ""}>Dashboard</span>*/}
                        {/*</a>*/}
                        <For each={tabs()}>
                            {(item) => (
                                <a onClick={()=>addTabPage(item.id)}
                                   class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-slate-700 data-[active]:bg-slate-700">
                                    <Icon icon={item.icon} width="24" height="24"/>
                                    <span class={sidebarCollapsed() ? "hidden" : ""}>{item.label}</span>
                                </a>
                            )}
                        </For>
                    </nav>

                </aside>
                <div class="flex-1 overflow-auto p-2 bg-amber-600">
                    <header
                        class="h-14 shrink-0 bg-slate-800 text-white flex items-center justify-between px-4 border-b border-slate-700">
                        {/* 侧边栏折叠按钮 */}
                        <button
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed())}
                            class="p-2 rounded hover:bg-slate-700 transition-colors"
                        >
                            <svg class="w-5 h-5 stroke-white stroke-2 fill-none" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"/>
                                <line x1="3" y1="6" x2="21" y2="6"/>
                                <line x1="3" y1="18" x2="21" y2="18"/>
                            </svg>
                        </button>
                        {/* 用户头像 + 登录退出下拉 */}
                        <div class="relative group">
                            <button class="flex items-center gap-2 p-1 rounded hover:bg-slate-700">
                                <div class="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                                    <svg class="w-4 h-4 stroke-white stroke-2 fill-none"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                </div>
                                <span class="hidden md:inline">Admin</span>
                            </button>
                            {/* 下拉菜单 */}
                            <div
                                class="absolute right-0 top-full mt-1 w-36 bg-white text-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-50">
                                <div class="p-2 hover:bg-gray-100 cursor-pointer">登录</div>
                                <div class="p-2 hover:bg-gray-100 cursor-pointer">退出登录</div>
                            </div>
                        </div>


                    </header>
                    <nav class="p-2 shrink-0 bg-slate-100 flex items-center px-2 gap-1 overflow-x-auto border-b ">
                        {/*<div class="flex items-center gap-1 px-3 py-1 bg-white rounded border shadow-sm hover:bg-blue-700 focus:bg-amber-200">*/}
                        {/*    <a onClick={()=>addTabPage('dashboard')} class="text-sm">dashboard</a>*/}
                        {/*</div>*/}
                        {navTabs().map((tab) => (
                            <div class="flex items-center gap-1 px-3 py-1 bg-white rounded border shadow-sm">
                                <a onClick={()=>addTabPage(tab.id)}  class="text-sm px-[15px]">{tab.label}</a>
                                {tab.close ? (
                                <button
                                    onClick={() => closeTab(tab.id)}
                                    class="w-4 h-4 rounded hover:bg-gray-200 flex items-center justify-center"
                                >
                                    <Icon icon="iconamoon:close-circle-1-thin" width="20" height="20"/>
                                </button>
                                ):null}

                            </div>
                        ))}
                    </nav>
                    {navTabs().map((tab) => (
                        <Loading fallback={<main>Loading…</main>}>
                            <iframe
                                id={tab.id}
                        src={tab.path.toString()}
                        style={ {display:tab.display?"block":"none",width:"100%", height:"800px", border:"none"}}
                        title={tab.id}
                            />
                        </Loading>
                    ))}
                    <footer
                        class="flex-1 shrink-0  border-t bg-white items-center justify-center text-sm text-gray-500 ">
                        <h1 class="text-center font-thin p-1">Chameleon‑UI © 2026</h1>
                        <h3 class="text-center text-xs">Technical support:Wang Wei - Architect | WeChat:mumuago |
                            Email:1211884772@qq.com</h3>
                    </footer>
                </div>
            </div>
        </>
    );
}
