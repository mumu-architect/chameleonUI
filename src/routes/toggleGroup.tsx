import type { ParentProps } from 'solid-js';
import * as ToggleGroup from "@solidiom/toggle-group"
import {Q_ToggleGroup} from "../components/ToggleGroup";
// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function toggleGroupLayout(props: ParentProps) {
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>ToggleGroup</h1>
            <h1 class="font-medium text-red-800 border-b"> single selection</h1>

            <div>
                <ToggleGroup.Root
                    type="single"
                    defaultValue={["bold"]}
                    onValueChange={(values) => console.log(values)}
                    class="inline-flex gap-1 border border-gray-300 rounded-md p-1 bg-white"
                >
                    <ToggleGroup.Item
                        value="bold"
                        class="px-3 py-1.5 rounded text-base font-bold hover:bg-slate-100 data-[state=on]:bg-blue-500 data-[state=on]:text-white transition-colors"
                    >
                        B
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                        value="italic"
                        class="px-3 py-1.5 rounded text-base italic hover:bg-slate-100 data-[state=on]:bg-blue-500 data-[state=on]:text-white transition-colors"
                    >
                        I
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                        value="underline"
                        class="px-3 py-1.5 rounded text-base underline hover:bg-slate-100 data-[state=on]:bg-blue-500 data-[state=on]:text-white transition-colors"
                    >
                        U
                    </ToggleGroup.Item>
                </ToggleGroup.Root>
            </div>
            <h1 class="font-medium text-red-800 border-b"> single selection components</h1>
            <div>
                <Q_ToggleGroup
                    type="single"
                    defaultValue={["bold"]}
                    items={[
                        { value: "bold", label: <span class="font-bold">B</span> },
                        { value: "italic", label: <span class="italic">I</span> },
                        { value: "underline", label: <span class="underline">U</span> },
                    ]}
                    onValueChange={(v) => console.log(v)}
                    color="red"
                />
            </div>
            <h1 class="font-medium text-red-800 border-b"> Multiple selection</h1>

            <div>
                <ToggleGroup.Root
                    type="multiple"
                    defaultValue={["bold", "italic"]}
                    onValueChange={(values) => console.log(values)}
                    class="inline-flex gap-1 p-1 border border-gray-300 rounded-md bg-white"
                >
                    <ToggleGroup.Item
                        value="bold"
                        class="px-3 py-1.5 rounded hover:bg-slate-100 data-[state=on]:bg-blue-500 data-[state=on]:text-white transition-colors"
                    >
                        B
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                        value="italic"
                        class="px-3 py-1.5 rounded hover:bg-slate-100 data-[state=on]:bg-blue-500 data-[state=on]:text-white transition-colors"
                    >
                        I
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                        value="underline"
                        class="px-3 py-1.5 rounded hover:bg-slate-100 data-[state=on]:bg-blue-500 data-[state=on]:text-white transition-colors"
                    >
                        U
                    </ToggleGroup.Item>
                </ToggleGroup.Root>


            </div>
            <h1 class="font-medium text-red-800 border-b"> Multiple selection components</h1>
            <div>
            <Q_ToggleGroup
                type="multiple"
                defaultValue={["bold", "italic"]}
                items={[
                    { value: "bold", label: <span class="font-bold">B</span> },
                    { value: "italic", label: <span class="italic">I</span> },
                    { value: "underline", label: <span class="underline">U</span> },
                ]}
                onValueChange={(v) => console.log(v)}
                color="blue"
            />
                <Q_ToggleGroup
                    type="multiple"
                    defaultValue={["bold", "italic"]}
                    items={[
                        { value: "bold", label: <span class="font-bold">B</span> },
                        { value: "italic", label: <span class="italic">I</span> },
                        { value: "underline", label: <span class="underline">U</span> },
                    ]}
                    onValueChange={(v) => console.log(v)}
                    color="green"
                />
                <Q_ToggleGroup
                    type="multiple"
                    defaultValue={["bold", "italic"]}
                    items={[
                        { value: "bold", label: <span class="font-bold">B</span> },
                        { value: "italic", label: <span class="italic">I</span> },
                        { value: "underline", label: <span class="underline">U</span> },
                    ]}
                    onValueChange={(v) => console.log(v)}
                    color="yellow"
                />
                <Q_ToggleGroup
                    type="multiple"
                    defaultValue={["bold", "italic"]}
                    items={[
                        { value: "bold", label: <span class="font-bold">B</span> },
                        { value: "italic", label: <span class="italic">I</span> },
                        { value: "underline", label: <span class="underline">U</span> },
                    ]}
                    onValueChange={(v) => console.log(v)}
                    color="gray"
                />
                <Q_ToggleGroup
                    type="multiple"
                    defaultValue={["bold", "italic"]}
                    items={[
                        { value: "bold", label: <span class="font-bold">B</span> },
                        { value: "italic", label: <span class="italic">I</span> },
                        { value: "underline", label: <span class="underline">U</span> },
                    ]}
                    onValueChange={(v) => console.log(v)}
                    color="red"
                />

            </div>
        </main>
    );
}