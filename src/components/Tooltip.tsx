// UiTooltip.tsx
import * as  Tooltip  from "@solidiom/tooltip";
import {JSX} from "@solidjs/web";

export type UiTooltipProps = {
    /** 触发元素 */
    trigger: JSX.Element;
    /** tooltip显示内容 */
    content: string;
    /** 悬浮延迟(ms) */
    openDelay?: number;
    /** 关闭延迟(ms) */
    closeDelay?: number;
};

export function Q_Tooltip(props: UiTooltipProps) {
    return (
        <Tooltip.Root
            openDelay={props.openDelay ?? 500}
            closeDelay={props.closeDelay ?? 300}
        >
            <Tooltip.Trigger>
                {props.trigger}
            </Tooltip.Trigger>
            <Tooltip.Content
                class="z-50 w-fit px-2 py-1.5 text-sm text-white bg-gray-800 rounded shadow-lg
        transition-opacity duration-150 data-[closed]:opacity-0 data-[open]:opacity-100"
                style="transform: translateY(calc(-100% - 8px)) !important;"
            >
                {props.content}
            </Tooltip.Content>
        </Tooltip.Root>
    );
}
