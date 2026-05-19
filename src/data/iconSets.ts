export interface Icon {
  name: string;
  chineseName: string;
  category: string;
  svg: string;
}

export interface IconSetInfo {
  id: string;
  name: string;
  prefix: string;
  totalIcons: number;
  author: string;
  website: string;
  license: string;
  description: string;
  categories: string[];
}

// 导入线框图标 (line-md)
import { lineMdIcons } from "./lineMdIcons";
// 导入扩展渐变图标
import { gradientIconsExtended } from "./gradientIconsExtended";
// 导入扩展扁平图标
import { flatIconsExtended } from "./flatIconsExtended";
// 导入 Tabler 图标
import { tablerIcons } from "./tablerIcons";

// Line-md Icons - Material风格线框图标
export const lucideSet: IconSetInfo = {
  id: "line-md",
  name: "线框图标",
  prefix: "line-md-",
  totalIcons: lineMdIcons.length,
  author: "Vjacheslav Trushkin",
  website: "https://icon-sets.iconify.design/line-md/",
  license: "MIT",
  description: "Material Design风格的线框图标，包含动画效果",
  categories: [
    "Account",
    "Actions",
    "Alert",
    "Audio",
    "Communication",
    "Content",
    "Device",
    "Editor",
    "Files",
    "Hardware",
    "Image",
    "Maps",
    "Navigation",
    "Notification",
    "Social",
    "Weather",
  ],
};

export const gradientIcons: Icon[] = [
  {
    name: "home-gradient",
    chineseName: "首页",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#667eea"/><stop offset="100%" style="stop-color:#764ba2"/></linearGradient></defs><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="url(#g1)"/><polyline points="9 22 9 12 15 12 15 22" fill="#fff"/></svg>`,
  },
  // ... 省略中间已有图标 ...
  {
    name: "battery-gradient",
    chineseName: "电池",
    category: "设备",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><defs><linearGradient id="g51" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#10B981"/><stop offset="100%" style="stop-color:#059669"/></linearGradient></defs><rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="url(#g51)" stroke-width="2"/><path d="M22 10v4M4 10h14v4H4z" fill="url(#g51)"/></svg>`,
  },
  ...gradientIconsExtended,
];

// 渐变风格图标库
export const gradientSet: IconSetInfo = {
  id: "gradient",
  name: "渐变风格",
  prefix: "gradient-",
  totalIcons: gradientIcons.length,
  author: "IconHub",
  website: "https://iconhub.dev",
  license: "MIT",
  description: "采用渐变色设计的精美图标，适合现代UI设计",
  categories: ["导航", "操作", "状态", "用户", "内容", "通讯", "媒体", "设备", "天气", "通知", "设计", "交通", "地图"],
};

export const flatIcons: Icon[] = [
  {
    name: "home-flat",
    chineseName: "首页",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4F46E5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 12h6" fill="#fff"/></svg>`,
  },
  {
    name: "menu-flat",
    chineseName: "菜单",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#EC4899"><rect x="4" y="6" width="16" height="2" rx="1"/><rect x="4" y="12" width="16" height="2" rx="1"/><rect x="4" y="18" width="16" height="2" rx="1"/></svg>`,
  },
  {
    name: "search-flat",
    chineseName: "搜索",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#06B6D4"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "settings-flat",
    chineseName: "设置",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F59E0B"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7" fill="none" stroke="#F59E0B" stroke-width="2"/><circle cx="12" cy="12" r="11" fill="none" stroke="#F59E0B" stroke-width="2"/></svg>`,
  },
  {
    name: "user-flat",
    chineseName: "用户",
    category: "用户",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#8B5CF6"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  },
  {
    name: "heart-flat",
    chineseName: "心形",
    category: "用户",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#EF4444"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  },
  {
    name: "mail-flat",
    chineseName: "邮件",
    category: "通讯",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#06B6D4"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6L12 13 2 6" fill="#fff"/></svg>`,
  },
  {
    name: "message-circle-flat",
    chineseName: "消息圆形",
    category: "通讯",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#8B5CF6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  },
  {
    name: "play-flat",
    chineseName: "播放",
    category: "媒体",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#10B981"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  },
  {
    name: "camera-flat",
    chineseName: "相机",
    category: "媒体",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#EC4899"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4" fill="#fff"/></svg>`,
  },
  {
    name: "monitor-flat",
    chineseName: "显示器",
    category: "设备",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3B82F6"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" x2="16" y1="21" y2="21" stroke="#fff" stroke-width="2"/><line x1="12" x2="12" y1="17" y2="21" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "smartphone-flat",
    chineseName: "手机",
    category: "设备",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4F46E5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><path d="M12 18h.01" stroke="#fff" stroke-width="1"/></svg>`,
  },
  {
    name: "arrow-left-flat",
    chineseName: "左箭头",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2"><path d="M15 19l-7-7 7-7"/><path d="M21 12H8"/></svg>`,
  },
  {
    name: "arrow-right-flat",
    chineseName: "右箭头",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2"><path d="M9 5l7 7-7 7"/><path d="M3 12h13"/></svg>`,
  },
  {
    name: "arrow-up-flat",
    chineseName: "上箭头",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M12 19l-7-7 7-7"/><path d="M12 5v14"/></svg>`,
  },
  {
    name: "arrow-down-flat",
    chineseName: "下箭头",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><path d="M12 5l7 7-7 7"/><path d="M12 19V5"/></svg>`,
  },
  {
    name: "plus-flat",
    chineseName: "加号",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`,
  },
  {
    name: "minus-flat",
    chineseName: "减号",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><path d="M5 12h14"/></svg>`,
  },
  {
    name: "x-flat",
    chineseName: "关闭",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg>`,
  },
  {
    name: "check-flat",
    chineseName: "勾选",
    category: "状态",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`,
  },
  {
    name: "alert-circle-flat",
    chineseName: "警告圆",
    category: "状态",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><circle cx="12" cy="16" r="1" fill="#F59E0B"/></svg>`,
  },
  {
    name: "info-flat",
    chineseName: "信息",
    category: "状态",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><circle cx="12" cy="8" r="1" fill="#3B82F6"/></svg>`,
  },
  {
    name: "users-flat",
    chineseName: "用户群",
    category: "用户",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#A855F7"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><circle cx="19" cy="7" r="2"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 9.13a4 4 0 0 1 0 7.75" fill="none" stroke="#A855F7" stroke-width="2"/></svg>`,
  },
  {
    name: "user-plus-flat",
    chineseName: "添加用户",
    category: "用户",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#10B981"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M16 11h4M18 9v4" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "file-flat",
    chineseName: "文件",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3B82F6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6" stroke="#fff" stroke-width="2"/><path d="M10 14h4M10 18h4" stroke="#fff" stroke-width="1"/></svg>`,
  },
  {
    name: "folder-flat",
    chineseName: "文件夹",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F59E0B"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  },
  {
    name: "image-flat",
    chineseName: "图片",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EC4899" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2" fill="#EC4899"/><path d="m21 15-3-3-3 3-4-4-4 4"/></svg>`,
  },
  {
    name: "video-flat",
    chineseName: "视频",
    category: "媒体",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#EF4444"><rect x="2" y="6" width="14" height="12" rx="2"/><polygon points="16 12 22 8 22 16 16 12"/></svg>`,
  },
  {
    name: "music-flat",
    chineseName: "音乐",
    category: "媒体",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="2" fill="#8B5CF6"/><circle cx="18" cy="16" r="2" fill="#8B5CF6"/></svg>`,
  },
  {
    name: "volume-flat",
    chineseName: "音量",
    category: "媒体",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#10B981"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" fill="none" stroke="#10B981" stroke-width="2"/></svg>`,
  },
  {
    name: "pause-flat",
    chineseName: "暂停",
    category: "媒体",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F59E0B"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  },
  {
    name: "cloud-flat",
    chineseName: "云",
    category: "设备",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#60A5FA"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/></svg>`,
  },
  {
    name: "download-flat",
    chineseName: "下载",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>`,
  },
  {
    name: "upload-flat",
    chineseName: "上传",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M12 10l-5 5 5 5"/><path d="M12 19V5"/></svg>`,
  },
  {
    name: "refresh-flat",
    chineseName: "刷新",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
  },
  {
    name: "star-flat",
    chineseName: "星星",
    category: "社交",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#FBBF24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  },
  {
    name: "share-flat",
    chineseName: "分享",
    category: "社交",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3B82F6"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.83 3.98" stroke="#3B82F6" stroke-width="2"/></svg>`,
  },
  {
    name: "bookmark-flat",
    chineseName: "书签",
    category: "社交",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#EC4899"><path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>`,
  },
  {
    name: "trash-flat",
    chineseName: "删除",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  },
  {
    name: "edit-flat",
    chineseName: "编辑",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  },
  {
    name: "copy-flat",
    chineseName: "复制",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><rect x="8" y="8" width="14" height="14" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
  },
  {
    name: "tag-flat",
    chineseName: "标签",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#EC4899"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z"/><circle cx="7" cy="7" r="1" fill="#fff"/></svg>`,
  },
  {
    name: "calendar-flat",
    chineseName: "日历",
    category: "数据",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  },
  {
    name: "clock-flat",
    chineseName: "时钟",
    category: "数据",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  },
  {
    name: "bar-chart-flat",
    chineseName: "柱状图",
    category: "数据",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M12 20V10M18 20V4M6 20V16"/></svg>`,
  },
  {
    name: "pie-chart-flat",
    chineseName: "饼图",
    category: "数据",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z" fill="#F59E0B"/></svg>`,
  },
  {
    name: "shield-flat",
    chineseName: "盾牌",
    category: "状态",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#10B981"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  },
  {
    name: "lock-flat",
    chineseName: "锁",
    category: "状态",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F59E0B"><rect x="12" y="14" width="10" height="8" rx="2"/><path d="M16 14V8a4 4 0 0 0-8 0v6" fill="none" stroke="#F59E0B" stroke-width="2"/></svg>`,
  },
  {
    name: "unlock-flat",
    chineseName: "解锁",
    category: "状态",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#10B981"><rect x="12" y="14" width="10" height="8" rx="2"/><path d="M22 15V7a4 4 0 0 0-8-4 4 4 0 0 0-8 4v8" fill="none" stroke="#10B981" stroke-width="2"/></svg>`,
  },
  {
    name: "wifi-flat",
    chineseName: "WiFi",
    category: "设备",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M12 18a6 6 0 0 0 0-12 6 6 0 0 0 0 12z"/><path d="M12 20a8 8 0 0 0 0-16 8 8 0 0 0 0 16z"/><path d="M12 22a10 10 0 0 0 0-20 10 10 0 0 0 0 20z"/><circle cx="12" cy="6" r="1" fill="#10B981"/></svg>`,
  },
  {
    name: "battery-flat",
    chineseName: "电池",
    category: "设备",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M22 10v4M4 10h14v4H4z" fill="#10B981"/></svg>`,
  },
  {
    name: "bell-flat",
    chineseName: "铃铛",
    category: "通知",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F59E0B"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0" fill="none" stroke="#F59E0B" stroke-width="2"/></svg>`,
  },
  {
    name: "gift-flat",
    chineseName: "礼物",
    category: "社交",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#EC4899"><rect x="3" y="12" width="18" height="10" rx="2"/><rect x="12" y="5" width="6" height="7" rx="2"/><rect x="6" y="5" width="6" height="7" rx="2"/><path d="M9 12l6 6M15 12l-6 6" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "headphones-flat",
    chineseName: "耳机",
    category: "媒体",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#8B5CF6"><circle cx="8" cy="14" r="6"/><circle cx="16" cy="14" r="6"/><path d="M4 14v-1a8 8 0 0 1 16 0v1" fill="none" stroke="#8B5CF6" stroke-width="2"/></svg>`,
  },
  {
    name: "mic-flat",
    chineseName: "麦克风",
    category: "媒体",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3B82F6"><circle cx="12" cy="15" r="3"/><path d="M12 12v-3a5 5 0 0 0-5-5v-2h10v2a5 5 0 0 0-5 5v3" fill="none" stroke="#3B82F6" stroke-width="2"/></svg>`,
  },
  {
    name: "printer-flat",
    chineseName: "打印机",
    category: "设备",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#6B7280"><rect x="3" y="10" width="18" height="11" rx="2"/><path d="M17 5H7a2 2 0 0 0-2 2v3M12 18v4" stroke="#6B7280" stroke-width="2"/></svg>`,
  },
  {
    name: "scanner-flat",
    chineseName: "扫描仪",
    category: "设备",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#06B6D4"><rect x="5" y="4" width="14" height="16" rx="2"/><rect x="7" y="6" width="10" height="12" fill="none" stroke="#fff" stroke-width="2"/><path d="M7 18h10" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "wallet-flat",
    chineseName: "钱包",
    category: "财务",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#10B981"><path d="M20 6h-3a1 1 0 0 1-1-1V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1H4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"/><path d="M16 11H8" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "credit-card-flat",
    chineseName: "信用卡",
    category: "财务",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#4F46E5"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M6 10h12M6 14h6" stroke="#fff" stroke-width="1.5"/><circle cx="18" cy="14" r="1" fill="#fff"/></svg>`,
  },
  {
    name: "map-flat",
    chineseName: "地图",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3B82F6"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><circle cx="12" cy="11" r="3" fill="#EF4444"/></svg>`,
  },
  {
    name: "compass-flat",
    chineseName: "指南针",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/><path d="M12 16l-4-4 1.5-1.5L12 12l4.5-4.5L16 8l-4 4z" fill="#F59E0B"/></svg>`,
  },
  {
    name: "globe-flat",
    chineseName: "地球",
    category: "导航",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3B82F6"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20M8 12a4 4 0 0 1 8 0" fill="none" stroke="#fff" stroke-width="1.5"/></svg>`,
  },
  {
    name: "eye-flat",
    chineseName: "眼睛",
    category: "状态",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#06B6D4"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/><circle cx="12" cy="12" r="3" fill="#fff"/></svg>`,
  },
  {
    name: "eye-off-flat",
    chineseName: "眼睛关闭",
    category: "状态",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-5.96 5.06"/><path d="M1 1l22 22M9.71 9.71l4.58 4.58"/></svg>`,
  },
  {
    name: "link-flat",
    chineseName: "链接",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  },
  {
    name: "quote-flat",
    chineseName: "引用",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F59E0B"><path d="M14 2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M10 14h4M10 18h4" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "code-flat",
    chineseName: "代码",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2"><path d="M16 18l2.5-2.5-2.5-2.5M8 6l-2.5 2.5L8 11M18 8l-2.5 2.5L18 13M6 18l2.5-2.5L6 13"/></svg>`,
  },
  {
    name: "terminal-flat",
    chineseName: "终端",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#10B981"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M5 9h14M5 14h9" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "git-branch-flat",
    chineseName: "Git分支",
    category: "开发",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2"><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 6v6a6 6 0 0 0 6 6v-1.5M18 6v-1.5a6 6 0 0 0-6-6"/></svg>`,
  },
  {
    name: "github-flat",
    chineseName: "GitHub",
    category: "开发",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1F2937"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
  },
  {
    name: "cloud-download-flat",
    chineseName: "云下载",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#60A5FA"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/><path d="M12 14l-3 3h6l-3-3" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "cloud-upload-flat",
    chineseName: "云上传",
    category: "操作",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#60A5FA"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/><path d="M12 11l3-3h-6l3 3" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "folder-open-flat",
    chineseName: "打开文件夹",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F59E0B"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M6 10l6-3 6 3" fill="none" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "archive-flat",
    chineseName: "归档",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#8B5CF6"><path d="M21 8V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"/><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M13 11h-2M13 14h-2M13 17h-2" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "folder-plus-flat",
    chineseName: "添加文件夹",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F59E0B"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><path d="M16 10h4M18 8v4" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "file-plus-flat",
    chineseName: "添加文件",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3B82F6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6" stroke="#fff" stroke-width="2"/><path d="M10 14h4M10 18h4" stroke="#fff" stroke-width="1"/><path d="M16 14h4M18 12v4" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "file-text-flat",
    chineseName: "文本文件",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#10B981"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6" stroke="#fff" stroke-width="2"/><path d="M8 10h8M8 14h8M8 18h8" stroke="#fff" stroke-width="1"/></svg>`,
  },
  {
    name: "file-image-flat",
    chineseName: "图片文件",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#EC4899"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6" stroke="#fff" stroke-width="2"/><rect x="8" y="12" width="8" height="6" rx="1" fill="none" stroke="#fff" stroke-width="1.5"/></svg>`,
  },
  {
    name: "file-video-flat",
    chineseName: "视频文件",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#EF4444"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6" stroke="#fff" stroke-width="2"/><rect x="8" y="12" width="6" height="4" rx="1" fill="none" stroke="#fff" stroke-width="1.5"/><polygon points="14 14 17 12 17 16 14 14" fill="#fff"/></svg>`,
  },
  {
    name: "file-music-flat",
    chineseName: "音乐文件",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#8B5CF6"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6" stroke="#fff" stroke-width="2"/><path d="M9 14V8l6-1v6" stroke="#fff" stroke-width="1.5"/><circle cx="7" cy="17" r="1.5" fill="#fff"/><circle cx="15" cy="16" r="1.5" fill="#fff"/></svg>`,
  },
  {
    name: "file-pdf-flat",
    chineseName: "PDF文件",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#EF4444"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6" stroke="#fff" stroke-width="2"/><path d="M9 10L15 17M9 17h6" stroke="#fff" stroke-width="2"/></svg>`,
  },
  {
    name: "message-square-flat",
    chineseName: "消息方形",
    category: "通讯",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#8B5CF6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M14 12h4M12 14h6M10 16h8" stroke="#fff" stroke-width="1.5"/></svg>`,
  },
  {
    name: "send-flat",
    chineseName: "发送",
    category: "通讯",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5M12 13V3"/></svg>`,
  },
  {
    name: "phone-flat",
    chineseName: "电话",
    category: "通讯",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#10B981"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  },
  {
    name: "phone-off-flat",
    chineseName: "电话关闭",
    category: "通讯",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2"><path d="M3 3h18v18H3zM17 17l-5-5"/></svg>`,
  },
  {
    name: "at-sign-flat",
    chineseName: "@符号",
    category: "通讯",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#8B5CF6"><circle cx="12" cy="12" r="4"/><path d="M16 8a6 6 0 0 0-12 6 6 6 0 0 0 12 0 6 6 0 0 1 0-4 4 4 0 0 1 8 0 6 6 0 0 0-2-4"/></svg>`,
  },
  {
    name: "hash-flat",
    chineseName: "#符号",
    category: "内容",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2"><path d="M4 9h16M9 4v16M15 4v16M4 15h16"/></svg>`,
  },
  ...flatIconsExtended,
];

// 扁平风格图标库
export const flatSet: IconSetInfo = {
  id: "flat",
  name: "扁平风格",
  prefix: "flat-",
  totalIcons: flatIcons.length,
  author: "IconHub",
  website: "https://iconhub.dev",
  license: "MIT",
  description: "扁平化风格图标，简洁明快，适合现代简约设计",
  categories: ["导航", "操作", "状态", "用户", "内容", "通讯", "媒体", "设备", "天气", "通知", "设计", "交通", "地图", "数据", "开发", "财务"],
};

// Tabler 图标库
export const tablerSet: IconSetInfo = {
  id: "tabler",
  name: "Tabler 图标",
  prefix: "tabler-",
  totalIcons: tablerIcons.length,
  author: "Paweł Kuna",
  website: "https://icon-sets.iconify.design/tabler/",
  license: "MIT",
  description: "Tabler Icons 是一套开源线性图标集，包含 2000+ 精美图标，适合各种 Web 和移动端应用",
  categories: ["箭头", "导航", "操作", "状态", "用户", "内容", "通讯", "媒体", "设备", "天气", "通知", "设计", "交通", "地图", "数据", "开发", "财务", "品牌", "医疗", "运动", "食物", "其他"],
};

// 图标库列表
export const iconSetsList: IconSetInfo[] = [lucideSet, tablerSet, gradientSet, flatSet];

// 获取图标库图标
export function getIconsBySet(setId: string): Icon[] {
  switch (setId) {
    case "line-md":
      return lineMdIcons;
    case "gradient":
      return gradientIcons;
    case "flat":
      return flatIcons;
    case "tabler":
      return tablerIcons;
    default:
      return [];
  }
}

// 获取图标库信息
export function getIconSetInfo(setId: string): IconSetInfo | undefined {
  return iconSetsList.find((set) => set.id === setId);
}
