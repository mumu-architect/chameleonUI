import {createSignal, ParentProps} from 'solid-js';
import JoditEditor from "../components/Editor";

// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function iconLayout(props: ParentProps) {

    const [html, setHtml] = createSignal("<p>Hello Jodit + SolidJS2</p>");
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Editor</h1>

            <h1 class="font-medium text-red-800 border-b">Jodit components</h1>
            <div class="flex  flex-col flex-direction gap-12">
                <div class=" p-2">

                    <JoditEditor
                        value={html()}
                        onChange={setHtml}
                        placeholder="请输入内容..."
                        class="w-full min-h-[420px] border border-gray-300 bg-blue-600"
                        config={{
                            height: 420,
                            toolbarSticky: true,
                            // 完整按钮清单（开源版全部内置按钮）
                            buttons: [
                                "source", "|",
                                "bold", "italic", "underline", "strikethrough", "eraser", "|",
                                "superscript", "subscript", "|",
                                "font", "fontsize", "brush", "paragraph", "|",
                                "ul", "ol", "indent", "outdent", "|",
                                "left", "center", "right", "justify", "|",
                                "link", "unlink", "image", "file", "video", "|",
                                "table", "hr", "symbols", "lineHeight", "|",
                                "undo", "redo", "|",
                                "copy", "cut", "paste", "copyformat", "selectall", "|",
                                "find", "preview", "print", "fullsize", "about"
                            ],
                            // 图片上传（按需）
                            uploader: {
                                insertImageAsBase64URI: false,
                            },
                        }}
                    />
                </div>
                <div class="mt-0.5  p-2">
                     <pre class="mt-1 p-2 bg-gray-100 text-sm overflow-auto whitespace-pre-wrap">
                    {html()}
                </pre>
                </div>

            </div>

        </main>
    );
}