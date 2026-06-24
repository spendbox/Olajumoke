// reasons[0..8]  -> the nine traits (these get shuffled each play)
// reasons[9]     -> "still 90% to reveal" closer
// reasons[10]    -> the fiancé tease (always last)
export const reasons = [
  {
    emoji: '🫂',
    title: 'Her hugs cure illnesses',
    g: "Her hugs are basically certified medicine. One squeeze and the bad day, the headache, the whole world's nonsense — gone. Pharmacies could never.",
    pg: "Her hugs should come with a warning label. One squeeze and my heart rate does something it is legally not allowed to do.",
    x: "Her hugs start innocent and end somewhere I really shouldn't put in writing. One squeeze, her body against mine, and 'just a hug' becomes the slowest, most dangerous idea in the room.",
  },
  {
    emoji: '✨',
    title: 'A smile that lights the room',
    g: "Her smile is the reason rooms don't need lightbulbs. She walks in, everything glows, and somehow everyone's day goes soft.",
    pg: "That smile is a genuine problem. She flashes it and I forget what I was saying, where I was standing, and most of the English language.",
    x: "That smile is foreplay. She catches her lip mid-grin and suddenly every plan I had that didn't involve being alone with her feels like a waste of a good evening.",
  },
  {
    emoji: '🌹',
    title: 'She smells like flowers',
    g: "She smells like an entire spring garden decided to follow her around. Honestly, it's unfair to actual flowers.",
    pg: "She smells so good it's distracting. I have lost entire sentences just from her walking past me.",
    x: "She smells like trouble you'd happily get into — warm skin, something floral, something that makes you lean in far too close and forget your own name. I'd follow that scent anywhere.",
  },
  {
    emoji: '👁️',
    title: 'Eyes that tear through space-time',
    g: "Her eyes are so pretty they probably bend a little light. Hold the gaze too long and you'll forget the question entirely.",
    pg: "Her eyes tear straight through space-time. One look and I'm in another galaxy wondering what just happened to me.",
    x: "She holds eye contact half a second too long and the whole room dissolves. Those eyes don't just look at you — they undress every decent thought you were trying to keep.",
  },
  {
    emoji: '👑',
    title: 'She runs three businesses',
    g: "She runs THREE businesses. Most people can't run one group chat. She's clearly on a software update the rest of us never got.",
    pg: "Three businesses. THREE. Competence like that should be illegal — and it is absolutely doing something to me.",
    x: "She runs three businesses without breaking a sweat, and there is nothing sexier than a woman who owns rooms for a living. That kind of power makes me want to be very, very well-behaved — or the opposite.",
  },
  {
    emoji: '🩺',
    title: 'An amazing doctor',
    g: "She's an actual doctor — the saving-lives, knows-exactly-what-that-is kind. We're simply not on the same level, and that's perfectly fine.",
    pg: "She's a doctor. A good one. I have definitely considered inventing a symptom or two just for a closer look.",
    x: "She's a doctor, which means she knows precisely what to do with her hands and exactly how to make a pulse race. Check me over anytime, doc — I'll happily come down with something.",
  },
  {
    emoji: '🔥',
    title: 'Good vibe, "okay" dancer',
    g: "She's a certified good vibe and an… okay dancer (her words). The joy, though, is a clean eleven out of ten.",
    pg: "Immaculate vibes and a dancer that's… 'enthusiastic' (wink). I'd clear the entire floor for her anyway.",
    x: "The vibe is unmatched, and 'okay dancer' is a lie she tells — because the way she moves when she thinks no one's watching could end a man. Right song, low lights, and I forget every reason I was being respectable.",
  },
  {
    emoji: '🎧',
    title: 'A voice I could hear all day',
    g: "Her voice is so cute I'd happily listen to her read the terms and conditions — all of them, twice.",
    pg: "Her voice is criminally cute. She could read a grocery list and I'd hang on every syllable like it's a secret.",
    x: "Her voice low in my ear would absolutely ruin me. She could whisper complete nonsense and I'd hang on every word, all night, doing exactly as I'm told.",
  },
  {
    emoji: '💎',
    title: "Her mother's only daughter",
    g: "Fun fact: she's the ONLY biological daughter — everyone else was adopted in. Basically the original, limited-edition, one-of-one.",
    pg: "She's her mum's only daughter — the rest are adopted. One of one. No re-runs, no dupes, sold out everywhere.",
    x: "Only daughter, everyone else adopted in — she's the original they built a whole family around. Rare, exclusive, one-of-one… the kind of woman you don't share and never forget.",
  },
  {
    emoji: '🗝️',
    title: 'And this is only the 10%',
    g: "And after all of that — this is maybe 10% of her. The other 90% is a beautiful mystery I'd love to keep reading.",
    pg: "Here's the catch: this is barely 10% of her. The other 90% is a mystery I would happily lose sleep trying to figure out.",
    x: "And the wild part? This is maybe 10% of her. There's a whole 90% she keeps just out of reach — and the things I'd give to unwrap the rest of her, slowly, one layer at a time.",
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
