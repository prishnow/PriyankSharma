export type NoteCategory = "ai" | "leadership" | "design" | "career" | "life";

export interface NoteSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface Note {
  slug: string;
  title: string;
  cat: NoteCategory;
  catLabel: string;
  views: number;
  tip?: string;
  date: string;      // YYYY-MM-DD (sort key)
  readTime: string;  // e.g. "6 min"
  excerpt: string;
  body: NoteSection[];
}

// Notes are listed newest first. Home page takes the first N.
export const notes: Note[] = [
  {
    slug: "ai-as-mirror",
    title: "AI is a mirror, not a genie",
    cat: "ai", catLabel: "AI Experiments",
    views: 5530, tip: "Through the roof",
    date: "2026-04-15", readTime: "6 min",
    excerpt: "Every time a PM asks me to 'add AI' I ask what behavior we're reflecting back at the user. Most answers involve a magic wand. Most good answers involve a mirror.",
    body: [
      { id: "the-wish", heading: "The wish", paragraphs: [
        "A PM walks up with a Jira ticket titled 'Add AI'. What they mean, most of the time, is: make this thing feel smarter. What they hope for is a small deity that lives inside the product and just knows.",
        "That's not the offer. The offer is a mirror — something that reflects your intent back at you, faster and sometimes more articulately than you could alone. The design question is what you choose to reflect.",
      ]},
      { id: "the-mirror", heading: "The mirror", paragraphs: [
        "A mirror is useful because it's honest about what's in front of it. LLMs are the same: they reflect the quality of the prompt, the data, the context. Garbage in, a confidently-written paragraph of garbage out.",
        "The design job is picking what to mirror — which part of the user's intent deserves to be amplified, which part is noise. That's taste work. It's the same job we've always done.",
      ]},
      { id: "what-to-do", heading: "What to do instead", paragraphs: [
        "Ask: what signal is this user already producing that we can reflect back more clearly? That reframe kills the magic-wand briefs and starts producing AI features that feel less like spectacle and more like help.",
      ]},
    ],
  },
  {
    slug: "org-that-designs-itself",
    title: "The org that designs itself",
    cat: "leadership", catLabel: "Leadership",
    views: 2382,
    date: "2026-04-08", readTime: "9 min",
    excerpt: "On Conway's Law as a design tool. If your product feels fragmented, audit your Slack channels before your Figma files.",
    body: [
      { id: "conway-still-wins", heading: "Conway still wins", paragraphs: [
        "Conway's Law says organizations ship their communication structure. Sixty years later every company I've worked at has produced a product that looked exactly like the org chart, right down to the seams where two VPs stopped talking.",
      ]},
      { id: "audit-the-channels", heading: "Audit the channels", paragraphs: [
        "When a user flow feels fragmented, don't open Figma first. Open Slack. Find the channels that stopped at the handoff. The seam in the product is the seam in the conversation.",
        "Fix the conversation and the product follows. Rearrange the Figma without touching the org and you'll rebuild the same seam in six months.",
      ]},
    ],
  },
  {
    slug: "healthcare-edges",
    title: "Designing for the edges of healthcare",
    cat: "design", catLabel: "Design",
    views: 2298,
    date: "2026-03-29", readTime: "7 min",
    excerpt: "Patients with four tabs open, nurses with gloves on, doctors with 40 seconds. The 'average user' in healthcare is a statistical fiction.",
    body: [
      { id: "average-user", heading: "There is no average user", paragraphs: [
        "Healthcare design has a 'happy path' problem. The happy path is a 45-year-old with time, literacy, broadband, and low anxiety. The real path is a shift nurse in gloves, a patient on hold for 38 minutes, a physician with 40 seconds between rooms.",
      ]},
      { id: "design-for-worst-day", heading: "Design for the worst day", paragraphs: [
        "Every screen we ship lands on somebody's worst day. That's the test. If it works when you're distracted, sleep-deprived, and scared, it works. If it only works when you're calm and fluent, you haven't shipped healthcare software. You've shipped a demo.",
      ]},
    ],
  },
  {
    slug: "senior-designer-riddle",
    title: "23 years and I still don't know what a senior designer is",
    cat: "career", catLabel: "Career",
    views: 6456,
    date: "2026-03-20", readTime: "5 min",
    excerpt: "Titles are a trailing indicator. Every few years I convince myself I've figured it out, and every few years I find out I haven't.",
    body: [
      { id: "titles-trail", heading: "Titles trail", paragraphs: [
        "Every few years I think I've cracked what separates a senior designer from everyone else. Every few years someone with a different title teaches me I haven't.",
      ]},
      { id: "the-one-thing", heading: "The one thing that stays", paragraphs: [
        "The one trait that has held up across two decades: seniors own the problem, not the pixels. They can put the pen down and still be the most useful person in the room. Everything else — taste, speed, tools — turns over.",
      ]},
    ],
  },
  {
    slug: "spec-is-ui",
    title: "The spec IS the UI now",
    cat: "ai", catLabel: "AI Experiments",
    views: 2509,
    date: "2026-03-12", readTime: "8 min",
    excerpt: "A well-written prompt is already 60% of a product. Which means a lot of us are about to be out-shipped by a very good writer with a Claude tab open.",
    body: [
      { id: "prompt-as-product", heading: "Prompt as product", paragraphs: [
        "For the first time in my career, writing a specification and building the thing are converging. The prompt is the spec is the UI. A careful paragraph can ship as a working agent in an hour.",
      ]},
      { id: "implications", heading: "What this does to the team", paragraphs: [
        "It means the best writer on your team might be your highest-leverage engineer. It means PMs who think in systems start shipping features without an IDE. It means designers who can't write precisely are going to feel it.",
      ]},
    ],
  },
  {
    slug: "taste-debt",
    title: "Taste debt",
    cat: "design", catLabel: "Design",
    views: 1043,
    date: "2026-03-02", readTime: "4 min",
    excerpt: "The design version of tech debt. It compounds silently and everyone blames the last VP.",
    body: [
      { id: "what-it-is", heading: "What it is", paragraphs: [
        "Taste debt is the gap between what your product could look like and what it does look like. Like tech debt, it compounds silently. Unlike tech debt, nobody writes a Jira ticket for it.",
      ]},
      { id: "how-to-pay-it-down", heading: "How to pay it down", paragraphs: [
        "Small, regular refactors of the stuff that makes you wince. Not a redesign — a redesign is how taste debt becomes a crisis. A ten-minute cleanup every week beats a ten-week rebrand every three years.",
      ]},
    ],
  },
  {
    slug: "boring-managers",
    title: "In praise of boring managers",
    cat: "leadership", catLabel: "Leadership",
    views: 3652,
    date: "2026-02-22", readTime: "6 min",
    excerpt: "Teams don't need a charismatic leader. They need someone who sends calendar invites on time and says the quiet thing out loud in 1:1s.",
    body: [
      { id: "against-charisma", heading: "Against charisma", paragraphs: [
        "Charisma is a nice-to-have that the industry upgraded to table-stakes by watching too many keynotes. Most of what a manager does is unglamorous — schedule, name, clarify, defend, decide, write it down.",
      ]},
      { id: "what-actually-helps", heading: "What actually helps", paragraphs: [
        "Say the hard thing in the 1:1 before the review. Send the calendar invite with the agenda already in the body. Write the decision down. Do it every week. It's boring. Teams love it.",
      ]},
    ],
  },
  {
    slug: "design-ops-real-work",
    title: "Design ops is real work, not a spreadsheet hobby",
    cat: "leadership", catLabel: "Leadership",
    views: 1127,
    date: "2026-02-14", readTime: "7 min",
    excerpt: "If you think DesignOps is optional, you are paying for it in senior designers' Slack DMs instead.",
    body: [
      { id: "hidden-bill", heading: "The hidden bill", paragraphs: [
        "Every org has a DesignOps function. The only question is whether it's a person or whether it's your three most senior ICs answering 'where's the template' in Slack all day.",
      ]},
      { id: "make-it-explicit", heading: "Make it explicit", paragraphs: [
        "Give DesignOps a name, a calendar, and a roadmap. Treat it like a product. The 'product' is the design team's ability to ship. Measure it. It's the single highest-leverage hire most design orgs aren't making.",
      ]},
    ],
  },
  {
    slug: "polite-lie-of-portfolio",
    title: "The polite lie of the portfolio site",
    cat: "career", catLabel: "Career",
    views: 480,
    date: "2026-02-06", readTime: "5 min",
    excerpt: "The work you can show is almost never the work that mattered. The NDA shelf is always the better portfolio.",
    body: [
      { id: "shiny-work", heading: "The shiny stuff shows", paragraphs: [
        "Your portfolio is selection-biased toward work that was visual, shippable, and non-confidential. That's a small slice of the actual job, and not usually the most valuable slice.",
      ]},
      { id: "what-to-say-instead", heading: "What to say instead", paragraphs: [
        "Talk about the decision, not the deliverable. 'Here's what we almost shipped, and why we didn't' is a better signal than a screen. Nobody asks about the screens once you've said something interesting about the decision.",
      ]},
    ],
  },
  {
    slug: "kids-product",
    title: "My 6-year-old is my favorite PM",
    cat: "career", catLabel: "Career",
    views: 182,
    date: "2026-01-28", readTime: "4 min",
    excerpt: "She has no respect for edge cases, no tolerance for jargon, and ruthless opinions about typography. I learn a lot.",
    body: [
      { id: "no-patience", heading: "No patience for the wrong question", paragraphs: [
        "She asks 'why' about features that are trivially obvious to me. Nine times out of ten, there isn't actually a good answer. The tenth time, the good answer is a better feature.",
      ]},
      { id: "ruthless-taste", heading: "Ruthless taste", paragraphs: [
        "She'll dismiss a whole app because the icon is 'wiggly'. I used to roll my eyes. Now I watch which icons she dismisses and retire the ones I designed that look the same.",
      ]},
    ],
  },
  {
    slug: "critique-that-healed",
    title: "The critique that healed my team",
    cat: "leadership", catLabel: "Leadership",
    views: 2014,
    date: "2026-01-20", readTime: "10 min",
    excerpt: "We stopped reviewing work and started reviewing decisions. Everything got faster and people stopped crying in parking lots.",
    body: [
      { id: "the-old-crit", heading: "The old crit", paragraphs: [
        "Our old critique format reviewed the artifact — pixels, copy, flow. It made the designer defend their work. Most designers got worse at designing under that pressure, not better.",
      ]},
      { id: "review-decisions", heading: "Review decisions, not pixels", paragraphs: [
        "We switched to reviewing the decision behind the pixels. 'Why this, not that.' The designer presented the trade-off, not the outcome. Critique became cheaper, braver, more generous. Nobody cried in the parking lot that year.",
      ]},
    ],
  },
  {
    slug: "llm-onboarding",
    title: "I onboarded an LLM like a junior designer",
    cat: "ai", catLabel: "AI Experiments",
    views: 1890,
    date: "2026-01-12", readTime: "6 min",
    excerpt: "Gave it our design principles, three example critiques, and the Slack channel for snacks. Surprisingly productive.",
    body: [
      { id: "treat-it-like-a-person", heading: "Treat it like a person you've just hired", paragraphs: [
        "The single biggest jump in output came from writing an onboarding doc for the LLM. Same doc I'd write for a new hire: principles, norms, examples, what 'good' looks like, who to ask.",
      ]},
      { id: "what-transferred", heading: "What transferred", paragraphs: [
        "Everything I'd tell a junior designer to read. Three real critique transcripts. A list of phrases we don't use. It cut prompt-tinkering time by about 80%.",
      ]},
    ],
  },
  {
    slug: "first-principles-luxury",
    title: "First principles are a luxury good",
    cat: "design", catLabel: "Design",
    views: 905,
    date: "2026-01-04", readTime: "6 min",
    excerpt: "Most of the time you are paid to ship. First-principles thinking is a quarterly budget line, not a daily posture.",
    body: [
      { id: "the-temptation", heading: "The temptation", paragraphs: [
        "Every designer wants to reason from first principles every day. It feels like the real job. It also takes forever and breaks your shipping cadence.",
      ]},
      { id: "when-to-actually-use-them", heading: "When to actually use them", paragraphs: [
        "Reserve first-principles work for the two or three decisions a year that cast the longest shadow. Everything else is a variation on patterns you already know. Shipping fluently on patterns buys you the time to do real first-principles work on the things that matter.",
      ]},
    ],
  },
  {
    slug: "writing-is-designing",
    title: "Writing clearly is designing thinking",
    cat: "design", catLabel: "Design",
    views: 1611,
    date: "2025-12-28", readTime: "5 min",
    excerpt: "Every muddled sentence I write is a muddled thought. The sentence is the symptom.",
    body: [
      { id: "the-draft-test", heading: "The draft test", paragraphs: [
        "If I can't write the thing in plain English in one paragraph, I don't understand it yet. The fix isn't better writing — it's more thinking.",
      ]},
      { id: "why-designers-should-care", heading: "Why designers especially", paragraphs: [
        "Every artifact we ship carries an implicit argument. If the argument is fuzzy, the design will be too. Writing is the cheapest way to find out.",
      ]},
    ],
  },
  {
    slug: "why-clinicians-hate",
    title: "Why clinicians hate your software",
    cat: "design", catLabel: "Design",
    views: 3201, tip: "Hot",
    date: "2025-12-20", readTime: "8 min",
    excerpt: "Because you designed it from a requirements doc, not from a shift. And because they are tired in ways you cannot imagine.",
    body: [
      { id: "shift-not-spec", heading: "Shift, not spec", paragraphs: [
        "Requirements docs describe what the software should do. They do not describe what it feels like to use it on hour ten of a twelve-hour shift with three patients deteriorating and an alarm going off down the hall.",
      ]},
      { id: "go-watch", heading: "Go watch", paragraphs: [
        "There is no substitute for shadowing the actual user on the actual shift. Every senior healthcare designer I trust has done it. Every piece of healthcare software that gets hated on Reddit was shipped by a team that didn't.",
      ]},
    ],
  },
  {
    slug: "hiring-signal",
    title: "Hiring for signal, not resume",
    cat: "career", catLabel: "Career",
    views: 1342,
    date: "2025-12-12", readTime: "6 min",
    excerpt: "The resume tells you where they've been. It does not tell you whether they'll help you win the next quarter.",
    body: [
      { id: "signals-i-trust", heading: "Signals I trust", paragraphs: [
        "A two-paragraph answer to an ambiguous question. A portfolio that explains tradeoffs rather than outcomes. A thank-you note that references something specific from the call.",
      ]},
      { id: "signals-i-dont", heading: "Signals I no longer trust", paragraphs: [
        "Famous employers, the name of the school, the presence of a Medium article. All lagging indicators. Some of my best hires had none of them.",
      ]},
    ],
  },
  {
    slug: "interview-tells",
    title: "Five interview tells I've learned the hard way",
    cat: "career", catLabel: "Career",
    views: 2471,
    date: "2025-12-04", readTime: "5 min",
    excerpt: "Shortcuts from two decades of hiring, including the one tell I still get wrong.",
    body: [
      { id: "the-five", heading: "The five", paragraphs: [
        "How they talk about their last team. How they answer a question where they don't know the answer. Whether they ask a question back. What they did in the last 90 days that wasn't on their job description. Whether they say thank you.",
      ]},
      { id: "the-one-i-get-wrong", heading: "The one I still get wrong", paragraphs: [
        "Energy on the call. I repeatedly mistake extroversion for competence. Some of my best hires were quiet and tired on the call because they were doing the job they already had.",
      ]},
    ],
  },
  {
    slug: "critique-framework",
    title: "A framework for giving critique that people want",
    cat: "leadership", catLabel: "Leadership",
    views: 1780,
    date: "2025-11-26", readTime: "7 min",
    excerpt: "Be specific, be kind, be on time. In that order.",
    body: [
      { id: "specific", heading: "Specific beats nice", paragraphs: [
        "Vague praise is worse than silence. 'This is great' tells the person nothing. 'The second paragraph is the strongest — it earned the turn in the third' tells them what to do more of.",
      ]},
      { id: "on-time", heading: "On time beats perfect", paragraphs: [
        "Critique three days late is critique of a different piece of work. The work has moved on. Say the imperfect thing today rather than the perfect thing on Friday.",
      ]},
    ],
  },
  {
    slug: "design-systems-cultural",
    title: "Design systems are cultural, not technical",
    cat: "leadership", catLabel: "Leadership",
    views: 2890,
    date: "2025-11-18", readTime: "8 min",
    excerpt: "Every failed design system I've been part of failed for the same reason, and it was never about the tokens.",
    body: [
      { id: "not-about-tokens", heading: "It's not the tokens", paragraphs: [
        "Three design systems in my career. All technically excellent. Two failed. The two that failed had good tokens, good docs, good governance docs. What they didn't have was a culture that saw the system as shared property.",
      ]},
      { id: "culture-first", heading: "Culture first", paragraphs: [
        "Build the norms before the libraries. Who maintains it, who breaks the rules and how, what 'done' means. If those conversations aren't had, the Figma file becomes a polite suggestion.",
      ]},
    ],
  },
  {
    slug: "promoted-wont-keep-you",
    title: "What got you promoted won't keep you employed",
    cat: "career", catLabel: "Career",
    views: 1198,
    date: "2025-11-10", readTime: "5 min",
    excerpt: "The job you were promoted for is not the job you now have. People keep doing the old job and wondering why it got quiet.",
    body: [
      { id: "promotion-trap", heading: "The promotion trap", paragraphs: [
        "You got promoted because you were the best at the old job. Now the old job is not the job. The new job requires different skills, a different audience, and different metrics for what 'good' looks like.",
      ]},
      { id: "relearn", heading: "Relearn, fast", paragraphs: [
        "Every promotion is a small rehire. Ask what 'good' looks like at this level. Pick two skills you don't have. Spend the next quarter being noticeably worse at the thing that used to feel effortless. That's the job now.",
      ]},
    ],
  },
];
