import {createMemo, createSignal, For, onCleanup, ParentProps} from 'solid-js';
import * as Input from "@solidiom/input";
import * as Checkbox from "@solidiom/checkbox"
import * as RadioGroup from "@solidiom/radio-group"
import * as Select from "@solidiom/select"
import * as Switch from "@solidiom/switch"
import * as FileInput from "@solidiom/file-input"
import * as NumberInput from "@solidiom/number-input"
import * as TimeInput from "@solidiom/time-input"
import * as Textarea from "@solidiom/textarea";

// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
type OptionItem = {
    value: string;
    label: string;
};

const options: OptionItem[] = [
    { value: "scales", label: "Scales" },
    { value: "horns", label: "Horns1" },
];
// 带唯一id包装，解决同名文件
type FileItem = {
    id: number;
    uid: string;
    file: File;
};
// 文件大小格式化
function formatSize(bytes: number) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1024 / 1024).toFixed(1) + " MB";
}
export default function formLayout(props: ParentProps) {

    const [values, setValues] = createSignal<string[]>(["scales"]);

    const toggle = (value: string) => {
        setValues((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };
    //RadioGroup selected
    const [selected, setSelected] = createSignal("scales");
    //select selected
    const [selectedVal, setSelectedVal] = createSignal<string | undefined>(undefined);
    const [isOpen, setIsOpen] = createSignal(false);

    const displayText = () => {
        const v = selectedVal();
        const found = options.find((o) => o.value === v);
        return found?.label ?? "请选择选项";
    };

    const isPlaceholder = () => selectedVal() === null;

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
    //Switch checked
    const [checked, setChecked] = createSignal(false);
    const [blue, setBlue] = createSignal(false);
    const [green, setGreen] = createSignal(false);
    const [yellow, setYellow] = createSignal(false);
    const [red, setRed] = createSignal(false);

    //fileInput
    const [rawItems, setRawItems] = createSignal<FileItem[]>([]);
    const itemList = createMemo(() => rawItems());
    const handleFileChange = (list: File[]) => {
        console.log("回调文件", list.length);
        const obj:{[key:string]:boolean;}={};
        const listData = list.reduce<File[]>((item, next) => {
            // 使用局部对象，不污染外部
            if (!obj[next.name]) {
                item.push(next);
                obj[next.name] = true;
            }
            return item;
        }, []);

        const newItems: FileItem[] = listData.map((f) => ({
                id: Math.random(),
                uid: crypto.randomUUID(),
                file: f,

        }));
        setRawItems(newItems);
    };

    const removeFile = (uid: string) => {
        setRawItems(prev => prev.filter(x => x.uid !== uid));
    };

    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>Form</h1>
            <h1 class="font-medium text-red-800 border-b">Input</h1>

            <div class="flex flex-direction gap-12">
                <Input.Root type="text" placeholder="Enter your name"  class="h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500"/>
                <Input.Root type="email" placeholder="you@example.com" required class="h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500"/>
                <Input.Root type="password" placeholder="••••••••" class="h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500"/>
                <Input.Root type="text" disabled placeholder="Cannot edit" class="h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500"/>
                <Input.Root type="text" invalid placeholder="Has error" aria-invalid="true" class="h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500"/>
            </div>
            <h1 class="font-medium text-red-800 border-b">Checkbox</h1>
            <div class="flex flex-direction gap-12">
                <Checkbox.Group
                    value={values}
                    onValueChange={(v) => {
                        console.log("onValueChange", v);
                        setValues(v);
                    }}
                    class="flex flex-col gap-3"
                >
                    <Checkbox.Root value="scales" class="flex items-center gap-2 cursor-pointer select-none">
    <span
        class={
            values().includes("scales")
                ? "w-4 h-4 rounded border border-blue-500 bg-blue-500 flex items-center justify-center shrink-0"
                : "w-4 h-4 rounded border border-gray-400 bg-white flex items-center justify-center shrink-0"
        }
    >
      <span class={values().includes("scales") ? "text-white text-xs leading-none" : "hidden"}>✓</span>
    </span>
                        <span class="text-sm text-gray-800">Scales</span>
                    </Checkbox.Root>

                    <Checkbox.Root value="horns" class="flex items-center gap-2 cursor-pointer select-none">
    <span
        class={
            values().includes("horns")
                ? "w-4 h-4 rounded border border-blue-500 bg-blue-500 flex items-center justify-center shrink-0"
                : "w-4 h-4 rounded border border-gray-400 bg-white flex items-center justify-center shrink-0"
        }
    >
      <span class={values().includes("horns") ? "text-white text-xs leading-none" : "hidden"}>✓</span>
    </span>
                        <span class="text-sm text-gray-800">Horns1</span>
                    </Checkbox.Root>
                </Checkbox.Group>
            </div>
            <h1 class="font-medium text-red-800 border-b">checkbox 原生</h1>
            <div class="flex flex-direction gap-12">
                <div>
                    <input type="checkbox" id="scales5" name="scales5" checked />
                    <label for="scales5" >Scales5</label>
                </div>

                <div>
                    <input type="checkbox" id="horns6" name="horns6" />
                    <label for="horns6">Horns6</label>
                </div>
            </div>

            <div class="flex flex-direction gap-12">


            </div>

            <h1 class="font-medium text-red-800 border-b">RadioGroup</h1>
            <div class="flex flex-direction gap-12">
                <RadioGroup.Root
                    value={selected}
                    onValueChange={(v) => {
                        console.log("radio selected:", v);
                        setSelected(v);
                    }}
                    class="flex flex-col gap-3"
                >
                    <RadioGroup.Item value="scales" class="flex items-center gap-2 cursor-pointer">
        <span class="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center shrink-0">
          <span
              class={
                  selected() === "scales"
                      ? "w-2 h-2 rounded-full bg-blue-500"
                      : "hidden"
              }
          />
        </span>
                        <span>Scales</span>
                    </RadioGroup.Item>

                    <RadioGroup.Item value="horns" class="flex items-center gap-2 cursor-pointer">
        <span class="w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center shrink-0">
          <span
              class={
                  selected() === "horns"
                      ? "w-2 h-2 rounded-full bg-blue-500"
                      : "hidden"
              }
          />
        </span>
                        <span>Horns1</span>
                    </RadioGroup.Item>
                </RadioGroup.Root>
            </div>
            <h1 class="font-medium text-red-800 border-b">RadioGroup原生</h1>
            <div class="flex flex-direction gap-12">
                <div>
                    <input type="radio" id="huey" name="drone" value="huey" checked />
                    <label for="huey">Huey</label>
                </div>

                <div>
                    <input type="radio" id="dewey" name="drone" value="dewey" />
                    <label for="dewey">Dewey</label>
                </div>

                <div>
                    <input type="radio" id="louie" name="drone" value="louie" />
                    <label for="louie">Louie</label>
                </div>
            </div>
            <h1 class="font-medium text-red-800 border-b">Select</h1>
            <div class="flex flex-direction gap-12">
                <div ref={rootRef} class="relative w-52">
                    <Select.Root
                        value={selectedVal}
                        defaultValue={undefined}
                        onValueChange={(v) =>{ console.log("select selected:", v);setSelectedVal(v)}}
                        defaultOpen={isOpen()}
                        onOpenChange={setIsOpen}
                    >
                        {/* 触发器：加边框、白色背景、圆角、hover效果 */}
                        <Select.Trigger>
                            <div  class="min-w-40 w-full flex items-center justify-between px-3 py-2 text-sm
           bg-white border border-gray-400 rounded-md cursor-pointer
           hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            <span class={isPlaceholder() ? "text-gray-400" : "text-gray-800"}>{displayText()}</span>
                                <span class="text-gray-500 text-xs">▾</span>
                            </div>
                        </Select.Trigger>
                        {/* 下拉面板：加白色背景、边框、阴影、圆角 */}
                        <Select.Content>
                            <div  class="absolute z-50 w-full mt-1 bg-white border border-gray-300
           rounded-md shadow-lg max-h-48 overflow-auto">
                            <For each={options}>
                                {(item) => (
                                    <Select.Item value={item.value}>
                                        <div class="px-3 py-2 text-sm cursor-pointer
                 hover:bg-blue-50
                 data-[selected]:bg-blue-100 data-[selected]:text-blue-700 data-[selected]:font-medium"
                                        >{item.label}</div>
                                    </Select.Item>
                                )}
                            </For>
                            </div>
                        </Select.Content>
                    </Select.Root>
                </div>
            </div>
            <h1 class="font-medium text-red-800 border-b">Switch</h1>
            <div class="flex flex-direction gap-12">
                <div class="inline-flex items-center gap-3">
                    <Switch.Root
                        checked={checked}
                        onCheckedChange={(v) => setChecked(v)}
                        class={
                            checked()
                                ? "w-12 h-7 rounded-full relative cursor-pointer transition-colors duration-200 bg-amber-400"
                                : "w-12 h-7 rounded-full relative cursor-pointer transition-colors duration-200 bg-gray-300"
                        }
                    >
                        <Switch.Thumb
                            class={
                                checked()
                                    ? "w-6 h-6 rounded-full bg-amber-200 absolute top-0.5 left-0.5 shadow-md transition-transform duration-200 translate-x-5"
                                    : "w-6 h-6 rounded-full bg-amber-200 absolute top-0.5 left-0.5 shadow-md transition-transform duration-200 translate-x-0"
                            }
                        />
                    </Switch.Root>
                    <span>Switch</span>
                </div>

                <div class="flex flex-direction gap-12">
                    {/* 蓝色 */}
                    <div class="inline-flex items-center gap-3">
                        <Switch.Root
                            checked={blue}
                            onCheckedChange={(v) => setBlue(v)}
                            class={
                                blue()
                                    ? "w-12 h-7 rounded-full relative cursor-pointer transition-colors duration-200 bg-blue-400"
                                    : "w-12 h-7 rounded-full relative cursor-pointer transition-colors duration-200 bg-gray-300"
                            }
                        >
                            <Switch.Thumb
                                class={
                                    blue()
                                        ? "w-6 h-6 rounded-full bg-blue-200 absolute top-0.5 left-0.5 shadow-md transition-transform duration-200 translate-x-5"
                                        : "w-6 h-6 rounded-full bg-blue-200 absolute top-0.5 left-0.5 shadow-md transition-transform duration-200 translate-x-0"
                                }
                            />
                        </Switch.Root>
                        <span>Switch</span>
                    </div>

                    {/* 绿色 */}
                    <div class="inline-flex items-center gap-3">
                        <Switch.Root
                            checked={green}
                            onCheckedChange={(v) => setGreen(v)}
                            class={
                                green()
                                    ? "w-12 h-7 rounded-full relative cursor-pointer transition-colors duration-200 bg-emerald-500"
                                    : "w-12 h-7 rounded-full relative cursor-pointer transition-colors duration-200 bg-gray-300"
                            }
                        >
                            <Switch.Thumb
                                class={
                                    green()
                                        ? "w-6 h-6 rounded-full bg-emerald-300 absolute top-0.5 left-0.5 shadow-md transition-transform duration-200 translate-x-5"
                                        : "w-6 h-6 rounded-full bg-emerald-300 absolute top-0.5 left-0.5 shadow-md transition-transform duration-200 translate-x-0"
                                }
                            />
                        </Switch.Root>
                        <span>Switch</span>
                    </div>
                    {/* 黄色 */}
                    <div class="inline-flex items-center gap-3">
                        <Switch.Root
                            checked={yellow}
                            onCheckedChange={(v) => setYellow(v)}
                            class={
                                yellow()
                                    ? "w-12 h-7 rounded-full relative cursor-pointer transition-colors duration-200 bg-amber-500"
                                    : "w-12 h-7 rounded-full relative cursor-pointer transition-colors duration-200 bg-gray-300"
                            }
                        >
                            <Switch.Thumb
                                class={
                                    yellow()
                                        ? "w-6 h-6 rounded-full bg-amber-300 absolute top-0.5 left-0.5 shadow-md transition-transform duration-200 translate-x-5"
                                        : "w-6 h-6 rounded-full bg-amber-300 absolute top-0.5 left-0.5 shadow-md transition-transform duration-200 translate-x-0"
                                }
                            />
                        </Switch.Root>
                        <span>Switch</span>
                    </div>


                    {/* 红色 */}
                    <div class="inline-flex items-center gap-3">
                        <Switch.Root
                            checked={red}
                            onCheckedChange={(v) => setRed(v)}
                            class={
                                red()
                                    ? "w-12 h-7 rounded-full relative cursor-pointer transition-colors duration-200 bg-red-500"
                                    : "w-12 h-7 rounded-full relative cursor-pointer transition-colors duration-200 bg-gray-300"
                            }
                        >
                            <Switch.Thumb
                                class={
                                    red()
                                        ? "w-6 h-6 rounded-full bg-red-300 absolute top-0.5 left-0.5 shadow-md transition-transform duration-200 translate-x-5"
                                        : "w-6 h-6 rounded-full bg-red-300 absolute top-0.5 left-0.5 shadow-md transition-transform duration-200 translate-x-0"
                                }
                            />
                        </Switch.Root>
                        <span>Switch</span>
                    </div>

                </div>
            </div>
            <h1 class="font-medium text-red-800 border-b">FileInput</h1>
            <div class="flex flex-direction gap-12">
                <FileInput.Root
                    maxFiles={10}
                    name="fileImage"
                    onFilesChange={handleFileChange}
                    class="w-full max-w-md"
                    multiple={true}
                >
                    <FileInput.Trigger class="px-3 py-2 bg-blue-500 text-white rounded cursor-pointer">
                        Choose files
                    </FileInput.Trigger>
                    <FileInput.HiddenInput />

                    {/* FileList 仅作为样式壳子，内部不放任何循环！ */}
                    <FileInput.FileList class="flex flex-col gap‑2">
                        {/* For 直接提到 FileList 的外面，不要嵌套在里面 */}
                    </FileInput.FileList>

                    {/* ✅ For 移到 FileList 外面，完全交给Solid自己管理DOM diff，不受第三方组件干扰 */}
                    <For each={itemList()}>
                        {(entry) => (
                            <div
                                // key={entry.uid}
                                class="flex items-center justify-between p-3 border border-black rounded"
                            >
                                <div class="flex flex-col">
                                    <span class="text‑sm">{entry.file.name}</span>
                                    <span class="text‑xs text‑gray‑500">{formatSize(entry.file.size)}</span>
                                </div>
                                <button
                                    onClick={() => removeFile(entry.uid)}
                                    class="p-2  bg-red-500 text-white rounded text‑sm cursor‑pointer"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </For>
                </FileInput.Root>
            </div>
            <h1 class="font-medium text-red-800 border-b">NumberInput</h1>
            <div class="flex flex-direction gap-12">

            <NumberInput.Root>
                <NumberInput.DecrementButton>−</NumberInput.DecrementButton>
                <NumberInput.Input />
                <NumberInput.IncrementButton>+</NumberInput.IncrementButton>
            </NumberInput.Root>
            </div>
            <h1 class="font-medium text-red-800 border-b">TimeInput </h1>
            <div class="flex flex-direction gap-12">
                <TimeInput.Root>
                    <TimeInput.Segment/>
                    <TimeInput.Separator>:</TimeInput.Separator>
                    <TimeInput.Segment />
                    <TimeInput.Separator>:</TimeInput.Separator>
                    <TimeInput.Segment />
                    <TimeInput.Segment />
                </TimeInput.Root>
            </div>
            <h1 class="font-medium text-red-800 border-b">Textarea</h1>
            <div class="flex flex-direction gap-12">
                <Textarea.Root
                    aria-label="Message"
                    class={`
          w-full  min-h‑32 max-h‑64 resize‑y
          px‑4 py‑3
          border border‑gray‑300 rounded‑xl
          bg‑gray‑50 text‑gray‑800
          text‑base leading‑relaxed
          outline‑none
          /* hover */
          hover:border‑gray‑400 hover:bg‑white
          /* focus */
          focus:border‑blue‑500 focus:ring‑2 focus:ring‑blue‑200 focus:bg‑white
          /* 禁用样式自动生效 */
          disabled:bg‑gray‑100 disabled:text‑gray‑400 disabled:cursor‑not‑allowed
        `}
                >

                </Textarea.Root>
            </div>
        </main>
    );
}