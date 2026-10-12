import {JSX} from "@solidjs/web";


type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
const breakpoints: Array<{ key: Breakpoint; prefix: string }> = [
    { key: "xs", prefix: "" },
    { key: "sm", prefix: "sm:" },
    { key: "md", prefix: "md:" },
    { key: "lg", prefix: "lg:" },
    { key: "xl", prefix: "xl:" },
];
interface RowProps {
    gutter?: [number, number];
    rowGap?: number;
    justify?: "start" | "center" | "end" | "between" | "around";
    align?: "start" | "center" | "end";
    class?: string;
    children?: JSX.Element;
}
export function Q_Row(props: RowProps) {
    const { gutter = [0, 0], rowGap, justify, align, class: className } = props;
    const [gx, gy] = gutter;

    const style: JSX.CSSProperties = {};

    if (gx > 0) {
        style["margin-left"] = `${-gx / 2}px`;
        style["margin-right"] = `${-gx / 2}px`;
    }

    if (gy > 0) {
        style["margin-top"] = `${-gy / 2}px`;
        style["margin-bottom"] = `${-gy / 2}px`;
    }

    if (rowGap != null) {
        style["row-gap"] = `${rowGap}px`;
    }

    return (
        <div
            class={`w-full flex flex-wrap ${justify ? `justify-${justify}` : ""} ${align ? `items-${align}` : ""} ${className ?? ""}`}
            style={style}
        >
            {props.children}
        </div>
    );
}

interface ColProps {
    span?: number;
    responsive?: Partial<Record<Breakpoint, number>>;
    gutter?: [number, number];
    offset?: number;
    class?: string;
    children?: JSX.Element;
}

export function Q_Col(props: ColProps) {
    const { span = 24, responsive = {}, gutter, offset, class: className } = props;
    const [gx, gy] = gutter ?? [0, 0];
    const basePct = (responsive.xs ?? span) / 24 * 100;
    const classList: string[] = [];

    for (const bp of breakpoints) {
        const val = responsive[bp.key];
        const targetSpan = bp.key === "xs" ? (val ?? span) : val;
        if (targetSpan != null) {
            const pct = (targetSpan / 24) * 100;
            // 生成动态tailwind方括号类，不在style里写！
            classList.push(`${bp.prefix}[flex-basis:${pct}%]`);
            classList.push(`${bp.prefix}[max-width:${pct}%]`);
            // 使用 w-[xxx%]，放弃flex-basis
            classList.push(`${bp.prefix}w-[${pct}%]`);
            classList.push(`${bp.prefix}flex-shrink-0`);
        }
    }

    const style: JSX.CSSProperties = {
        "flex-shrink": 0,
        "flex-grow": 0,
        "flex-basis": `${basePct}%`,
         "max-width": `${basePct}%`,
    };

    if (offset) {
        style["margin-left"] = `${offset / 24 * 100}%`;
    }
    if (gy && gy > 0) {
        style["padding-top"] = `${gy / 2}px`;
        style["padding-bottom"] = `${gy / 2}px`;
    }
    if (gx && gx > 0) {
        style["padding-left"] = `${gx / 2}px`;
        style["padding-right"] = `${gx / 2}px`;
    }

    return (
        <div
            class={`${classList.join(" ")} ${className ?? ""}`}
            style={style}
        >
            {props.children}
        </div>
    );
}