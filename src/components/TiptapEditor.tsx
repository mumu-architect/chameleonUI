import {Component, createEffect, createSignal, onCleanup, untrack} from "solid-js";
import { Editor,Node } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import FileHandler from "@tiptap/extension-file-handler";
import {Icon} from "@iconify-icon/solid";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle, FontSize, Color } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
// ========== 关键：模块扩充，给TS声明自定义 setVideo 命令，解决TS2345类型报错 ==========
declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        video: {
            setVideo: (attrs: Record<string, unknown>) => ReturnType;
        };
    }
}

// ========== Tiptap v3 自定义 Video Node 【TS完全无报错版本】 ==========
const Video = Node.create(() => {
    return {
        name: "video",
        group: "block",
        draggable: true,
        addAttributes() {
            return {
                src: { default: null },
                controls: { default: true },
                class: { default: "w-full rounded my-2" },
            };
        },
        parseHTML() {
            return [{ tag: "video" }];
        },
        renderHTML({ HTMLAttributes }) {
            return ["video", HTMLAttributes];
        },
        addCommands() {
            return {
                setVideo: (attrs: Record<string, unknown>) => ({ commands }) => {
                    commands.insertContent({ type: "video", attrs });
                    return true;
                },
            };
        },
    };
});

// ========== 组件Props定义 ==========
export interface TiptapEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    height?: number;
    disabled?: boolean;
    class?: string;
    onUploadImage: (file: File) => Promise<string>;
    onUploadVideo: (file: File) => Promise<string>;
}

const Q_TiptapEditor: Component<TiptapEditorProps> = (props) => {
    const [containerRef, setContainerRef] = createSignal<HTMLDivElement | null>(null);
    const [editor, setEditor] = createSignal<Editor | null>(null);

    // 1. 初始化编辑器：依赖 containerRef()
    createEffect(
        () => containerRef(),
        (el) => {
            untrack(async () => {
                if (!el) return;

                const editorInstance = new Editor({
                    element: el,
                    extensions: [
                        StarterKit,
                        Underline, // 新增下划线
                        Image.configure({ inline: true }),
                        Video,
                        TextAlign.configure({
                            types: ["heading", "paragraph"],
                            alignments: ["left", "center", "right"],
                            defaultAlignment: "left",
                        }),
                        // 字体大小扩展，必须先注册TextStyle
                        TextStyle,
                        FontSize,
                        Color,
                        Highlight.configure({ multicolor: true }),
                        Link.configure({
                            openOnClick: false, // 编辑器内点击不直接打开，避免编辑冲突
                            autolink: true,      // 粘贴url自动转链接
                            linkOnPaste: true,
                            shouldAutoLink: url => url.startsWith("http")
                        }),
                        FileHandler.configure({
                            allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp", "video/mp4"],
                            onDrop: async (editor, files, pos) => {
                                for (const file of files) {
                                    if (file.type.startsWith("image/")) {
                                        const url = await props.onUploadImage(file);
                                        editor.chain().insertContentAt(pos, { type: "image", attrs: { src: url } }).focus().run();
                                    } else if (file.type.startsWith("video/")) {
                                        const url = await props.onUploadVideo(file);
                                        editor.chain().insertContentAt(pos, { type: "video", attrs: { src: url } }).focus().run();
                                    }
                                }
                            },
                            onPaste: async (editor, files) => {
                                const pos = editor.state.selection.anchor;
                                for (const file of files) {
                                    if (file.type.startsWith("image/")) {
                                        const url = await props.onUploadImage(file);
                                        editor.chain().insertContentAt(pos, { type: "image", attrs: { src: url } }).focus().run();
                                    } else if (file.type.startsWith("video/")) {
                                        const url = await props.onUploadVideo(file);
                                        editor.chain().insertContentAt(pos, { type: "video", attrs: { src: url } }).focus().run();
                                    }
                                }
                            },
                        }),
                    ],
                    content: props.value,
                    editable: !props.disabled,
                    editorProps: {
                        attributes: {
                            class: `prose max-w-none outline-none`,
                            style: `min-height:${props.height ?? 420}px`,
                        },
                    },
                    onUpdate: (ctx) => {
                        props.onChange(ctx.editor.getHTML());
                    },
                });

                setEditor(editorInstance);

                onCleanup(() => {
                    editorInstance.destroy();
                    setEditor(null);
                });
            });
        }
    );

    // 2. 外部 value 同步到编辑器，依赖 props.value
    createEffect(
        () => props.value,
        (newValue) => {
            untrack(() => {
                const ed = editor();
                if (!ed) return;
                const currentHtml = ed.getHTML();
                if (currentHtml !== newValue) {
                    ed.commands.setContent(newValue);
                }
            });
        }
    );

    // 3. disabled 只读状态同步，依赖 props.disabled
    createEffect(
        () => props.disabled,
        (isDisabled) => {
            untrack(() => {
                const ed = editor();
                if (!ed) return;
                ed.setEditable(!isDisabled);
            });
        }
    );

    const execCommand = (cmd: string,size?: string,color?: string, bgColor?: string,href?: string) => {
        const ed = editor();
        if (!ed) return;
        switch (cmd) {
            case "bold":
                ed.chain().toggleBold().focus().run();
                break;
            case "italic":
                ed.chain().toggleItalic().focus().run();
                break;
            case "underline":
                ed.chain().toggleUnderline().focus().run();
                break;
            case "strike":
                ed.chain().toggleStrike().focus().run();
                break;
            case "heading1":
                ed.chain().toggleHeading({ level: 1 }).focus().run();
                break;
            case "heading2":
                ed.chain().toggleHeading({ level: 2 }).focus().run();
                break;
            case "heading3":
                ed.chain().toggleHeading({ level: 3 }).focus().run();
                break;
            case "alignLeft":
                ed.chain().setTextAlign("left").focus().run();
                break;
            case "alignCenter":
                ed.chain().setTextAlign("center").focus().run();
                break;
            case "alignRight":
                ed.chain().setTextAlign("right").focus().run();
                break;
            case "bulletList":
                ed.chain().toggleBulletList().focus().run();
                break;
            case "orderedList":
                ed.chain().toggleOrderedList().focus().run();
                break;
            case "setFontSize":
                ed.chain().setFontSize(size!).focus().run();
                break;
            case "unsetFontSize":
                ed.chain().unsetFontSize().focus().run();
                break;
            case "setColor":
                ed.chain().setColor(color!).focus().run();
                break;
            case "unsetColor":
                ed.chain().unsetColor().focus().run();
                break;
            // =====文字背景高亮=====
            case "setBgColor":
                ed.chain().setHighlight({ color: bgColor! }).focus().run();
                break;
            case "unsetBgColor":
                ed.chain().unsetHighlight().focus().run();
                break;
            // ==========链接==========
            case "setLink":
                // target:"_blank" 新窗口打开；href支持外部url或者 #锚点ID 内部跳转
                ed.chain().toggleLink({ href: href!, target: "_blank" }).focus().run();
                break;
            case "unsetLink":
                ed.chain().unsetLink().focus().run();
                break;


        }
    };

    const handleSelectImage = async () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;
            const url = await props.onUploadImage(file);
            editor()?.commands.setImage({ src: url });
            editor()?.chain().focus().run();
        };
        input.click();
    };

    const handleSelectVideo = async () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "video/mp4";
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;
            const url = await props.onUploadVideo(file);
            editor()?.commands.setVideo({ src: url });
            editor()?.chain().focus().run();
        };
        input.click();
    };



    return (
        <div class={`border rounded overflow-hidden ${props.class ?? ""}`}>
            {/* 工具栏 */}
            <div class="flex gap-1 flex-wrap p-2 border-b bg-gray-50">
                <div class="p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors cursor-pointer"
                     onClick={() => execCommand("bold")}
                >
                    <Icon icon="el:bold" width="14" height="14"/>
                </div>

                {/*<button*/}
                {/*    type="button"*/}
                {/*    class="px-3 py-1 rounded border hover:bg-gray-100 transition-colors"*/}
                {/*    onClick={() => execCommand("bold")}*/}
                {/*>*/}
                {/*    粗体*/}
                {/*</button>*/}

                <div class="p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors cursor-pointer"
                     onClick={() => execCommand("italic")}
                >
                    <Icon icon="fa:italic" width="14" height="14"/>
                </div>
                <div class="p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors cursor-pointer"
                     onClick={() => execCommand("underline")}
                >
                    <Icon icon="boxicons:text-underline" width="14" height="14"/>
                </div>
                <div class="p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors cursor-pointer"
                     onClick={() => execCommand("strike")}
                >
                    <Icon icon="grommet-icons:strike-through" width="14" height="14"/>
                </div>
                {/*<button*/}
                {/*    type="button"*/}
                {/*    class="px-3 py-1 rounded border hover:bg-gray-100 transition-colors"*/}
                {/*    onClick={() => execCommand("italic")}*/}
                {/*>*/}
                {/*    斜体*/}
                {/*</button>*/}
                <div class="p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors cursor-pointer"
                     onClick={() => execCommand("heading1")}
                >
                    <Icon icon="gravity-ui:heading-1" width="14" height="14"/>
                </div>
                <div class="p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors cursor-pointer"
                     onClick={() => execCommand("heading2")}
                >
                    <Icon icon="gravity-ui:heading-2" width="14" height="14"/>
                </div>
                <div class="p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors cursor-pointer"
                     onClick={() => execCommand("heading3")}
                >
                    <Icon icon="gravity-ui:heading-3" width="14" height="14"/>
                </div>

                {/*左中右*/}

                <div class="p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors cursor-pointer"
                     onClick={() => execCommand("alignLeft")}
                >
                    <Icon icon="boxicons:align-left" width="14" height="14"/>
                </div>
                <div class="p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors cursor-pointer"
                     onClick={() => execCommand("alignCenter")}
                >
                    <Icon icon="boxicons:align-center" width="14" height="14"/>
                </div>
                <div class="p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors cursor-pointer"
                     onClick={() => execCommand("alignRight")}
                >
                    <Icon icon="ant-design:align-right-outlined" width="14" height="14"/>
                </div>
                {/* 字体大小按钮 */}
                <select
                    class="px-2 py-1 rounded border cursor-pointer text-xs"
                    onChange={(e) => {
                        const val = e.target.value;
                        if (val === "default")  execCommand("unsetFontSize");
                        else execCommand("setFontSize", val);
                    }}
                >
                    <option value="default" >Default font size</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="30px">30px</option>
                    <option value="50px">50px</option>
                    <option value="80px">80px</option>
                </select>
                {/*<button type="button" class="px-3 py-1 rounded border hover:bg-gray-100 transition-colors" onClick={() => execCommand("setFontSize", "12px")}>12px</button>*/}
                {/*<button type="button" class="px-3 py-1 rounded border hover:bg-gray-100 transition-colors" onClick={() => execCommand("setFontSize", "16px")}>16px</button>*/}
                {/*<button type="button" class="px-3 py-1 rounded border hover:bg-gray-100 transition-colors" onClick={() => execCommand("setFontSize", "20px")}>20px</button>*/}
                {/*<button type="button" class="px-3 py-1 rounded border hover:bg-gray-100 transition-colors" onClick={() => execCommand("setFontSize", "30px")}>30px</button>*/}
                {/*<button type="button" class="px-3 py-1 rounded border hover:bg-gray-100 transition-colors" onClick={() => execCommand("setFontSize", "50px")}>50px</button>*/}
                {/*<button type="button" class="px-3 py-1 rounded border hover:bg-gray-100 transition-colors" onClick={() => execCommand("setFontSize", "80px")}>80px</button>*/}
                {/*<button type="button" class="px-3 py-1 rounded border hover:bg-gray-100 transition-colors" onClick={() => execCommand("unsetFontSize")}>默认字号</button>*/}
                {/*<button*/}
                {/*    type="button"*/}
                {/*    class="px-3 py-1 rounded border hover:bg-gray-100 transition-colors"*/}
                {/*    onClick={() => execCommand("heading1")}*/}
                {/*>*/}
                {/*    H1*/}
                {/*</button>*/}

                <div class="p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors cursor-pointer"
                     onClick={() => execCommand("bulletList")}
                >
                    <Icon icon="uim:list-ul" width="14" height="14"/>
                </div>

                <div class="p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors cursor-pointer"
                     onClick={() => execCommand("orderedList")}
                >
                    <Icon icon="fluent:text-list-abc-uppercase-ltr-24-filled" width="14" height="14"/>
                </div>
                {/*字体颜色 取色器*/}
                <div class=" p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors">
                    <input
                        type="color"
                        class="w-6 h-6 p-0 border rounded border-gray-300 cursor-pointer"
                        onInput={(e) => {
                            const val = e.target.value;
                            execCommand("setColor", undefined, val);
                        }}
                        title="font color"
                    />
                    <button type="button" class="px-1.5 py-0 rounded border border-gray-300 hover:bg-gray-200 transition-colors cursor-pointer" onClick={() => execCommand("unsetColor")}>Clear</button>
                </div>


                {/*文字背景色 取色器*/}
                <div class=" p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors">
                <input
                    type="color"
                    class="w-6 h-6 p-0 border rounded border-gray-300 cursor-pointer"
                    onInput={(e) => {
                        const val = e.target.value;
                        execCommand("setBgColor", undefined, undefined, val);
                    }}
                    title="text background color"
                />
                <button type="button" class="px-1.5 py-0.5 rounded border border-gray-300 hover:bg-gray-200 transition-colors cursor-pointer" onClick={() => execCommand("unsetBgColor")}>Clear</button>
                </div>
                {/*链接*/}
                <button
                    type="button"
                    class="px-2 py-0.5 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
                    onClick={() => {
                        const url = prompt("Please enter the link address and fill in # id for the internal anchor point");
                        if(url) execCommand("setLink", undefined, undefined, undefined, url);
                    }}
                >
                    <Icon icon="mdi:link-variant-plus" width="14" height="14"/>

                </button>
                <button
                    type="button"
                    class="px-2 py-0.5 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
                    onClick={() => execCommand("unsetLink")}
                >
                    <Icon icon="mdi:link-variant-minus" width="14" height="14"/>
                </button>
                {/*<button*/}
                {/*    type="button"*/}
                {/*    class="px-3 py-1 rounded border hover:bg-gray-100 transition-colors"*/}
                {/*    onClick={() => execCommand("bulletList")}*/}
                {/*>*/}
                {/*    无序列表*/}
                {/*</button>*/}

                <div class="p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors"
                     onClick={handleSelectImage}
                >
                    <Icon icon="ant-design:file-image-outlined" width="14" height="14"/>
                </div>
                {/*<button*/}
                {/*    type="button"*/}
                {/*    class="px-3 py-1 rounded border hover:bg-gray-100 transition-colors"*/}
                {/*    onClick={handleSelectImage}*/}
                {/*>*/}
                {/*    插入图片*/}
                {/*</button>*/}
                <div class="p-2 justify-center text-center rounded border border-gray-300 hover:bg-gray-300 hover:border hover:border-gray-500 transition-colors"
                     onClick={handleSelectVideo}
                >
                    <Icon icon="bx:video-recording" width="14" height="14"/>
                </div>
                {/*<button*/}
                {/*    type="button"*/}
                {/*    class="px-3 py-1 rounded border hover:bg-gray-100 transition-colors"*/}
                {/*    onClick={handleSelectVideo}*/}
                {/*>*/}
                {/*    插入视频(mp4)*/}
                {/*</button>*/}
            </div>
            {/* 编辑区域挂载点 */}
            <div ref={setContainerRef} />
        </div>
    );
};


export default Q_TiptapEditor;