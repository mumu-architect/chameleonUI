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
                    items={["选项一", "选项二", "选项三"]}
                    onSelect={(val) => {
                        console.log("选中：", val);
                    }}
                />
            </div>
        </main>
    );
}

