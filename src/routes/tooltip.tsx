import type { ParentProps } from 'solid-js';
import * as Tooltip from "@solidiom/tooltip";
import {Q_Tooltip} from "../components/Tooltip";

// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function tooltipLayout(props: ParentProps) {
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Tooltip</h1>

            <h1 class="font-medium text-red-800 border-b">Tooltip</h1>

            <div class="flex flex-direction gap-12">
                <Tooltip.Root openDelay={500} closeDelay={300} >
                <Tooltip.Trigger>
                    <button type="button" class="px-3 py-1.5 border rounded hover:bg-gray-100">Hover me</button>
                </Tooltip.Trigger>
                <Tooltip.Content class="z-50 w-fit px-2 py-1.5 text-sm text-white bg-gray-800 rounded shadow-lg
    transition-opacity duration-150
    data-[closed]:opacity-0 data-[open]:opacity-100" style="transform: translateY(calc(-100% - 8px)) !important;">This is a tooltip.</Tooltip.Content>
            </Tooltip.Root>
            </div>
            <h1 class="font-medium text-red-800 border-b"> Q_Tooltip components</h1>
            <div class="flex flex-direction gap-12">
                {/*// 固定宽度 w-32，箭头5px，间距6px*/}
                <Q_Tooltip
                    trigger={<button class="px-2 py-1 border rounded">B</button>}
                    content="加粗 Ctrl+B"
                    width="w-32"
                    arrowSize={5}
                    gap={6}
                />

                {/*// 默认宽度w-fit，默认箭头4px，间距8px*/}
                <Q_Tooltip
                    trigger={<button class="px-2 py-1 border rounded">B</button>}
                    content="加粗 Ctrl+B"
                />
            </div>
        </main>
    );
}