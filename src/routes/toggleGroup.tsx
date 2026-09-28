import type { ParentProps } from 'solid-js';
import * as ToggleGroup from "@solidiom/toggle-group"
// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function toggleGroupLayout(props: ParentProps) {
    return (
        <main  class="flex-1 overflow-auto p-6 border-t-0 border ">
            <h1>ToggleGroup</h1>
            <h1 class="font-medium text-red-800 border-b"> single selection</h1>

            <div>
                <ToggleGroup.Root
                    type="single"
                    defaultValue={["bold"]}
                    onValueChange={(values) => console.log(values)}
                >
                    <ToggleGroup.Item value="bold">B</ToggleGroup.Item>
                    <ToggleGroup.Item value="italic">I</ToggleGroup.Item>
                    <ToggleGroup.Item value="underline">U</ToggleGroup.Item>
                </ToggleGroup.Root>
            </div>
            <h1 class="font-medium text-red-800 border-b"> Multiple selection</h1>

            <div>
                <ToggleGroup.Root
                    type="multiple"
                    defaultValue={["bold", "italic"]}
                    onValueChange={(values) => console.log(values)}
                >
                    <ToggleGroup.Item value="bold">B</ToggleGroup.Item>
                    <ToggleGroup.Item value="italic">I</ToggleGroup.Item>
                    <ToggleGroup.Item value="underline">U</ToggleGroup.Item>
                </ToggleGroup.Root>
            </div>
        </main>
    );
}