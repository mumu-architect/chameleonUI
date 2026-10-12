import {createMemo, createSignal, For, onCleanup} from "solid-js";
import * as Select from "@solidiom/select"



type SelectOption = {
    value: string;
    label: string;
};

interface SelectProps {
    /** 当前选中值 */
    value?: any;
    /** 值变更回调 */
    onValueChange: (val: any) => void;
    /** 下拉选项数组 */
    options: SelectOption[];
    /** 占位文字，未选中时展示 */
    placeholder?: string;
    /** 组件外层宽度，默认 w-52 */
    widthClass?: string;
    disabled?: boolean;
    color?:InputColor;
}
type InputColor = "blue" | "green" | "yellow" | "gray" | "red";
const ColorClassMap:Record<InputColor, string>={
    blue: " hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ",
    green: " hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400  ",
    yellow: " hover:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 ",
    gray: " hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 ",
    red: " hover:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 ",
}
const ColorClassMapOption:Record<InputColor, string>={
    blue: " hover:bg-blue-50 ",
    green: " hover:bg-green-50  ",
    yellow: " hover:bg-yellow-50 ",
    gray: " hover:bg-gray-50 ",
    red: " hover:bg-red-50 ",
}

export function Q_Select(props: SelectProps) {
    let ColorName = props?.color?props.color:"blue"
    let baseColor=ColorClassMap[ColorName]
    let baseColorOption=ColorClassMapOption[ColorName]

    // 处理 value 为 undefined，包装成 Accessor 传给 ArkUI
    const selectedVal = createMemo(() => props.value);
    const isPlaceholder = createMemo(() => !props.value);
    const displayText = createMemo(() => {
        if (!props.value) return props.placeholder ?? "Please choose";
        const found = props.options.find((opt) => opt.value === props.value);
        return found?.label ?? props.value;
    });

    const [isOpen, setIsOpen] = createSignal(false);
    let rootRef: HTMLDivElement | undefined;

    // 点击外部关闭下拉
    const handleClickOutside = (e: MouseEvent) => {
        if (rootRef && !rootRef.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };

    // ESC关闭
    const handleGlobalKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
    };

    // onMount(() => {
    //     document.addEventListener("mousedown", handleClickOutside);
    //     document.addEventListener("keydown", handleGlobalKey);
    // });

    onCleanup(() => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleGlobalKey);
    });
    return (
        <div ref={rootRef} class={`relative ${props.widthClass ?? "w-52"}`}>
            <Select.Root
                value={selectedVal}
                defaultValue={undefined}
                onValueChange={(v) => {
                    console.log("select selected:", v);
                    props.onValueChange(v);
                }}
                defaultOpen={isOpen()}
            >
                {/* Trigger 触发器 */}
                <Select.Trigger>
                    <div class={`min-w-40 w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-gray-400 rounded-md cursor-pointer ${baseColor} ${props.disabled ? "opacity-60 pointer-events-none" : ""}`}>
            <span class={isPlaceholder() ? "text-gray-400" : "text-gray-800"}>
              {displayText()}
            </span>
                        <span class="text-gray-500 text-xs">▾</span>
                    </div>
                </Select.Trigger>

                {/* 下拉面板 */}
                <Select.Content>
                    <div class="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto transition ">
                        <For each={props.options}>
                            {(item) => (
                                <Select.Item value={item.value}>
                                    <div class={`px-3 py-2 text-sm cursor-pointer ${baseColorOption} data-[selected]:bg-blue-100 data-[selected]:text-blue-700 data-[selected]:font-medium`}>
                                        {item.label}
                                    </div>
                                </Select.Item>
                            )}
                        </For>
                    </div>
                </Select.Content>
            </Select.Root>
        </div>
    );
}