import type { ParentProps } from 'solid-js';
import * as Button from "@solidiom/button"
import {Q_Button} from "../components/Button";
import {Icon} from "@iconify-icon/solid";
// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function buttonLayout(props: ParentProps) {
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Button</h1>
            <div>
                {/* primary 蓝色填充 + 边框 */}
                <Button.Root
                    onClick={() => alert("clicked")}
                    class="px-4 py-2 rounded transition-colors disabled:opacity-60 bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 active:bg-blue-800 m-1.5"
                >
                    Click me
                </Button.Root>

                {/* secondary 绿色 + 边框 */}
                <Button.Root
                    onClick={() => alert("clicked")}
                    class="px-4 py-2 rounded transition-colors disabled:opacity-60  bg-green-500 text-white border border-green-600  hover:bg-green-600 active:bg-green-700 m-1.5"
                >
                    Click me
                </Button.Root>

                {/* danger 红色填充 + 边框 */}
                <Button.Root
                    onClick={() => alert("clicked")}
                    class="px-4 py-2 rounded transition-colors disabled:opacity-60 bg-red-500 text-white border border-red-600 hover:bg-red-600 active:bg-red-700 m-1.5"
                >
                    Click me
                </Button.Root>
                {/*  黄色带边框 */}
                <Button.Root
                    loading
                    class="px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-60 bg-amber-300 text-white border border-amber-400
         hover:bg-amber-500 active:bg-amber-500 active:text-white m-1.5"
                >
                    Click me
                </Button.Root>
                <Button.Root
                    loading
                    class="px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-60
         bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200 active:bg-amber-300 m-1.5"
                >
                    Click me
                </Button.Root>
                <Button.Root
                    loading
                    class="px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-60
         bg-amber-500 text-white border border-amber-600
         hover:bg-amber-400
         active:bg-amber-600 m-1.5"
                >
                    Click me
                </Button.Root>
                {/* ghost 幽灵，全部加灰色边框 */}
                <Button.Root
                    onClick={() => alert("clicked")}
                    class="  px-3 py-1.5 rounded transition-colors disabled:opacity-60 border border-gray-300 text-gray-700 hover:bg-gray-100 m-1.5"
                >
                    Click me
                </Button.Root>

                {/* loading 蓝色带边框 */}
                <Button.Root
                    loading
                    class="px-3 py-1.5 rounded transition-colors disabled:opacity-60 bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 active:bg-blue-800 m-1.5"
                >
                    Saving...
                </Button.Root>

            </div>
            <h1 class="font-medium text-red-800 border-b">Circle Button</h1>
            <div>
                {/* ghost 幽灵，全部加灰色边框 */}
                <Button.Root
                    onClick={() => alert("clicked")}
                    class="inline-flex items-center justify-center w-11 h-11 rounded-full transition-colors disabled:opacity‑60 border bg-blue-600 text-white border-blue-700 hover:bg-blue-700 active:bg-blue‑800 focus:ring‑2 focus:ring‑blue‑300 focus:outline-none"
                >
                    <Icon icon="ant-design:delete-outlined" width="28" height="28"/>
                </Button.Root>
            </div>

            <h1 class="font-medium text-red-800 border-b"> Q_Button components</h1>

            <div>
                <Q_Button variant="primary" onClick={() => alert("clicked")}>Click me</Q_Button>
                <Q_Button variant="secondary" onClick={() => alert("clicked")}>Click me</Q_Button>
                <Q_Button variant="danger" onClick={() => alert("clicked")}>Click me</Q_Button>
                <Q_Button variant="yellow" onClick={() => alert("clicked")}>Click me</Q_Button>
                <Q_Button variant="ghost" onClick={() => alert("clicked")}>Click me</Q_Button>
                <Q_Button variant="primary" loading>Saving...</Q_Button>
            </div>
            <h1 class="font-medium text-red-800 border-b">ICon Q_Button components </h1>

            <div>
                <Q_Button variant="primary" onClick={() => alert("clicked")}><Icon icon="ci:list-add"  width="28" height="28"/>Add</Q_Button>
                <Q_Button variant="secondary" onClick={() => alert("clicked")}><Icon icon="akar-icons:edit"  width="28" height="28"/>Edit</Q_Button>
                <Q_Button variant="danger" onClick={() => alert("clicked")}><Icon icon="ant-design:delete-outlined"  width="28" height="28"/>Delete</Q_Button>
                <Q_Button variant="yellow" onClick={() => alert("clicked")}><Icon icon="ant-design:warning-outlined"  width="28" height="28"/>Warning</Q_Button>
                <Q_Button variant="ghost" onClick={() => alert("clicked")}><Icon icon="carbon:data-view" width="28" height="28"/>View</Q_Button>
                <Q_Button variant="primary" loading> <Icon icon="eos-icons:bubble-loading"  width="28" height="28"/>Saving...</Q_Button>
            </div>

            <h1 class="font-medium text-red-800 border-b">Circle ICon Q_Button components </h1>

            <div>
                <Q_Button variant="primary" type="circle" onClick={() => alert("clicked")}><Icon icon="ci:list-add" width="28" height="28"/></Q_Button>
                <Q_Button variant="secondary"  type="circle" onClick={() => alert("clicked")}><Icon icon="akar-icons:edit"  width="28" height="28"/></Q_Button>
                <Q_Button variant="danger"  type="circle" onClick={() => alert("clicked")}><Icon icon="ant-design:delete-outlined"  width="28" height="28"/></Q_Button>
                <Q_Button variant="yellow"  type="circle" onClick={() => alert("clicked")}><Icon icon="ant-design:warning-outlined"  width="28" height="28"/></Q_Button>
                <Q_Button variant="ghost"  type="circle" onClick={() => alert("clicked")}><Icon icon="carbon:data-view"  width="28" height="28"/></Q_Button>
                <Q_Button variant="primary"  type="circle"  loading> <Icon icon="eos-icons:bubble-loading"  width="28" height="28"/></Q_Button>
            </div>

        </main>
    );
}


