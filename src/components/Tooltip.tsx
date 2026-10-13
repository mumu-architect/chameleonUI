// UiTooltip.tsx
import * as  Tooltip  from "@solidiom/tooltip";
import {JSX} from "@solidjs/web";
import {createEffect, createSignal, onCleanup} from "solid-js";

export type UiTooltipProps = {
    /** 触发元素 */
    trigger: JSX.Element;
    /** tooltip显示内容 */
    content: string;
    /** 悬浮延迟(ms) */
    openDelay?: number;
    /** 关闭延迟(ms) */
    closeDelay?: number;
    /** tooltip 宽度，tailwind类，例如 w-40 / w-fit / w-[180px] */
    width?: string;
    /** 箭头大小，单位px，默认4 */
    arrowSize?: number;
    /** tooltip 和触发器之间间距，px，默认8 */
    gap?: number;
};

export function Q_Tooltip(props: UiTooltipProps) {
    const widthClass = props.width ?? "w-fit";
    const arrowSize = props.arrowSize ?? 4;
    const gap = props.gap ?? 8;

    let triggerEl: HTMLElement | undefined;
    let contentEl: HTMLDivElement | undefined;
    const [flipUp, setFlipUp] = createSignal(false);

    function checkViewportSpace() {
        if (!triggerEl || !contentEl) return;
        const triggerRect = triggerEl.getBoundingClientRect();
        const tooltipHeight = contentEl.offsetHeight;
        const spaceTop = triggerRect.top;
        // 上方空间不够，翻转到下方
        setFlipUp(spaceTop < tooltipHeight + gap);
    }

    // resize监听
    createEffect(
        () => true,
        () => {
            window.addEventListener("resize", checkViewportSpace);
            onCleanup(() => window.removeEventListener("resize", checkViewportSpace));
        }
    );

    return (
        <div class="relative inline-block">
            <Tooltip.Root
                openDelay={props.openDelay ?? 500}
                closeDelay={props.closeDelay ?? 300}
            >
                <Tooltip.Trigger
                    ref={(el: HTMLElement) => {
                        triggerEl = el;
                        if (el) queueMicrotask(() => checkViewportSpace());
                    }}
                >
                    {props.trigger}
                </Tooltip.Trigger>

                <Tooltip.Content
                    ref={(el: HTMLDivElement) => {
                        contentEl = el;
                        if (el) queueMicrotask(() => checkViewportSpace());
                    }}
                    class={`
                        z-50 ${widthClass} px-2 py-1.5 text-sm text-white bg-gray-800 rounded shadow-lg
                        absolute
                        transition-opacity duration-150
                        data-[closed]:opacity-0
                        data-[open]:opacity-100
                    `}
                    style={flipUp()
                        ? {
                            // 空间不足：显示在触发器【下方】，箭头朝上
                            left: "50%",
                            top: "100%",
                            transform: `translateX(-50%) translateY(${gap}px)`,
                        }
                        : {
                            // 默认：显示在触发器【上方】，箭头朝下
                            left: "50%",
                            bottom: "100%",
                            transform: `translateX(-50%) translateY(-${gap}px)`,
                        }
                    }
                >
                    {props.content}
                    {/* 可指定大小箭头 */}
                    <div
                        class="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-transparent border-r-transparent"
                        style={flipUp()
                            ? {
                                // 在下方：箭头向上
                                top: `-${arrowSize}px`,
                                "border-bottom-width": `${arrowSize}px`,
                                "border-left-width": `${arrowSize}px`,
                                "border-right-width": `${arrowSize}px`,
                                "border-bottom-color": "#1f2937",
                            }
                            : {
                                // 在上方：箭头向下
                                top: "100%",
                                "border-top-width": `${arrowSize}px`,
                                "border-left-width": `${arrowSize}px`,
                                "border-right-width": `${arrowSize}px`,
                                "border-top-color": "#1f2937",
                            }
                        }
                    />
                </Tooltip.Content>
            </Tooltip.Root>
        </div>
    );
}
