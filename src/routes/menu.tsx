import {createMemo, createSignal, For, onCleanup, ParentProps} from 'solid-js';
import {Q_Menu} from "../components/Menu";

export default function menuLayout(props: ParentProps) {
    const [blue, setBlue] = createSignal(false);

    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Form</h1>

            <h1 class="font-medium text-red-800 border-b">Menu components</h1>

            <div class="flex flex-direction gap-12">

                <Q_Menu
                    trigger="打开菜单"
                    triggerClass="px-3 py-2 rounded bg-slate-100 hover:bg-slate-200 cursor-pointer"
                    items={[{name:"Project address",value:2}, {name:"About us",value:1},{name:"Logout",value:0}]}
                    onSelect={(val) => {
                        console.log("选中：", val);
                    }}
                />
            </div>
        </main>
    );
}

