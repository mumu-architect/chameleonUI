// // UiTooltip.tsx
import * as Tooltip from "@solidiom/tooltip";
import {JSX, Portal} from "@solidjs/web";
import { createEffect, createSignal, onCleanup } from "solid-js";

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
    /** 箭头大小，单位px，默认8（icon尺寸） */
    arrowSize?: number;
    /** tooltip 和触发器之间间距，px，默认8 */
    gap?: number;
    /** 位置上下左右：top|bottom|left|right */
    location?: "top" | "bottom" | "left" | "right";
};

export function Q_Tooltip(props: UiTooltipProps) {
    const widthClass = props.width ?? "w-fit";
    const arrowSize = props.arrowSize ?? 8;
    const gap = props.gap ?? 8;
    const baseLocation = props.location ?? "top";

    let triggerEl: HTMLElement | undefined;
    let contentEl: HTMLDivElement | undefined;
    const [actualLoc, setActualLoc] = createSignal<"top" | "bottom" | "left" | "right">(baseLocation);

    function checkViewportSpace() {
        if (!triggerEl || !contentEl) return;
        const triggerRect = triggerEl.getBoundingClientRect();
        const tw = contentEl.offsetWidth;
        const th = contentEl.offsetHeight;
        const winW = window.innerWidth;
        const winH = window.innerHeight;

        switch (baseLocation) {
            case "top":
                setActualLoc(triggerRect.top < th + gap ? "bottom" : "top");
                break;
            case "bottom":
                setActualLoc(winH - triggerRect.bottom < th + gap ? "top" : "bottom");
                break;
            case "left":
                setActualLoc(triggerRect.left < tw + gap ? "right" : "left");
                break;
            case "right":
                setActualLoc(winW - triggerRect.right < tw + gap ? "left" : "right");
                break;
        }
    }

    // tooltip面板位置
    const getPanelStyle = () => {
        const loc = actualLoc();
        switch (loc) {
            case "top":
                return {
                    left: "50%",
                    bottom: "100%",
                    transform: `translateX(-50%) translateY(-${gap}px)`,
                };
            case "bottom":
                return {
                    left: "50%",
                    top: "100%",
                    transform: `translateX(-50%) translateY(${gap}px)`,
                };
            case "left":
                return {
                    top: "50%",
                    right: "100%",
                    transform: `translateY(-50%) translateX(-${gap}px)`,
                };
            case "right":
                return {
                    top: "50%",
                    left: "100%",
                    transform: `translateY(-50%) translateX(${gap}px)`,
                };
        }
    };

    createEffect(
        () => true,
        () => {
            const handler = () => checkViewportSpace();
            window.addEventListener("resize", handler);
            window.addEventListener("scroll", handler, true);
            onCleanup(() => {
                window.removeEventListener("resize", handler);
                window.removeEventListener("scroll", handler, true);
            });
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

                {/* 图标箭头，和Tooltip.Content同级，同步显隐动画 */}

                    <Tooltip.Content
                        ref={(el: HTMLDivElement) => {
                            contentEl = el;
                            if (el) queueMicrotask(() => checkViewportSpace());
                        }}
                        class={`
            z-[50] ${widthClass} px-2 py-1.5 text-sm text-white bg-gray-800 rounded shadow-lg
            absolute
            transition-opacity duration-150
            data-[closed]:opacity-0
            data-[open]:opacity-100
          `}
                        style={getPanelStyle()}

                    >
                        {props.content}
                    </Tooltip.Content>

            </Tooltip.Root>
        </div>
    );
}
