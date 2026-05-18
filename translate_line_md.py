#!/usr/bin/env python3
"""
Translate line-md icon chineseName from English to Chinese.
Parses the TypeScript file line-by-line for robustness.
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
    "alt": "替代",
    "angle": "角",
    "angry": "愤怒",
    "announcement": "公告",
    "archive": "存档",
    "arrow": "箭头",
    "attach": "附件",
    "bag": "袋子",
    "baseline": "基线",
    "basket": "购物篮",
    "battery": "电池",
    "beer": "啤酒",
    "bell": "铃铛",
    "bluetooth": "蓝牙",
    "book": "书本",
    "bookmark": "书签",
    "bottom": "底部",
    "box": "文本框",
    "brake": "刹车",
    "briefcase": "公文包",
    "broadcast": "广播",
    "bubble": "气泡",
    "building": "建筑",
    "bulb": "灯泡",
    "button": "按钮",
    "buy": "购买",
    "cake": "蛋糕",
    "calendar": "日历",
    "call": "呼叫",
    "camera": "相机",
    "cancel": "取消",
    "card": "卡片",
    "car": "车辆",
    "cart": "购物车",
    "cast": "投屏",
    "center": "居中",
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
    "cookie": "饼干",
    "copy": "复制",
    "credit": "信用卡",
    "cross": "叉号",
    "crown": "皇冠",
    "cry": "哭泣",
    "cup": "杯子",
    "cut": "剪切",
    "dark": "暗色",
    "dashboard": "仪表盘",
    "delete": "删除",
    "devices": "设备",
    "diamond": "菱形",
    "dim": "变暗",
    "document": "文档",
    "dollar": "美元",
    "door": "门",
    "dots": "更多",
    "down": "下",
    "download": "下载",
    "downloading": "下载中",
    "drag": "拖拽",
    "drop": "滴",
    "edit": "编辑",
    "email": "邮件",
    "emoji": "表情",
    "empty": "空",
    "engine": "发动机",
    "enter": "进入",
    "envelope": "信封",
    "error": "错误",
    "exit": "退出",
    "expand": "展开",
    "export": "导出",
    "external": "外部",
    "eye": "眼睛",
    "face": "面部",
    "favourite": "收藏",
    "feedback": "反馈",
    "file": "文件",
    "filled": "填充",
    "filter": "筛选",
    "fingerprint": "指纹",
    "flag": "旗帜",
    "flame": "火焰",
    "flash": "闪光",
    "fold": "折叠",
    "folder": "文件夹",
    "fork": "分叉",
    "form": "表单",
    "forward": "转发",
    "frown": "皱眉",
    "full": "满",
    "gallery": "画廊",
    "gauge": "仪表",
    "gear": "齿轮",
    "gift": "礼物",
    "globe": "地球",
    "grid": "网格",
    "grin": "露齿笑",
    "group": "群组",
    "half": "半",
    "hamburger": "菜单",
    "hash": "井号",
    "hazard": "危险",
    "headphones": "耳机",
    "heart": "心形",
    "hexagon": "六边形",
    "hide": "隐藏",
    "history": "历史",
    "home": "首页",
    "horizontal": "水平",
    "hourglass": "沙漏",
    "house": "房屋",
    "icecream": "冰淇淋",
    "image": "图片",
    "images": "图片",
    "import": "导入",
    "inbox": "收件箱",
    "incoming": "来电",
    "indented": "缩进",
    "info": "信息",
    "internet": "互联网",
    "justify": "两端对齐",
    "keep": "保持",
    "key": "钥匙",
    "keyboard": "键盘",
    "label": "标签",
    "lamp": "台灯",
    "laptop": "笔记本",
    "left": "左",
    "light": "灯光",
    "lightbulb": "灯泡",
    "lightning": "闪电",
    "lights": "灯",
    "link": "链接",
    "list": "列表",
    "loading": "加载中",
    "location": "我的位置",
    "lock": "锁定",
    "login": "登录",
    "log": "日志",
    "logout": "登出",
    "low": "低",
    "magnifier": "放大镜",
    "mail": "邮件",
    "map": "地图",
    "marker": "标记",
    "md": "中尺寸",
    "media": "媒体",
    "medical": "医疗",
    "megaphone": "喇叭",
    "menu": "菜单",
    "message": "消息",
    "microphone": "麦克风",
    "middle": "居中",
    "minus": "减号",
    "mobile": "手机",
    "molecule": "分子",
    "money": "金钱",
    "moon": "月亮",
    "movie": "电影",
    "multiple": "多",
    "mushroom": "蘑菇",
    "music": "音乐",
    "mute": "静音",
    "navigation": "导航",
    "network": "网络",
    "neutral": "中性",
    "newspaper": "报纸",
    "note": "笔记",
    "notification": "通知",
    "notify": "通知",
    "octagon": "八边形",
    "optical": "光学",
    "options": "选项",
    "outgoing": "去电",
    "outline": "轮廓",
    "package": "包裹",
    "page": "页面",
    "paint": "画笔",
    "palette": "调色板",
    "paper": "纸张",
    "parking": "驻车",
    "paste": "粘贴",
    "pause": "暂停",
    "peanut": "花生",
    "pen": "笔",
    "pencil": "铅笔",
    "people": "人群",
    "person": "人物",
    "phone": "电话",
    "photo": "照片",
    "picture": "图片",
    "pie": "饼图",
    "pin": "图钉",
    "pizza": "披萨",
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
    "radius": "半径",
    "rain": "下雨",
    "ramp": "匝道",
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
    "reversed": "反向",
    "right": "右",
    "rocket": "火箭",
    "rotate": "旋转",
    "round": "圆角",
    "roundabout": "环岛",
    "rounded": "圆角",
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
    "services": "服务",
    "settings": "设置",
    "sharp": "急",
    "share": "分享",
    "shield": "盾牌",
    "shopping": "购物",
    "show": "显示",
    "shuffle": "随机播放",
    "sign": "签名",
    "signal": "信号",
    "simple": "简易",
    "skip": "跳过",
    "slight": "微",
    "small": "小",
    "smile": "微笑",
    "snow": "下雪",
    "sort": "排序",
    "sound": "声音",
    "speaker": "扬声器",
    "speed": "速度",
    "speedometer": "速度计",
    "square": "方形",
    "star": "星形",
    "steering": "转向",
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
    "taco": "塔可",
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
    "top": "顶部",
    "tornado": "龙卷风",
    "trash": "垃圾桶",
    "triangle": "三角形",
    "truck": "卡车",
    "turn": "转",
    "tv": "电视",
    "twotone": "双色",
    "undo": "撤销",
    "unfold": "展开",
    "unlock": "解锁",
    "upload": "上传",
    "uploading": "上传中",
    "user": "用户",
    "users": "用户群",
    "valign": "垂直",
    "vertical": "垂直",
    "video": "视频",
    "view": "查看",
    "visible": "可见",
    "volume": "音量",
    "wallet": "钱包",
    "watch": "手表",
    "water": "水",
    "weather": "天气",
    "web": "网页",
    "wheel": "方向盘",
    "wifi": "WiFi",
    "wind": "风",
    "window": "窗口",
    "wine": "红酒",
    "wink": "眨眼",
    "world": "世界",
    "wrench": "扳手",
    "zip": "压缩",
    "zoom": "缩放",
}

COMPOUND_MAP = {
    # address/credit
    "address-book": "通讯录",
    "credit-card": "信用卡",
    # arrows
    "arrow-down": "向下箭头",
    "arrow-left": "向左箭头",
    "arrow-right": "向右箭头",
    "arrow-up": "向上箭头",
    "chevron-down": "向下箭头",
    "chevron-left": "向左箭头",
    "chevron-right": "向右箭头",
    "chevron-up": "向上箭头",
    "fast-forward": "快进",
    "fast-rewind": "快退",
    # chat
    "chat-alert": "聊天警告",
    "chat-bubble": "聊天气泡",
    "chat-filled": "聊天填充",
    "chat-round": "聊天圆形",
    # clipboard
    "clipboard-arrow": "剪贴板箭头",
    "clipboard-check": "剪贴板勾选",
    "clipboard-list": "剪贴板列表",
    "clipboard-minus": "剪贴板减",
    "clipboard-plus": "剪贴板加",
    "clipboard-remove": "剪贴板移除",
    # dollar
    "dollar-sign": "美元符号",
    # document
    "document-add": "添加文档",
    "document-code": "文档代码",
    "document-delete": "删除文档",
    "document-list": "文档列表",
    "document-remove": "移除文档",
    "document-report": "文档报告",
    # download
    "download-cloud": "云下载",
    "download-loop": "下载循环",
    "download-off": "暂停下载",
    "download-outline": "下载轮廓",
    # edit
    "edit-full": "编辑满",
    # emoji
    "emoji-angry": "愤怒表情",
    "emoji-cry": "哭泣表情",
    "emoji-frown": "皱眉表情",
    "emoji-grin": "露齿笑",
    "emoji-neutral": "中性表情",
    "emoji-smile": "微笑表情",
    "emoji-smile-wink": "眨眼微笑",
    # file
    "file-cancel": "文件取消",
    "file-document": "文件文档",
    "file-download": "文件下载",
    "file-export": "文件导出",
    "file-import": "文件导入",
    "file-search": "文件搜索",
    "file-upload": "文件上传",
    # folder
    "folder-arrow-down": "文件夹向下箭头",
    "folder-arrow-left": "文件夹向左箭头",
    "folder-arrow-right": "文件夹向右箭头",
    "folder-arrow-up": "文件夹向上箭头",
    "folder-cancel": "文件夹取消",
    "folder-check": "文件夹勾选",
    "folder-minus": "文件夹减",
    "folder-multiple": "多文件夹",
    "folder-music": "文件夹音乐",
    "folder-network": "文件夹网络",
    "folder-off": "文件夹关闭",
    "folder-plus": "文件夹加",
    "folder-remove": "文件夹移除",
    "folder-settings": "文件夹设置",
    "folder-zip": "文件夹压缩",
    # grid/list
    "grid-3": "网格3",
    "list-3": "列表3",
    "list-indented": "缩进列表",
    # links
    "external-link": "外部链接",
    # help/info
    "help-circle": "帮助",
    "info-circle": "信息",
    # light
    "light-dark": "亮暗",
    "light-bulb": "灯泡",
    # line
    "line-height": "行高",
    # log in/out
    "log-in": "登录",
    "log-out": "登出",
    # map
    "map-marker": "地图标记",
    "map-marker-alt": "替代标记",
    "map-marker-multiple": "多标记",
    "map-marker-multiple-alt": "替代多标记",
    "map-marker-radius": "标记半径",
    # message
    "message-circle": "消息",
    # paint
    "paint-drop": "油漆滴",
    "paint-drop-half": "半油漆滴",
    # parking
    "parking-brake": "驻车制动",
    # phone
    "phone-call": "电话呼叫",
    # power
    "power-off": "关机",
    # rotate
    "rotate-180": "旋转180°",
    "rotate-270": "旋转270°",
    "rotate-90":  "旋转90°",
    # settings
    "share-2": "分享2",
    # skip
    "skip-back": "上一首",
    "skip-forward": "下一首",
    # smart
    "smart-watch": "智能手表",
    # steering
    "steering-off": "转向关闭",
    # sun
    "sun-down": "日落",
    "sun-up": "日出",
    # text-box
    "text-box": "文本框",
    "text-box-multiple": "多文本框",
    "text-box-twotone": "文本框双色",
    # thumbs
    "thumbs-down": "踩",
    "thumbs-up": "赞",
    # upload
    "upload-cloud": "云上传",
    "upload-loop": "上传循环",
    "upload-off": "暂停上传",
    "upload-outline": "上传轮廓",
    # video
    "video-camera": "摄像机",
    # volume
    "volume-up": "音量增大",
    "volume-down": "音量降低",
    # wifi
    "wi-fi": "WiFi",
    "wifi-off": "WiFi关闭",
}

SUFFIX_MAP = {
    "loop": "循环",
    "off": "关闭",
    "outline": "轮廓",
    "twotone": "双色",
    "transition": "过渡",
    "filled": "填充",
}


def translate_icon_name(name):
    """Translate a line-md icon name to Chinese."""
    if name in COMPOUND_MAP:
        return COMPOUND_MAP[name]

    parts = name.split("-")

    suffix_parts = []
    base_parts = list(parts)

    # Check for 'transition' suffix pattern
    transition_idx = None
    for idx, part in enumerate(parts):
        if part == "transition":
            transition_idx = idx
            break

    if transition_idx:
        suffix_parts = parts[transition_idx:]
        base_parts = parts[:transition_idx]

    # Check for other suffixes
    if not suffix_parts:
        i = len(base_parts) - 1
        while i >= 0 and base_parts[i] in SUFFIX_MAP:
            suffix_parts.insert(0, base_parts[i])
            base_parts.pop(i)
            i -= 1

    # Translate base parts
    chinese_parts = []
    i = 0
    while i < len(base_parts):
        if i + 1 < len(base_parts):
            compound = f"{base_parts[i]}-{base_parts[i+1]}"
            if compound in COMPOUND_MAP:
                chinese_parts.append(COMPOUND_MAP[compound])
                i += 2
                continue
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

    result = "".join(chinese_parts)
    if chinese_suffix:
        result = result + " " + " ".join(chinese_suffix)

    return result.strip()


def main():
    filepath = 'src/data/lineMdIcons.ts'
    with open(filepath, 'r') as f:
        lines = f.readlines()

    new_lines = []
    i = 0
    translated_count = 0
    total = 0

    while i < len(lines):
        line = lines[i]

        # Detect start of an icon entry: "  {\n" followed by "    name:"
        if line.strip() == '{' and i + 1 < len(lines):
            next_line = lines[i + 1] if i + 1 < len(lines) else ''
            if 'name:' in next_line:
                # This is an icon entry block. Find name
                name_match = re.search(r'name:\s*"([^"]+)"', next_line)
                new_lines.append(line)
                i += 1
                if name_match:
                    name = name_match.group(1)
                    translated = translate_icon_name(name)
                    total += 1

                    # Process the rest of the block until closing "  },"
                    while i < len(lines):
                        cur = lines[i]
                        # Replace chineseName line
                        if 'chineseName:' in cur:
                            old_cn = re.search(r'chineseName:\s*"([^"]*)"', cur)
                            if old_cn:
                                old_val = old_cn.group(1)
                                indent = cur[:len(cur) - len(cur.lstrip())]
                                new_cn_line = f'{indent}chineseName: "{translated}",\n'
                                new_lines.append(new_cn_line)
                                if old_val != translated:
                                    translated_count += 1
                            else:
                                new_lines.append(cur)
                            i += 1
                        else:
                            new_lines.append(cur)
                            i += 1
                            if cur.strip() == '},' or cur.strip() == '}':
                                break
                    continue
                else:
                    i += 1
                    continue

        new_lines.append(line)
        i += 1

    with open(filepath, 'w') as f:
        f.writelines(new_lines)

    print(f"Processed {total} icons, translated {translated_count} icons")
    if translated_count > 0:
        print(f"Sample translations:")


if __name__ == "__main__":
    main()