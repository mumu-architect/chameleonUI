import { createEffect, createSignal, onCleanup, untrack } from "solid-js";
import { Jodit } from "jodit";
import "jodit/es2021/jodit.min.css";
import zhCN from "jodit/esm/langs/zh_cn.js";


type JoditConfig = Parameters<typeof Jodit.make>[1];

export type JoditEditorProps = {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    class?: string;
    config?: Partial<JoditConfig>;
    disabled?: boolean;
};

export default function Q_JoditEditor(props: JoditEditorProps) {
    // 把DOM元素存到signal，signal可以被双参数createEffect监听
    const [domRef, setDomRef] = createSignal<HTMLTextAreaElement | undefined>();
    const [editor, setEditor] = createSignal<ReturnType<typeof Jodit.make> | null>(null);

    // ✅ 和chart组件完全一致写法：双参数 createEffect
    createEffect(
        () => domRef(),
        (el) => {
            if (!el) return;
            console.log("Jodit init DOM", el);

            const inst = Jodit.make(el, {
                placeholder: props.placeholder,
                disabled: props.disabled,
                language: "zh_cn",
                i18n: {
                    zh_cn: zhCN,
                },
                ...props.config,
            });
            setEditor(inst);

            const joditInst = inst as unknown as {
                value: string;
                events: {
                    on: (eventName: string, cb: () => void) => void;
                    off: (eventName: string, cb: () => void) => void;
                };
                destruct: () => void;
                setDisabled: (status: boolean) => void;
            };

            const handleChange = () => {
                props.onChange(joditInst.value ?? "");
            };

            joditInst.events.on("change", handleChange);

            onCleanup(() => {
                console.log("Jodit destroy");
                joditInst.events.off("change", handleChange);
                joditInst.destruct();
                setEditor(null);
            });
        }
    );

    // ✅ 监听外部 value，双参数写法
    createEffect(
        () => props.value,
        (newVal) => {
            untrack(() => {
                const inst = editor();
                if (!inst) return;
                const joditInst = inst as unknown as { value: string };
                if (joditInst.value !== newVal) {
                    joditInst.value = newVal;
                }
            });
        }
    );

    // ✅ 监听 disabled，双参数写法
    createEffect(
        () => props.disabled,
        (isDisabled) => {
            untrack(() => {
                const inst = editor();
                if (!inst) return;
                const joditInst = inst as unknown as { setDisabled: (status: boolean) => void };
                joditInst.setDisabled(!!isDisabled);
            });
        }
    );

    // 回调ref：DOM挂载时把el存入domRef signal，DOM销毁存入undefined
    return (
        <textarea
            ref={(el) => setDomRef(el)}
            class={props.class}
        />
    );
}