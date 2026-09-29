import { Title } from '@solidjs/meta';
import {createSignal, Loading, For } from 'solid-js';
import type { ParentProps } from 'solid-js';
import { paths } from '../router';
import {Icon } from "@iconify-icon/solid";
import tooltipLayout from "./tooltip";
import {Q_Tooltip} from "../components/Tooltip";
import paginationLayout from "./pagination";


export default  function indexLayout(props: ParentProps) {
    // 侧边栏折叠状态
    const [sidebarCollapsed, setSidebarCollapsed] = createSignal(false);
    // 模拟打开的标签页
    const [tabs, setTabs] = createSignal([
        {id: "dashboard", icon: "ant-design:dashboard-outlined", label: "Dashboard", path: paths.dashboard},
        {id: "user", icon: "carbon:user-profile", label: "User", path: paths.users(1)},
        {id: "form", icon: "boxicons:form", label: "Form", path: paths.form},
        {id: "charts", icon: "famicons:stats-chart", label: "Charts", path: paths.charts},
        {id: "datePicker", icon: "clarity:date-line", label: "DatePicker", path: paths.datePicker},
        {id: "menu", icon: "bi:menu-button", label: "Menu", path: paths.menu},
        {id: "table", icon: "boxicons:table", label: "Table", path: paths.table},
        {id: "pagination", icon: "fluent:dual-screen-pagination-24-regular", label: "Pagination", path: paths.pagination},
        {id: "dataTable", icon: "material-symbols:data-table", label: "DataTable", path: paths.dataTable},
        {id: "toggleGroup", icon: "akar-icons:toggle-off-fill", label: "ToggleGroup", path: paths.toggleGroup},
        {id: "button", icon: "cbi:button", label: "Button", path: paths.button},
        {id: "alert", icon: "ant-design:alert-outlined", label: "Alert", path: paths.alert},
        {id: "dialog", icon: "tdesign:dialog-history", label: "Dialog", path: paths.dialog},
        {id: "tooltip", icon: "fluent-mdl2:diagnostic-data-bar-tooltip", label: "Tooltip", path: paths.tooltip},
        {id: "icon", icon: "tdesign:icon", label: "Icon", path: paths.icon},
        {id: "about", icon: "cib:about-me", label: "About", path: paths.about},
    ]);
    const [navTabs,setNavTabs] = createSignal([
        {id: "dashboard", icon: "ant-design:dashboard-outlined", label: "Dashboard",display:true,close:false, path: paths.dashboard},
    ]);
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
                setNavTabs(prev => [...prev,{id:item.id, icon: item.icon, label: item.label, display:true,close:true,path: item.path}]);
            }
        }
        return true
    };
    // 关闭tab
    const removeTab = (tabId: string) => {
        setNavTabs(navTabs().filter((t) => t.id !== tabId))

        //显示上一个tab
        let preIndex=navTabs().findIndex((t)=>t.id === tabId)-1
        if (preIndex>=0){
            setNavTabs(prev => prev.map(item => {
                if (item.id == navTabs()[preIndex].id) {
                    return { ...item, display: true };
                }else {
                    return { ...item, display: false };
                }
            }));
        }
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
                                   class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-slate-700 data-[active]:bg-slate-700"><Icon icon={item.icon} width="24" height="24"/>

                                    <span class={sidebarCollapsed() ? "hidden" : ""}>{item.label}</span>
                                </a>
                            )}
                        </For>
                    </nav>
                </aside>
                {/*右侧整体垂直布局*/}
                <div class="flex-1 flex flex-col h-full overflow-hidden">
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
                            <button class="flex items-center gap-2 p-1 rounded hover:bg-slate-700 mr-12">
                                <div class="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-green-400">
                                    <Icon icon="fa-solid:user-astronaut" width="25" height="25"/>
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
                        {navTabs().map((tab) => (
                            <div class={tab.display?"flex items-center gap-1 px-3 py-1 bg-slate-300 rounded border shadow-sm hover:bg-slate-300 data-[active]:bg-slate-300":"flex items-center gap-1 px-3 py-1 bg-white rounded border shadow-sm hover:bg-slate-300 data-[active]:bg-slate-300"}>
                                <a onClick={()=>addTabPage(tab.id)}  class="text-sm px-[15px]">{tab.label}</a>
                                {tab.close ? (
                                <button
                                    onClick={() => removeTab(tab.id)}
                                    class="w-4 h-4 rounded hover:bg-gray-200 flex items-center justify-center"
                                >
                                    <Icon icon="iconamoon:close-circle-1-thin" width="20" height="20"/>
                                </button>
                                ):null}

                            </div>
                        ))}
                    </nav>
                     {/*Main 主内容区：可滚动（可选，如果你需要main滚动） */}
                    <main class="flex-1 p-4 ">
                    {navTabs().map((tab) => (
                        <Loading fallback={<main>Loading…</main>}>
                            <iframe
                                id={tab.id}
                        src={tab.path.toString()}
                        style={ {display:tab.display?"block":"none",border:"none"}}
                        title={tab.id}
                                class="w-full h-full border border-slate-200 rounded-lg block "
                            />
                        </Loading>
                    ))}
                    </main>
                    {/*Footer：固定在右侧容器底部，永远可见！不会被内容挤掉*/}
                    <footer class="h-12 bg-white border-t border-slate-200 flex flex-col justify-center items-center px-4 py-1">
                        <h1 class="text-center font-thin p-1">Chameleon‑UI © 2026</h1>
                        <h2 class="text-center text-xs">Technical support:Wang Wei - Architect | WeChat:mumuago |
                            Email:1211884772@qq.com</h2>
                    </footer>
                </div>
            </div>
        </>
    );
}
