import type { ParentProps } from 'solid-js';
import * as Button from "@solidiom/button"
import {Q_Button} from "../components/Button";
// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function buttonLayout(props: ParentProps) {
    return (
        <main  class="flex-1 overflow-auto p-6 border-t-0 border ">
            <h1>About</h1>
            <div>
                {/* primary 蓝色填充 + 边框 */}
                <Button.Root
                    onClick={() => alert("clicked")}
                    class="px-4 py-2 rounded transition-colors disabled:opacity-60 bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 active:bg-blue-800"
                >
                    Click me
                </Button.Root>

                {/* secondary 绿色 + 边框 */}
                <Button.Root
                    onClick={() => alert("clicked")}
                    class="px-4 py-2 rounded transition-colors disabled:opacity-60  bg-green-500 text-white border border-green-600  hover:bg-green-600 active:bg-green-700"
                >
                    Click me
                </Button.Root>

                {/* danger 红色填充 + 边框 */}
                <Button.Root
                    onClick={() => alert("clicked")}
                    class="px-4 py-2 rounded transition-colors disabled:opacity-60 bg-red-500 text-white border border-red-600 hover:bg-red-600 active:bg-red-700"
                >
                    Click me
                </Button.Root>

                {/* ghost 幽灵，全部加灰色边框 */}
                <Button.Root
                    onClick={() => alert("clicked")}
                    class="px-4 py-2 rounded transition-colors disabled:opacity-60 border border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                    Click me
                </Button.Root>

                {/* loading 蓝色带边框 */}
                <Button.Root
                    loading
                    class="px-4 py-2 rounded transition-colors disabled:opacity-60 bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 active:bg-blue-800"
                >
                    Saving...
                </Button.Root>
            </div>

            <h1 class="font-medium text-red-800 border-b"> Q_Button components</h1>

            <div>
                <Q_Button variant="primary" onClick={() => alert("clicked")}>Click me</Q_Button>
                <Q_Button variant="secondary" onClick={() => alert("clicked")}>Click me</Q_Button>
                <Q_Button variant="danger" onClick={() => alert("clicked")}>Click me</Q_Button>
                <Q_Button variant="ghost" onClick={() => alert("clicked")}>Click me</Q_Button>
                <Q_Button variant="primary" loading>Saving...</Q_Button>
            </div>
        </main>
    );
}


