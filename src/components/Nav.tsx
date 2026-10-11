import {createSignal, For} from 'solid-js'
import { Icon } from "@iconify-icon/solid";
import {PathEnd} from "@solidjs/router";

// 菜单类型定义
export type MenuItem = {
    id: string
    label: string
    icon: string
    path?: PathEnd
    children?: MenuItem[]// 加 ? 允许 undefined
}
export type TabItem = {
    id: string;
    icon: string;
    label: string;
    display: boolean;
    close: boolean;
    path?: PathEnd;
};
export type QMenuItemProps = {
    item: MenuItem;
    sidebarCollapsed: boolean;
    addTabPage: (id: string) => boolean;
    toggleMenu: (id: string) => void;
    expandedMenus: Record<string, boolean>;
}

// 递归菜单渲染组件
export function Q_MenuItem(props: QMenuItemProps) {

    const hasChild = () => props.item.children?.length
    const isExpand = () => props.expandedMenus[props.item.id]

    return (
        <>
            <a
                onClick={() => {
                    if (hasChild()) {
                        // 父菜单：展开折叠
                        props.toggleMenu(props.item.id)
                    } else {
                        // 叶子菜单：新增/激活tab
                        props.addTabPage(props.item.id)
                    }
                }}
                class="flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-slate-700 data-[active]:bg-slate-700 cursor-pointer"
            >
                <Icon icon={props.item.icon} width="24" height="24" />
                <span class={props.sidebarCollapsed ? "hidden" : ""}>{props.item.label}</span>
                {hasChild() && !props.sidebarCollapsed && (
                    <Icon
                        icon={isExpand() ? "ant-design:caret-down-outlined" : "ant-design:caret-right-outlined"}
                        width="16"
                        height="16"
                    />
                )}
            </a>

            {hasChild() && isExpand() && !props.sidebarCollapsed && (
                <div class="pl-4 mt-1 space-y-1 border-l border-slate-600">
                    <For each={props.item.children}>
                        {(subItem) => <Q_MenuItem
                            item={subItem}
                            sidebarCollapsed={props.sidebarCollapsed}
                            addTabPage={props.addTabPage}
                            toggleMenu={props.toggleMenu}
                            expandedMenus={props.expandedMenus}
                        />}
                    </For>
                </div>
            )}
        </>
    );
}