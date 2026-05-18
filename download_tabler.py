#!/usr/bin/env python3
"""
Parallel download of Tabler icons using ThreadPoolExecutor.
"""
import subprocess
import os
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

CATEGORY_MAP = {
    "箭头": r"^arrow",
    "导航": r"^(home|menu|compass|navigation|location|pin|route|signpost|direction|corner)",
    "操作": r"^(plus|minus|check|close$|x$|edit|delete|add|remove|copy|paste|cut|redo|undo|select|move|drag|drop|sort|filter|search|zoom|maximize|minimize|fullscreen|resize|scale|rotate|flip|refresh|reload|repeat|shuffle|switch|toggle|slider|adjustments)",
    "状态": r"^(alert|warning|error|danger|info|help|question|shield|lock|unlock|key|password|secure|security|eye|visible|hidden|flag|star|heart|like|dislike|thumbs|trending|activity|pulse|status|badge|tag|label)",
    "用户": r"^(user|users|person|people|profile|avatar|account|login|logout|sign|auth|fingerprint|face|id|contact|address-book|crown|king|queen|admin|moderator|ghost|alien|robot|baby|man$|woman$|gender)",
    "内容": r"^(file|folder|document|page|article|paper|note|clipboard|clip|book|bookmark|library|archive|inbox|outbox|mailbox|database|server|cloud|download|upload|import|export|save|backup|restore|history|recent|clock|time|calendar|date|schedule|event|task|todo|checklist|list|table|grid|layout|template|form|input|text|type|font|heading|title|paragraph|quote|code|terminal|console|command|script|json|xml|html|css|markdown|link|url|hyperlink|anchor|hash|number|numbers|calculator|abacus|math|function|variable|brackets|braces|parentheses)",
    "通讯": r"^(mail|email|message|chat|comment|feedback|review|phone|call|telephone|mobile|cellphone|smartphone|envelope|send|share|forward|reply|broadcast|announcement|megaphone|speaker|microphone|mic|headset|headphones|earphone|voicemail|fax|modem|router|wifi|wireless|bluetooth|signal|antenna|radio|satellite|dish|tower|network|lan|ethernet|cable|port|usb|hdmi|plug|socket|outlet|power|charging|battery)",
    "媒体": r"^(play|pause|stop|record|music|audio|sound|volume|mute|video|movie|film|cinema|camera|photo|picture|image|gallery|album|slideshow|presentation|screen|display|monitor|tv|television|projector|cast|stream|live|podcast|equalizer|wave|waveform|spectrum|visualizer|disc|cd$|dvd|vinyl|tape|cassette)",
    "设备": r"^(device|laptop|desktop|computer|pc$|tablet|ipad|watch|wearable|printer|scanner|copier|keyboard|mouse|trackpad|touchpad|joystick|gamepad|controller|console|cpu|processor|chip|memory|ram$|storage|disk|drive|hard-drive|ssd|hdd|flash|sd-card|sim$|webcam|sensor|thermometer|thermostat|gauge|meter|scale|weight|ruler|measure|tool|wrench|screwdriver|hammer|drill|saw$|axe|knife|scissors|blade|sword|gun|weapon|armor|helmet|mask|glasses|goggles|binoculars|telescope|microscope|magnifier|lens|flashlight|torch|lamp|light|bulb|led$|laser|remote|switch|button|dial|knob|lever|handle|wheel|gear|cog|engine|motor|machine|drone|helicopter|plane|rocket|spaceship|ufo)",
    "天气": r"^(weather|sun|moon|cloud|rain|snow|wind|storm|thunder|lightning|bolt|tornado|hurricane|typhoon|cyclone|tsunami|flood|drought|fire|flame|hot|cold|warm|cool|temperature|humidity|dew|frost|ice|hail|sleet|fog|mist|haze|smog|smoke|dust|sand|umbrella|rainbow|sunrise|sunset|dawn|dusk|day$|night|eclipse|constellation|galaxy|universe|planet|earth|globe|world)",
    "通知": r"^(bell|notification|notify|alarm|reminder|ring|chime|ding|buzz|vibrate|silent|snooze|dot$|indicator|ping|beacon|siren|horn|whistle|bullhorn|news|update|feed|rss|subscription|subscribe|follow|track|monitor|radar|scan|detect)",
    "设计": r"^(design|art|draw|paint|brush|pen|pencil|marker|crayon|color|colour|palette|swatch|gradient|fill|stroke|outline|shape|circle|square|triangle|rectangle|polygon|hexagon|octagon|diamond|rhombus|oval|ellipse|curve|bezier|path|vector|raster|pixel|resolution|dpi|canvas|artboard|layer|mask|crop|slice|trim|blur|sharpen|opacity|transparency|blend|effect|shadow|glow|reflection|perspective|transform|warp|distort|skew|mirror|symmetry|pattern|texture|guide|dimension|size|width|height|depth|margin|padding|border|spacing|gap|align|alignment|distribute|arrange|order|stack|group|ungroup|combine|merge|union|intersect|subtract|divide|exclude|boolean|eraser|droplet|water|drop|spray|splash|splatter|ink|stamp|stencil|prototype|wireframe|mockup|blueprint|draft|sketch|scribble|doodle|illustration|icon|logo|brand|emblem|crest|seal|medal|award|trophy|ribbon|certificate|diploma)",
    "交通": r"^(car|vehicle|transport|traffic|road|street|highway|motorway|freeway|lane|path|trail|track|rail|train|railway|subway|metro|tram|trolley|bus|coach|taxi|cab|uber|lyft|ride|bike|bicycle|cycling|motorcycle|motorbike|scooter|moped|skate|skateboard|surf|surfboard|ski|snowboard|sled|sleigh|truck|lorry|van|pickup|suv|jeep|tractor|forklift|crane|bulldozer|excavator|dump|tanker|trailer|camper|rv$|caravan|ambulance|police|fire-truck|fire-engine|boat|ship|ferry|yacht|sailboat|sail|canoe|kayak|raft|submarine|anchor|harbor|port|dock|pier|lighthouse|buoy|airplane|aircraft|jet|chopper|shuttle|balloon|airship|blimp|zeppelin|parachute|hang-glider|glider|airport|runway|gate|boarding|departure|arrival|flight|takeoff|landing|parking|garage|fuel|gas|petrol|diesel|electric|hybrid|ev$|station|stop|sign|signal|crossing|crosswalk|pedestrian|walk|hiking|running|jogging|climbing|stairs|escalator|elevator|lift)",
    "地图": r"^(map|pin|marker|gps|direction|north|south|east|west|latitude|longitude|coordinate|geolocation|geography|terrain|topography|landscape|mountain|hill|valley|river|lake|ocean|sea|beach|coast|island|forest|tree|park|garden|building|house|city|town|village|country|state|region|continent|earth|planet|atlas|waypoint|destination|distance|area|zone|boundary|territory|landmark|monument|attraction|sightseeing|tourism|travel|trip|journey|expedition|explore|adventure|treasure)",
    "数据": r"^(chart|graph|diagram|plot|statistics|stats|analytics|analysis|data|metric|kpi|dashboard|report|insight|trend|pattern|correlation|distribution|histogram|bar$|line$|pie|donut|area$|scatter|bubble|radar|gauge|funnel|heatmap|treemap|sankey|flow|hierarchy|node|edge|spreadsheet|excel|csv|sql|query|aggregate|sum$|average|median|mode$|min$|max$|range|variance|deviation|percent|percentage|ratio|proportion|fraction|decimal|integer|float|binary|hex$|octal|digital|analog|frequency|amplitude|phase|bandwidth|throughput|latency|performance|speed|rate|velocity|acceleration|momentum|inertia|force|energy|voltage|current|resistance|capacitance|inductance|impedance|circuit|schematic|architecture|structure|framework|system|process|workflow|pipeline|cycle|loop|iteration|recursion|algorithm|logic|boolean|gate|truth|computation|calculate|compute|evaluate|solve|equation|formula|expression|operation|operator|operand|constant|parameter|argument|result|value|score|rank|level|tier|grade|rating|survey|poll|vote|ballot|election|census|population|sample|dataset|big-data|ai$|ml$|model|training|inference|prediction|classification|regression|clustering|neural|deep|learning)",
    "开发": r"^(code|coding|program|developer|development|software|app|application|web|website|api|endpoint|rest|graphql|http|https|ssl|tls|tcp|udp|ip$|dns|domain|host|server|client|frontend|backend|fullstack|stack|framework|library|package|module|plugin|extension|addon|dependency|namespace|class|object|instance|method|function|procedure|routine|subroutine|callback|handler|listener|observer|subscriber|publisher|event|trigger|hook|middleware|interceptor|pipe|stream|buffer|cache|orm|migration|seed|schema|model|view|controller|route|router|service|repository|factory|provider|container|injector|ioc|singleton|prototype|scope|lifecycle|init|destroy|mount|unmount|render|compile|transpile|build|bundle|pack|minify|uglify|optimize|lazy|eager|async|await|promise|observable|rx$|reactive|state|store|redux|mobx|vuex|pinia|context|component|directive|decorator|annotation|attribute|property|prop|ref$|computed|watch|effect|memo|portal|fragment|suspense|profiler|devtools|debug|debugger|breakpoint|inspect|trace|log|logger|shell|bash|zsh|fish|powershell|cmd|cli|gui|ui$|ux$|interface|widget|dropdown|toolbar|sidebar|header|footer|nav|navbar|breadcrumb|pagination|tab|accordion|collapse|modal|dialog|popup|popover|tooltip|toast|snackbar|banner|carousel|slider|lightbox|pan|scroll|infinite|virtual|skeleton|placeholder|loading|spinner|progress|step|wizard|walkthrough|onboarding|tutorial|guide|documentation|docs|readme|changelog|version|release|deploy|publish|ship|launch|production|staging|testing|qa$|ci$|cd$|pipeline|jenkins|travis|circle|github|gitlab|bitbucket|azure|aws$|gcp$|heroku|netlify|vercel|cloudflare|digitalocean|linode|vps|dedicated|shared|cluster|kubernetes|k8s|docker|container|pod|node|master|worker|agent|proxy|gateway|cdn|waf|ddos|firewall|vpn|ssh|ftp|sftp|scp|rsync|git|svn|mercurial|cvs|perforce|clearcase|tfs|vsts|ado|jira|confluence|trello|asana|monday|notion|slack|teams|discord|zoom|meet|webex|skype|telegram|whatsapp|signal|wechat|line$|kakao|viber|messenger|snapchat|tiktok|instagram|facebook|twitter|linkedin|youtube|twitch|reddit|pinterest|tumblr|flickr|dribbble|behance|medium|devto|hashnode|stackoverflow|stackexchange|quora|wikipedia|wikihow|fandom|gamepedia|curse|nexus|moddb|indiedb|steam|epic|gog|origin|uplay|battle|blizzard|riot|valve|ubisoft|ea$|activision|square-enix|capcom|bandai|namco|sega|nintendo|sony|microsoft|apple|google|amazon|facebook|netflix|spotify|uber|airbnb|tesla|spacex|nasa|esa$|jaxa|roscosmos|cnsa|isro)",
    "财务": r"^(dollar|money|cash|currency|coin|wallet|bank|finance|financial|payment|pay|bill|invoice|receipt|tax|price|cost|fee|charge|discount|sale|offer|coupon|voucher|gift|card|credit|debit|atm|pos|transaction|transfer|deposit|withdraw|balance|budget|expense|income|revenue|profit|loss|gain|earning|saving|invest|stock|share|bond|fund|etf|index|market|exchange|trade|broker|portfolio|asset|liability|equity|capital|interest|dividend|yield|return|roi|npv|irr|amortization|depreciation|appreciation|inflation|deflation|recession|boom|bust|bull|bear|hedge|arbitrage|spread|margin|leverage|short|long|position|holding|diversify|allocate|rebalance|compound|principal|term|maturity|coupon|par|premium|perpetual|annuity|perpetuity|loan|mortgage|debt|risk|reward)",
    "品牌": r"^brand",
    "医疗": r"^(medical|health|hospital|doctor|nurse|patient|medicine|drug|pill|capsule|syringe|injection|vaccine|immunization|blood|pulse|heartbeat|ecg|ekg|cardiogram|stethoscope|bandage|cast|splint|crutch|wheelchair|first-aid|emergency|trauma|surgery|operation|transplant|donor|organ|dna|gene|genetic|chromosome|cell|virus|bacteria|germ|microbe|infection|disease|illness|sickness|symptom|diagnosis|prognosis|treatment|therapy|medication|prescription|pharmacy|drugstore|chemist|apothecary|dispensary|clinic|infirmary|sanatorium|hospice|nursing|rehabilitation|radiation|chemotherapy|immunotherapy|hormone|stem|regenerative|precision|personalized|telemedicine|telehealth|digital|informatics)",
    "运动": r"^(ball|sport|game|play|team|league|tournament|championship|match|score|goal|win|lose|draw|tie|race|marathon|sprint|dash|relay|swim|dive|gymnastics|wrestling|boxing|martial|karate|judo|taekwondo|fencing|archery|shooting|hunting|fishing|camping|backpack|tent|hike|climb|mountain|peak|summit|base|jump|bungee|skydive|paraglide|hang|glide|soar|fly|pilot|cockpit|helmet|goggle|glove|bat|racket|club|stick|puck|hoop|net|court|field|pitch|arena|stadium|gym|fitness|workout|exercise|training|coach|trainer|instructor|referee|umpire|judge|official|player|athlete|competitor|contestant|participant)",
    "食物": r"^(food|eat|drink|meal|dish|cuisine|cook|bake|grill|fry|boil|steam|roast|toast|brew|pour|serve|plate|bowl|cup|glass|mug|bottle|jar|can|tin|box|pack|wrap|bag|sack|basket|tray|platter|cutlery|fork|knife|spoon|chopstick|straw|napkin|tablecloth|placemat|coaster|trivet|pot|pan|skillet|saucepan|wok|kettle|teapot|coffeepot|pitcher|jug|carafe|decanter|flask|thermos|cooler|icebox|refrigerator|fridge|freezer|oven|stove|cooktop|range|microwave|toaster|blender|mixer|grinder|juicer|squeezer|press|strainer|colander|sieve|funnel|ladle|spatula|tongs|whisk|peeler|grater|zester|slicer|dicer|chopper|mincer|masher|ricer|molder|shaper|cutter|scoop|dipper|server|dispenser|pump|tap|faucet|spigot|valve|nozzle|spout|hose|pipe|tube|conduit|channel|duct|vent|flue|chimney|smokestack|exhaust|intake|outlet|inlet|port|opening|aperture|orifice|mouth|lip|rim|edge|brim|border|margin|perimeter|circumference|girth|waist|belly|stomach|gut|intestine|bowel|colon|rectum|anus|buttock|hip|thigh|leg|knee|calf|shin|ankle|foot|heel|sole|arch|instep|toe|nail|claw|talon|hoof|paw|pad|digit|finger|thumb|knuckle|joint|wrist|palm|fist|hand|arm|elbow|forearm|bicep|tricep|shoulder|collarbone|clavicle|scapula|blade|spine|backbone|vertebra|disk|cartilage|ligament|tendon|muscle|fiber|tissue|organ|gland|node|vessel|artery|vein|capillary|cell|membrane|wall|nucleus|cytoplasm|organelle|mitochondria|ribosome|protein|enzyme|hormone|neurotransmitter|synapse|neuron|nerve|brain|cortex|cerebrum|cerebellum|medulla|pons|midbrain|forebrain|hindbrain|brainstem|spinal|cord|column|tract|pathway|circuit|network|system|apparatus|mechanism|device|instrument|tool|implement|utensil|appliance|gadget|widget|contraption|contrivance|invention|innovation|creation|design|blueprint|plan|scheme|strategy|tactic|approach|method|technique|procedure|process|operation|function|purpose|goal|objective|aim|target|mission|vision|dream|aspiration|ambition|desire|wish|hope|expectation|anticipation|prediction|forecast|projection|estimate|calculation|computation|analysis|evaluation|assessment|appraisal|judgment|decision|choice|selection|option|alternative|preference|priority|ranking|rating|grade|mark|point|level|tier|class|category|group|set|collection|array|series|sequence|order|arrangement|organization|structure|framework|architecture|pattern|template|model|example|sample|specimen|instance|case|scenario|situation|context|environment|setting|background|foreground|landscape|portrait|profile|outline|silhouette|shadow|reflection|image|picture|photo|snapshot|screenshot|capture|record|document|directory|catalog|index|archive|library|repository|storage|warehouse|depot|store|shop|market|bazaar|mall|plaza|square|circle|triangle|rectangle|polygon|hexagon|octagon|diamond|rhombus|oval|ellipse|curve|arc|bow|arch|dome|vault|ceiling|roof|canopy|awning|shelter|cover|lid|cap|top|bottom|base|foundation|ground|floor|level|surface|plane|field|area|zone|region|territory|domain|realm|kingdom|empire|nation|country|state|province|county|district|borough|township|municipality|town|hamlet|settlement|colony|outpost|frontier|border|boundary|limit|edge|rim|brink|verge|threshold|gateway|portal|entrance|exit|door|gate|barrier|fence|wall|hedge|ditch|moat|trench|rampart|fortification|castle|fortress|citadel|stronghold|bastion|bulwark|defense|protection|guard|shield|armor|helmet|visor|goggle|glasses|spectacle|monocle|lens|magnifier|microscope|telescope|binocular|periscope|kaleidoscope|stethoscope|otoscope|ophthalmoscope|laryngoscope|bronchoscope|gastroscope|colonoscope|cystoscope|hysteroscope|arthroscope|laparoscope|endoscope|borescope|fiberscope|videoscope|recorder|player|projector|display|screen|monitor|television|computer|laptop|tablet|phone|smartphone|cellphone|mobile|device|gadget|widget|appliance|machine|engine|motor|generator|alternator|dynamo|turbine|compressor|fan|blower|ventilator|conditioner|heater|cooler|refrigerator|freezer|ice|maker|dispenser|vending|atm|kiosk|terminal|station|dock|port|hub|node|router|switch|bridge|gateway|firewall|proxy|server|client|host|domain|website|webpage|homepage|landing|page|portal|dashboard|panel|console|terminal|shell|command|prompt|cursor|pointer|mouse|keyboard|trackpad|touchpad|touchscreen|stylus|eraser|chalk|crayon|pastel|charcoal|graphite|lead|ink|toner|cartridge|ribbon|tape|adhesive|glue|paste|cement|mortar|grout|putty|caulk|sealant|filler|spackle|plaster|stucco|drywall|sheetrock|gypsum|board|panel|plywood|lumber|timber|wood|log|plank|beam|joist|rafter|truss|girder|column|pillar|post|pole|stake|peg|dowel|rod|bar|shaft|axle|spindle|mandrel|arbor|hub|rim|spoke|wheel|tire|tyre|tube|inner|outer|casing|tread|groove|ridge|bump|lump|knob|handle|grip|lever|crank|pedal|treadle|step|rung|ladder|stair|escalator|elevator|lift|hoist|crane|winch|pulley|block|tackle|rigging|cable|wire|rope|cord|string|thread|yarn|twine|line|filament|fiber|strand|ply|braid|weave|knit|crochet|stitch|seam|hem|edge|border|fringe|tassel|pompom|bobble|button|snap|hook|eye|loop|buckle|clasp|latch|catch|fastener|zipper|velcro|magnet|suction|vacuum|pressure|tension|compression|torsion|shear|bend|flex|stretch|elongate|contract|expand|shrink|swell|deflate|inflate|pump|blow|suck|draw|pull|push|lift|lower|raise|drop|fall|rise|climb|descend|ascend|mount|dismount|board|alight|embark|disembark|load|unload|pack|unpack|wrap|unwrap|bundle|unbundle|tie|untie|knot|unknot|tangle|untangle|snarl|unsnarl|ravel|unravel|wind|unwind|coil|uncoil|roll|unroll|fold|unfold|crease|wrinkle|crumple|smooth|flatten|level|even|straighten|align|adjust|tune|calibrate|set|reset|configure|program|code|script|compile|build|deploy|release|publish|launch|start|stop|pause|resume|restart|reboot|shutdown|power|on|off|toggle|flip|turn|rotate|spin|twist|screw|bolt|nut|washer|gasket|seal|o-ring|bearing|bushing|sleeve|collar|flange|coupling|union|joint|fitting|adapter|connector|plug|socket|outlet|receptacle|jack|interface|bus|cable|wire|cord|lead|conductor|insulator|dielectric|semiconductor|transistor|diode|resistor|capacitor|inductor|transformer|relay|solenoid|actuator|sensor|detector|probe|transducer|converter|inverter|rectifier|amplifier|oscillator|modulator|demodulator|encoder|decoder|multiplexer|demultiplexer|filter|equalizer|attenuator|limiter|clipper|clamper|comparator|discriminator|detector|mixer|multiplier|divider|adder|subtractor|integrator|differentiator|summer|averager|scaler|normalizer|standardizer|regulator|stabilizer|controller|governor|manager|supervisor|overseer|administrator|executor|operator|user|client|customer|consumer|subscriber|member|participant|contributor|donor|sponsor|patron|benefactor|supporter|advocate|champion|defender|protector|guardian|custodian|steward|caretaker|keeper|warden|ranger|guard|watchman|sentry|sentinel|lookout|scout|patrol|police|officer|detective|investigator|inspector|auditor|examiner|reviewer|evaluator|assessor|appraiser|valuer|estimator|calculator|computer|analyst|researcher|scientist|engineer|technician|mechanic|craftsman|artisan|artist|designer|architect|planner|strategist|tactician|logistician|coordinator|organizer|manager|director|executive|president|chairman|ceo|cfo|coo|cto|cio|cmo|cso|cro|cdo|cpo|clo|cco|chro|cao|cbo)",
}

def categorize(name):
    for category, pattern in CATEGORY_MAP.items():
        if re.match(pattern, name):
            return category
    return "其他"

OUTPUT_DIR = "/tmp/tabler_svgs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def download_one(name):
    svg_file = os.path.join(OUTPUT_DIR, f"{name}.svg")
    url = f"https://api.iconify.design/tabler/{name}.svg"
    try:
        r = subprocess.run(
            ["curl", "-s", "--max-time", "15", "-o", svg_file, url],
            capture_output=True,
            timeout=20
        )
        if r.returncode == 0 and os.path.exists(svg_file):
            with open(svg_file) as f:
                content = f.read().strip()
            if content and content.startswith("<svg"):
                svg = " ".join(content.split())
                svg = svg.replace('width="1em" height="1em"', 'width="24" height="24"')
                return (name, svg)
    except Exception:
        pass
    return None


def main():
    with open("/tmp/tabler_2000.txt") as f:
        icon_names = [line.strip() for line in f if line.strip()]

    print(f"Total: {len(icon_names)} icons")
    print("Downloading in parallel (10 workers)...")

    results = {}
    completed = 0

    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_name = {executor.submit(download_one, name): name for name in icon_names}

        for future in as_completed(future_to_name):
            name = future_to_name[future]
            completed += 1
            try:
                res = future.result()
                if res:
                    results[name] = res[1]
            except Exception:
                pass
            if completed % 200 == 0:
                print(f"Progress: {completed}/{len(icon_names)} - OK: {len(results)}")

    print(f"\nDownload complete: {len(results)}/{len(icon_names)} OK")

    # Process results in original order
    print("Generating TypeScript file...")
    ordered = []
    for name in icon_names:
        if name in results:
            svg = results[name]
            category = categorize(name)
            chinese_name = name.replace("-", " ").title()
            ordered.append((name, chinese_name, category, svg))

    with open("src/data/tablerIcons.ts", "w", encoding="utf-8") as f:
        f.write('import type { Icon } from "./iconSets";\n\n')
        f.write("export const tablerIcons: Icon[] = [\n")
        for name, chinese_name, category, svg in ordered:
            escaped_svg = svg.replace("\\", "\\\\").replace("`", "\\`")
            f.write(f'  {{ name: "{name}", chineseName: "{chinese_name}", category: "{category}", svg: `{escaped_svg}` }},\n')
        f.write("]\n")

    print(f"Done! Generated {len(ordered)} icons to src/data/tablerIcons.ts")

if __name__ == "__main__":
    main()