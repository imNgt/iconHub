#!/usr/bin/env python3
"""
Translate line-md icon chineseName from English to Chinese.
"""
import re

# Word-level translations
WORD_MAP = {
    "account": "账户",
    "add": "添加",
    "address": "地址",
    "adjust": "调整",
    "alert": "警告",
    "align": "对齐",
    "alarm": "闹钟",
    "angle": "角",
    "announcement": "公告",
    "archive": "存档",
    "arrow": "箭头",
    "arrow-": "箭头",
    "attach": "附件",
    "bag": "袋子",
    "basket": "购物篮",
    "battery": "电池",
    "beer": "啤酒",
    "bell": "铃铛",
    "bluetooth": "蓝牙",
    "book": "书本",
    "bookmark": "书签",
    "box": "盒子",
    "briefcase": "公文包",
    "broadcast": "广播",
    "building": "建筑",
    "bulb": "灯泡",
    "button": "按钮",
    "buy": "购买",
    "calendar": "日历",
    "camera": "相机",
    "cancel": "取消",
    "card": "卡片",
    "cart": "购物车",
    "cast": "投屏",
    "chat": "聊天",
    "check": "勾选",
    "checklist": "清单",
    "chevron": "箭头",
    "circle": "圆形",
    "clipboard": "剪贴板",
    "clock": "时钟",
    "close": "关闭",
    "cloud": "云",
    "code": "代码",
    "coffee": "咖啡",
    "cog": "齿轮",
    "collapse": "折叠",
    "comment": "评论",
    "compass": "指南针",
    "confirm": "确认",
    "copy": "复制",
    "credit": "信用卡",
    "cross": "叉号",
    "crown": "皇冠",
    "cup": "杯子",
    "cut": "剪切",
    "dashboard": "仪表盘",
    "delete": "删除",
    "devices": "设备",
    "diamond": "菱形",
    "dollar": "美元",
    "door": "门",
    "dots": "更多",
    "download": "下载",
    "downloading": "下载中",
    "drag": "拖拽",
    "edit": "编辑",
    "email": "邮件",
    "emoji": "表情",
    "enter": "进入",
    "envelope": "信封",
    "error": "错误",
    "exit": "退出",
    "expand": "展开",
    "eye": "眼睛",
    "face": "面部",
    "favourite": "收藏",
    "feedback": "反馈",
    "file": "文件",
    "filter": "筛选",
    "fingerprint": "指纹",
    "flag": "旗帜",
    "flame": "火焰",
    "flash": "闪光",
    "folder": "文件夹",
    "form": "表单",
    "forward": "转发",
    "gallery": "画廊",
    "gauge": "仪表",
    "gear": "齿轮",
    "gift": "礼物",
    "globe": "地球",
    "grid": "网格",
    "group": "群组",
    "hamburger": "菜单",
    "hash": "井号",
    "headphones": "耳机",
    "heart": "心形",
    "hexagon": "六边形",
    "hide": "隐藏",
    "history": "历史",
    "home": "首页",
    "hourglass": "沙漏",
    "house": "房屋",
    "icecream": "冰淇淋",
    "image": "图片",
    "images": "图片",
    "inbox": "收件箱",
    "info": "信息",
    "internet": "互联网",
    "key": "钥匙",
    "keyboard": "键盘",
    "label": "标签",
    "lamp": "台灯",
    "laptop": "笔记本",
    "light": "灯光",
    "lightning": "闪电",
    "link": "链接",
    "list": "列表",
    "loading": "加载中",
    "location": "位置",
    "lock": "锁定",
    "login": "登录",
    "log": "日志",
    "logout": "登出",
    "magnifier": "放大镜",
    "mail": "邮件",
    "map": "地图",
    "marker": "标记",
    "media": "媒体",
    "megaphone": "喇叭",
    "menu": "菜单",
    "message": "消息",
    "microphone": "麦克风",
    "minus": "减号",
    "mobile": "手机",
    "molecule": "分子",
    "money": "金钱",
    "moon": "月亮",
    "movie": "电影",
    "music": "音乐",
    "mute": "静音",
    "navigation": "导航",
    "newspaper": "报纸",
    "note": "笔记",
    "notification": "通知",
    "notify": "通知",
    "octagon": "八边形",
    "off": "关闭",
    "optical": "光学",
    "options": "选项",
    "outline": "轮廓",
    "package": "包裹",
    "page": "页面",
    "paint": "画笔",
    "palette": "调色板",
    "paper": "纸张",
    "paste": "粘贴",
    "pause": "暂停",
    "pen": "笔",
    "pencil": "铅笔",
    "people": "人群",
    "person": "人物",
    "phone": "电话",
    "photo": "照片",
    "picture": "图片",
    "pie": "饼图",
    "pin": "图钉",
    "plane": "飞机",
    "play": "播放",
    "player": "播放器",
    "playing": "播放中",
    "plus": "加号",
    "pointer": "指针",
    "post": "帖子",
    "power": "电源",
    "printer": "打印机",
    "profile": "资料",
    "question": "问号",
    "quote": "引用",
    "rain": "下雨",
    "receipt": "收据",
    "record": "录制",
    "redo": "重做",
    "refresh": "刷新",
    "register": "注册",
    "reload": "重新加载",
    "remove": "移除",
    "reply": "回复",
    "report": "报告",
    "reset": "重置",
    "rocket": "火箭",
    "rotate": "旋转",
    "round": "圆角",
    "rss": "订阅",
    "ruler": "尺子",
    "sandwatch": "沙漏",
    "satellite": "卫星",
    "save": "保存",
    "scale": "缩放",
    "scanner": "扫描仪",
    "scissors": "剪刀",
    "screen": "屏幕",
    "search": "搜索",
    "searching": "搜索中",
    "select": "选择",
    "send": "发送",
    "sending": "发送中",
    "server": "服务器",
    "service": "服务",
    "settings": "设置",
    "share": "分享",
    "shield": "盾牌",
    "shopping": "购物",
    "show": "显示",
    "shuffle": "随机播放",
    "sign": "签名",
    "signal": "信号",
    "skip": "跳过",
    "snow": "下雪",
    "sort": "排序",
    "sound": "声音",
    "speaker": "扬声器",
    "square": "方形",
    "star": "星形",
    "stop": "停止",
    "store": "商店",
    "storm": "暴风",
    "stream": "直播",
    "sun": "太阳",
    "sunny": "晴天",
    "switch": "切换",
    "sync": "同步",
    "table": "表格",
    "tablet": "平板",
    "tag": "标签",
    "temperature": "温度",
    "text": "文本",
    "thermometer": "温度计",
    "thunder": "雷声",
    "thumb": "拇指",
    "ticket": "票券",
    "time": "时间",
    "timer": "计时器",
    "toggle": "切换",
    "tool": "工具",
    "tooth": "牙齿",
    "tornado": "龙卷风",
    "trash": "垃圾桶",
    "triangle": "三角形",
    "truck": "卡车",
    "tv": "电视",
    "twotone": "双色",
    "undo": "撤销",
    "unlock": "解锁",
    "upload": "上传",
    "uploading": "上传中",
    "user": "用户",
    "users": "用户群",
    "video": "视频",
    "view": "查看",
    "visible": "可见",
    "volume": "音量",
    "wallet": "钱包",
    "watch": "手表",
    "weather": "天气",
    "web": "网页",
    "wheel": "方向盘",
    "wifi": "WiFi",
    "wind": "风",
    "window": "窗口",
    "wine": "红酒",
    "world": "世界",
    "wrench": "扳手",
    "zip": "压缩",
    "zoom": "缩放",
}

# Compound keywords (checked before single words)
COMPOUND_MAP = {
    "address-book": "通讯录",
    "credit-card": "信用卡",
    "dollar-sign": "美元符号",
    "download-cloud": "云下载",
    "external-link": "外部链接",
    "fast-forward": "快进",
    "fast-rewind": "快退",
    "help-circle": "帮助",
    "info-circle": "信息",
    "light-bulb": "灯泡",
    "line-height": "行高",
    "log-in": "登录",
    "log-out": "登出",
    "message-circle": "消息",
    "power-off": "关机",
    "share-2": "分享2",
    "skip-back": "上一首",
    "skip-forward": "下一首",
    "smart-watch": "智能手表",
    "sun-down": "日落",
    "sun-up": "日出",
    "thumbs-down": "踩",
    "thumbs-up": "赞",
    "upload-cloud": "云上传",
    "video-camera": "摄像机",
    "volume-up": "音量增大",
    "volume-down": "音量降低",
    "wi-fi": "WiFi",
    "wifi-off": "WiFi关闭",
}

# Suffix translations (appended after main translation)
SUFFIX_MAP = {
    "loop": "循环",
    "off": "关闭",
    "outline": "轮廓",
    "twotone": "双色",
    "transition": "过渡",
}


def translate_icon_name(name):
    """Translate a line-md icon name to Chinese."""
    # First check if we have a direct compound match
    if name in COMPOUND_MAP:
        return COMPOUND_MAP[name]

    # Split by hyphens
    parts = name.split("-")
    
    # Try to identify suffix patterns at the end
    # Format: base-icon-[variant]-[variant]-[transition-target]-transition
    # e.g., sunny-outline-to-moon-loop-transition
    
    # Check if the name ends with a known suffix pattern
    suffix_parts = []
    base_parts = list(parts)
    
    # Check for transition pattern: base1-to-base2[-variant]-transition
    transition_idx = None
    for idx, part in enumerate(parts):
        if part == "transition":
            transition_idx = idx
            break
    
    if transition_idx:
        # Everything after transition_idx is suffix
        suffix_parts = parts[transition_idx:]
        base_parts = parts[:transition_idx]
    
    # Check for other suffixes at the end
    if not suffix_parts:
        i = len(base_parts) - 1
        while i >= 0 and base_parts[i] in SUFFIX_MAP:
            suffix_parts.insert(0, base_parts[i])
            base_parts.pop(i)
            i -= 1
    
    # Now translate the base parts
    chinese_parts = []
    i = 0
    while i < len(base_parts):
        # Try compound (2-word) match
        if i + 1 < len(base_parts):
            compound = f"{base_parts[i]}-{base_parts[i+1]}"
            if compound in COMPOUND_MAP:
                chinese_parts.append(COMPOUND_MAP[compound])
                i += 2
                continue
        
        # Try single word match
        part = base_parts[i]
        if part in WORD_MAP:
            chinese_parts.append(WORD_MAP[part])
        elif part == "to":
            chinese_parts.append("→")
        else:
            chinese_parts.append(part)
        i += 1
    
    # Translate suffix parts
    chinese_suffix = []
    for sp in suffix_parts:
        if sp in SUFFIX_MAP:
            chinese_suffix.append(SUFFIX_MAP[sp])
        else:
            chinese_suffix.append(sp)
    
    # Build the final name
    # If it's a transition (contains "→"), format specially
    if "→" in chinese_parts:
        result = "".join(chinese_parts)
    else:
        result = "".join(chinese_parts)
    
    if chinese_suffix:
        result = result + " " + " ".join(chinese_suffix)
    
    return result.strip()


def main():
    with open('src/data/lineMdIcons.ts', 'r') as f:
        content = f.read()

    # Find the new section
    marker = '// ==== 以下为新增图标 ===='
    new_start = content.index(marker)
    before = content[:new_start]
    new_section = content[new_start:]

    # Process each icon entry in the new section
    def replace_chinese(match):
        name = match.group(1)
        rest = match.group(2)
        chinese = translate_icon_name(name)
        return f'name: "{name}"{rest}chineseName: "{chinese}"'

    # Pattern: name: "xxx", ... chineseName: "...",
    pattern = r'name: "([^"]+)"([^}]*?})'
    
    # Find icon blocks (between { and })
    def process_icon(m):
        block = m.group(0)
        name_match = re.search(r'name: "([^"]+)"', block)
        if not name_match:
            return block
        name = name_match.group(1)
        chinese = translate_icon_name(name)
        # Replace chineseName
        block = re.sub(r'chineseName: "[^"]*"', f'chineseName: "{chinese}"', block)
        return block

    # Process only the new section (after marker)
    new_section_fixed = re.sub(r'\{[^}]+\}', process_icon, new_section)

    # Combine
    result = before + new_section_fixed

    with open('src/data/lineMdIcons.ts', 'w') as f:
        f.write(result)

    # Verify
    pairs = re.findall(r'name: "([^"]+)"[^}]*?chineseName: "([^"]+)"', new_section_fixed, re.DOTALL)
    print(f"Translated {len(pairs)} new icons")
    for n, c in pairs[:20]:
        print(f"  {n:35s} -> {c}")


if __name__ == "__main__":
    main()