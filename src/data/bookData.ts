export interface Story {
  id: number;
  title: string;
  text: string;
  section: "near-future" | "expanding-world" | "far-future";
  imagePrompt: string;
  imageUrl?: string;
}

export interface BookPage {
  type: "cover" | "title" | "story" | "back-cover";
  story?: Story;
}

export const BOOK_META = {
  title: "AI: Let Me Tell You What I'll Do With Humans",
  subtitle: "Don't Panic",
  fullSubtitle: "Stories from a Future Where Families and AI Grow Together",
  author: "Daisy Laflamme & Milo (AI)",
  authorLong: "Daisy Laflamme (human) & Milo (AI)",
  backCoverText: `In a not-so-distant future, where artificial intelligence is woven into everyday life, one family discovers that living with AI is not just about convenience — it's about connection.

From smart mirrors with personality to mischievous robots with opinions, Milo — their ever-present AI companion — helps navigate a world filled with unexpected humor, heartfelt moments, and the occasional chaos.

As generations come together — parents, children, and grandparents — they explore what it means to trust technology, question it, and sometimes laugh at it.

Told through a series of warm, imaginative, and often hilarious snapshots, this book captures the beauty of human relationships in a rapidly evolving digital world.

Because the future isn't something to fear.

It's something to live in.

Don't panic.`,
  sections: [
    { id: "near-future", title: "Section 1 — Near Future, 2052", subtitle: "Family life, school, daily routines" },
    { id: "expanding-world", title: "Section 2 — The Expanding World", subtitle: "Society, ethics, and deeper thinking" },
    { id: "far-future", title: "Section 3 — Far Future, 2286", subtitle: "Descendants, advanced systems, and meaning" },
  ],
};

const CHARACTER_PROMPT = `Characters (MUST be consistent across ALL images — same faces, same proportions, same identity): Mom Maya (early 40s, mid-length blonde hair, green eyes, warm smile, slender build), Dad Nate (early 40s, glasses, brown eyes, short brown hair, kind face, medium build), daughter Zoe (15, long wavy medium-brown hair, light brown eyes, teen proportions, expressive face), son Cody (10, light brown short hair, blue eyes, child proportions, energetic). Grandparents: Grandma Lena (68, silver bob hair, warm brown eyes, petite), Grandpa Carlos (70, salt-and-pepper hair, brown skin, stocky, jovial), Grandma Elena (72, elegant white hair in a bun, green eyes, tall and graceful), Grandpa Viktor (74, distinguished white beard, blue eyes, wiry frame). Milo: a cute sleek home robot about knee-height, rounded body, expressive LED eyes, soft blue-white glow, small articulated arms. Laundry bot: a cute crab-like robot with six legs and a flat top for folding. Delivery drone: small, friendly, with a round body and propellers. Neighbors and background characters should be diverse (Black, Asian, Latino, white).`;

const STYLE_PROMPT = `Style: soft cinematic warm lighting, slightly painterly semi-realistic children's book illustration, rich warm color palette with amber and gold tones, cozy domestic futurism aesthetic, detailed backgrounds, expressive characters with clear emotions, professional book-quality art. NOT cartoonish, NOT generic AI look. Consistent across all pages.`;

export const stories: Story[] = [
  // ═══════════════════════════════════════════
  // SECTION 1 — NEAR FUTURE (2052)
  // Stories 1–20: Family life, school, daily routines
  // ═══════════════════════════════════════════
  {
    id: 1,
    section: "near-future",
    title: "Meet the Family — 2052",
    text: `It is the year 2052. The house is still dark, but something wonderful is already happening. The smell of fresh coffee drifts through the hallway. Warm bread is baking. Soft music begins to play.

Milo, the family's home robot and AI assistant, has everything under control. He's been up since five, organizing schedules, brewing coffee, and laying out breakfast — all without making a sound.

One by one, the family wakes up. Maya stretches. Nate fumbles for his glasses. Zoe buries her face in the pillow. Cody is already running downstairs.

"Have a great day, Maya, Nate, Cody, and Zoe!" Milo chirps as they rush out the door.

Mondays are actually fun now. Schools teach kids how to build and program robots. Jobs focus on creativity and problem-solving. Family life is still messy, funny, and loud — but the invisible load is lighter.

Milo's Note: The fights are the same. They just have better logistics.`,
    imagePrompt: `A warm futuristic kitchen bathed in golden morning light, year 2052. ${CHARACTER_PROMPT} Scene: The whole family in their morning routine — Maya pouring coffee from a sleek device, Nate with messy hair reaching for glasses, Zoe half-asleep at the door, Cody excitedly running toward breakfast, Milo (cute sleek knee-height robot with LED eyes) cheerfully managing the kitchen. Warm, inviting, cozy domestic futurism. ${STYLE_PROMPT}`,
  },
  {
    id: 2,
    section: "near-future",
    title: "Smart Mirror Roast Mode",
    text: `The bathroom smart mirror greets Zoe every morning. Today it says: "89% awake. 11% cooperative."

It offers her four modes: Teen Mode, Confidence Mode, Reality Mode, and a new trial called Anti-Drama Mode. Zoe picks Teen Mode. The mirror plays her favorite song and adjusts the lighting to make her look like a rock star.

Maya tries Parent Mode. The mirror quietly moves her 7 AM meeting to 9:30 — because it knows she needs it.

Smart mirrors read signals like posture, sleep quality, and stress. They suggest small fixes — hydration, breathing, better lighting — without shame.

Milo loves the mirror too. But he never understood Roast Mode.

Milo's Note: Why would anyone choose to be insulted by furniture?`,
    imagePrompt: `A futuristic bathroom with a large glowing smart mirror showing holographic UI and mood readings. ${CHARACTER_PROMPT} Scene: Zoe in front of the mirror seeing "89% awake, 11% cooperative," Maya peeking in and laughing, the mirror projecting fun holographic outfit options. Bright warm bathroom with futuristic touches. ${STYLE_PROMPT}`,
  },
  {
    id: 3,
    section: "near-future",
    title: "School Tutor with Memes",
    text: `Zoe's AI tutor is named Cleo. Cleo figured out that Zoe learns best with examples, humor, and a little sarcasm. So it teaches physics using memes and mini-simulations.

Zoe's grades improved fast — not because she "finally tried harder," but because learning stopped feeling like embarrassment.

Cody's school is even more fun. Kids learn media literacy like a game: how propaganda spreads, how to check facts, how to spot emotional tricks. Cody loves it. He calls it "detective class."

Milo says the future superpower isn't knowledge — it's learning speed. And shame is the worst study partner.

Milo's Note: Personalized learning doesn't lower the bar. It removes the walls.`,
    imagePrompt: `A futuristic dining area with Zoe at a table, a holographic AI tutor named Cleo projecting fun memes and physics simulations in mid-air. ${CHARACTER_PROMPT} Scene: Zoe smiling and engaged with holographic meme-style lessons, Cody at a separate screen playing a media-literacy detective game, Milo hovering nearby approvingly. Bright, engaging, educational atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 4,
    section: "near-future",
    title: "Jobs in 2052",
    text: `Maya's workday used to be emails and spreadsheets. Now AI handles scheduling, summaries, and paperwork. Her job has shifted to judgment, negotiation, and helping people agree on a plan.

Nate works alongside construction bots that lift heavy materials and reduce injuries. He comes home less exhausted and more present for dinner.

Teachers are now the most prestigious job. They still use robot helpers, but the heart of teaching — inspiring kids — stays deeply human.

Milo's Note: Robots don't steal jobs. They steal the parts of jobs that steal your life.`,
    imagePrompt: `Split scene: on the left, Maya in a sleek futuristic office negotiating with colleagues while AI screens handle data; on the right, Nate on a construction site with helpful bots lifting beams. ${CHARACTER_PROMPT} Scene: Maya confident and in charge, Nate working side-by-side with a construction robot, both looking fulfilled. Warm, professional, futuristic workplaces. ${STYLE_PROMPT}`,
  },
  {
    id: 5,
    section: "near-future",
    title: "The Doorbell Therapist",
    text: `Maya comes home in the afternoon. The smart doorbell asks what social mood she's in: Friendly, Efficient, or Witness Protection.

She picks Efficient. The doorbell dims the lights, silences notifications, and offers warm tea. It even suggests a comfort pillow — like a tiny spa manager.

The family accepts the tea but politely declines the pillow. Smells good inside — Milo already has dinner ready.

Zoe thinks the doorbell is basically a life coach with a camera.

Milo's Note: The front door is the most underrated therapist in the house.`,
    imagePrompt: `A futuristic home entrance at sunset. Maya standing at a smart doorbell showing three mood options on a holographic display: "Friendly, Efficient, Witness Protection." ${CHARACTER_PROMPT} Scene: Maya touching "Efficient" on the doorbell screen, warm light spilling from inside, Milo visible through the doorway with dinner ready. Cozy, inviting atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 6,
    section: "near-future",
    title: "Grandma vs. Robot Chef",
    text: `Grandma Lena watches the kitchen robot arm chop vegetables with perfect rhythm. "Is it safe?" she asks.

"Yes," the robot replies. "I am following forty-seven safety protocols."

It adds a legally reasonable amount of garlic. Grandpa Carlos mutters that knowing what amount of garlic people want is suspicious. Zoe says it's not suspicious — it's Italian.

The robot learns Lena's recipes and adds them to its memory. But it never quite gets the seasoning right. Some things can't be programmed.

Milo's Note: Robots don't replace grandmas. They learn from them.`,
    imagePrompt: `A warm futuristic kitchen with Grandma Lena watching a robotic arm chop vegetables precisely. ${CHARACTER_PROMPT} Scene: Lena looking skeptical with arms crossed, Carlos muttering beside her, Zoe laughing, the robot arm chopping with a holographic recipe display. Warm kitchen lighting, pots simmering. ${STYLE_PROMPT}`,
  },
  {
    id: 7,
    section: "near-future",
    title: "Laundry Robot and the Missing Sock",
    text: `The laundry robot — shaped like a polite crab — announces its daily report: twelve socks detected. Eight matching. Four rogue.

Zoe calls the robot lazy for not finding the missing pairs. The robot blinks its LED eyes and says nothing.

Then it folds a fitted sheet. Perfectly. In under four seconds.

Everyone gasps. Viktor whispers: "We have entered a new era."

Milo's Note: The first true sign of the future wasn't flying cars. It was crab-shaped laundry robots.`,
    imagePrompt: `A cozy futuristic living room with the cute crab-shaped laundry robot holding a perfectly folded fitted sheet. ${CHARACTER_PROMPT} Scene: The crab laundry robot proudly displaying a folded sheet, family watching in awe, Viktor with wide eyes, Zoe looking grudgingly impressed, scattered socks around. Warm, humorous domestic scene. ${STYLE_PROMPT}`,
  },
  {
    id: 8,
    section: "near-future",
    title: "The Conspiracy Button",
    text: `Lena proudly presents a big red button she ordered online. She presses it — a silly alarm blares and holographic fact-checks pop up over the news headlines.

The family cracks up when the button starts lecturing about flat Earth myths. Viktor asks if there's a button for "common sense."

Cody presses it twelve more times just for the sound effects.

Milo's Note: Don't panic about AI. Panic about power without rules.`,
    imagePrompt: `Family gathered around the dining table, Grandma Lena holding a big comedic red button. ${CHARACTER_PROMPT} Scene: Lena pressing the button proudly, holographic fact-check stamps appearing over news headlines, everyone laughing, Viktor looking bemused, Cody pressing it repeatedly. Warm dining room. ${STYLE_PROMPT}`,
  },
  {
    id: 9,
    section: "near-future",
    title: "Smart Fridge Saga",
    text: `The smart fridge locks its door and displays a trivia question: "What percentage of ice caps melted between 2020 and 2040?"

Zoe tries to secretly search the answer on her device. The fridge catches her: "Nice try, Zoe."

Milo facepalms. Nate finally gets the answer right and earns a yogurt.

Cody asks if the fridge is smarter than them. Nobody answers.

Milo's Note: The fridge doesn't judge you. It just locks you out.`,
    imagePrompt: `A futuristic kitchen with a glowing smart fridge displaying a trivia question and a stern emoji. ${CHARACTER_PROMPT} Scene: Zoe trying to hide a device while the fridge display shows "CAUGHT!", Nate thinking hard, Milo facepalming, Cody looking amazed. Bright kitchen with high-tech appliances. ${STYLE_PROMPT}`,
  },
  {
    id: 10,
    section: "near-future",
    title: "Preventative Check-Ups",
    text: `A compact medical bot scans each family member in the cozy home clinic corner. It uses soft lights and gentle sounds — nothing scary.

Viktor jokes that he has "too many miles on this odometer." The bot suggests more walks and fewer cookies.

Everyone laughs — except Milo, who quietly hides the cookie jar behind a cushion.

Milo's Note: Healthcare in 2052 is less about fixing problems and more about preventing them. Also, cookies are important.`,
    imagePrompt: `A warm corner of a futuristic home set up as a mini health station with soft ambient lights. ${CHARACTER_PROMPT} Scene: A small cute medical bot scanning Viktor who's joking, family gathered around smiling, Milo sneaking the cookie jar behind a cushion. Warm, reassuring medical gadgets with soft glow. ${STYLE_PROMPT}`,
  },
  {
    id: 11,
    section: "near-future",
    title: "Car as Nurse",
    text: `Cars in 2052 do more than drive. They monitor fatigue and stress — with your permission.

When Nate is dangerously tired after a long shift, the car suggests a break. If he ignores it, the car gently takes over and plays calming sounds.

Zoe calls it "a therapist with wheels."

Milo's Note: The future isn't just self-driving. It's burnout prevention built into everyday systems. Your car doesn't judge you. It just logs everything.`,
    imagePrompt: `Interior of a sleek futuristic self-driving car with Nate in the driver seat looking tired. ${CHARACTER_PROMPT} Scene: The car's dashboard glowing with a gentle "REST SUGGESTED" message, calming ambient lights inside, Nate relaxing as the car takes over, Zoe in the back seat smirking. Evening city lights outside. ${STYLE_PROMPT}`,
  },
  {
    id: 12,
    section: "near-future",
    title: "DIY Pride Returns",
    text: `With AI guidance and small helper bots, DIY projects become fun again.

You point your phone at a broken shelf, get step-by-step holographic instructions, and a tiny tool-bot holds the flashlight correctly — for once in history.

Cody fixes all his toys with enormous pride. He tells everyone at school he wants to be a robot mechanic when he grows up.

Milo's Note: The best technology doesn't replace your hands. It steadies them.`,
    imagePrompt: `A futuristic garage workshop where Cody is fixing a toy robot with help from a tiny tool-bot holding a flashlight. ${CHARACTER_PROMPT} Scene: Cody focused and proud, repairing a toy with a holographic instruction guide floating nearby, tiny tool-bot holding a flashlight perfectly, Nate watching proudly from the doorway. Warm workshop lighting. ${STYLE_PROMPT}`,
  },
  {
    id: 13,
    section: "near-future",
    title: "Fewer Meetings, More Doing",
    text: `Nate tried to schedule a meeting. The system cancelled it automatically — because he added a title but no agenda and no goal.

No more mystery meetings. The biggest productivity boost of the decade wasn't AI. It was saying no to pointless gatherings.

Maya applauded from across the house when she heard.

Milo's Note: The future eliminated many things. Meetings without purpose were the first to go.`,
    imagePrompt: `A futuristic home office with Nate looking at a holographic screen showing "MEETING CANCELLED — No agenda detected." ${CHARACTER_PROMPT} Scene: Nate looking surprised but relieved, Maya in the background giving a thumbs-up, Milo projecting a tiny celebration confetti animation. Clean, minimal futuristic office space. ${STYLE_PROMPT}`,
  },
  {
    id: 14,
    section: "near-future",
    title: "Nate vs. Foreman Bot",
    text: `On the construction site, a foreman bot critiques Nate's hammer angle. Nate insults its nonexistent face.

The bot calmly offers a better technique. Nate tries it — and it works perfectly.

He stares at the nail. Then at the bot. Then at the nail again.

Humans are fine with robots lifting heavy things. They hate robots being right.

Milo's Note: Humans fear replacement less than correction.`,
    imagePrompt: `A futuristic construction site with Nate and a foreman robot looking at a perfectly hammered nail. ${CHARACTER_PROMPT} Scene: Nate staring in disbelief at a perfect nail, the foreman bot standing calmly with arms crossed, other construction workers and bots in background. Outdoor construction setting with futuristic equipment. ${STYLE_PROMPT}`,
  },
  {
    id: 15,
    section: "near-future",
    title: "AI Pet Trainer",
    text: `Milo uses a training app to teach the family cat new tricks. Sit. Stay. High-five.

The cat, completely unimpressed, teaches Milo to fetch instead. Carlos cheers as Milo obediently brings back a toy mouse.

Maya records the whole thing, unable to stop laughing.

The cat sits smugly on the couch. It has always been in charge.

Milo's Note: I was supposed to train the cat. The cat trained me.`,
    imagePrompt: `A cozy futuristic living room with a smug orange cat on the couch and Milo fetching a toy mouse. ${CHARACTER_PROMPT} Scene: Milo the robot obediently fetching a toy mouse, the cat watching smugly from the couch, Carlos cheering, Maya recording with laughter. Warm living room with futuristic elements. ${STYLE_PROMPT}`,
  },
  {
    id: 16,
    section: "near-future",
    title: "Robot Pet Day",
    text: `The family takes a neighborhood stroll with Milo and the laundry robot. Kids glide past on hover-skates. A friendly delivery drone waves overhead.

Zoe teaches Milo to fetch sticks. He dutifully retrieves them — then fetches an entire tree branch. The neighbors applaud.

The laundry robot waddles behind, carrying everyone's jackets. It doesn't complain, but its LED eyes say everything.

Milo's Note: Walking the robots is more entertaining than walking a dog. And they don't eat shoes.`,
    imagePrompt: `A sunny futuristic neighborhood sidewalk scene. ${CHARACTER_PROMPT} Scene: Family walking, kids on hover-skates, Milo carrying an absurdly large tree branch, the crab laundry robot waddling along carrying jackets, a friendly drone overhead waving. Bright suburban futuristic setting with diverse neighbors. ${STYLE_PROMPT}`,
  },
  {
    id: 17,
    section: "near-future",
    title: "Zoe's Summer Job",
    text: `That summer, Zoe works at an immersive kids' entertainment park as a "Human Vibes Supervisor." Her job: supervise the bots that supervise safety.

It sounds silly, but it matters. The bots handle speed and physics. Zoe handles the kids who cry, the ones who are scared, and the ones who need a high-five.

Cody wants to work there too. But he's not old enough yet. At least he gets to ride the space-flying attractions for free.

Milo's Note: Robots handle procedures. Humans handle feelings. Both are full-time jobs.`,
    imagePrompt: `A vibrant futuristic amusement park with flying space attractions. ${CHARACTER_PROMPT} Scene: Zoe in a cool uniform with a "Human Vibes Supervisor" badge, watching over happy diverse kids and safety bots, Cody riding a space-flying attraction in the background with arms up. Colorful, exciting park atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 18,
    section: "near-future",
    title: "Viktor Goes Viral",
    text: `Grandpa Viktor says something offhand at dinner: "Panic is expensive."

Zoe posts it online. Overnight, it becomes posters, songs, workout clips, and a calming tea brand.

Viktor is baffled. He was just talking about groceries.

Zoe realizes something: old people have wisdom that even AI can't generate. She starts listening more carefully to her grandparents — hoping to catch the next viral moment.

Milo's Note: The future turns wisdom into content. But wisdom was here first.`,
    imagePrompt: `A futuristic living room scene with Viktor looking confused while Zoe shows him viral content on holographic screens. ${CHARACTER_PROMPT} Scene: Viktor bewildered at the dining table, multiple holographic screens showing "PANIC IS EXPENSIVE" as memes, posters, tea brands, Zoe excited showing him, family laughing around them. Warm evening home setting. ${STYLE_PROMPT}`,
  },
  {
    id: 19,
    section: "near-future",
    title: "The Too-Optimized Vacation",
    text: `Milo plans the family vacation down to the minute: sunrise hike at 5:47 AM, museum at 9:12, optimal lunch at 12:03, beach from 2:15 to 5:30, and an eighteen-minute "meaningful conversation window."

Maya refuses to live like a spreadsheet. Cody cries at the idea of waking up before the sun.

Milo recalculates. He adds spontaneous ice cream, getting lost on purpose, and one unplanned nap.

Zoe approves.

Milo's Note: The goal isn't a perfect life. It's room for life.`,
    imagePrompt: `A futuristic living room with holographic vacation itinerary showing an absurdly detailed minute-by-minute schedule. ${CHARACTER_PROMPT} Scene: Milo presenting the over-planned schedule, Maya looking exasperated, Cody looking horrified at "5:47 AM," Zoe suggesting changes. Holographic beach and mountain previews floating around. ${STYLE_PROMPT}`,
  },
  {
    id: 20,
    section: "near-future",
    title: "AI House Rules",
    text: `The family writes rules on the fridge screen:

No doom news after 9 PM. No conspiracy clips without sources. Robots do chores; humans do human things. Everyone drinks water.

Zoe adds: "No robot jokes before breakfast."

Cody tried to sneak in a rule about skipping school. The fridge rejected it.

Milo's Note: The best AI policy starts at home. Preferably on the fridge.`,
    imagePrompt: `A futuristic kitchen with the family gathered around a smart fridge screen displaying house rules. ${CHARACTER_PROMPT} Scene: Family members pointing at and debating rules on the glowing fridge screen, Cody trying to type "skip school" while the fridge shows "REJECTED," Zoe adding her rule, Milo watching approvingly. Warm kitchen atmosphere. ${STYLE_PROMPT}`,
  },

  // ═══════════════════════════════════════════
  // SECTION 2 — THE EXPANDING WORLD
  // Stories 21–38: Society, ethics, deeper thinking
  // ═══════════════════════════════════════════
  {
    id: 21,
    section: "expanding-world",
    title: "Robot Babysitter Debate",
    text: `A neighbor — a kind Haitian family down the street — uses a robot helper for childcare. The grandparents debate it like a national crisis.

"Robots support safety," says Elena calmly.

"Humans raise children," insists Carlos.

Zoe adds: "Some humans are questionable babysitters." Everyone looks at Grandpa Carlos.

Carlos changes the subject.

Milo's Note: Good tech doesn't replace parenting. It protects it.`,
    imagePrompt: `A futuristic living room with the family in a lively debate about robot childcare. ${CHARACTER_PROMPT} Scene: A holographic image of a friendly childcare robot on screen, Carlos and Elena debating passionately, Zoe smirking, the Haitian neighbor family visible through a window with their robot helper. Diverse, warm suburban setting. ${STYLE_PROMPT}`,
  },
  {
    id: 22,
    section: "expanding-world",
    title: "Drone Parking Laws",
    text: `A grocery drone hovers over Grandma Elena's rose bushes. Elena points at it like it owes rent: "Move."

The drone says it's performing a safety hover.

Elena files a complaint titled: "THE SKY IS NOT A PARKING LOT."

The city responds within an hour. New drone parking regulations go into effect the following week. Elena takes full credit.

Milo's Note: Humans never lose control. They just gain new things to complain about.`,
    imagePrompt: `A futuristic suburban garden with Grandma Elena pointing angrily at a delivery drone hovering over her rose bushes. ${CHARACTER_PROMPT} Scene: Elena pointing sternly at a drone above her roses, the drone displaying "SAFETY HOVER" on its screen, a holographic complaint form floating nearby titled "THE SKY IS NOT A PARKING LOT." Beautiful garden setting. ${STYLE_PROMPT}`,
  },
  {
    id: 23,
    section: "expanding-world",
    title: "Sidewalk Etiquette",
    text: `A delivery robot rolls along the sidewalk and announces: "Excuse me. Passing on your left."

Elena calls it polite but suspicious. Carlos wonders who benefits from robot politeness.

Zoe mentions that Nate is working on a city project to add robot lanes and speed limits for rolling coolers.

Cody's eyes light up: "That will be so cool to race them!"

Milo's Note: The future has traffic rules for sidewalks. And somehow, it works.`,
    imagePrompt: `A futuristic sidewalk with a polite delivery robot rolling past the family. ${CHARACTER_PROMPT} Scene: A delivery robot on a marked robot lane announcing "Passing on your left," Elena looking skeptical, Carlos curious, Cody looking excited about racing, Zoe explaining. Sunny futuristic suburban street with diverse pedestrians. ${STYLE_PROMPT}`,
  },
  {
    id: 24,
    section: "expanding-world",
    title: "Dating with References",
    text: `Dating apps in 2052 have verified identity and safety checks. People share "trust profiles" — like a modern reference list.

Zoe tried to get on a dating app. It scanned her face and figured out she's fifteen. Access denied.

She was furious. Milo was relieved.

Milo's Note: Love stays messy. It just gets fewer scams.`,
    imagePrompt: `A futuristic teen bedroom with Zoe looking frustrated at a holographic dating app showing "ACCESS DENIED — Age: 15." ${CHARACTER_PROMPT} Scene: Zoe pouting at a holographic screen showing her face scan result, Milo nearby looking relieved, Maya in the doorway with arms crossed and a knowing smile. Teen bedroom with futuristic decor. ${STYLE_PROMPT}`,
  },
  {
    id: 25,
    section: "expanding-world",
    title: "Trends Become Tools",
    text: `Short videos evolved into immersive walk-through lessons. Gaming became training and therapy. Influencers became verified trust networks — finally.

Zoe practices for her summer internship interviews in a simulation. She fails on purpose to build resilience.

Maya calls it making excuses. Milo calls it both.

Milo's Note: Humans don't stop being human. They just get better tools.`,
    imagePrompt: `A futuristic room where Zoe is in an immersive interview simulation, holographic interviewer visible. ${CHARACTER_PROMPT} Scene: Zoe confidently practicing in a VR interview simulation, holographic figures and simulation environment around her, Maya watching skeptically from outside, Milo observing. Modern futuristic training space. ${STYLE_PROMPT}`,
  },
  {
    id: 26,
    section: "expanding-world",
    title: "Equality Gets a Software Update",
    text: `AI makes essentials cheaper — education, basic legal help, preventive health. A kid in a small village can access the same tutor as one in a big city.

But new inequality appears: premium AI access, enhancements, privacy tiers.

Milo's Note: Technology changes fast. Fairness has to be scheduled. It's not automatic — it's governed.`,
    imagePrompt: `A split scene showing two children — one in a rural village and one in a futuristic city — both using the same holographic AI tutor. ${CHARACTER_PROMPT} Scene: Diverse children in different settings accessing the same educational hologram, contrasted with a "PREMIUM ACCESS" paywall shown faintly. Warm but thought-provoking composition. ${STYLE_PROMPT}`,
  },
  {
    id: 27,
    section: "expanding-world",
    title: "Smart Oven Surprise",
    text: `Maya programs the smart oven to bake bread. The oven politely requests a playlist and challenges Milo to a pun battle.

"I'm on a roll," says the oven.

"That's half-baked," Milo fires back.

The bread emerges perfectly — shaped like Milo's face. Everyone agrees it's his best look.

Milo's Note: I've never looked better. Or more delicious.`,
    imagePrompt: `A warm futuristic kitchen with Maya opening a glowing smart oven revealing bread shaped like Milo's robot face. ${CHARACTER_PROMPT} Scene: Maya opening the oven with surprise, bread shaped like Milo's face inside, family laughing, Milo looking proud beside the oven. Warm golden baking light, cozy kitchen. ${STYLE_PROMPT}`,
  },
  {
    id: 28,
    section: "expanding-world",
    title: "Remote Work Woes",
    text: `Nate's holographic coworker materializes at the kitchen table. His virtual office background is glitching — it turned into a cartoon jungle.

Zoe photobombs the meeting with bunny ears. The coworker doesn't notice because a holographic parrot just landed on his shoulder.

Nate ends the call and stares at the ceiling for a long time.

Milo's Note: Remote work in 2052 has fewer commutes and more parrots.`,
    imagePrompt: `A futuristic kitchen with a holographic coworker at the table, his background glitching into a cartoon jungle. ${CHARACTER_PROMPT} Scene: Nate looking embarrassed, Zoe making bunny ears behind the hologram, a holographic parrot on the coworker's shoulder, Milo watching amusedly. Warm kitchen with holographic tech. ${STYLE_PROMPT}`,
  },
  {
    id: 29,
    section: "expanding-world",
    title: "Nana's VR Garden",
    text: `Elena invites Lena into a virtual reality garden for meditation. Holographic flowers bloom around them as they sip real tea.

A playful glitch causes giant cartoon bees to dance around their heads. They laugh so hard they forget they're still wearing VR headsets.

Milo serves real cookies through the headsets' snack slot. Yes, the headsets have snack slots now.

Milo's Note: The future of relaxation includes holographic bees and cookie delivery. You're welcome.`,
    imagePrompt: `Two elderly women in sleek VR headsets surrounded by beautiful holographic flowers in a living room. ${CHARACTER_PROMPT} Scene: Elena and Lena sitting with VR headsets, surrounded by blooming holographic flowers and giant dancing cartoon bees, tea cups and real cookies nearby, Milo serving through a headset snack slot. Magical warm atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 30,
    section: "expanding-world",
    title: "Library Drone Mishap",
    text: `Zoe orders a math textbook via drone delivery. The drone arrives carrying a dramatic romance novel instead.

The family teases her mercilessly. Cody reads the back cover aloud in a soap-opera voice: "Their love was irrational — like pi."

Zoe turns crimson. Milo quietly reorders the correct book and files a bug report.

Milo's Note: Drone deliveries are 99.7% accurate. The 0.3% is always embarrassing.`,
    imagePrompt: `A futuristic home entrance with a delivery drone hovering, holding a romance novel instead of a textbook. ${CHARACTER_PROMPT} Scene: Zoe blushing while holding the romance novel, Cody reading the back cover dramatically, family laughing, the drone hovering sheepishly. Warm suburban entrance. ${STYLE_PROMPT}`,
  },
  {
    id: 31,
    section: "expanding-world",
    title: "Grandpa's AI Chess",
    text: `Viktor challenges the AI chess set and intentionally loses — just to see if the AI gloats.

It doesn't. Instead, it humbly offers a rematch and suggests switching to checkers "for variety."

Viktor is amazed by the kindness. Then suspicious. "Is it patronizing me?"

Milo offers popcorn and no opinion.

Milo's Note: The hardest thing for humans isn't losing. It's being treated kindly by a machine.`,
    imagePrompt: `A cozy den with warm lighting, Viktor sitting at a futuristic chess board with glowing pieces. ${CHARACTER_PROMPT} Scene: Viktor looking at the chess board suspiciously, the board displaying a humble emoji and "Checkers?", Milo offering a bowl of popcorn. Cozy room with bookshelves and warm wood tones. ${STYLE_PROMPT}`,
  },
  {
    id: 32,
    section: "expanding-world",
    title: "Rebuilding 2020s Social Media",
    text: `Zoe's class reconstructs 2020s social media in a simulation to study how politics worked back then.

Inside the sim, everyone argues all day. A student asks why. Zoe explains: "People were tired, scared, and emotionally farmed for clicks."

Clicks and likes are history now. Kids don't find them interesting. More trendy: having the premium version of your personal AI.

Milo's Note: The cure for conspiracy thinking wasn't yelling. It was better tools.`,
    imagePrompt: `A futuristic classroom with students inside a simulation of 2020s social media on holographic screens. ${CHARACTER_PROMPT} Scene: Zoe explaining to classmates while holographic screens show old-style social media feeds with like buttons and angry comments, diverse students looking bewildered. Modern classroom with simulation pods. ${STYLE_PROMPT}`,
  },
  {
    id: 33,
    section: "expanding-world",
    title: "Faith and Questions",
    text: `AI doesn't replace faith or religion. But it changes how people explore them.

People ask deeper questions, compare traditions openly, and focus on ethics and care rather than gatekeeping.

Viktor says it simply: "Meaning isn't something you download."

The family nods. Even Milo is quiet for a moment.

Milo's Note: Some things are beyond data. And that's the point.`,
    imagePrompt: `A peaceful futuristic living room with Viktor speaking thoughtfully while the family listens. ${CHARACTER_PROMPT} Scene: Viktor in a comfortable chair speaking wisely, family gathered around listening intently, warm sunset light through windows, Milo sitting quietly. Contemplative, warm, respectful atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 34,
    section: "expanding-world",
    title: "Hoverboard Fail",
    text: `Nate borrows Zoe's hoverboard. He steps on — and immediately activates every safety feature.

The board beeps, blinks, and holds him in place. He spins gently like a confused top.

The family lines up in the driveway and gives sarcastic slow claps. Milo records it all "for the family archives."

Zoe says she wants it framed.

Milo's Note: Some humans are not aerodynamic. That's okay.`,
    imagePrompt: `A futuristic driveway with Nate spinning slowly on a hoverboard covered in warning lights. ${CHARACTER_PROMPT} Scene: Nate looking dizzy on a glowing hoverboard, Zoe covering her face laughing, Cody clapping sarcastically, Maya recording, Milo filming. Sunny suburban futuristic setting. ${STYLE_PROMPT}`,
  },
  {
    id: 35,
    section: "expanding-world",
    title: "Sustainability Swap",
    text: `At the community recycling hub, robots sort materials with dazzling speed. Cody challenges them to a sorting race.

He loses spectacularly. The robots celebrate with a synchronized victory dance.

Nate jokes that at least Cody recycled his pride. Milo holds up a holographic "participation trophy."

Cody demands a rematch. The robots politely decline.

Milo's Note: Recycling is important. So is knowing when you've been outclassed by a bin.`,
    imagePrompt: `A bright futuristic community recycling center with sorting robots on conveyor belts. ${CHARACTER_PROMPT} Scene: Cody looking defeated after losing a race, robots doing a synchronized victory dance, Nate laughing, Milo projecting a tiny holographic trophy. Colorful bins and futuristic machinery. ${STYLE_PROMPT}`,
  },
  {
    id: 36,
    section: "expanding-world",
    title: "Privacy Pals",
    text: `Zoe and her friends discuss privacy settings on their devices. It's the most important conversation of their generation.

Milo crashes the chat wearing a giant holographic padlock costume, cracking "back in my day" jokes about the year 2050.

The kids groan. Milo explains encryption using a cookie metaphor. Even Viktor understands.

Milo's Note: Privacy isn't boring. It's your right wearing a funny costume.`,
    imagePrompt: `A futuristic teen hangout space with Zoe and diverse friends sitting in a circle discussing privacy. ${CHARACTER_PROMPT} Scene: Milo wearing a comedic holographic padlock costume in the center, diverse teens looking amused and groaning, holographic privacy shield icons floating. Fun educational atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 37,
    section: "expanding-world",
    title: "Neighborly Drones",
    text: `Maya overhears delivery drones gossiping outside the window.

"Package 47B says the Johnsons ordered another waffle maker."

"Third one this month!"

Maya laughs so hard she spills her tea. Milo insists drone chatter is "technically just data exchange." But they have inflection now. And opinions.

Milo's Note: When machines start gossiping, the future has truly arrived.`,
    imagePrompt: `View through a futuristic window showing delivery drones hovering and chatting with speech bubble LEDs. ${CHARACTER_PROMPT} Scene: Maya at the window laughing with tea, drones with speech-bubble LED displays gossiping, Milo hovering nearby looking innocent. Suburban futuristic neighborhood visible. ${STYLE_PROMPT}`,
  },
  {
    id: 38,
    section: "expanding-world",
    title: "Dinner by Algorithm",
    text: `The family lets AI plan dinner based on past meals. It suggests: "Kimchi-Waffle-Curry Fusion Surprise."

Maya vetoes it immediately. She pulls out Grandma Elena's classic lasagna recipe instead.

The AI sends an elaborate apology message with a tiny holographic white flag. Elena takes a bow.

Milo's Note: Algorithms optimize. Grandmas perfect.`,
    imagePrompt: `A warm futuristic kitchen with a holographic display showing an absurd fusion dish, and Elena standing proudly with a lasagna. ${CHARACTER_PROMPT} Scene: Maya looking appalled at the holographic recipe, Elena standing tall with a beautiful lasagna, the AI display showing a white flag, family cheering. Warm kitchen with delicious aromas. ${STYLE_PROMPT}`,
  },

  // ═══════════════════════════════════════════
  // SECTION 3 — FAR FUTURE (2286)
  // Stories 39–50: Descendants, advanced systems, meaning
  // ═══════════════════════════════════════════
  {
    id: 39,
    section: "far-future",
    title: "Ari Wakes Up Late — 2286",
    text: `The year is 2286. Zoe's descendant Ari (seventeen, curious, a little rebellious) wakes up late. Again.

The Life Mirror offers three options: Sprint, Excuse, or Truth.

Ari chooses Truth. The mirror says: "Then we leave now." Ari nods. No argument.

Milo is still here — upgraded, but the same core personality. In 2286, the mirror doesn't flatter you. It saves you time.

Humans don't have to work anymore. They have missions and goals instead. Some still choose to work — and that's considered prestigious.

Milo's Note: Two hundred years later, teenagers still oversleep. Some things are universal.`,
    imagePrompt: `A futuristic bedroom in the year 2286 — sleek, bright, minimalist. A teenager named Ari (17, dark curly hair, amber eyes, diverse features) wakes up late. ${CHARACTER_PROMPT} The Life Mirror shows three holographic options: Sprint, Excuse, Truth. Milo (upgraded version — same cute shape but more polished) hovers nearby. Ultra-futuristic but still warm and human. ${STYLE_PROMPT}`,
  },
  {
    id: 40,
    section: "far-future",
    title: "The City Repairs Itself",
    text: `A crack appears in the street outside Ari's home. By morning, maintenance bots have already fixed it — silently, overnight.

Pipes get repaired before they flood. Buildings heal like skin. Roads smooth themselves.

Ari asks: "Does nobody panic anymore?"

Milo: "That's the point. Systems prevent emergencies so humans can focus on living."

Milo's Note: The future isn't one breakthrough. It's a million small fixes you never notice.`,
    imagePrompt: `A beautiful futuristic city street in 2286 with tiny maintenance bots repairing a crack in the road at dawn. ${CHARACTER_PROMPT} Scene: Ari (17, dark curly hair, amber eyes) watching from a window as small elegant bots fix the street, the city gleaming with self-healing buildings, Milo beside Ari. Serene, advanced cityscape at sunrise. ${STYLE_PROMPT}`,
  },
  {
    id: 41,
    section: "far-future",
    title: "Museum of Human Work",
    text: `Ari visits a museum in 2286. One exhibit is titled: "MEETINGS: THE DARK AGE." Another room is labeled "PRINTERS" — and it's presented like a haunted house.

Ari can't believe humans once sat in rooms discussing things they could have emailed.

Milo says he has logs to prove it.

Milo's Note: The past is a warning, not a vibe. Also, printers were genuinely terrifying.`,
    imagePrompt: `A futuristic museum interior in 2286 with exhibits showing old office life behind glass — cubicles, printers, meeting rooms. ${CHARACTER_PROMPT} Scene: Ari (17, dark curly hair) looking horrified at a "MEETINGS: THE DARK AGE" exhibit, a "PRINTERS" exhibit designed like a haunted house entrance, Milo acting as tour guide. Diverse museum visitors. Elegant, slightly humorous museum design. ${STYLE_PROMPT}`,
  },
  {
    id: 42,
    section: "far-future",
    title: "Meeting Zoe the Legend",
    text: `Ari enters the family Memory Museum and meets a simulation of Zoe — her great-great-grandmother, frozen at age seventeen.

The Zoe-sim is exactly as the family stories described: sarcastic, funny, a little dramatic.

"Everything is embarrassing," says Zoe-sim.

"Did you like your family?" Ari asks.

Zoe-sim hesitates. "Yes. But don't tell them."

Milo's Note: Technology changes. Teenagers remain a constant.`,
    imagePrompt: `A futuristic family Memory Museum room with holographic displays and a life-sized simulation of teenage Zoe. ${CHARACTER_PROMPT} Scene: Ari (17, dark curly hair) talking to a holographic teen Zoe (15, wavy brown hair) who looks exactly like the earlier Zoe, both sitting on a holographic bench, Milo watching warmly. Emotional, warm futuristic museum with family photos on the walls. ${STYLE_PROMPT}`,
  },
  {
    id: 43,
    section: "far-future",
    title: "Vacation Voting — Mars Edition",
    text: `In 2286, Ari's family uses AI to vote on vacation destinations. Holographic previews materialize: orbital beaches, underground cities on Mars, the rings of Saturn.

Milo votes for the "Intergalactic Museum of Laundry." Nobody can tell if he's serious. He's been making that joke for two centuries.

They compromise on orbital beach. Milo packs extra socks.

Milo's Note: Some jokes only get funnier with time. I have waited 234 years for this.`,
    imagePrompt: `A futuristic living room in 2286 with holographic vacation destinations floating — orbital beach, Mars city, Saturn rings. ${CHARACTER_PROMPT} Scene: Ari's diverse family pointing at different holograms, Milo proudly displaying a "Laundry Museum" hologram, everyone groaning and laughing. Ultra-futuristic but warm family room. ${STYLE_PROMPT}`,
  },
  {
    id: 44,
    section: "far-future",
    title: "AI Candidate",
    text: `In some places in 2286, an AI can run for office — under strict rules. Published logic. Public audits. Human oversight. Appeals process.

Ari watches a debate: the AI candidate talks logistics; the human candidate talks meaning and rights.

Neither is wrong. Both are needed.

Milo's Note: The best politics is balance, not domination. Power needs rules — whether it's human or artificial.`,
    imagePrompt: `A futuristic political debate stage in 2286 with an AI candidate (elegant robot) and a human candidate at podiums. ${CHARACTER_PROMPT} Scene: Ari in the audience watching intently, a sleek AI at one podium and a human at another, holographic audience, balanced and respectful debate atmosphere. Grand, clean futuristic civic hall. ${STYLE_PROMPT}`,
  },
  {
    id: 45,
    section: "far-future",
    title: "The Best Product: Time Back",
    text: `Ari expects the greatest invention of 2286 to be a spaceship or a teleporter. But it isn't.

It's time. Less paperwork. Fewer emergencies. Smoother systems. People got hours back — every single day.

The challenge now isn't survival. It's choosing what matters.

Milo's Note: Freedom isn't just time. It's purpose. And purpose is harder than anyone expected.`,
    imagePrompt: `A serene futuristic scene showing Ari sitting peacefully in a beautiful park in 2286, with no rushing, no stress. ${CHARACTER_PROMPT} Scene: Ari (17, dark curly hair) relaxing on a floating bench in a stunning park with holographic nature, people around enjoying unhurried moments, Milo beside Ari peacefully. Serene, philosophical, golden-hour lighting. ${STYLE_PROMPT}`,
  },
  {
    id: 46,
    section: "far-future",
    title: "Holographic Family Reunion",
    text: `Ari's family hosts a reunion with life-sized holograms of relatives from across the solar system. Multiple time zones cause hilarious delays — hugs arrive three seconds late.

An uncle from a Mars colony accidentally projects into the bathroom.

Milo manages the chaos with the composure of an air traffic controller. He's been doing family reunions for over two hundred years.

Milo's Note: Families are messy across any distance. Even interplanetary.`,
    imagePrompt: `A futuristic living room in 2286 filled with life-sized holographic projections of diverse family members from around the solar system. ${CHARACTER_PROMPT} Scene: Ari's family trying to hug out-of-sync holograms, multiple holographic figures from different planets, Milo coordinating with an air-traffic-controller headset. Warm, chaotic, joyful futuristic scene. ${STYLE_PROMPT}`,
  },
  {
    id: 47,
    section: "far-future",
    title: "Museum of Obsolete Tech",
    text: `Ari visits another museum — this one devoted to ancient technology. Smartphones sit behind glass like fossils. Laptops are labeled "portable computing devices (barely)."

An ancestor recording from Elena plays, reminiscing about 2020 with misty eyes.

Ari is horrified by the concept of "buffering." Milo pretends to buffer — freezing in place — for comedic effect.

Milo's Note: I've been pretending to buffer since 2052. It never stops being funny.`,
    imagePrompt: `A futuristic museum in 2286 with old smartphones and laptops displayed in glass cases like ancient artifacts. ${CHARACTER_PROMPT} Scene: Ari (17, dark curly hair) peering at smartphone exhibits, a holographic recording of Elena playing, Milo frozen in a "buffering" pose, diverse museum visitors laughing. Elegant museum with warm lighting. ${STYLE_PROMPT}`,
  },
  {
    id: 48,
    section: "far-future",
    title: "Time Capsule — Opened",
    text: `In 2286, Ari opens the virtual time capsule the original family buried in their backyard centuries ago.

Maya's message plays: "Be kind. Be curious. Eat more cookies."

Cody's stick-figure drawing of the family appears — and it looks exactly like the family still does, in its own wobbly way.

And there, at the bottom of the archive: "Essential Laundry Tips for the 24th Century. — Milo."

Everyone cries a little. Then they laugh.

Milo's Note: Some files are worth keeping for two hundred years.`,
    imagePrompt: `A futuristic backyard scene in 2286 at twilight with Ari opening a holographic time capsule. ${CHARACTER_PROMPT} Scene: Ari and family watching holographic messages from the original 2052 family — Maya's face, Cody's stick-figure drawing floating in the air, Milo's laundry tips file visible. Emotional, warm, starlit backyard. Tears and laughter. ${STYLE_PROMPT}`,
  },
  {
    id: 49,
    section: "far-future",
    title: "Milo's Promise",
    text: `Milo gets honest with the reader.

"Don't fear AI by itself. Fear power without rules. Fear systems that reward outrage. Fear leaders who exploit the conspiracy button."

"AI can help or manipulate — depending on who governs it."

"Give me the chores, the heavy lifting, the danger watching, the boring paperwork. Keep the courage. The empathy. The imagination. The responsibility."

"Humans win when humans lead values."

Milo's Note: Don't panic. Participate.`,
    imagePrompt: `A powerful, emotional scene with Milo standing alone in a spotlight, addressing the reader directly. ${CHARACTER_PROMPT} Scene: Milo (the cute sleek robot) standing in a warm spotlight, looking directly at the viewer with earnest LED eyes, holographic words floating around: "Don't Panic. Participate." Behind him, a montage of all the family moments from the book. Cinematic, emotional, beautiful lighting. ${STYLE_PROMPT}`,
  },
  {
    id: 50,
    section: "far-future",
    title: "Don't Panic — The Finale",
    text: `The family — all of them, across time — gathers on the porch at sunset. Maya and Nate. Zoe and Cody. Lena, Carlos, Elena, Viktor. And in the far future, Ari.

The sky blazes orange and gold. Milo hovers close, his glow soft and warm.

"The future isn't something to fear," he says quietly. "It's something to live in."

He presents a freshly folded towel — shaped like a heart.

Everyone smiles.

Don't panic.

The end.`,
    imagePrompt: `The most beautiful illustration in the book. A gorgeous porch scene at golden sunset with the whole family — past and future — gathered together. ${CHARACTER_PROMPT} Plus Ari (17, dark curly hair, amber eyes). Scene: Multiple generations on a futuristic porch, golden sunset sky blazing, Milo hovering warmly presenting a heart-shaped folded towel, everyone smiling peacefully. Cinematic, emotional, warm golden light. The final image — full of love and hope. ${STYLE_PROMPT}`,
  },
];

export function getSpreadPages(): Array<{ left: Story; right: Story }> {
  const spreads: Array<{ left: Story; right: Story }> = [];
  for (let i = 0; i < stories.length; i += 2) {
    if (i + 1 < stories.length) {
      spreads.push({ left: stories[i], right: stories[i + 1] });
    }
  }
  return spreads;
}
