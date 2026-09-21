import {paths,Router} from './router';
import './App.css';
import {useNavigate} from "@solidjs/router";
// 登录内容放到Router的子组件，这里才可以使用useNavigate
import { lazy } from "solid-js";
import type { RouteSectionProps } from "@solidjs/router";

const LoginPage = lazy(() => import("./routes/login"));
const IndexPage = lazy(() => import("./routes/index"));

// 根重定向组件
// 后台公共布局，替代Outlet，子页面内容放在 props.children
function AdminLayout(props: RouteSectionProps) {
    return (
        <div class="min-h-screen flex flex-col">
            {/* 全局顶部导航栏，只有进入后台才显示 */}
            <header class="bg-slate-800 text-white p-4">
                <span>后台管理系统</span>
            </header>
            {/* 这里就是原来Outlet的位置，渲染子页面 */}
            <main class="flex-1">
                {props.children}
            </main>
        </div>
    );
}

// 根路径重定向
function RootRedirect() {
    const navigate = useNavigate();
    navigate(paths.login, { replace: true });
    return null;
}

const routes = [
    {
        path: paths(),
        component: RootRedirect
    },
    // 登录页面：独立页面，不套AdminLayout
    {
        path: paths.login,
        component: LoginPage
    },
    // 后台首页：父路由使用AdminLayout，子路由页面会作为children传入布局
    {
        path: paths(),
        component: AdminLayout,
        children: [
            {
                path: "",
                component: IndexPage
            }
        ]
    }
];

export default function App() {
    return <Router routes={routes} />;
}

// export default function App() {
//     return (
//         <Router>
//
//
//             {(props) => (
//             <Loading fallback={<main>Loading…</main>} >{props.children}</Loading>
//             )}
//         </Router>
//     );
// }

