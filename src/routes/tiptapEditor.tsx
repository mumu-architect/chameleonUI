import {createSignal, ParentProps} from 'solid-js';
import Q_TiptapEditor from "../components/TiptapEditor";

// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function iconLayout(props: ParentProps) {


    const [html, setHtml] = createSignal("<p>Hello Tiptap v3 + Solid 2</p>");

    const uploadImageMock = async (file: File): Promise<string> => {
        return URL.createObjectURL(file);
    };
    const uploadVideoMock = async (file: File): Promise<string> => {
        return URL.createObjectURL(file);
    };
    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Editor</h1>

            <h1 class="font-medium text-red-800 border-b">Tiptap components</h1>
            <div class="flex  flex-col flex-direction gap-12">
                <div class=" p-2">
                <Q_TiptapEditor
                    value={html()}
                    onChange={setHtml}
                    height={500}
                    onUploadImage={uploadImageMock}
                    onUploadVideo={uploadVideoMock}
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