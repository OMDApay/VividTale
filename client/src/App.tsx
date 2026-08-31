/*
 * VividTale / حكاية الغابة الورقية
 * This file keeps the selected editorial children’s-book direction visible while editing:
 * warm paper, forest green, coral bookmark accents, asymmetric discovery, and calm motion.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Headphones,
  Pause,
  Play,
  Search,
  Sparkles,
  Square,
  Volume2,
  X,
} from "lucide-react";
import "./index.css";

const HERO_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030558102/pxviycKxuRIbSWNM.png";
const PAPER_TEXTURE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030558102/LGuVEMGZquHdYDCc.png";
const DIVIDER_IMAGE = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030558102/TnDZmPJfmIIeANQA.png";
const AD_FRAME = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030558102/QAIiuzjYvnUSEUfq.png";
const BRAND_MARK = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030558102/TfcXihZRHCyNvldH.png";

type Story = {
  id: number;
  title: string;
  emoji: string;
  lesson: string;
  blurb: string;
  content: string;
  tone: string;
};

const recoveredStories: Story[] = [
  {
    id: 1,
    title: "The Sharing Friends",
    emoji: "🐰",
    lesson: "Sharing brings happiness to both the giver and receiver.",
    blurb: "Barnaby the bunny discovers that a carrot tastes even better when it is shared with a friend.",
    tone: "carrot",
    content: `Once upon a time, in a green meadow, lived a little bunny named Barnaby. Barnaby loved carrots more than anything! He had a big pile of juicy, orange carrots all to himself.\n\nOne sunny morning, Barnaby saw his friend, a little bear named Bobby, looking sad. Bobby had no berries for breakfast. Barnaby felt a little tug in his heart. He thought about his delicious carrots.\n\nBarnaby hopped over to Bobby. “Hello, Bobby! Why are you sad?” he asked.\n\nBobby sighed. “I have no breakfast today, Barnaby. No yummy berries.”\n\nBarnaby looked at his pile of carrots, then at Bobby’s sad face. He picked up a big, crunchy carrot. “Here, Bobby! Have some of my carrots! They are very tasty!” he said with a smile.\n\nBobby’s eyes lit up. “Oh, Barnaby! Thank you!” He took the carrot and munched on it happily.\n\nBarnaby felt warm inside. Sharing his carrots made him feel even happier than eating them all by himself. From that day on, Barnaby and Bobby always shared their food and played together. They learned that sharing makes friends happy and strong!`,
  },
  {
    id: 2,
    title: "Helping the Little Turtle",
    emoji: "🐢",
    lesson: "Small acts of kindness can make a big difference.",
    blurb: "Lily finds a turtle in trouble and learns that a little help can change someone’s whole day.",
    tone: "stream",
    content: `One sunny day, a kind girl named Lily was walking through the forest. Near a sparkling stream, she heard a tiny voice calling for help.\n\nLily looked around and saw a small turtle stuck on its back, wiggling its little legs in the air. “Don’t worry, little turtle. I’ll help you,” said Lily gently.\n\nShe carefully used a small stick to help the turtle flip back onto its feet. The turtle blinked and looked up with gratitude.\n\n“Thank you so much!” said the turtle. “I was stuck there for so long.”\n\nLily smiled. “Everyone needs help sometimes.” The turtle crawled safely back to the stream, and Lily continued her walk feeling wonderful. She learned that even a small act of kindness can make someone’s day much better.`,
  },
  {
    id: 3,
    title: "Bella the Brave Butterfly",
    emoji: "🦋",
    lesson: "Being brave means trying even when you feel scared.",
    blurb: "A tiny butterfly flies through a thorny garden maze to reach the flower of her dreams.",
    tone: "petal",
    content: `In a beautiful garden lived a tiny butterfly named Bella. She was smaller than the other butterflies, and sometimes she felt scared to fly far from home.\n\nOne day, Bella saw a bright flower at the end of the garden. To reach it, she had to fly through tall, thorny flowers. “What if I get lost?” she whispered.\n\nBella remembered her mama’s words: “Being brave doesn’t mean you are not scared. It means you try anyway.” She took a deep breath and began.\n\nSlowly and carefully, Bella flew around the thorny branches. Finally, she reached the flower. “I did it!” she said proudly. Bella learned that courage is not about being big or strong; it is about trying when your heart feels small.`,
  },
  {
    id: 4,
    title: "The Secret of the Magic Garden",
    emoji: "🌺",
    lesson: "Taking care of nature helps everything grow and flourish.",
    blurb: "Tom cares for a forgotten garden and discovers that nature gives kindness back.",
    tone: "garden",
    content: `A curious boy named Tom discovered a hidden garden behind a gate covered with vines. The flowers were droopy, the leaves had holes, and the soil was dry.\n\n“This garden needs help,” Tom thought. He watered the flowers, pulled weeds, and gently moved the tiny bugs eating the leaves.\n\nAs he worked, the garden began to change. The flowers stood taller, their colors grew brighter, and the bees buzzed happily.\n\nTom discovered the secret of the magic garden: when you care for nature with love, nature cares for you too. From that day on, Tom visited every week, and the garden grew more beautiful each time.`,
  },
  {
    id: 5,
    title: "A Colorful Fruit Day",
    emoji: "🍎",
    lesson: "Healthy foods help our bodies grow strong and give us energy.",
    blurb: "Sam tastes a rainbow of fruit and finds a delicious new way to feel ready for play.",
    tone: "fruit",
    content: `Little Sam sat at breakfast looking at red apples, yellow bananas, green grapes, and purple plums. He did not want to try any.\n\nHis mom smiled. “Why not try one small bite?” Sam tasted an apple. It was sweet and crunchy. Then he tried the banana, grapes, and plum.\n\nAfter eating the colorful fruits, Sam felt full of energy. He wanted to run and play. His mom explained that healthy foods help the body grow strong.\n\nFrom that day on, Sam loved a colorful fruit bowl. He learned that trying something new can lead to a happy surprise.`,
  },
  {
    id: 6,
    title: "The Hare and the Tortoise: A Race of Kindness",
    emoji: "🐇",
    lesson: "Being kind is more important than being fast or winning.",
    blurb: "Ronnie the hare pauses a race to help a baby bird and learns what true speed looks like.",
    tone: "meadow",
    content: `In a sunny forest lived a speedy hare named Ronnie and a slow but kind tortoise named Tilly. Ronnie was proud of how fast he could run.\n\nDuring their race, Ronnie heard a baby bird chirping. It had fallen from its nest. Ronnie looked at the finish line, then at the frightened bird. He stopped and gently placed the bird back in its nest.\n\nTilly arrived and smiled. “That was very kind of you.” Together they walked to the finish line. They decided that helping others was much more important than winning.\n\nRonnie learned that the best way to be truly fast is to be fast to help when someone needs you.`,
  },
];

const additionalSeeds = [
  [7, "The Little Star Who Learned to Shine", "⭐", "Everyone has a special light to share.", "A little star learns that shining does not mean being the biggest."],
  [8, "The Clever Mouse and the Hungry Cat", "🐭", "A calm mind can find a clever solution.", "A small mouse uses careful thinking to help a hungry cat and all the meadow friends."],
  [9, "The Stubborn Sunflower", "🌻", "Patience helps good things unfold.", "A sunflower keeps facing the light, even when the cloudy days feel long."],
  [10, "A Noisy Farm Day", "🐔", "Listening helps us understand one another.", "The animals on a busy farm learn to take turns with their very different sounds."],
  [11, "The Reading Bear", "🐻", "Stories can open doors to new ideas.", "A young bear discovers a quiet superpower in the pages of a book."],
  [12, "The Friendly Cloud", "☁️", "Kindness can travel farther than we imagine.", "A little cloud shares shade and rain with a thirsty garden below."],
  [13, "The Hedgehog’s Helpful Spikes", "🦔", "Our differences can become our strengths.", "A hedgehog finds a gentle way to use his unusual spikes to help his friends."],
  [14, "The Ant and the Grasshopper", "🐜", "Preparation makes tomorrow easier.", "An ant and a grasshopper discover that work and play are both important in balance."],
  [15, "The Remembering Elephant", "🐘", "Remembering others shows that we care.", "An elephant remembers every friend’s favorite thing and brings the herd together."],
  [16, "The Acorn and the Squirrel", "🌰", "Small beginnings can grow into something wonderful.", "A squirrel protects one acorn and learns to think about the forest’s future."],
  [17, "The Mouse and the Elephant", "🐘", "Every kind of help matters.", "A tiny mouse and a giant elephant discover they can rescue one another."],
  [18, "The Wise Owl’s Question", "🦉", "Good questions lead to better choices.", "An owl helps the forest friends pause, ask, and think before they act."],
  [19, "The Water Droplet’s Journey", "💧", "Every small part matters in a big cycle.", "A water droplet travels from cloud to river and learns why caring for water matters."],
  [20, "The Changing Butterfly", "🦋", "Growth takes time, and change can be beautiful.", "A caterpillar learns to be patient through every stage of becoming a butterfly."],
  [21, "The Patient Rabbit", "🐇", "Waiting calmly can reveal a better path.", "A rabbit learns that the best berries ripen when we give them time."],
  [22, "The Little Star’s Big Dream", "🌟", "Dreams grow when we practice little by little.", "A small star makes a plan and keeps going until her dream lights the valley."],
  [23, "The Clean Bear", "🧼", "Clean spaces are kinder for everyone.", "A bear leads a forest tidy-up and turns chores into a joyful team adventure."],
  [24, "The Sharing Flower", "🌷", "Giving what we have can help a whole community.", "A flower shares her seeds and watches a lonely patch become a garden."],
  [25, "The Self-Built Home", "🏡", "Independence grows through practice and asking for help.", "A young beaver builds a cozy home one careful step at a time."],
  [26, "The Reading Cat", "🐱", "Curiosity makes ordinary days exciting.", "A cat follows a storybook map and learns to look closely at the world."],
  [27, "The Never-Give-Up Ant", "🐜", "Small steps can overcome big challenges.", "An ant tries a new route each day until the whole colony reaches the picnic."],
  [28, "The Sharing Squirrel", "🐿️", "Generosity makes a community stronger.", "A squirrel opens her nut storehouse when winter arrives early."],
  [29, "The Joyful Cloud", "🌈", "Joy grows when it is shared.", "A bright cloud brings a rainbow to a rainy morning and lifts every mood."],
  [30, "The Polar Bear’s Warm Heart", "🐻‍❄️", "Care and friendship can make any place feel like home.", "A polar bear learns that warmth comes from looking after the neighbors."],
] as const;

const tones = ["sky", "berry", "moss", "sun", "coral", "lilac"];
const generatedStories: Story[] = additionalSeeds.map(([id, title, emoji, lesson, blurb], index) => ({
  id,
  title,
  emoji,
  lesson,
  blurb,
  tone: tones[index % tones.length],
  content: `In a bright little corner of the forest lived ${title.replace(/^The |^A /, "").toLowerCase()}. One morning, a small problem appeared, and the friends had to slow down and listen.\n\nWith patience, courage, and a helping paw, they tried one small step at a time. Each attempt taught them something new, and soon the whole meadow was smiling again.\n\nThe friends remembered this lesson: ${lesson}`,
}));

const stories = [...recoveredStories, ...generatedStories];

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="VividTale home">
      <img src={BRAND_MARK} alt="" className="brand-mark" />
      <span className="brand-name">Vivid<span>Tale</span></span>
    </a>
  );
}

function StoryCard({ story, onOpen }: { story: Story; onOpen: (story: Story) => void }) {
  return (
    <article className={`story-card tone-${story.tone}`}>
      <div className="card-topline"><span className="story-number">{String(story.id).padStart(2, "0")}</span><span className="card-leaf">✦</span></div>
      <div className={`card-illustration scene-${story.tone}`} aria-hidden="true"><span className="scene-sun" /><span className="scene-cloud scene-cloud-one" /><span className="scene-cloud scene-cloud-two" /><span className="scene-hill scene-hill-back" /><span className="scene-hill scene-hill-front" /><span className="scene-flower scene-flower-one">✦</span><span className="scene-flower scene-flower-two">✦</span><span className="story-character">{story.emoji}</span></div>
      <div className="card-copy">
        <p className="eyebrow">A little story · {story.id}</p>
        <h3>{story.title}</h3>
        <p className="card-blurb">{story.blurb}</p>
        <div className="lesson-chip"><Check size={14} strokeWidth={3} /><span>{story.lesson}</span></div>
        <button className="read-link" onClick={() => onOpen(story)}><BookOpen size={16} />Read this story <ArrowRight size={16} /></button>
      </div>
    </article>
  );
}

function StoryReader({ story, onClose }: { story: Story | null; onClose: () => void }) {
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voiceReady, setVoiceReady] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const paragraphs = story ? story.content.split(String.fromCharCode(10) + String.fromCharCode(10)) : [];

  useEffect(() => {
    setParagraphIndex(0);
    setIsSpeaking(false);
    setIsPaused(false);
    window.speechSynthesis?.cancel();
    return () => window.speechSynthesis?.cancel();
  }, [story]);

  const speakParagraph = (index: number) => {
    if (!story || !window.speechSynthesis) {
      setVoiceReady(false);
      return;
    }
    const next = paragraphs[index];
    if (!next) {
      setIsSpeaking(false);
      setIsPaused(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(next);
    utterance.lang = "en-US";
    utterance.rate = 0.92;
    utterance.pitch = 1.05;
    utterance.onstart = () => { setIsSpeaking(true); setIsPaused(false); };
    utterance.onend = () => {
      if (index < paragraphs.length - 1) {
        setParagraphIndex(index + 1);
        window.setTimeout(() => speakParagraph(index + 1), 140);
      } else {
        setIsSpeaking(false);
        setIsPaused(false);
        setParagraphIndex(0);
      }
    };
    utterance.onerror = () => { setIsSpeaking(false); setIsPaused(false); setVoiceReady(false); };
    utteranceRef.current = utterance;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const startVoice = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    } else if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      speakParagraph(paragraphIndex);
    }
  };

  const stopVoice = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setParagraphIndex(0);
  };

  if (!story) return null;
  const progress = Math.round(((paragraphIndex + (isSpeaking ? 0.35 : 0)) / paragraphs.length) * 100);

  return (
    <div className="reader-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="reader-panel" role="dialog" aria-modal="true" aria-labelledby="reader-title">
        <button className="icon-button reader-close" onClick={onClose} aria-label="Close story"><X size={21} /></button>
        <div className={`reader-art tone-${story.tone}`}><span aria-hidden="true">{story.emoji}</span><p>Story {String(story.id).padStart(2, "0")}</p></div>
        <div className="reader-main">
          <p className="eyebrow">VividTale reading room</p>
          <h2 id="reader-title">{story.title}</h2>
          <p className="reader-lesson"><Sparkles size={17} />{story.lesson}</p>
          <div className="voice-player" aria-label="Story voice controls">
            <div className="voice-intro"><span className="voice-icon"><Volume2 size={18} /></span><div><strong>{isSpeaking ? (isPaused ? "Voice paused" : "Reading aloud") : "Listen to the story"}</strong><span>{voiceReady ? "English narration · built into your browser" : "Voice narration is unavailable in this browser"}</span></div></div>
            <div className="voice-actions">
              <button className="voice-primary" onClick={startVoice} disabled={!voiceReady} aria-label={isSpeaking && !isPaused ? "Pause narration" : isPaused ? "Resume narration" : "Play narration"}>{isSpeaking && !isPaused ? <Pause size={17} /> : <Play size={17} />}{isSpeaking && !isPaused ? "Pause" : isPaused ? "Resume" : "Play voice"}</button>
              <button className="voice-stop" onClick={stopVoice} disabled={!isSpeaking} aria-label="Stop narration"><Square size={14} />Stop</button>
            </div>
            <div className="voice-progress"><span style={{ width: `${progress}%` }} /></div>
            <div className="voice-meta"><span>Paragraph {Math.min(paragraphIndex + 1, paragraphs.length)} of {paragraphs.length}</span><span>{progress}%</span></div>
          </div>
          <div className="story-text">{paragraphs.map((paragraph, index) => <p key={`${story.id}-${index}`} className={index === paragraphIndex && isSpeaking ? "speaking-line" : ""}>{paragraph}</p>)}</div>
          <div className="reader-footer"><span><Headphones size={15} />A calm read, at your pace</span><button className="text-button" onClick={onClose}>Back to the library <ArrowRight size={15} /></button></div>
        </div>
      </section>
    </div>
  );
}

function AdSpace() {
  return (
    <aside className="ad-space" aria-label="Advertisement space">
      <img src={AD_FRAME} alt="" className="ad-art" />
      <div><p className="eyebrow">A clear space for good partners</p><h2>Your child-friendly ad can live here.</h2><p>This reserved space is ready for an educational, family-friendly sponsor. It stays clearly labeled and separate from the stories.</p></div>
      <span className="ad-label">Advertisement</span>
    </aside>
  );
}

export default function App() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All stories");
  const filteredStories = useMemo(() => stories.filter((story) => {
    const matchesQuery = `${story.title} ${story.lesson} ${story.blurb}`.toLowerCase().includes(query.toLowerCase());
    const filters: Record<string, (item: Story) => boolean> = { "All stories": () => true, "Kindness": (item) => /sharing|help|kind|friend|care|warm|community|generosity/i.test(`${item.title} ${item.lesson}`), "Courage": (item) => /brave|courage|try|dream|never|strength/i.test(`${item.title} ${item.lesson}`), "Curiosity": (item) => /read|question|curious|learn|clever|journey/i.test(`${item.title} ${item.lesson}`) };
    return matchesQuery && filters[activeFilter](story);
  }), [activeFilter, query]);
  const visibleStories = showAll || query || activeFilter !== "All stories" ? filteredStories : filteredStories.slice(0, 6);

  return (
    <div className="site-shell" id="top" style={{ "--paper-texture": `url(${PAPER_TEXTURE})` } as React.CSSProperties}>
      <header className="site-header">
        <div className="header-inner"><Logo /><nav className="desktop-nav" aria-label="Main navigation"><a href="#library">Library <span>30</span></a><a href="#about">About VividTale</a><a href="#advertise">Advertise</a></nav><a className="header-cta" href="#library">Find a story <ArrowRight size={16} /></a></div>
      </header>
      <main>
        <section className="hero-section">
          <div className="hero-copy"><p className="eyebrow coral-eyebrow"><span className="eyebrow-dot" />Stories with a little more heart</p><h1>Pick a story.<br /><em>Find a little lesson.</em></h1><p className="hero-description">Short English stories for curious children, brought to life with gentle illustrations, friendly narration, and ideas worth carrying into the day.</p><div className="hero-actions"><a className="primary-button" href="#library">Explore the library <ArrowDown size={17} /></a><span className="hero-note"><Sparkles size={16} />30 stories to discover</span></div></div>
          <div className="hero-visual"><img src={HERO_IMAGE} alt="A storybook resting in a sunny woodland meadow" /><div className="hero-sticker"><span>Read</span><strong>out<br />loud</strong><Headphones size={16} /></div><div className="hero-caption"><span>Today’s story</span><strong>The Sharing Friends</strong></div></div>
        </section>
        <div className="divider-wrap"><img src={DIVIDER_IMAGE} alt="" /></div>
        <section className="intro-strip" id="about"><div className="intro-mark"><BookOpen size={24} /></div><p><strong>A story is a small place to practice big feelings.</strong> VividTale pairs playful worlds with simple lessons about kindness, courage, curiosity, and care.</p><div className="intro-stat"><strong>03</strong><span>ways to explore<br />read · listen · learn</span></div></section>
        <section className="library-section" id="library"><div className="library-heading"><div><p className="eyebrow"><span className="section-bookmark" />The story shelf</p><h2>Find your next <em>favorite</em> tale.</h2></div><p className="library-description">Browse by feeling, search by title, or let the colorful shelf surprise you.</p></div>
          <div className="library-tools"><div className="search-box"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories or lessons" aria-label="Search stories" /></div><div className="filter-tabs" role="tablist" aria-label="Filter stories">{["All stories", "Kindness", "Courage", "Curiosity"].map((filter) => <button key={filter} className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div></div>
          {visibleStories.length > 0 ? <div className="story-grid">{visibleStories.map((story) => <StoryCard key={story.id} story={story} onOpen={setSelectedStory} />)}</div> : <div className="empty-state"><Search size={24} /><h3>No story found yet.</h3><p>Try a different title, lesson, or feeling.</p><button className="text-button" onClick={() => { setQuery(""); setActiveFilter("All stories"); }}>Clear search <X size={15} /></button></div>}
          {!query && activeFilter === "All stories" && <div className="show-more-wrap"><button className="secondary-button" onClick={() => setShowAll(!showAll)}>{showAll ? "Show featured stories" : "Show all 30 stories"} <ArrowDown size={16} className={showAll ? "rotate" : ""} /></button></div>}
        </section>
        <section className="ad-section" id="advertise"><AdSpace /></section>
        <section className="closing-section"><div><p className="eyebrow"><span className="section-bookmark" />A note for grown-ups</p><h2>Make room for a story<br /><em>before the day gets loud.</em></h2></div><p>Read together, listen in the car, or let a child choose the lesson they need today. Every tale is short enough for a little moment and rich enough to revisit.</p></section>
      </main>
      <footer className="site-footer"><div><Logo /><p>Little stories. Lasting ideas.</p></div><div className="footer-links"><a href="#library">Story library</a><a href="#about">Our approach</a><a href="#advertise">Advertising</a></div><span>© 2026 VividTale</span></footer>
      <StoryReader story={selectedStory} onClose={() => setSelectedStory(null)} />
    </div>
  );
}
