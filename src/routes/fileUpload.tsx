import {createMemo, createSignal, For, onCleanup, ParentProps} from 'solid-js';
import Q_FileUpload from "../components/FileUpload";

export default function fileUploadLayout(props: ParentProps) {
    const handleChange = (files: File[]) => {
        console.log("Select file list：", files);
    };

    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Form</h1>

            <h1 class="font-medium text-red-800 border-b">Switch components</h1>
            <div class="flex flex-direction gap-12">
                <Q_FileUpload
                    name="fileImage"
                    maxFiles={10}
                    multiple={true}
                    onFilesChange={handleChange}
                    triggerText="Select image file"
                />
            </div>

        </main>
);
}