import type { ParentProps } from 'solid-js';
import {Icon} from "@iconify-icon/solid";

// A layout route: pairing users.tsx with the users/ directory nests every
// page inside it under this component.
export default function aboutLayout(props: ParentProps) {
    const img={
        imgUrl:"./image/man.jpg",
        imgAlt: "me"
    }

    return (
        <main  class="flex-1  p-6  border  rounded-xl">
            <h1>About me</h1>
            <div class="w-full flex border border-gray-300 rounded-xl">
            <div class="min-h-screen flex-1/2 w-1/2 items-top justify-center p-2 font-inter ">
                <div class="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow duration-300">
                    <div class="flex gap-6 mb-8">
                        <div class="w-60 h-60 rounded-lg overflow-hidden bg-slate-100 shadow-sm">
                            <img src={img.imgUrl} alt={img.imgAlt} class="w-full h-full object-cover"/>
                        </div>
                        <div class="flex-1 flex flex-col justify-between py-1">
                            <p class="text-slate-700 pb-1 border-b border-slate-200">Full name: Wang Wei</p>
                            <p class="text-slate-700 pb-1 border-b border-slate-200">Wechat: mumuago</p>
                            <p class="text-slate-700 pb-1 border-b border-slate-200">Email: 1211884772@qq.com</p>
                            <p class="text-slate-700 pb-1 border-b border-slate-200">Introduction: I have a great passion for software technology.I enjoy reading various books.</p>
                        </div>
                    </div>
                    <div class="space-y-5">
                        <div class="flex items-center gap-3">
                            <span class="text-slate-800 font-medium w-7">1.</span>
                            <div class="flex-1 border-b border-slate-300">I have a product called  "Chameleon-UI" front-end UI framework.</div>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="text-slate-800 font-medium w-7">2.</span>
                            <div class="flex-1 border-b border-slate-300">I have the QPHP MVC framework product.</div>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="text-slate-800 font-medium w-7">3.</span>
                            <div class="flex-1 border-b border-slate-300">I have the QFS distributed file storage system product.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" min-h-screen flex-1/2 w-1/2 items-top justify-center p-2 font-inter ">

                <div class="w-full bg-white rounded-xl shadow-sm border border-slate-200 p-8 hover:shadow-md transition-shadow duration-300">

                    <div class="flex gap-6 mb-8">
                        <div class="w-60 h-60 rounded-lg overflow-hidden bg-slate-100 shadow-sm">
                            <img src={img.imgUrl} alt={img.imgAlt} class="w-full h-full object-cover"/>
                        </div>
                        <div class="flex-1 flex flex-col justify-between py-1">
                            <p class="text-slate-700 pb-1 border-b border-slate-200">Full name: Wang Wei</p>
                            <p class="text-slate-700 pb-1 border-b border-slate-200">Wechat: mumuago</p>
                            <p class="text-slate-700 pb-1 border-b border-slate-200">Email: 1211884772@qq.com</p>
                            <p class="text-slate-700 pb-1 border-b border-slate-200">Introduction: I have a great passion for software technology.I enjoy reading various books.</p>
                        </div>
                    </div>
                    <div class="space-y-5">
                        <div class="flex items-center gap-3">
                            <span class="text-slate-800 font-medium w-7">1.</span>
                            <div class="flex-1 border-b border-slate-300">I have a product called  "Chameleon-UI" front-end UI framework.</div>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="text-slate-800 font-medium w-7">2.</span>
                            <div class="flex-1 border-b border-slate-300">I have the QPHP MVC framework product.</div>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="text-slate-800 font-medium w-7">3.</span>
                            <div class="flex-1 border-b border-slate-300">I have the QFS distributed file storage system product.</div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </main>
    );
}