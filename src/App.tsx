import {paths,Router} from './router';
import './App.css';
// 登录内容放到Router的子组件，这里才可以使用useNavigate
import {Loading} from "solid-js";


export default function App() {
    return (
        <Router>
            {(props) => (
                <>
                    <Loading fallback={<main>Loading…</main>}>{props.children}</Loading>
                </>
            )}
        </Router>
    );
}

// export default function App() {
//     return (
//          <Router>
//             {(props) => (
//             <Loading fallback={<main>Loading…</main>} >{props.children}</Loading>
//             )}
//          </Router>
//     );
// }

