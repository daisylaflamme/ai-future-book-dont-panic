export interface Story {
  id: number;
  title: string;
  text: string;
  imagePrompt: string;
  imageUrl?: string;
}

export interface BookPage {
  type: 'cover' | 'title' | 'story' | 'back-cover';
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
};

const CHARACTER_PROMPT = `Characters (MUST be consistent): Mom Maya (40s, blonde mid-length hair, green eyes, warm smile), Dad Nate (40s, glasses, brown eyes, kind face), daughter Zoe (11, long wavy brown hair, light brown eyes), son Carlos-boy (9, light brown hair, blue eyes). Grandparents: Grandma Lena (70s, silver hair, warm), Grandpa Viktor (70s, distinguished, gentle), Grandma Elena (70s, elegant). Milo the AI companion: a friendly floating orb-shaped robot with expressive LED eyes, soft blue glow, about the size of a basketball.`;

const STYLE_PROMPT = `Style: warm cinematic lighting, slightly painterly digital illustration, rich warm color palette with amber/gold tones, cozy domestic futurism aesthetic, detailed backgrounds, expressive characters, Pixar-meets-Norman-Rockwell feel. High quality, consistent art style.`;

export const stories: Story[] = [
  {
    id: 1,
    title: "Wake-Up Call, 2052",
    text: "Maya pours coffee while Milo hums a sunrise playlist. Nate stumbles in, hair wild, asking who programmed the alarm to play whale sounds. Zoe shuffles past with her eyes half-closed, muttering about \"five more minutes.\" Carlos is already at the table, building a pancake tower. Milo cheerfully announces it's going to be a beautiful day — then accidentally sets off the sprinklers.",
    imagePrompt: `A warm futuristic kitchen bathed in golden morning light, 2052. ${CHARACTER_PROMPT} Scene: Maya pouring coffee from a sleek appliance, Nate with messy hair looking confused, Zoe half-asleep, Carlos stacking pancakes, Milo (glowing blue orb robot) hovering cheerfully. Cozy futuristic kitchen with holographic displays. ${STYLE_PROMPT}`,
  },
  {
    id: 2,
    title: "Mirror, Mirror on the Wall",
    text: "Zoe and Maya stand before the bathroom's smart mirror, cycling through holographic outfit projections. Maya accidentally gets dressed in Zoe's neon crop-top look and gasps. Lena peeks in from the hallway, laughing so hard she nearly drops her tea. The mirror helpfully suggests \"retro grandma chic\" for everyone.",
    imagePrompt: `A futuristic bathroom with a large smart mirror projecting holographic outfits onto Maya and Zoe. ${CHARACTER_PROMPT} Scene: Maya wearing a holographic neon teen outfit looking shocked, Zoe laughing, Grandma Lena peeking in from doorway amused. Mirror has a glowing UI. ${STYLE_PROMPT}`,
  },
  {
    id: 3,
    title: "Laundry Robot's Lament",
    text: "The crab-shaped laundry robot sighs dramatically as it untangles yet another knot of mismatched socks. Carlos watches, fascinated. Nate tries to help but only makes things worse. Milo hovers nearby, offering unsolicited commentary about a \"global sock conspiracy.\" The robot rolls its LED eyes.",
    imagePrompt: `A cozy futuristic living room with a small crab-shaped laundry robot surrounded by colorful clothes. ${CHARACTER_PROMPT} Scene: Carlos watching intently, Nate tangling socks, Milo floating nearby with a cheeky expression. The laundry robot has expressive LED eyes looking exasperated. Baskets of laundry around. ${STYLE_PROMPT}`,
  },
  {
    id: 4,
    title: "Tutor Trouble",
    text: "Zoe sits at the dining table while a holographic AI tutor projects math equations. She sneaks glances at her messaging device under the table. The tutor clears its throat: \"Should I notify your grandmother?\" Zoe's eyes go wide. Milo slides a cookie toward her as a peace offering.",
    imagePrompt: `A futuristic dining room with Zoe at a table, a holographic AI tutor projecting math problems in mid-air. ${CHARACTER_PROMPT} Scene: Zoe looking caught hiding a device under the table, holographic tutor looking stern, Milo sneaking a cookie toward Zoe. Nate and Maya exchanging knowing looks in background. ${STYLE_PROMPT}`,
  },
  {
    id: 5,
    title: "Preventative Check-Ups",
    text: "A compact medical bot gently scans each family member in their cozy home clinic corner. Viktor jokes that he has \"too many miles on this odometer.\" The bot suggests more walks and fewer cookies. Everyone laughs — except Milo, who quietly hides the cookie jar behind a cushion.",
    imagePrompt: `A warm corner of a futuristic home set up as a mini health station, soft ambient lights. ${CHARACTER_PROMPT} Scene: A small cute medical bot scanning Viktor who's joking, family gathered around smiling. Futuristic but cozy medical gadgets with soft glowing lights. Milo hiding cookies. ${STYLE_PROMPT}`,
  },
  {
    id: 6,
    title: "The Conspiracy Button",
    text: "Lena proudly presents a big red button she ordered online. She presses it — a silly alarm blares and holographic fact-checks replace the news headlines. The family cracks up when the button starts lecturing about flat Earth myths. Viktor asks if there's a button for \"common sense.\"",
    imagePrompt: `Family gathered around a dining table, Grandma Lena holding a big red comedic button. ${CHARACTER_PROMPT} Scene: Holographic headlines appearing with fact-check stamps, everyone laughing, Viktor looking bemused. Warm dining room with futuristic elements. The button glows red comically. ${STYLE_PROMPT}`,
  },
  {
    id: 7,
    title: "Politics vs. Drama",
    text: "A living-room debate erupts: political livestream or reality show? Milo proposes a split-screen compromise, and suddenly a politician appears to be competing on a cooking show. The mashup is so absurd that everyone forgets what they were arguing about. Carlos votes for cartoons instead.",
    imagePrompt: `A futuristic living room with a large holographic screen split in half — one side politics, one side cooking show, hilariously merged. ${CHARACTER_PROMPT} Scene: Family on couches looking bewildered and laughing, Milo proudly presenting the split screen. Carlos raising hand for cartoons. ${STYLE_PROMPT}`,
  },
  {
    id: 8,
    title: "Smart Fridge Saga",
    text: "The smart fridge locks its door and displays a climate trivia question. \"What percentage of ice caps melted between 2020 and 2040?\" Zoe tries to secretly search the answer. The fridge catches her: \"Nice try, Zoe.\" Milo facepalms. Nate finally gets it right and earns a yogurt.",
    imagePrompt: `A futuristic kitchen with a glowing smart fridge displaying a trivia question on its screen. ${CHARACTER_PROMPT} Scene: Zoe trying to hide a device while searching, the fridge display showing "CAUGHT!" with a stern emoji, Milo facepalming, Nate thinking hard. ${STYLE_PROMPT}`,
  },
  {
    id: 9,
    title: "Robot Pet Day",
    text: "The family takes a neighborhood stroll with Milo and the laundry robot. Kids glide on hover-skates while a delivery drone waves overhead. Zoe teaches Milo to fetch sticks — Milo dutifully retrieves them, then fetches an entire tree branch. The neighbors applaud.",
    imagePrompt: `A sunny futuristic neighborhood sidewalk scene. ${CHARACTER_PROMPT} Scene: Family walking, kids on hover-skates, Milo carrying an absurdly large tree branch, the crab laundry robot waddling along, a friendly drone overhead. Bright, warm outdoor scene with futuristic houses. ${STYLE_PROMPT}`,
  },
  {
    id: 10,
    title: "AI Pet Trainer",
    text: "Milo uses a training app to teach the family cat new tricks. The cat, unimpressed, teaches Milo to fetch instead. Carlos cheers as Milo obediently brings back a toy mouse. Maya records the whole thing, unable to stop laughing. The cat sits smugly on the couch.",
    imagePrompt: `A cozy futuristic living room with a smug orange cat on a couch. ${CHARACTER_PROMPT} Scene: Milo the robot obediently fetching a toy mouse while the cat watches smugly, Carlos cheering, Maya recording with laughter. Warm living room with futuristic elements. ${STYLE_PROMPT}`,
  },
  {
    id: 11,
    title: "Nana's VR Garden",
    text: "Elena invites Lena into a virtual reality garden for meditation. Holographic flowers bloom around them as they sip tea. A playful glitch causes giant cartoon bees to dance around their heads. They laugh so hard they forget they're still wearing VR headsets. Milo serves real cookies.",
    imagePrompt: `Two elderly women in VR headsets surrounded by beautiful holographic flowers in a living room. ${CHARACTER_PROMPT} Scene: Elena and Lena sitting with VR headsets, surrounded by blooming holographic flowers and giant dancing cartoon bees. Tea cups nearby, Milo offering cookies. Magical atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 12,
    title: "Remote Work Woes",
    text: "Nate's holographic coworker materializes at the kitchen table, complaining about a glitching virtual office background that turned into a cartoon jungle. Zoe photobombs the meeting with bunny ears. The coworker doesn't notice because a holographic parrot just landed on his shoulder.",
    imagePrompt: `A futuristic kitchen with a holographic projection of a coworker at the table, his background glitching into a cartoon jungle. ${CHARACTER_PROMPT} Scene: Nate looking embarrassed, Zoe making bunny ears behind the hologram, a holographic parrot on the coworker's shoulder. ${STYLE_PROMPT}`,
  },
  {
    id: 13,
    title: "Smart Oven Surprise",
    text: "Maya programs the smart oven to bake bread. The oven politely requests a playlist and challenges Milo to a pun battle. \"I'm on a roll,\" says the oven. \"That's half-baked,\" Milo fires back. The bread emerges perfectly — shaped like Milo's face. Everyone agrees it's his best look.",
    imagePrompt: `A warm futuristic kitchen with a glowing smart oven displaying a cheerful face on its screen. ${CHARACTER_PROMPT} Scene: Maya opening the oven revealing bread shaped like Milo's robot face, family laughing, Milo looking proud. Warm baking atmosphere with golden light. ${STYLE_PROMPT}`,
  },
  {
    id: 14,
    title: "Library Drone Mishap",
    text: "Zoe orders a math textbook via drone delivery. The drone arrives carrying a dramatic romance novel instead. The family teases her mercilessly. Zoe turns crimson while Carlos reads the back cover aloud in a soap-opera voice. Milo quietly reorders the correct book.",
    imagePrompt: `A futuristic home entrance with a small delivery drone hovering, holding a book. ${CHARACTER_PROMPT} Scene: Zoe blushing while holding a romance novel, Carlos reading dramatically from the back cover, family laughing in background, the drone hovering sheepishly. ${STYLE_PROMPT}`,
  },
  {
    id: 15,
    title: "Grandpa's AI Chess",
    text: "Viktor challenges the AI chess set and intentionally loses to see if the AI gloats. Instead, the AI humbly offers a rematch and suggests switching to checkers \"for variety.\" Viktor grumbles that even the chess set has better manners than his grandchildren. Milo offers popcorn.",
    imagePrompt: `A cozy den with warm lighting, Viktor sitting at a futuristic chess board with glowing pieces. ${CHARACTER_PROMPT} Scene: Viktor looking grumbly-amused at the chess board which displays a humble emoji, Milo offering a bowl of popcorn. Cozy wood-paneled room with bookshelves. ${STYLE_PROMPT}`,
  },
  {
    id: 16,
    title: "Sustainability Swap",
    text: "At the community recycling hub, robots sort materials with dazzling speed. Carlos challenges them to a sorting race and loses spectacularly. The robots celebrate with a synchronized victory dance. Nate jokes that at least Carlos recycled his pride. Milo holds up a \"participation trophy\" hologram.",
    imagePrompt: `A bright futuristic community recycling center with efficient sorting robots on conveyor belts. ${CHARACTER_PROMPT} Scene: Carlos looking defeated after losing a sorting race, robots doing a victory dance, Nate laughing, Milo projecting a tiny holographic trophy. Colorful bins and conveyor belts. ${STYLE_PROMPT}`,
  },
  {
    id: 17,
    title: "Privacy Pals",
    text: "Zoe and friends discuss privacy settings on their social implants. Milo crashes the conversation wearing a giant holographic padlock costume, cracking \"back in my day\" jokes about 2050. The kids groan. Milo explains encryption using a cookie metaphor. Even Viktor understands.",
    imagePrompt: `A futuristic teen hangout space with Zoe and friends sitting in a circle. ${CHARACTER_PROMPT} Scene: Milo wearing a comedic holographic padlock costume, teens looking amused/groaning, holographic privacy shields visible. Fun, educational atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 18,
    title: "Vacation Voting",
    text: "The family uses an AI to vote on vacation destinations. Holographic previews appear: beach, mountains, Mars. Chaos erupts when Milo votes for the \"International Museum of Laundry.\" Nobody can tell if he's serious. They compromise on the beach — Milo packs extra socks.",
    imagePrompt: `A futuristic living room with multiple holographic vacation destinations floating in the air — a tropical beach, snowy mountains, and Mars landscape. ${CHARACTER_PROMPT} Scene: Family pointing excitedly at different holograms, Milo proudly displaying a "Laundry Museum" hologram. Colorful, magical atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 19,
    title: "Healthy Habits Game",
    text: "A gamified health app turns wellness into a family competition. Carlos and Elena do exaggerated yoga poses while Milo tallies points. Elena wins by doing a headstand she learned in 2025. Carlos demands a recount. Milo awards bonus points for \"dramatic flair.\"",
    imagePrompt: `A bright futuristic living room with family members doing yoga poses. ${CHARACTER_PROMPT} Scene: Carlos and Grandma Elena in exaggerated yoga poses, Milo tallying points on a holographic scoreboard, family cheering. Bright, colorful health app interface visible. ${STYLE_PROMPT}`,
  },
  {
    id: 20,
    title: "Neighborly Drones",
    text: "Maya overhears delivery drones gossiping outside the window. \"Package 47B says the Johnsons ordered another waffle maker.\" \"Third one this month!\" Maya laughs so hard she spills her tea. Milo insists drone gossip is \"technically data exchange.\"",
    imagePrompt: `View through a futuristic window showing delivery drones hovering outside, appearing to chat with each other. ${CHARACTER_PROMPT} Scene: Maya at the window laughing with tea, drones with speech-bubble-like LED displays, Milo hovering nearby looking innocent. Suburban futuristic neighborhood visible. ${STYLE_PROMPT}`,
  },
  {
    id: 21,
    title: "Dinner by Algorithm",
    text: "The family lets AI plan dinner based on past meals. It suggests \"Kimchi-Waffle-Curry Fusion Surprise.\" Maya vetoes it for Grandma Elena's classic lasagna recipe. The AI sends an elaborate apology message with a tiny holographic white flag. Elena takes a bow.",
    imagePrompt: `A warm futuristic kitchen with a holographic display showing an absurd fusion dish recipe. ${CHARACTER_PROMPT} Scene: Maya looking appalled at the holographic recipe, Elena standing proudly with a lasagna, the AI display showing a white flag emoji. Warm kitchen atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 22,
    title: "Laundry Robot's Day Off",
    text: "Milo convinces the laundry robot to take a spa day at the robo-repair center. The family must fold clothes manually. Fitted sheets defeat everyone. Nate ends up wrapped in one like a burrito. When the robot returns, gleaming, it folds everything in thirty seconds flat.",
    imagePrompt: `A futuristic living room with the family struggling to fold laundry without the robot. ${CHARACTER_PROMPT} Scene: Nate tangled in a fitted sheet like a burrito, family laughing and struggling with clothes, Milo watching amusedly. Piles of unfolded laundry everywhere. ${STYLE_PROMPT}`,
  },
  {
    id: 23,
    title: "Teen Teleportation",
    text: "Zoe tries a new teleportation booth for school. It accidentally sends her to Grandma Elena's kitchen across town. The booth apologizes in seven languages before settling on \"Oopsie.\" Zoe eats breakfast twice. Elena is delighted by the surprise visit.",
    imagePrompt: `A futuristic foyer with a glowing teleportation booth, and a cozy kitchen visible through a portal. ${CHARACTER_PROMPT} Scene: Zoe stepping out of a glowing booth into Elena's kitchen looking surprised, Elena delighted and offering food, the booth displaying "OOPSIE" on its screen. ${STYLE_PROMPT}`,
  },
  {
    id: 24,
    title: "Cooking Class Across Time",
    text: "Elena hosts a virtual cooking class with AI-reconstructed ancestors from 2020. They argue passionately about spice amounts across a century of culinary evolution. The 2020 ancestor insists on \"a pinch\" while Elena measures with molecular precision. Milo takes notes for his cookbook.",
    imagePrompt: `A futuristic kitchen island with Elena cooking alongside holographic figures from 2020 era. ${CHARACTER_PROMPT} Scene: Elena in a futuristic kitchen with holographic people in 2020s clothing arguing about spices, Milo taking notes on a holographic notepad. Time-blend atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 25,
    title: "Smart Mirror Memories",
    text: "The bathroom mirror plays a montage of past family mornings — Carlos's first day of school, Zoe's braces reveal, Nate's spectacular coffee spill of 2049. Laughter turns to happy tears. Milo offers digital tissues that project comforting kitten holograms.",
    imagePrompt: `A futuristic bathroom with a large smart mirror displaying a warm montage of family memories as holographic images. ${CHARACTER_PROMPT} Scene: Family gathered around the mirror, some laughing and some teary-eyed, Milo offering holographic tissues. Gentle warm lighting, sentimental mood. ${STYLE_PROMPT}`,
  },
  {
    id: 26,
    title: "Hoverboard Fail",
    text: "Nate borrows Zoe's hoverboard and immediately activates every safety feature. He spins gently in place like a confused top while the board beeps warnings. The family lines up in the driveway, giving sarcastic slow claps. Milo records it for \"family archives.\"",
    imagePrompt: `A futuristic driveway with Nate spinning slowly on a hoverboard that's covered in warning lights. ${CHARACTER_PROMPT} Scene: Nate looking dizzy on a glowing hoverboard, family lined up clapping sarcastically, Zoe covering her face, Milo recording. Sunny outdoor suburban setting. ${STYLE_PROMPT}`,
  },
  {
    id: 27,
    title: "Media Literacy Party",
    text: "Milo hosts game night where players spot deepfakes versus real clips. Lena wins three rounds in a row with grandmother's intuition. Zoe accuses her of cheating. Viktor says wisdom comes with age. Milo awards Lena a holographic \"Queen of Truth\" crown.",
    imagePrompt: `A cozy futuristic living room set up for game night with screens showing various video clips. ${CHARACTER_PROMPT} Scene: Lena wearing a holographic crown looking triumphant, Zoe pouting, Viktor smug, screens showing deepfake comparisons. Milo hosting with a game-show pose. ${STYLE_PROMPT}`,
  },
  {
    id: 28,
    title: "Election Simulation",
    text: "The family runs for \"Mayor of the House.\" Each candidate promises chores and fun activities. Milo moderates like a talk-show host with dramatic music cues. Carlos wins by promising dessert Tuesdays. His first act: declaring the laundry robot gets weekends off.",
    imagePrompt: `A futuristic living room transformed into a mini election stage with podiums and holographic campaign posters. ${CHARACTER_PROMPT} Scene: Carlos at a podium looking triumphant, family as candidates with funny campaign signs, Milo as a flashy talk-show host moderator. Festive campaign atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 29,
    title: "Companion Mind Chat",
    text: "Zoe chats with an AI projection of her future self from 2286. Future-Zoe teases her about still living at home and having terrible taste in music. Present-Zoe is horrified to learn she becomes a morning person. They bond over their shared dislike of math homework.",
    imagePrompt: `A futuristic bedroom with two versions of Zoe sitting on a holographic sofa — one young (11), one older and futuristic-looking. ${CHARACTER_PROMPT} Scene: Young Zoe looking horrified while future-Zoe laughs, holographic connection between them, cozy bedroom with futuristic tech. Thoughtful yet humorous mood. ${STYLE_PROMPT}`,
  },
  {
    id: 30,
    title: "Smart Home Ghost",
    text: "Strange voices echo through the house — the voice assistant is mixing up languages mid-sentence. The family organizes a \"ghost hunt\" with toy flashlights. Carlos bravely leads the expedition. The mystery is solved when Milo jumps out with a spooky filter, scaring everyone. Even the laundry robot jumps.",
    imagePrompt: `A dimly lit futuristic home hallway with the family creeping along with toy flashlights. ${CHARACTER_PROMPT} Scene: Carlos leading bravely with a flashlight, family behind looking nervous, Milo about to jump-scare them with a spooky holographic ghost filter. Fun spooky atmosphere with colorful flashlight beams. ${STYLE_PROMPT}`,
  },
  {
    id: 31,
    title: "Infrastructure Bots",
    text: "On a city outing, the family watches road-repair robots working with balletic precision. Not a single lane is blocked. Nate sighs wistfully: \"I actually miss potholes.\" Carlos asks what a pothole is. Milo pulls up a historical documentary. Everyone is horrified.",
    imagePrompt: `A futuristic city street with elegant road-repair robots working seamlessly while traffic flows. ${CHARACTER_PROMPT} Scene: Family watching from a sidewalk café, Nate looking nostalgic, Carlos confused, Milo showing a holographic image of an old pothole. Bright futuristic cityscape. ${STYLE_PROMPT}`,
  },
  {
    id: 32,
    title: "Life Mirror",
    text: "A futuristic mirror shows potential life paths from different choices. Carlos sees himself as a rock star. Maya glimpses a career as a pro gamer. Viktor appears as a detective in a noir film. Everyone laughs at the possibilities — then quietly considers \"what if.\" Milo sees himself as a toaster.",
    imagePrompt: `A futuristic room with a large ornate mirror showing alternate reality reflections of family members. ${CHARACTER_PROMPT} Scene: Carlos reflected as a rock star, Maya as a gamer, Viktor as a noir detective, Milo's reflection as a toaster. Family looking amazed and amused. Magical mirror with swirling edges. ${STYLE_PROMPT}`,
  },
  {
    id: 33,
    title: "Long-Life Celebration",
    text: "Lena and Viktor attend a friend's 130th birthday via telepresence. The holographic cake has so many candles it creates its own weather system. They discuss youth versus wisdom while Milo calibrates the candle count. The birthday friend says the secret to long life is \"ignoring AI health tips.\"",
    imagePrompt: `A warm telepresence birthday party scene with holographic guests and an enormous cake with hundreds of candles. ${CHARACTER_PROMPT} Scene: Lena and Viktor at home with holographic party around them, an absurdly large cake with glowing candles, Milo trying to count them. Festive warm atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 34,
    title: "Mission, Not Job",
    text: "Zoe complains about \"missions\" replacing traditional jobs. Her current assignment: save the local bee population. Milo appears in a full beekeeper suit (holographic, of course). The bees seem more interested in Milo than the flowers. Zoe takes notes while trying not to laugh.",
    imagePrompt: `A sunny futuristic garden with bee hives and wildflowers. ${CHARACTER_PROMPT} Scene: Zoe taking notes while laughing, Milo in a holographic beekeeper suit surrounded by curious bees, futuristic garden with high-tech bee hives. Bright, nature-meets-technology atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 35,
    title: "Privacy & Trust Currency",
    text: "The family discusses TrustCoin — a new system where honesty earns credits. Carlos tries to earn coins by confessing to hiding cookies. Milo keeps a running tally on a holographic ledger. Maya points out Carlos only confessed because the fridge already told on him.",
    imagePrompt: `A futuristic living room with a holographic ledger showing TrustCoin tallies for each family member. ${CHARACTER_PROMPT} Scene: Carlos looking sheepish confessing about cookies, Milo displaying a holographic ledger, Maya pointing accusingly, the smart fridge visible in background with a smug display. ${STYLE_PROMPT}`,
  },
  {
    id: 36,
    title: "School in Simulation",
    text: "Zoe attends class in a realistic simulation of ancient Rome. Milo, disguised in a holographic toga, acts as tour guide. He gets stuck in Latin mode mid-sentence: \"As you can see, the forum est magnificus — error, error.\" The other students think it's part of the lesson.",
    imagePrompt: `A vivid simulation of ancient Rome with futuristic students walking through the forum. ${CHARACTER_PROMPT} Scene: Zoe in the simulation with other students, Milo wearing a holographic toga looking glitchy, Roman architecture all around, a mix of ancient and futuristic elements. ${STYLE_PROMPT}`,
  },
  {
    id: 37,
    title: "Grandmas Go Galactic",
    text: "Elena and Lena take a seniors' space tour for fun. They float in zero gravity while gossiping about grandchildren. Milo appears on the shuttle's screen reminding them to hydrate. Elena does a somersault and sticks the landing. Lena gives it a 9.5 — \"would've been a ten without the hiccup.\"",
    imagePrompt: `Interior of a sleek space shuttle with two elderly women floating in zero gravity. ${CHARACTER_PROMPT} Scene: Elena doing a somersault in zero-g, Lena floating while holding a score card showing "9.5", Milo on a shuttle screen saying "HYDRATE!", Earth visible through the window. Fun and whimsical. ${STYLE_PROMPT}`,
  },
  {
    id: 38,
    title: "Holographic Family Reunion",
    text: "The family hosts a reunion with life-sized holograms of relatives from around the globe. Multiple time zones cause hilarious delays — hugs arrive three seconds late. Uncle from Tokyo accidentally projects into the bathroom. Milo manages the chaos with the composure of an air traffic controller.",
    imagePrompt: `A futuristic living room filled with life-sized holographic projections of diverse family members from around the world. ${CHARACTER_PROMPT} Scene: Family trying to hug holograms that are slightly out of sync, multiple holographic figures, Milo coordinating with an air-traffic-controller headset. Warm, chaotic, joyful scene. ${STYLE_PROMPT}`,
  },
  {
    id: 39,
    title: "Weather on Demand",
    text: "Zoe hacks the backyard climate dome to make it snow in July. An impromptu snowball fight breaks out. Carlos builds a snow fort. Nate takes a snowball to the face and declares it \"refreshing.\" Milo constructs a tiny snowbot that immediately challenges the laundry robot to a duel.",
    imagePrompt: `A futuristic backyard dome filled with snow in summer, family having a snowball fight. ${CHARACTER_PROMPT} Scene: Zoe looking mischievous, Carlos behind a snow fort, Nate with snow on his face, Milo building a tiny snowman-robot. Green garden visible through the dome. Fun winter-in-summer atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 40,
    title: "Simulation Politics",
    text: "The family joins a virtual town hall where avatars debate local policies. Zoe's avatar accidentally morphs into a llama, and she can't figure out how to change it back. She delivers an impassioned speech about park funding — as a llama. It gets a standing ovation.",
    imagePrompt: `A virtual auditorium with avatar figures debating, one avatar is a llama at a podium. ${CHARACTER_PROMPT} Scene: A llama avatar (Zoe) at a podium giving a speech, other avatars applauding, family watching their screens laughing. Virtual town hall with holographic elements. ${STYLE_PROMPT}`,
  },
  {
    id: 41,
    title: "AI Storytime",
    text: "Milo reads bedtime stories that adapt to Lena's interjections. \"Once upon a time, a princess—\" \"Make her a pirate!\" \"A pirate princess sailed—\" \"With laundry robots!\" \"...with laundry robots in SPACE.\" The story spirals wonderfully. Carlos falls asleep smiling.",
    imagePrompt: `A cozy futuristic bedroom with warm nightlight glow. ${CHARACTER_PROMPT} Scene: Milo hovering as storyteller projecting a wild holographic story of a pirate princess with laundry robots in space, Lena interjecting excitedly, Carlos falling asleep with a smile. Warm, dreamy bedtime atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 42,
    title: "Robotic Orchestra",
    text: "The family attends a concert performed by robots playing classical instruments. The music is flawless until Milo sneaks on stage to conduct. He speeds up the tempo dramatically. The cellist robot gives him a look that transcends artificial intelligence. Standing ovation anyway.",
    imagePrompt: `A grand futuristic concert hall with robot musicians playing classical instruments on stage. ${CHARACTER_PROMPT} Scene: Milo on stage conducting wildly with a baton, robot musicians looking alarmed, family in the audience cheering. Elegant concert hall with futuristic lighting. ${STYLE_PROMPT}`,
  },
  {
    id: 43,
    title: "Holiday Traditions Remix",
    text: "The AI suggests modern holiday twists: holographic fireworks indoors, drone-delivered stockings, algorithm-optimized gift exchanges. Lena and Viktor insist on real candles and hand-wrapped presents. They compromise: real candles with holographic butterflies. Even Milo admits it's magical.",
    imagePrompt: `A cozy futuristic living room decorated for holidays, blending old and new traditions. ${CHARACTER_PROMPT} Scene: Real candles on a mantle with holographic butterflies floating around them, Lena and Viktor looking satisfied, modern and traditional decorations mixed. Warm, magical holiday atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 44,
    title: "Pet Clone?",
    text: "Zoe considers a bio-engineered pet. The family debates whether her virtual pet \"Milo 2.0\" counts as a sibling. Milo is flattered and terrified in equal measure. Carlos suggests they get a real dog that the laundry robot can walk. The robot immediately files a complaint.",
    imagePrompt: `A futuristic living room with a cute holographic digital puppy bouncing around. ${CHARACTER_PROMPT} Scene: Zoe cooing at a tiny holographic puppy, Milo looking at it nervously like a sibling rival, Carlos petting a real cat, the laundry robot holding a tiny protest sign. ${STYLE_PROMPT}`,
  },
  {
    id: 45,
    title: "Neighborhood Co-Op",
    text: "At the community garden managed by AI scheduling, everyone tries to claim credit for the best tomatoes. The AI diplomatically attributes success to \"collective effort and optimal soil pH.\" Elena knows the truth: she's been sneaking in her secret fertilizer. Milo has photographic evidence.",
    imagePrompt: `A beautiful futuristic community garden with high-tech planters and AI monitoring systems. ${CHARACTER_PROMPT} Scene: Family and neighbors admiring giant tomatoes, Elena looking suspicious with a hidden fertilizer bottle, Milo projecting a photo of Elena sneaking into the garden at night. Bright, lush garden. ${STYLE_PROMPT}`,
  },
  {
    id: 46,
    title: "Time Capsule 2286",
    text: "The family buries a virtual time capsule in the backyard, uploading messages for descendants in 2286. Everyone records heartfelt wishes. Milo sneaks in a file titled \"Essential Laundry Tips for the 24th Century.\" Carlos adds a drawing of the family — stick figures, because some things never change.",
    imagePrompt: `A nighttime backyard scene with the family gathered around a glowing holographic time capsule being "buried" digitally. ${CHARACTER_PROMPT} Scene: Family members recording messages into a floating holographic capsule, stars above, Milo sneaking in his own file, Carlos holding up a stick-figure drawing. Warm nighttime atmosphere with fireflies. ${STYLE_PROMPT}`,
  },
  {
    id: 47,
    title: "Museum of Obsolete Tech",
    text: "At the museum, the family encounters smartphones behind glass like ancient artifacts. Elena reminisces about 2020 with misty eyes. Zoe is horrified by the concept of \"buffering.\" Carlos asks if people really \"swiped\" things with their fingers. Milo pretends to buffer for comedic effect.",
    imagePrompt: `A futuristic museum interior with old technology (smartphones, laptops, earbuds) displayed in glass cases like ancient artifacts. ${CHARACTER_PROMPT} Scene: Family peering at exhibits, Elena nostalgic, Zoe horrified at a "buffering" display, Carlos poking at a touchscreen exhibit, Milo pretending to freeze/buffer. Museum with elegant lighting. ${STYLE_PROMPT}`,
  },
  {
    id: 48,
    title: "Robot Rights Rally",
    text: "Milo attends a robot rights rally and delivers a speech about equal access to oil baths and software updates. The family shows up with homemade signs. Carlos's sign reads: \"Robots Are People Too (Sort Of).\" The laundry robot holds a sign about sock equality. The crowd goes wild.",
    imagePrompt: `A futuristic city square with a robot rights rally, diverse robots and humans marching together. ${CHARACTER_PROMPT} Scene: Milo at a podium giving a speech, family holding supportive signs, the laundry robot with a "Sock Equality" sign, diverse crowd of robots and humans. Uplifting, colorful rally atmosphere. ${STYLE_PROMPT}`,
  },
  {
    id: 49,
    title: "Design Your World",
    text: "The home's walls transform into canvases for family art. Maya paints impressionist flowers. Nate attempts abstract art that looks like a sneeze. Zoe creates anime characters. Carlos draws dinosaurs fighting robots. Milo draws perfectly rendered circuit boards. The living room becomes a gallery opening.",
    imagePrompt: `A futuristic living room with walls covered in different art styles projected by each family member. ${CHARACTER_PROMPT} Scene: Maya painting flowers on a wall, Nate with abstract splatters, Zoe with anime, Carlos with dinosaurs vs robots, Milo drawing circuits. The room is a colorful explosion of creativity. ${STYLE_PROMPT}`,
  },
  {
    id: 50,
    title: "Don't Panic — The Finale",
    text: "The family gathers on the porch at sunset, reflecting on their journey from 2052 onward. The sky blazes orange and gold. Milo hovers close, his glow soft and warm. \"The future isn't something to fear,\" he says quietly. \"It's something to live in. Don't panic.\" He presents a freshly folded towel — shaped like a heart. Everyone smiles. The end.",
    imagePrompt: `A beautiful porch scene at golden sunset with the whole family gathered together looking at the horizon. ${CHARACTER_PROMPT} Scene: Family sitting and standing on a futuristic porch, golden sunset sky, Milo hovering warmly presenting a heart-shaped folded towel, everyone smiling peacefully. Emotional, cinematic, warm golden light. The most beautiful illustration in the book. ${STYLE_PROMPT}`,
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
