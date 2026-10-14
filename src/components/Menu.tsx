import { createSignal } from "solid-js";
import * as Menu from "@solidiom/menu";

export type MenuItem = {
    name:string;
    value:number;
};

export interface MenuProps {
    /** 触发器显示文字 */
    trigger: string;
    triggerClass?:string;
    /** 菜单选项数组 */
    items: MenuItem[];
    /** 默认是否打开 */
    defaultOpen?: boolean;
    /** 选中菜单项回调 */
    onSelect?: (item: number) => void;
}

export function Q_Menu(props: MenuProps) {
    // 内部受控信号
    const [isOpen, setIsOpen] = createSignal(props.defaultOpen ?? false);

    return (
        <div ref={(el) => el.setAttribute("data-hydrated", "true")} class="menu-example relative inline-block">
            <Menu.Root
                defaultOpen={isOpen()}
                onOpenChange={(open) => {
                    setIsOpen(open);
                }}
            >
                <Menu.Trigger>
                    <div class={props.triggerClass}>
                        {props.trigger}
                    </div>
                </Menu.Trigger>
                <Menu.Content
                    aria-label={props.trigger}
                    class="absolute z-50 top-full left-0 bg-white border border-gray-200 shadow-md rounded-md py-1 min-w-28 max-w-[200px]"
                >
                    {props.items.map((item) => (
                        <Menu.Item
                            onSelect={() => {
                                props.onSelect?.(item.value);
                            }}
                        >
                            <div class="px-3 py-2 text-black text-xs cursor-pointer hover:bg-slate-100">{item.name}</div>
                        </Menu.Item>
                    ))}
                </Menu.Content>
            </Menu.Root>
        </div>
    );
}
