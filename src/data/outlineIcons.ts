import type { Icon } from "./iconSets";

export interface OutlineIcon extends Icon {
  paths: Array<{
    d: string;
    defaultFill?: string;
    defaultStroke?: string;
    fillRule?: "evenodd" | "nonzero";
  }>;
}

export const outlineIcons: OutlineIcon[] = [
  {
    name: "home-outline",
    chineseName: "首页",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>`,
    paths: [
      { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
      { d: "M9 22V12h6v10" },
    ],
  },
  {
    name: "menu-outline",
    chineseName: "菜单",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>`,
    paths: [
      { d: "M4 6h16" },
      { d: "M4 12h16" },
      { d: "M4 18h16" },
    ],
  },
  {
    name: "search-outline",
    chineseName: "搜索",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
    paths: [
      { d: "M11 11m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0" },
      { d: "M21 21l-4.35-4.35" },
    ],
  },
  {
    name: "settings-outline",
    chineseName: "设置",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
    paths: [
      { d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" },
      { d: "M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" },
    ],
  },
  {
    name: "user-outline",
    chineseName: "用户",
    category: "用户",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    paths: [
      { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" },
      { d: "M12 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0" },
    ],
  },
  {
    name: "heart-outline",
    chineseName: "心形",
    category: "用户",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
    paths: [
      { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" },
    ],
  },
  {
    name: "mail-outline",
    chineseName: "邮件",
    category: "通讯",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>`,
    paths: [
      { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" },
      { d: "M22 6l-10 7L2 6" },
    ],
  },
  {
    name: "message-circle-outline",
    chineseName: "消息圆形",
    category: "通讯",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    paths: [
      { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
    ],
  },
  {
    name: "play-outline",
    chineseName: "播放",
    category: "媒体",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    paths: [
      { d: "M5 3l14 9-14 9V3", fillRule: "evenodd" },
    ],
  },
  {
    name: "camera-outline",
    chineseName: "相机",
    category: "媒体",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
    paths: [
      { d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" },
      { d: "M12 13m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0" },
    ],
  },
  {
    name: "monitor-outline",
    chineseName: "显示器",
    category: "设备",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
    paths: [
      { d: "M2 3h20v14H2z", fillRule: "nonzero" },
      { d: "M8 21h8" },
      { d: "M12 17v4" },
    ],
  },
  {
    name: "smartphone-outline",
    chineseName: "手机",
    category: "设备",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" x2="12" y1="18" y2="18.01"/></svg>`,
    paths: [
      { d: "M5 2h14v20H5z", fillRule: "nonzero" },
      { d: "M12 18h.01" },
    ],
  },
  {
    name: "arrow-left-outline",
    chineseName: "左箭头",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 19l-7-7 7-7"/><path d="M8 12h11"/></svg>`,
    paths: [
      { d: "M15 19l-7-7 7-7" },
      { d: "M8 12h11" },
    ],
  },
  {
    name: "arrow-right-outline",
    chineseName: "右箭头",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/><path d="M16 12H3"/></svg>`,
    paths: [
      { d: "M9 5l7 7-7 7" },
      { d: "M16 12H3" },
    ],
  },
  {
    name: "arrow-up-outline",
    chineseName: "上箭头",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l-7-7 7-7"/><path d="M12 5v14"/></svg>`,
    paths: [
      { d: "M12 19l-7-7 7-7" },
      { d: "M12 5v14" },
    ],
  },
  {
    name: "arrow-down-outline",
    chineseName: "下箭头",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5l7 7-7 7"/><path d="M12 19V5"/></svg>`,
    paths: [
      { d: "M12 5l7 7-7 7" },
      { d: "M12 19V5" },
    ],
  },
  {
    name: "plus-outline",
    chineseName: "加号",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`,
    paths: [
      { d: "M12 5v14" },
      { d: "M5 12h14" },
    ],
  },
  {
    name: "minus-outline",
    chineseName: "减号",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>`,
    paths: [
      { d: "M5 12h14" },
    ],
  },
  {
    name: "x-outline",
    chineseName: "关闭",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6l-12 12"/><path d="M6 6l12 12"/></svg>`,
    paths: [
      { d: "M18 6L6 18" },
      { d: "M6 6l12 12" },
    ],
  },
  {
    name: "check-outline",
    chineseName: "勾选",
    category: "状态",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
    paths: [
      { d: "M20 6L9 17l-5-5" },
    ],
  },
  {
    name: "alert-circle-outline",
    chineseName: "警告圆",
    category: "状态",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r="1"/></svg>`,
    paths: [
      { d: "M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0" },
      { d: "M12 8v4" },
      { d: "M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0" },
    ],
  },
  {
    name: "info-outline",
    chineseName: "信息",
    category: "状态",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16V8"/><circle cx="12" cy="16" r="1"/></svg>`,
    paths: [
      { d: "M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0" },
      { d: "M12 16V8" },
      { d: "M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0" },
    ],
  },
  {
    name: "users-outline",
    chineseName: "用户群",
    category: "用户",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    paths: [
      { d: "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" },
      { d: "M12 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0" },
      { d: "M22 21v-2a4 4 0 0 0-3-3.87" },
      { d: "M16 3.13a4 4 0 0 1 0 7.75" },
    ],
  },
  {
    name: "file-outline",
    chineseName: "文件",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/></svg>`,
    paths: [
      { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" },
      { d: "M14 2v6h6" },
      { d: "M16 13H8" },
      { d: "M16 17H8" },
    ],
  },
  {
    name: "folder-outline",
    chineseName: "文件夹",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
    paths: [
      { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" },
    ],
  },
  {
    name: "image-outline",
    chineseName: "图片",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3-3-3 3-4-4-4 4"/></svg>`,
    paths: [
      { d: "M3 3h18v18H3z", fillRule: "nonzero" },
      { d: "M9 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" },
      { d: "M21 15l-3-3-3 3-4-4-4 4" },
    ],
  },
  {
    name: "video-outline",
    chineseName: "视频",
    category: "媒体",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="14" height="12" rx="2"/><polygon points="16 12 22 8 22 16 16 12"/></svg>`,
    paths: [
      { d: "M2 6h14v12H2z", fillRule: "nonzero" },
      { d: "M16 12l6-4v8l-6-4", fillRule: "evenodd" },
    ],
  },
  {
    name: "music-outline",
    chineseName: "音乐",
    category: "媒体",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="16" r="2"/></svg>`,
    paths: [
      { d: "M9 18V5l12-2v13" },
      { d: "M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" },
      { d: "M18 16m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0" },
    ],
  },
  {
    name: "star-outline",
    chineseName: "星星",
    category: "社交",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    paths: [
      { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l5.91-.99L12 2z", fillRule: "evenodd" },
    ],
  },
  {
    name: "share-outline",
    chineseName: "分享",
    category: "社交",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98"/><path d="M15.41 6.51l-6.83 3.98"/></svg>`,
    paths: [
      { d: "M18 5m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" },
      { d: "M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" },
      { d: "M18 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" },
      { d: "M8.59 13.51l6.83 3.98" },
      { d: "M15.41 6.51l-6.83 3.98" },
    ],
  },
  {
    name: "bookmark-outline",
    chineseName: "书签",
    category: "社交",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
    paths: [
      { d: "M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" },
    ],
  },
  {
    name: "download-outline",
    chineseName: "下载",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>`,
    paths: [
      { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" },
      { d: "M7 10l5 5 5-5" },
      { d: "M12 15V3" },
    ],
  },
  {
    name: "upload-outline",
    chineseName: "上传",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M12 10l-5 5 5 5"/><path d="M12 19V5"/></svg>`,
    paths: [
      { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" },
      { d: "M12 10l-5 5 5 5" },
      { d: "M12 19V5" },
    ],
  },
  {
    name: "refresh-outline",
    chineseName: "刷新",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
    paths: [
      { d: "M3 12a9 9 0 0 1 9-9" },
      { d: "M15.74 3.74l2.26 2.26" },
      { d: "M21 3v5h-5" },
      { d: "M21 12a9 9 0 0 1-9 9" },
      { d: "M8.26 20.26l-2.26-2.26" },
      { d: "M8 16H3v5" },
    ],
  },
];

export const outlineIconsList: Icon[] = outlineIcons.map((icon) => ({
  name: icon.name,
  chineseName: icon.chineseName,
  category: icon.category,
  svg: icon.svg,
}));
