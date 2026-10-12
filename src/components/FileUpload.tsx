import {Component, For, createSignal, createMemo} from "solid-js";
import * as FileInput from "@solidiom/file-input"

// 带唯一id包装，解决同名文件
export interface FileUploadItem {
    uid: string;
    file: File;
}

export interface FileUploadProps {
    /** 表单name */
    name?: string;
    /** 最大上传文件数量 */
    maxFiles?: number;
    /** 是否多文件 */
    multiple?: boolean;
    /** 文件变更回调 */
    onFilesChange?: (files: File[]) => void;
    /** 删除文件回调 */
    onRemove?: (uid: string) => void;
    /** 外层自定义class */
    class?: string;
    /** 触发按钮文本 */
    triggerText?: string;
    /** 禁用状态 */
    disabled?: boolean;
}
// 带唯一id包装，解决同名文件

/** 格式化文件大小 */
function formatSize(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

const Q_FileUpload: Component<FileUploadProps> = (props) => {
    //const [itemList, setItemList] = createSignal<FileUploadItem[]>([]);
    const [rawItems, setRawItems] = createSignal<FileUploadItem[]>([]);
    const itemList = createMemo(() => rawItems());
    // 文件选中事件
    const handleFileChange = (files: File[]) => {
        //console.log("回调文件", files.length);
        const obj:{[key:string]:boolean;}={};
        const listData = files.reduce<File[]>((item, next) => {
            // 使用局部对象，不污染外部
            if (!obj[next.name]) {
                item.push(next);
                obj[next.name] = true;
            }
            return item;
        }, []);
        // 外部回调透传
        props.onFilesChange?.(files);

        const newItems: FileUploadItem[] = listData.map((file) => ({
            uid: crypto.randomUUID(),
            file,
        }));
        setRawItems(newItems);
    };

    // 删除单项
    const removeFile = (uid: string) => {
        setRawItems(prev => prev.filter(x => x.uid !== uid));
    };

    return (
        <div class={`flex flex-col gap-12 ${props.class ?? ""}`}>
            <FileInput.Root
                maxFiles={props.maxFiles ?? 10}
                name={props.name}
                onFilesChange={handleFileChange}
                class="w-full max-w-md"
                multiple={props.multiple ?? true}
                disabled={props.disabled}
            >
                <FileInput.Trigger class="px-3 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors">
                    {props.triggerText ?? "Choose files"}
                </FileInput.Trigger>
                <FileInput.HiddenInput />

                {/* FileList 仅样式容器，内部不渲染列表，For移到外部 */}
                <FileInput.FileList class="flex flex-col gap-2" />

                {/* Solid For 在外层，独立DOM，避开Radix内部DOM diff干扰 */}
                <For each={itemList()}>
                    {(entry) => (
                        <div
                            class="mt-2 flex items-center justify-between p-3 border border-black rounded"
                        >
                            <div class="flex flex-col">
                                <span class="text-sm">{entry.file.name}</span>
                                <span class="text-xs text-gray-500">{formatSize(entry.file.size)}</span>
                            </div>
                            <button
                                onClick={() => removeFile(entry.uid)}
                                class="ml-4 p-2 bg-red-500 text-white rounded text-sm cursor-pointer hover:bg-red-600 transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </For>
            </FileInput.Root>
        </div>
    );
};

export default Q_FileUpload;
