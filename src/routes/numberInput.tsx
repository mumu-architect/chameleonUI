import {createMemo, createSignal, For, onCleanup, ParentProps} from 'solid-js';
import Q_NumberInput from "../components/NumberInput";

export default function numberInputLayout(props: ParentProps) {
    const [num, setNum] = createSignal(10);

    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Form</h1>
            <h1 class="font-medium text-red-800 border-b">Q_NumberInput components ( Uncontrolled usage )</h1>
            <div class="flex flex-direction gap-12">
                <Q_NumberInput defaultValue={10} min={0} max={999} />
            </div>
            <h1 class="font-medium text-red-800 border-b">Q_NumberInput components</h1>

            <div class="flex flex-direction gap-12">
                <Q_NumberInput
                    value={num()}
                    min={0}
                    max={999}
                    onValueChange={(v) => setNum(v)}
                    color="blue"
                />
                <Q_NumberInput
                    value={num()}
                    min={0}
                    max={999}
                    onValueChange={(v) => setNum(v)}
                    color="green"
                />
                <Q_NumberInput
                    value={num()}
                    min={0}
                    max={999}
                    onValueChange={(v) => setNum(v)}
                    color="yellow"
                />
                <Q_NumberInput
                    value={num()}
                    min={0}
                    max={999}
                    onValueChange={(v) => setNum(v)}
                    color="gray"
                />

                <Q_NumberInput
                    value={num()}
                    min={0}
                    max={999}
                    onValueChange={(v) => setNum(v)}
                    color="red"
                />
            </div>
        </main>
    );
}