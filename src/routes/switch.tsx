import {createMemo, createSignal, For, onCleanup, ParentProps} from 'solid-js';
import Q_Switch from "../components/Switch";

export default function inputLayout(props: ParentProps) {
    const [blue, setBlue] = createSignal(false);

    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Form</h1>

            <h1 class="font-medium text-red-800 border-b">Switch components</h1>

            <div class="flex flex-direction gap-12">
                <Q_Switch checked={blue()} onCheckedChange={setBlue} color="blue">
                    Switch
                </Q_Switch>
                <Q_Switch checked={blue()} onCheckedChange={setBlue} color="green">
                    Switch
                </Q_Switch>
                <Q_Switch checked={blue()} onCheckedChange={setBlue} color="yellow">
                    Switch
                </Q_Switch>
                <Q_Switch checked={blue()} onCheckedChange={setBlue} color="gray">
                    Switch
                </Q_Switch>
                <Q_Switch checked={blue()} onCheckedChange={setBlue} color="red">
                    Switch
                </Q_Switch>
            </div>
        </main>
    );
}


