// reasons[0..8]  -> the nine traits (these get shuffled each play)
// reasons[9]     -> "still 90% to reveal" closer
// reasons[10]    -> the fiancé tease (always last)
// Voice: second person — speaking directly to you, Olajumoke.
export const reasons = [
  {
    emoji: '🫂',
    title: 'Your hugs cure illnesses',
    g: "Your hugs are basically certified medicine. One squeeze and the bad day, the headache, the whole world's nonsense — gone. Pharmacies could never.",
    pg: "Your hugs should come with a warning label. One squeeze and my heart rate does something it is legally not allowed to do.",
    x: "Your hugs start innocent and end somewhere I really shouldn't put in writing. One squeeze, you against me, and 'just a hug' becomes the slowest, most dangerous idea in the room.",
  },
  {
    emoji: '✨',
    title: 'A smile that lights the room',
    g: "Your smile is the reason rooms don't need lightbulbs. You walk in, everything glows, and somehow everyone's day goes soft.",
    pg: "That smile of yours is a genuine problem. You flash it and I forget what I was saying, where I was standing, and most of the English language.",
    x: "That smile is foreplay. You catch your lip mid-grin and suddenly every plan I had that didn't involve being alone with you feels like a waste of a good evening.",
  },
  {
    emoji: '🌹',
    title: 'You smell like flowers',
    g: "You smell like an entire spring garden decided to follow you around. Honestly, it's unfair to actual flowers.",
    pg: "You smell so good it's distracting. I have lost entire sentences just from you walking past me.",
    x: "You smell like trouble I'd happily get into — warm skin, something floral, something that makes me lean in far too close and forget my own name. I'd follow that scent anywhere.",
  },
  {
    emoji: '👁️',
    title: 'Eyes that tear through space-time',
    g: "Your eyes are so pretty they probably bend a little light. Hold my gaze too long and I'll forget the question entirely.",
    pg: "Your eyes tear straight through space-time. One look and I'm in another galaxy wondering what just happened to me.",
    x: "You hold eye contact half a second too long and the whole room dissolves. Those eyes don't just look at me — they undress every decent thought I was trying to keep.",
  },
  {
    emoji: '👑',
    title: 'You run three businesses',
    g: "You run THREE businesses. Most people can't run one group chat. You're clearly on a software update the rest of us never got.",
    pg: "Three businesses. THREE. Competence like yours should be illegal — and it is absolutely doing something to me.",
    x: "You juggle three businesses without breaking a sweat, and there is nothing sexier than a woman who owns rooms for a living. That kind of power makes me want to be very, very well-behaved — or the opposite.",
  },
  {
    emoji: '🩺',
    title: 'An amazing doctor',
    g: "You're an actual doctor — the saving-lives, knows-exactly-what-that-is kind. We're simply not on the same level, and that's perfectly fine.",
    pg: "You're a doctor. A genuinely good one. I have definitely considered inventing a symptom or two just for a closer look.",
    x: "You're a brilliant doctor, which means you could save my life AND be the reason it needs saving. Take my breath away — then bring it back, professionally.",
  },
  {
    emoji: '🔥',
    title: 'Good vibe, "okay" dancer',
    g: "You're a certified good vibe and an… okay dancer (your words). The joy, though, is a clean eleven out of ten.",
    pg: "Immaculate vibes and a dancer that's… 'enthusiastic' (wink). I'd clear the entire floor for you anyway.",
    x: "Best vibe in any room, and 'okay dancer' is a lie you tell — because the way you move when you think no one's watching could end a man. Right song, low lights, and I forget every reason I was being respectable.",
  },
  {
    emoji: '🎧',
    title: 'A voice I could hear all day',
    g: "Your voice is so cute I'd happily listen to you read the terms and conditions — all of them, twice.",
    pg: "Your voice is criminally cute. You could read a grocery list and I'd hang on every syllable like it's a secret.",
    x: "Your voice low in my ear would absolutely ruin me. You could whisper complete nonsense and I'd hang on every word, all night, doing exactly as I'm told.",
  },
  {
    emoji: '💎',
    title: "Your mother's only daughter",
    g: "Fun fact: you're the ONLY biological daughter — everyone else was adopted in. Basically the original, limited-edition, one-of-one.",
    pg: "You're your mum's only daughter — the rest are adopted. One of one. No re-runs, no dupes, sold out everywhere.",
    x: "Only daughter, everyone else adopted in — you're the original they built a whole family around. Rare, exclusive, one-of-one… the kind of woman a man doesn't share and never forgets.",
  },
  {
    emoji: '🗝️',
    title: 'And this is only 3.14% of you',
    g: "And after all of that — this is maybe 3.14% of you. The other 96.86% is a beautiful mystery I'd love to keep reading.",
    pg: "Here's the catch: this is barely 3.14% of you. The other 96.86% is a mystery I would happily lose sleep trying to figure out.",
    x: "And the wild part? This is maybe 3.14% of you. There's a whole 96.86% you keep just out of reach — and the things I'd give to unwrap the rest of you, slowly, one layer at a time.",
  },
  {
    emoji: '😏',
    title: 'Oh… and the fiancé',
    g: "Oh — and there's a fiancé. Lucky, lucky man. He has no idea how good he's got it. 🙂",
    pg: "There's a fiancé, by the way. Lucky guy. Suspiciously lucky. If he ever slips up… well. Just saying. 😏",
    x: "And yeah… there's a fiancé. Lucky bastard — he gets all of this. Somewhere out here is a man who'd lose his mind, his manners, and a week of sleep just for one night of it. 😈",
  },
]

export const toneMeta = {
  g: { code: 'G', label: 'sweet & wholesome' },
  pg: { code: 'PG-13', label: 'a little spicy' },
  x: { code: '18+', label: 'no holding back' },
}

export const TONE_ORDER = ['g', 'pg', 'x']
