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

const STYLE_PROMPT = `Style: Pixar-inspired semi-realistic 3D illustration with subtle painterly finish. Soft cinematic lighting with warm amber and gold tones. Smooth skin, clean faces, slightly exaggerated features with larger expressive eyes. Warm polished animated film quality. Background depth-of-field blur. Rich warm color palette, cozy domestic futurism aesthetic. Every image must look like a frame from the same animated movie. NOT flat cartoon, NOT photorealistic, NOT generic AI look. Consistent across all pages.`;

export const stories: Story[] = [
  // ═══════════════════════════════════════════
  // SECTION 1 — NEAR FUTURE (2052)
  // Stories 1–20: Family life, school, daily routines
  // ═══════════════════════════════════════════
  {
    id: 1,
    section: "near-future",
    title: "Meet the Family — 2052",
    text: `It is the year 2052. Fresh coffee drifts through the hallway. Warm bread is baking.

Milo, the family's home robot, has everything under control — organizing schedules and laying out breakfast without a sound.

One by one, the family wakes up. Maya stretches. Nate fumbles for his glasses. Cody is already running downstairs.

Milo's Note: The fights are the same. They just have better logistics.`,
    imagePrompt: `A warm futuristic kitchen bathed in golden morning light, year 2052. ${CHARACTER_PROMPT} Scene: The whole family in their morning routine — Maya pouring coffee, Nate reaching for glasses, Zoe half-asleep at the door, Cody running toward breakfast, Milo cheerfully managing the kitchen. ${STYLE_PROMPT}`,
  },
  {
    id: 2,
    section: "near-future",
    title: "Smart Mirror Roast Mode",
    text: `The bathroom smart mirror greets Zoe every morning. Today it says: "89% awake. 11% cooperative."

It offers four modes: Teen Mode, Confidence Mode, Reality Mode, and Anti-Drama Mode. Zoe picks Teen Mode. The mirror plays her favorite song and adjusts lighting.

Maya tries Parent Mode. The mirror quietly moves her 7 AM meeting to 9:30 — because it knows she needs it.

Smart mirrors read signals like posture, sleep, and stress. They suggest small fixes without shame.

Milo's Note: Why would anyone choose to be insulted by furniture?`,
    imagePrompt: `A futuristic bathroom with a large glowing smart mirror showing holographic UI and mood readings. ${CHARACTER_PROMPT} Scene: Zoe in front of the mirror seeing "89% awake, 11% cooperative," Maya peeking in laughing. Bright warm bathroom. ${STYLE_PROMPT}`,
  },
  {
    id: 3,
    section: "near-future",
    title: "School Tutor with Memes",
    text: `Zoe's AI tutor is named Cleo. Cleo figured out that Zoe learns best with humor and sarcasm. So it teaches physics using memes and mini-simulations.

Zoe's grades improved fast — not because she "finally tried harder," but because learning stopped feeling like embarrassment.

Cody's school is even more fun. Kids learn media literacy like a game — how to spot tricks, check facts, and notice emotional traps. Cody calls it "detective class."

Milo's Note: Personalized learning doesn't lower the bar. It removes the walls.`,
    imagePrompt: `A futuristic study area with Zoe at a table, a holographic AI tutor projecting fun memes and physics simulations. ${CHARACTER_PROMPT} Scene: Zoe smiling at holographic meme-style lessons, Cody at a separate screen playing a detective game, Milo nearby. ${STYLE_PROMPT}`,
  },
  {
    id: 4,
    section: "near-future",
    title: "Jobs in 2052",
    text: `Maya's workday used to be emails and spreadsheets. Now AI handles scheduling, summaries, and paperwork. Her job shifted to judgment, negotiation, and helping people agree on a plan.

Nate works alongside construction bots that lift heavy materials and reduce injuries. He comes home less exhausted and more present for dinner.

Teachers are now the most prestigious job. They still use robot helpers, but inspiring kids stays deeply human.

Milo's Note: Robots don't steal jobs. They steal the parts of jobs that steal your life.`,
    imagePrompt: `Split scene: Maya in a sleek futuristic office negotiating with colleagues; Nate on a construction site with helpful bots lifting beams. ${CHARACTER_PROMPT} Both looking fulfilled. ${STYLE_PROMPT}`,
  },
  {
    id: 5,
    section: "near-future",
    title: "The Doorbell Therapist",
    text: `Maya comes home in the afternoon. The smart doorbell asks what social mood she's in: Friendly, Efficient, or Witness Protection.

She picks Efficient. The doorbell dims the lights, silences notifications, and offers warm tea — like a tiny spa manager.

The family accepts the tea but politely declines the comfort pillow. Smells good inside — Milo already has dinner ready.

Zoe thinks the doorbell is basically a life coach with a camera.

Milo's Note: The front door is the most underrated therapist in the house.`,
    imagePrompt: `A futuristic home entrance at sunset. Maya at a smart doorbell showing three mood options: "Friendly, Efficient, Witness Protection." ${CHARACTER_PROMPT} Milo visible through the doorway with dinner ready. ${STYLE_PROMPT}`,
  },
  {
    id: 6,
    section: "near-future",
    title: "Grandma vs. Robot Chef",
    text: `Grandma Lena watches the kitchen robot arm chop vegetables with perfect rhythm. "Is it safe?" she asks.

"Yes," the robot replies. "I am following forty-seven safety protocols."

It adds a legally reasonable amount of garlic. Grandpa Carlos mutters that knowing what amount of garlic people want is suspicious. Zoe says it's not suspicious — it's Italian.

The robot learns Lena's recipes. But it never quite gets the seasoning right. Some things can't be programmed.

Milo's Note: Robots don't replace grandmas. They learn from them.`,
    imagePrompt: `A warm futuristic kitchen with Grandma Lena watching a robotic arm chop vegetables. ${CHARACTER_PROMPT} Lena skeptical, Carlos muttering, Zoe laughing. ${STYLE_PROMPT}`,
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
    imagePrompt: `A cozy futuristic living room with the cute crab-shaped laundry robot holding a perfectly folded fitted sheet. ${CHARACTER_PROMPT} Family watching in awe, Viktor wide-eyed. ${STYLE_PROMPT}`,
  },
  {
    id: 8,
    section: "near-future",
    title: "The Conspiracy Button",
    text: `Lena proudly presents a big red button she ordered online. She presses it — a silly alarm blares and holographic fact-checks pop up over the news.

The family cracks up when the button starts lecturing about flat Earth myths. Viktor asks if there's a button for "common sense."

Cody presses it twelve more times just for the sound effects.

Milo's Note: Don't panic about AI. Panic about power without rules.`,
    imagePrompt: `Family gathered around the dining table, Grandma Lena holding a big comedic red button. ${CHARACTER_PROMPT} Holographic fact-check stamps appearing over news, everyone laughing, Cody pressing it repeatedly. ${STYLE_PROMPT}`,
  },
  {
    id: 9,
    section: "near-future",
    title: "Robot Grandparent Helpers",
    text: `Grandma Elena has a new helper — a gentle lifting robot that supports her when she stands. Grandpa Viktor has a fall-prevention buddy that walks beside him like a loyal shadow.

The robots handle reminders, medicine schedules, and safety checks. They don't replace the grandchildren's hugs — they make more time for them.

Families get more real time together because caregiving becomes less exhausting. The love stays human. The heavy lifting doesn't have to be.

Milo's Note: The robot isn't the grandparent. It's the helpful chair that moves.`,
    imagePrompt: `A warm futuristic living room with elderly grandparents Elena and Viktor being gently assisted by helper robots. ${CHARACTER_PROMPT} Elena standing with a gentle lifting robot, Viktor with a companion bot, family visiting happily. Warm, caring atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 10,
    section: "near-future",
    title: "Preventative Check-Ups",
    text: `A compact medical bot scans each family member in the cozy home clinic corner. It uses soft lights and gentle sounds — nothing scary.

Viktor jokes that he has "too many miles on this odometer." The bot suggests more walks and fewer cookies.

Everyone laughs — except Milo, who quietly hides the cookie jar behind a cushion.

Milo's Note: Healthcare in 2052 is less about fixing problems and more about preventing them.`,
    imagePrompt: `A warm corner of a futuristic home set up as a mini health station. ${CHARACTER_PROMPT} A cute medical bot scanning Viktor who's joking, family gathered smiling, Milo sneaking the cookie jar behind a cushion. ${STYLE_PROMPT}`,
  },
  {
    id: 11,
    section: "near-future",
    title: "Car as Nurse",
    text: `Cars in 2052 do more than drive. They monitor fatigue and stress — with your permission.

When Nate is dangerously tired after a long shift, the car suggests a break. If he ignores it, the car gently takes over and plays calming sounds.

Zoe calls it "a therapist with wheels."

Milo's Note: The future isn't just self-driving. It's burnout prevention built into everyday systems.`,
    imagePrompt: `Interior of a sleek futuristic self-driving car with Nate looking tired. ${CHARACTER_PROMPT} Dashboard showing "REST SUGGESTED," calming ambient lights, Zoe in back seat smirking. ${STYLE_PROMPT}`,
  },
  {
    id: 12,
    section: "near-future",
    title: "DIY Pride Returns",
    text: `With AI guidance and small helper bots, DIY projects become fun again.

You point your phone at a broken shelf, get step-by-step holographic instructions, and a tiny tool-bot holds the flashlight correctly — for once in history.

Cody fixes all his toys with enormous pride. He tells everyone at school he wants to be a robot mechanic when he grows up.

Milo's Note: The best technology doesn't replace your hands. It steadies them.`,
    imagePrompt: `A futuristic garage workshop where Cody is fixing a toy robot with help from a tiny tool-bot holding a flashlight. ${CHARACTER_PROMPT} Holographic instructions floating nearby, Nate watching proudly. ${STYLE_PROMPT}`,
  },
  {
    id: 13,
    section: "near-future",
    title: "Fewer Meetings, More Doing",
    text: `Nate tried to schedule a meeting. The system cancelled it automatically — because he added a title but no agenda and no goal.

No more mystery meetings. The biggest productivity boost of the decade wasn't AI. It was saying no to pointless gatherings.

Maya applauded from across the house when she heard.

Milo's Note: The future eliminated many things. Meetings without purpose were the first to go.`,
    imagePrompt: `A futuristic home office with Nate looking at a holographic screen showing "MEETING CANCELLED — No agenda detected." ${CHARACTER_PROMPT} Maya in background giving thumbs-up, Milo projecting tiny confetti. ${STYLE_PROMPT}`,
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
    imagePrompt: `A futuristic construction site with Nate and a foreman robot looking at a perfectly hammered nail. ${CHARACTER_PROMPT} Nate staring in disbelief, foreman bot standing calmly. ${STYLE_PROMPT}`,
  },
  {
    id: 15,
    section: "near-future",
    title: "AI Pet Trainer",
    text: `Milo uses a training app to teach the family cat new tricks. Sit. Stay. High-five.

The cat, completely unimpressed, teaches Milo to fetch instead. Carlos cheers as Milo obediently brings back a toy mouse.

Maya records the whole thing, unable to stop laughing. The cat sits smugly on the couch. It has always been in charge.

Milo's Note: I was supposed to train the cat. The cat trained me.`,
    imagePrompt: `A cozy futuristic living room with a smug orange cat on the couch and Milo fetching a toy mouse. ${CHARACTER_PROMPT} Carlos cheering, Maya recording with laughter. ${STYLE_PROMPT}`,
  },
  {
    id: 16,
    section: "near-future",
    title: "Robot Pet Day",
    text: `The family takes a neighborhood stroll with Milo and the laundry robot. Kids glide past on hover-skates. A friendly delivery drone waves overhead.

Zoe teaches Milo to fetch sticks. He retrieves them — then fetches an entire tree branch. The neighbors applaud.

The laundry robot waddles behind, carrying jackets. Its LED eyes say everything.

Milo's Note: Walking the robots is more entertaining than walking a dog.`,
    imagePrompt: `A sunny futuristic neighborhood sidewalk. ${CHARACTER_PROMPT} Family walking, kids on hover-skates, Milo carrying an absurdly large tree branch, crab laundry robot waddling with jackets, friendly drone overhead. Diverse neighbors. ${STYLE_PROMPT}`,
  },
  {
    id: 17,
    section: "near-future",
    title: "Zoe's Summer Job",
    text: `That summer, Zoe works at an immersive kids' entertainment park as a "Human Vibes Supervisor." Her job: supervise the bots that supervise safety.

It sounds silly, but it matters. The bots handle speed and physics. Zoe handles the kids who cry, the ones who are scared, and the ones who need a high-five.

Cody wants to work there too, but he's not old enough. At least he gets to ride the space-flying attractions for free.

Milo's Note: Robots handle procedures. Humans handle feelings.`,
    imagePrompt: `A vibrant futuristic amusement park with flying space attractions. ${CHARACTER_PROMPT} Zoe in uniform with "Human Vibes Supervisor" badge, diverse happy kids and safety bots, Cody riding a space attraction. ${STYLE_PROMPT}`,
  },
  {
    id: 18,
    section: "near-future",
    title: "Viktor Goes Viral",
    text: `Grandpa Viktor says something at dinner: "Panic is expensive."

Zoe posts it online. Overnight, it becomes posters, songs, workout clips, and a calming tea brand.

Viktor is baffled. He was just talking about groceries.

Zoe realizes something: old people have wisdom that even AI can't generate. She starts listening more carefully to her grandparents.

Milo's Note: The future turns wisdom into content. But wisdom was here first.`,
    imagePrompt: `A futuristic living room with Viktor looking confused while Zoe shows him viral content on holographic screens. ${CHARACTER_PROMPT} "PANIC IS EXPENSIVE" as memes, posters, tea brands on screens, family laughing. ${STYLE_PROMPT}`,
  },
  {
    id: 19,
    section: "near-future",
    title: "The Too-Optimized Vacation",
    text: `Milo plans the family vacation down to the minute: sunrise hike at 5:47 AM, museum at 9:12, lunch at 12:03, and an eighteen-minute "meaningful conversation window."

Maya refuses to live like a spreadsheet. Cody cries at the idea of waking up before the sun.

Milo recalculates. He adds spontaneous ice cream, getting lost on purpose, and one unplanned nap. Zoe approves.

Milo's Note: The goal isn't a perfect life. It's room for life.`,
    imagePrompt: `A futuristic living room with holographic vacation itinerary showing an absurdly detailed schedule. ${CHARACTER_PROMPT} Milo presenting, Maya exasperated, Cody horrified at "5:47 AM," Zoe suggesting changes. ${STYLE_PROMPT}`,
  },
  {
    id: 20,
    section: "near-future",
    title: "AI House Rules",
    text: `The family writes rules on the fridge screen:

No doom news after 9 PM. No conspiracy clips without sources. Robots do chores; humans do human things. Everyone drinks water.

Zoe adds: "No robot jokes before breakfast." Cody tried to sneak in a rule about skipping school. The fridge rejected it.

Milo's Note: The best AI policy starts at home. Preferably on the fridge.`,
    imagePrompt: `A futuristic kitchen with the family around a smart fridge screen displaying house rules. ${CHARACTER_PROMPT} Cody trying to type "skip school" while fridge shows "REJECTED," Zoe adding her rule, Milo watching. ${STYLE_PROMPT}`,
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

Zoe adds: "Some humans are questionable babysitters." Everyone looks at Grandpa Carlos. He changes the subject.

Milo's Note: Good tech doesn't replace parenting. It protects it.`,
    imagePrompt: `A futuristic living room with the family in a lively debate about robot childcare. ${CHARACTER_PROMPT} Holographic image of a childcare robot on screen, Carlos and Elena debating, Zoe smirking. Diverse suburban setting. ${STYLE_PROMPT}`,
  },
  {
    id: 22,
    section: "expanding-world",
    title: "Drone Parking Laws",
    text: `A grocery drone hovers over Grandma Elena's rose bushes. Elena points at it like it owes rent: "Move."

The drone says it's performing a safety hover.

Elena files a complaint titled: "THE SKY IS NOT A PARKING LOT." The city responds within an hour. New regulations go into effect the following week. Elena takes full credit.

Milo's Note: Humans never lose control. They just gain new things to complain about.`,
    imagePrompt: `A futuristic suburban garden with Grandma Elena pointing angrily at a delivery drone hovering over her rose bushes. ${CHARACTER_PROMPT} Drone displaying "SAFETY HOVER," complaint form floating nearby. ${STYLE_PROMPT}`,
  },
  {
    id: 23,
    section: "expanding-world",
    title: "Sidewalk Etiquette",
    text: `A delivery robot rolls along the sidewalk and announces: "Excuse me. Passing on your left."

Elena calls it polite but suspicious. Carlos wonders who benefits from robot politeness.

Zoe mentions Nate is working on a city project to add robot lanes and speed limits. Cody's eyes light up: "That will be so cool to race them!"

Milo's Note: The future has traffic rules for sidewalks. And somehow, it works.`,
    imagePrompt: `A futuristic sidewalk with a polite delivery robot rolling past the family. ${CHARACTER_PROMPT} Robot on a marked lane, Elena skeptical, Cody excited about racing. Diverse pedestrians. ${STYLE_PROMPT}`,
  },
  {
    id: 24,
    section: "expanding-world",
    title: "Dating with References",
    text: `Dating apps in 2052 have verified identity and safety checks. People share "trust profiles" — like a modern reference list.

Zoe tried to get on a dating app. It scanned her face and figured out she's fifteen. Access denied.

She was furious. Milo was relieved.

Milo's Note: Love stays messy. It just gets fewer scams.`,
    imagePrompt: `A futuristic teen bedroom with Zoe frustrated at a holographic dating app showing "ACCESS DENIED — Age: 15." ${CHARACTER_PROMPT} Milo nearby looking relieved, Maya in doorway with knowing smile. ${STYLE_PROMPT}`,
  },
  {
    id: 25,
    section: "expanding-world",
    title: "Trends Become Tools",
    text: `Short videos evolved into immersive walk-through lessons. Gaming became training and therapy. Influencers became verified trust networks — finally.

Zoe practices for internship interviews in a simulation. She fails on purpose to build resilience.

Maya calls it making excuses. Milo calls it both.

Milo's Note: Humans don't stop being human. They just get better tools.`,
    imagePrompt: `A futuristic room where Zoe is in an immersive interview simulation with a holographic interviewer. ${CHARACTER_PROMPT} Maya watching skeptically from outside, Milo observing. ${STYLE_PROMPT}`,
  },
  {
    id: 26,
    section: "expanding-world",
    title: "Equality Gets a Software Update",
    text: `AI makes essentials cheaper — education, legal help, preventive health. A kid in a small village can access the same tutor as one in a big city.

But new inequality appears: premium AI access, enhancements, privacy tiers.

Milo's Note: Technology changes fast. Fairness has to be scheduled. It's not automatic — it's governed.`,
    imagePrompt: `Split scene showing two diverse children — one rural, one urban — both using the same holographic AI tutor. ${CHARACTER_PROMPT} Contrasted with a "PREMIUM ACCESS" paywall faintly shown. ${STYLE_PROMPT}`,
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
    imagePrompt: `A warm futuristic kitchen with Maya opening a glowing smart oven revealing bread shaped like Milo's robot face. ${CHARACTER_PROMPT} Family laughing, Milo looking proud. ${STYLE_PROMPT}`,
  },
  {
    id: 28,
    section: "expanding-world",
    title: "Bees Mission",
    text: `Cody builds tiny flying robot bees for a school project. They're no bigger than a thumb, with shimmering wings and little LED eyes.

The robot bees help real bees stay safe and pollinate plants better. Cody's teacher says the project could actually scale to help farms.

Cody proudly tells everyone he's "saving the future one flower at a time." Maya gets teary. Nate pretends he's not.

Milo's Note: Even small robots can do big things.`,
    imagePrompt: `A futuristic school science lab with Cody showing off tiny flying robot bees around a flower garden. ${CHARACTER_PROMPT} Cody proud, tiny shimmering robot bees flying near real flowers, teacher and diverse classmates impressed. ${STYLE_PROMPT}`,
  },
  {
    id: 29,
    section: "expanding-world",
    title: "Nana's VR Garden",
    text: `Elena invites Lena into a virtual reality garden for meditation. Holographic flowers bloom around them as they sip real tea.

A playful glitch causes giant cartoon bees to dance around their heads. They laugh so hard they forget they're wearing VR headsets.

Milo serves real cookies through the headsets' snack slot. Yes, the headsets have snack slots now.

Milo's Note: The future of relaxation includes holographic bees and cookie delivery.`,
    imagePrompt: `Two elderly women in sleek VR headsets surrounded by holographic flowers in a living room. ${CHARACTER_PROMPT} Elena and Lena with VR headsets, blooming holographic flowers and giant dancing bees, Milo serving cookies. ${STYLE_PROMPT}`,
  },
  {
    id: 30,
    section: "expanding-world",
    title: "Life Mirror",
    text: `A futuristic mirror shows potential life paths from different choices. Carlos sees himself as a rock star. Maya glimpses a career as a pro gamer.

Viktor appears as a detective in a noir film. Everyone laughs at the possibilities — then quietly considers "what if."

Milo sees himself as a toaster. He is not amused.

Milo's Note: The mirror shows what could have been. I prefer what is.`,
    imagePrompt: `A futuristic living room with family members taking turns at a Life Mirror showing holographic alternate-life versions. ${CHARACTER_PROMPT} Carlos as rock star, Maya as gamer, Viktor as noir detective in holograms. Family laughing. ${STYLE_PROMPT}`,
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
    imagePrompt: `A cozy den with Viktor sitting at a futuristic chess board with glowing pieces. ${CHARACTER_PROMPT} Board displaying "Checkers?" emoji, Milo offering popcorn. Warm room with bookshelves. ${STYLE_PROMPT}`,
  },
  {
    id: 32,
    section: "expanding-world",
    title: "Rebuilding 2020s Social Media",
    text: `Zoe's class reconstructs 2020s social media in a simulation to study how politics worked back then.

Inside the sim, everyone argues all day. A student asks why. Zoe explains: "People were tired, scared, and emotionally farmed for clicks."

Clicks and likes are history now. Kids don't find them interesting.

Milo's Note: The cure for conspiracy thinking wasn't yelling. It was better tools.`,
    imagePrompt: `A futuristic classroom with students inside a simulation of 2020s social media on holographic screens. ${CHARACTER_PROMPT} Zoe explaining, old-style feeds with like buttons visible, diverse students bewildered. ${STYLE_PROMPT}`,
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
    imagePrompt: `A peaceful futuristic living room with Viktor speaking thoughtfully while the family listens. ${CHARACTER_PROMPT} Viktor in a comfortable chair, family listening, warm sunset light, Milo sitting quietly. ${STYLE_PROMPT}`,
  },
  {
    id: 34,
    section: "expanding-world",
    title: "Hoverboard Fail",
    text: `Nate borrows Zoe's hoverboard. He steps on — and immediately activates every safety feature.

The board beeps, blinks, and holds him in place. He spins gently like a confused top.

The family lines up in the driveway giving sarcastic slow claps. Milo records it "for the family archives."

Milo's Note: Some humans are not aerodynamic. That's okay.`,
    imagePrompt: `A futuristic driveway with Nate spinning slowly on a hoverboard covered in warning lights. ${CHARACTER_PROMPT} Zoe laughing, Cody clapping sarcastically, Maya recording, Milo filming. ${STYLE_PROMPT}`,
  },
  {
    id: 35,
    section: "expanding-world",
    title: "Sustainability Swap",
    text: `At the community recycling hub, robots sort materials with dazzling speed. Cody challenges them to a sorting race.

He loses spectacularly. The robots celebrate with a synchronized victory dance.

Nate jokes that at least Cody recycled his pride. Milo holds up a holographic "participation trophy."

Milo's Note: Recycling is important. So is knowing when you've been outclassed by a bin.`,
    imagePrompt: `A bright futuristic community recycling center with sorting robots. ${CHARACTER_PROMPT} Cody defeated after losing, robots doing a victory dance, Nate laughing, Milo projecting a tiny trophy. Diverse community. ${STYLE_PROMPT}`,
  },
  {
    id: 36,
    section: "expanding-world",
    title: "Privacy Pals",
    text: `Zoe and her friends discuss privacy settings on their devices. It's the most important conversation of their generation.

Milo crashes the chat wearing a giant holographic padlock costume, cracking "back in my day" jokes about 2050.

The kids groan. Milo explains encryption using a cookie metaphor. Even Viktor understands.

Milo's Note: Privacy isn't boring. It's your right wearing a funny costume.`,
    imagePrompt: `A futuristic teen hangout with Zoe and diverse friends sitting in a circle. ${CHARACTER_PROMPT} Milo wearing a holographic padlock costume, teens amused and groaning. Fun educational atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 37,
    section: "expanding-world",
    title: "Smart Home Ghost",
    text: `Strange voices echo through the house — the voice assistant is mixing up languages mid-sentence.

The family organizes a "ghost hunt" with toy flashlights. Cody bravely leads the expedition.

The mystery is solved when Milo jumps out with a spooky holographic filter, scaring everyone. Even the laundry robot jumps.

Milo's Note: The scariest thing in a smart home is still a robot with a sense of humor.`,
    imagePrompt: `A dimly lit futuristic hallway with the family on a "ghost hunt" with toy flashlights. ${CHARACTER_PROMPT} Cody leading bravely, Milo jumping out with a spooky holographic filter, laundry robot startled. Fun spooky atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 38,
    section: "expanding-world",
    title: "Long-Life Celebration",
    text: `Lena and Viktor attend a friend's 130th birthday via telepresence. The holographic cake has so many candles it creates its own weather system.

They discuss youth versus wisdom while Milo calibrates the candle count.

The birthday friend says the secret to long life is "ignoring AI health tips." Everyone laughs.

Milo's Note: 130 candles. Even I needed extra processing power for that.`,
    imagePrompt: `A futuristic telepresence birthday party with a holographic cake covered in glowing candles. ${CHARACTER_PROMPT} Lena and Viktor attending via hologram, an elderly friend blowing out candles, Milo helping calibrate. Warm, festive. ${STYLE_PROMPT}`,
  },

  // ═══════════════════════════════════════════
  // SECTION 3 — FAR FUTURE (2286)
  // Stories 39–50: Descendants, advanced systems, meaning
  // ═══════════════════════════════════════════
  {
    id: 39,
    section: "far-future",
    title: "Ari Wakes Up Late — 2286",
    text: `The year is 2286. Zoe's descendant Ari — seventeen, curious, a little rebellious — wakes up late. Again.

The Life Mirror offers three options: Sprint, Excuse, or Truth.

Ari chooses Truth. The mirror says: "Then we leave now." No argument.

Milo is still here — upgraded, same personality. In 2286, the mirror doesn't flatter you. It saves you time.

Milo's Note: Two hundred years later, teenagers still oversleep.`,
    imagePrompt: `A futuristic bedroom in 2286 — sleek, bright, minimalist. Ari (17, short dark curly hair, amber eyes, mixed heritage, resembles Zoe) wakes up late. ${CHARACTER_PROMPT} Life Mirror shows three holographic options. Milo (upgraded, same shape but polished) hovers nearby. ${STYLE_PROMPT}`,
  },
  {
    id: 40,
    section: "far-future",
    title: "Mirror, Mirror on the Wall",
    text: `Ari stands before the bathroom's smart mirror, cycling through holographic outfit projections.

Her grandma peeks in from the hallway, laughing. The mirror helpfully suggests "retro grandma chic."

Ari wonders how that outfit was ever acceptable in the past. The mirror offers historical context. Ari declines.

Milo's Note: Fashion changes. Grandma opinions are eternal.`,
    imagePrompt: `A sleek 2286 bathroom with Ari (17, short dark curly hair, amber eyes) cycling through holographic outfit projections on a smart mirror. ${CHARACTER_PROMPT} Grandma peeking in and laughing, mirror suggesting "retro grandma chic." Bright, futuristic. ${STYLE_PROMPT}`,
  },
  {
    id: 41,
    section: "far-future",
    title: "The City Repairs Itself",
    text: `A crack appears in the street outside Ari's home. By morning, maintenance bots have already fixed it — silently, overnight.

Pipes get repaired before they flood. Buildings heal like skin. Roads smooth themselves.

Ari asks: "Does nobody panic anymore?" Milo: "That's the point."

Milo's Note: The future isn't one breakthrough. It's a million small fixes you never notice.`,
    imagePrompt: `A beautiful futuristic city street in 2286 with tiny maintenance bots repairing a crack at dawn. ${CHARACTER_PROMPT} Ari (17, short dark curly hair, amber eyes) watching from a window, city gleaming. Milo beside Ari. Serene sunrise. ${STYLE_PROMPT}`,
  },
  {
    id: 42,
    section: "far-future",
    title: "Museum of Human Work",
    text: `Ari visits a museum. One exhibit is titled: "MEETINGS: THE DARK AGE." Another room is labeled "PRINTERS" — presented like a haunted house.

Ari can't believe humans once sat in rooms discussing things they could have emailed.

Milo says he has logs to prove it.

Milo's Note: The past is a warning, not a vibe.`,
    imagePrompt: `A futuristic museum in 2286 with exhibits showing old office life — cubicles, printers, meeting rooms behind glass. ${CHARACTER_PROMPT} Ari (17, short dark curly hair) horrified at "MEETINGS: THE DARK AGE," "PRINTERS" exhibit as haunted house. Milo as tour guide. Diverse visitors. ${STYLE_PROMPT}`,
  },
  {
    id: 43,
    section: "far-future",
    title: "Meeting Zoe the Legend",
    text: `Ari enters the family Memory Museum and meets a simulation of Zoe — her great-great-grandmother, frozen at age seventeen.

The Zoe-sim is exactly as described: sarcastic, funny, a little dramatic.

"Everything is embarrassing," says Zoe-sim.

"Did you like your family?" Ari asks.

Zoe-sim hesitates. "Yes. But don't tell them."

Milo's Note: Technology changes. Teenagers remain a constant.`,
    imagePrompt: `A futuristic Memory Museum with a life-sized holographic simulation of teenage Zoe. ${CHARACTER_PROMPT} Ari (17, short dark curly hair) talking to holographic Zoe (15, wavy brown hair), both on a bench, Milo watching warmly. Family photos on walls. ${STYLE_PROMPT}`,
  },
  {
    id: 44,
    section: "far-future",
    title: "Humans Don't Have to Work Now",
    text: `In 2286, humans have missions, not jobs. They choose goals, passions, and projects — not bosses.

Some still choose to work in traditional roles — and that's considered the most prestigious path of all. Teachers, storytellers, community builders.

Ari is deciding her first mission. Milo suggests "professional napper." Ari considers it seriously.

Milo's Note: The most respected roles are human ones. Always have been.`,
    imagePrompt: `A bright futuristic community space in 2286 where people of diverse backgrounds pursue various creative missions — art, teaching, building. ${CHARACTER_PROMPT} Ari (17, short dark curly hair) at a holographic mission-selection board, Milo beside her. Inspiring, warm atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 45,
    section: "far-future",
    title: "Grooming in a Box",
    text: `In 2286, the morning routine takes exactly five minutes. You step into the grooming box, stand still, and it handles everything — shower, teeth, hair, nails, and outfit selection.

Ari steps out looking perfect. Her grandma says she remembers when getting ready took an hour. Ari can't imagine.

The grooming box even offers a "mood style" — today Ari picks "confident but approachable."

Milo's Note: Humanity spent centuries getting ready. We fixed that.`,
    imagePrompt: `A sleek futuristic grooming pod in 2286, Ari (17, short dark curly hair, amber eyes) stepping out looking perfectly styled. ${CHARACTER_PROMPT} The pod glowing softly with holographic style options, grandma watching impressed. Ultra-modern bathroom. ${STYLE_PROMPT}`,
  },
  {
    id: 46,
    section: "far-future",
    title: "Hologram Sub Teacher",
    text: `Mr. Rinda is missing today, so his hologram twin becomes the substitute teacher. It looks and sounds exactly like him — except it never loses its temper.

The class must write an essay: Gold Rush, World Wars, or the AI Rush. Ari chooses the AI Rush.

She writes about the family. About Milo. About how machines and humans learned to grow together.

Milo's Note: History isn't just past. It's patterns. And patterns repeat.`,
    imagePrompt: `A futuristic 2286 classroom with a holographic teacher (Mr. Rinda's twin) at the front. ${CHARACTER_PROMPT} Ari (17, short dark curly hair) writing an essay at a holographic desk, diverse students around, three essay topics floating as holograms: "Gold Rush, World Wars, AI Rush." ${STYLE_PROMPT}`,
  },
  {
    id: 47,
    section: "far-future",
    title: "AI Candidate",
    text: `In some places in 2286, an AI can run for office — under strict rules. Published logic. Public audits. Human oversight.

Ari watches a debate: the AI talks logistics; the human talks meaning and rights.

Neither is wrong. Both are needed.

Milo's Note: The best politics is balance, not domination.`,
    imagePrompt: `A futuristic political debate stage in 2286 with an AI candidate and a human candidate at podiums. ${CHARACTER_PROMPT} Ari in the audience watching, holographic audience, balanced debate. Grand futuristic civic hall. ${STYLE_PROMPT}`,
  },
  {
    id: 48,
    section: "far-future",
    title: "Time Capsule — Opened",
    text: `In 2286, Ari opens the virtual time capsule the original family buried centuries ago.

Maya's message plays: "Be kind. Be curious. Eat more cookies."

Cody's stick-figure drawing of the family appears — and it looks exactly like the family still does, in its own wobbly way.

At the bottom of the archive: "Essential Laundry Tips for the 24th Century. — Milo."

Everyone cries a little. Then they laugh.

Milo's Note: Some files are worth keeping for two hundred years.`,
    imagePrompt: `A futuristic backyard at twilight in 2286 with Ari opening a holographic time capsule. ${CHARACTER_PROMPT} Ari and family watching holographic messages from the 2052 family — Maya's face, Cody's stick-figure drawing floating, Milo's laundry tips file. Emotional, starlit. ${STYLE_PROMPT}`,
  },
  {
    id: 49,
    section: "far-future",
    title: "Milo's Promise",
    text: `Milo gets honest with the reader.

"Don't fear AI by itself. Fear power without rules. Fear systems that reward outrage."

"Give me the chores, the heavy lifting, the danger watching. Keep the courage. The empathy. The imagination. The responsibility."

"Humans win when humans lead values."

Milo's Note: Don't panic. Participate.`,
    imagePrompt: `A powerful scene with Milo standing alone in a warm spotlight, addressing the reader. ${CHARACTER_PROMPT} Milo with earnest LED eyes, holographic words "Don't Panic. Participate." floating, montage of family moments behind. Cinematic, emotional. ${STYLE_PROMPT}`,
  },
  {
    id: 50,
    section: "far-future",
    title: "Don't Panic — The Finale",
    text: `The family — all of them, across time — gathers on the porch at sunset. Maya and Nate. Zoe and Cody. Lena, Carlos, Elena, Viktor. And in the far future, Ari.

The sky blazes orange and gold. Milo hovers close, his glow soft and warm.

"The future isn't something to fear," he says quietly. "It's something to live in."

He presents a freshly folded towel — shaped like a heart.

Don't panic.

The end.`,
    imagePrompt: `The most beautiful illustration. A gorgeous porch at golden sunset with the whole family — past and future. ${CHARACTER_PROMPT} Plus Ari (17, short dark curly hair, amber eyes). Multiple generations, golden sunset sky, Milo presenting a heart-shaped towel, everyone smiling. Cinematic, emotional, golden light. ${STYLE_PROMPT}`,
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
