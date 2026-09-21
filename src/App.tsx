import { Title } from '@solidjs/meta';
import { Loading} from 'solid-js';
import { paths, Router } from './router';
import { Camera,ChartArea } from "lucide-solid";
import './App.css';

export default function App() {
  return (

      <Router>
        {(props) => (
            <>
              <Title>ChameleonUI</Title>
                <div class="h-screen flex overflow-hidden bg-gray-50 text-gray-900">
                    <aside class="w-56 shrink-0 bg-slate-800 text-white flex flex-col">
                        {/* 侧边栏头部Logo区域 */}
                        <div class="px-4 py-4 text-xl font-bold border-b border-slate-700 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chameleon-icon lucide-chameleon">
                                <path d="M11 22c-5 0-9-4.5-9-10S6 2 11 2c2.2 0 4.2.9 5.7 2.3L19.3 2c3.1 3.1 3.5 7.9 1.3 11.4-.6.9-1.9.9-2.7.1l-1.2-1.2C15.2 10.9 13.2 10 11 10a6 6 0 0 0 0 12 4 4 0 0 0 0-8 2 2 0 0 0 0 4"/>
                                <path d="M14 7h.01"/>
                                <circle cx="14.5" cy="7" r="3.5"/>
                                <path d="M8 10.8 6 10l1-2"/>
                                <path d="M22 22a2 2 0 0 1-2-2v-6.1"/>
                            </svg>
                            <span>Chameleon‑UI</span>
                        </div>
                        <nav class="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
                            <a href={paths()} class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-slate-700 data-[active]:bg-slate-700">
                                <svg width="18" height="18" stroke="white" stroke-width="2" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                    <polyline points="9 22 9 12 15 12 15 22"/>
                                </svg>
                                <span>Home</span>
                            </a>
                            <a href={paths.users(1)}
                               class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-slate-700 data-[active]:bg-slate-700">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-area-icon lucide-chart-area"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"/></svg>
                                <span>Users</span>
                            </a>
                            <a href={paths.users(2)}
                               class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-slate-700 data-[active]:bg-slate-700">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-table2-icon lucide-table-2"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/></svg>
                                <span>Table</span>
                            </a>
                             <a href={paths.users(3)}
                               class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-slate-700 data-[active]:bg-slate-700">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cabin-icon lucide-cabin"><path d="M2.6 10.4a2.12 2.12 0 1 0 3.02 2.98L12 7l6.4 6.4a2.12 2.12 0 1 0 2.979-3.021L13.7 2.7a2.4 2.4 0 0 0-3.404.004Z"/><path d="M14 22v-7a2 2 0 0 0-4 0v7"/><path d="M14 14h6v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6h6"/><path d="M4 18h6"/><path d="M14 18h6"/></svg>
                                <span>About</span>
                            </a>

                        </nav>

                    </aside>
                    <div  class="flex-1 overflow-auto p-2 bg-amber-600">
                        <header class="h-25  bg-amber-200">
                            <div class="flex bg-amber-800">
                                <div class="size-14 flex-none ...">01</div>
                                <div class="size-14 flex-none ...">01</div>
                                <div class="size-14 flex-none ...">01</div>
                                <div class="size-14 flex-none ...">01</div>
                                <div class="size-14 grow ...">02</div>
                                <div class="size-14 flex-none ...">03</div>
                                <div class="size-14 flex-none ...">03</div>
                                <div class="size-14 flex-none ...">admin</div>
                            </div>

                        </header>
                        <nav class=" h-15  bg-amber-300">
     <a href={paths.users(1)}
                      class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-slate-700 data-[active]:bg-slate-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-area-icon lucide-chart-area"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"/></svg>
                            <span>Users</span>
                        </a>
                        </nav>
                        <Loading fallback={<main>Loading…</main>} >{props.children}</Loading>
                        <footer class="flex-1 bg-amber-800 ">
                            <h1 class="text-center font-thin p-1">ChameleonUI - 粤ICP备1111111号</h1>
                            <h2 class="text-center text-xs"> 代码仓库 |在线问题| 在线讨论 </h2>
                            <h3 class="text-center text-xs">Technical support:Wang Wei - Architect | WeChat:mumuago | Email:1211884772@qq.com</h3>
                        </footer>
                    </div>


                </div>

            </>
        )}
      </Router>

      // <Router>
      //   {(props) => (
      //       <>
      //         <Title>ChameleonUI</Title>
      //         <div class="h-screen flex overflow-hidden bg-gray-50 text-gray-900">
      //           {/* 左侧侧边栏 shrink‑0：宽度不会被压缩 */}
      //           <aside class="w-56 shrink-0 bg-slate-800 text-white flex flex-col">
    //             {/* 侧边栏头部Logo区域 */}
    //             <div class="px-4 py-4 text-xl font-bold border-b border-slate-700">
    //               Lament‑AI 后台
    //             </div>
    //
    //             {/* 导航菜单，overflow‑y‑auto：菜单过多可内部滚动 */}
    //             <nav class="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
    //               <a
    //                   href={paths()}
    //                   class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-slate-700 data-[active]:bg-slate-700"
    //               >
    //                 <Settings size={18} />
    //                 <span>首页</span>
    //               </a>
    //
    //               <a
    //                   href={paths.users(1)}
    //                   class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-slate-700 data-[active]:bg-slate-700"
    //               >
    //                 <Settings size={18} />
    //                 <span>关于</span>
    //               </a>
    //
    //               <a
    //                   href={paths.users(2)}
    //                   class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-slate-700 data-[active]:bg-slate-700"
    //               >
    //                 <Settings size={18} />
    //                 <span>系统设置</span>
    //               </a>
    //             </nav>
    //           </aside>
    //
    //           {/* 右侧主内容区：仅此处刷新，侧边栏保持不变 */}
    //           {/*<Loading fallback={<main className="flex-1 overflow-auto p-6">Loading…</main>}>{props.children}</Loading>*/}
    //         </div>
    //       </>
    //   )}
    // </Router>
  );
}
