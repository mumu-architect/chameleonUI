import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import {Icon } from "@iconify-icon/solid";
import { paths } from '../router';

export default function loginPage() {
    const navigate = useNavigate();
    const handleLogin = (e: SubmitEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const username = formData.get("username");
        const password = formData.get("password");

        // 简单校验，实际对接后端登录接口
        if (username && password) {
            navigate(paths());
        }
    };

    return (
        <main  class="flex-1 overflow-auto">
            <div class="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 flex items-center justify-center px-4">
                {/* 登录卡片 毛玻璃效果 */}
                <div class="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-10">
                    <div class="text-center mb-8">
                        {/* 头像图标 */}
                        <div class="w-14 h-14 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-4">
                            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 class="text-2xl font-bold text-slate-800">后台系统登录</h2>
                        <p class="text-slate-500 mt-2">请输入账号密码登录管理后台</p>
                    </div>

                    <form onSubmit={handleLogin} class="space-y-6">
                        {/* 账号输入框 */}
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">账号</label>
                            <input
                                name="username"
                                type="text"
                                required
                                placeholder="请输入账号"
                                class="w-full px-4 py-3 border border-slate-300 rounded-lg transition
              focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                            />
                        </div>

                        {/* 密码输入框 */}
                        <div>
                            <label class="block text-sm font-medium text-slate-700 mb-2">密码</label>
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="请输入密码"
                                class="w-full px-4 py-3 border border-slate-300 rounded-lg transition
              focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
                            />
                        </div>

                        {/* 记住我 + 忘记密码 */}
                        <div class="flex items-center justify-between text-sm">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" class="rounded border-slate-300" />
                                <span class="text-slate-600">记住我</span>
                            </label>
                            <a href="#" class="text-slate-700 hover:underline">忘记密码？</a>
                        </div>

                        {/* 登录按钮 */}
                        <button
                            type="submit"
                            class="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg
            font-medium shadow-md hover:shadow-lg transition-all duration-200"
                        >
                            登 录
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
