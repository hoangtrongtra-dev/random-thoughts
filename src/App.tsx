import React, { useState, useEffect } from 'react';
import { RefreshCw, Save, Heart, Globe, ChevronDown, Trash2 } from 'lucide-react';

// Thoughts database with multilingual support
const thoughts = {
  en: [
    "The best time to plant a tree was 20 years ago. The second best time is now.",
    "In the midst of winter, I found there was, within me, an invincible summer.",
    "Life is what happens to you while you're busy making other plans.",
    "The only way to do great work is to love what you do.",
    "Yesterday is history, tomorrow is a mystery, today is a gift.",
    "Be yourself; everyone else is already taken.",
    "The journey of a thousand miles begins with one step.",
    "Happiness is not something ready-made. It comes from your own actions.",
    "The only impossible journey is the one you never begin.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Dream big and dare to fail.",
    "What you do today can improve all your tomorrows.",
    "The mind is everything. What you think you become.",
    "Do not wait to strike till the iron is hot; but make it hot by striking.",
    "The harder you work for something, the greater you'll feel when you achieve it.",
    "Don't watch the clock; do what it does. Keep going.",
    "Great things never come from comfort zones.",
    "Push yourself, because no one else is going to do it for you.",
    "Sometimes later becomes never. Do it now.",
    "Success doesn't just find you. You have to go out and get it.",
    "The future depends on what you do today.",
    "Little by little, one travels far.",
    "You are never too old to set another goal or to dream a new dream.",
    "If you want to lift yourself up, lift up someone else.",
    "Opportunities don't happen. You create them.",
    "Don't be afraid to give up the good to go for the great.",
    "If you can dream it, you can do it.",
    "Act as if what you do makes a difference. It does.",
    "The best way to get started is to quit talking and begin doing."
  ],
  vi: [
    "Thời gian tốt nhất để trồng cây là 20 năm trước. Thời gian tốt thứ hai là bây giờ.",
    "Giữa mùa đông khắc nghiệt, tôi tìm thấy trong lòng mình một mùa hè bất diệt.",
    "Cuộc sống là những gì xảy ra với bạn khi bạn đang bận rộn lập kế hoạch khác.",
    "Cách duy nhất để làm công việc tuyệt vời là yêu những gì bạn làm.",
    "Hôm qua là lịch sử, ngày mai là bí ẩn, hôm nay là món quà.",
    "Hãy là chính mình; mọi người khác đã có người làm rồi.",
    "Hành trình nghìn dặm bắt đầu từ một bước chân.",
    "Hạnh phúc không phải là thứ có sẵn. Nó đến từ hành động của chính bạn.",
    "Hành trình bất khả thi duy nhất là hành trình bạn không bao giờ bắt đầu.",
    "Thành công không phải là kết thúc, thất bại không phải là chết người: chính lòng can đảm tiếp tục mới là điều quan trọng.",
    "Chỉ có một giới hạn cho ngày mai của chúng ta, đó là sự nghi ngờ hôm nay.",
    "Hãy mơ lớn và dám thất bại.",
    "Những gì bạn làm hôm nay có thể cải thiện mọi ngày mai.",
    "Tâm trí là tất cả. Bạn nghĩ gì, bạn sẽ trở thành điều đó.",
    "Đừng chờ sắt nóng mới rèn, hãy làm nó nóng lên bằng cách rèn.",
    "Càng nỗ lực, thành quả đạt được càng ngọt ngào.",
    "Đừng nhìn đồng hồ, hãy làm như nó: tiếp tục tiến về phía trước.",
    "Những điều vĩ đại không đến từ vùng an toàn.",
    "Hãy tự thúc đẩy mình, vì không ai làm điều đó thay bạn.",
    "Đôi khi 'để sau' sẽ trở thành 'không bao giờ'. Hãy làm ngay.",
    "Thành công không tự tìm đến bạn. Bạn phải chủ động tìm kiếm nó.",
    "Tương lai phụ thuộc vào những gì bạn làm hôm nay.",
    "Từng chút một, ta sẽ đi rất xa.",
    "Bạn không bao giờ quá già để đặt mục tiêu mới hay mơ một giấc mơ mới.",
    "Nếu muốn nâng mình lên, lift up someone else.",
    "Cơ hội không tự đến. Bạn phải tạo ra nó.",
    "Don't be afraid to give up the good to go for the great.",
    "If you can dream it, you can do it.",
    "Act as if what you do makes a difference. It does.",
    "The best way to get started is to quit talking and begin doing."
  ],
  ja: [
    "木を植えるのに最適な時期は20年前だった。次に良い時期は今である。",
    "厳しい冬の最中に、私は自分の内に不屈の夏を見つけた。",
    "人生とは、あなたが他の計画を立てるのに忙しい間に起こることです。",
    "素晴らしい仕事をする唯一の方法は、自分のしていることを愛することです。",
    "昨日は歴史、明日は謎、今日は贈り物。",
    "自分らしくいなさい。他のみんなはもう取られています。",
    "千里の道も一歩から。",
    "幸福は既製品ではありません。それはあなた自身の行動から生まれます。",
    "唯一不可能な旅は、始めない旅です。",
    "成功は最終的ではなく、失敗は致命的ではない：続ける勇気こそが重要なのです。",
    "明日の実現の唯一の制限は、今日の私たちの疑いです。",
    "大きな夢を持ち、失敗を恐れないでください。",
    "今日することが、すべての明日を良くすることができます。",
    "心がすべてです。あなたが考えることが、あなたになります。",
    "鉄が熱くなるのを待つのではなく、打って熱くしなさい。",
    "何かのために一生懸命働けば働くほど, 達成したときの喜びは大きい。",
    "時計を見るな。時計のように進み続けよ。",
    "偉大なことは快適な場所からは生まれない。",
    "自分を押し上げなさい。他の誰もあなたを代わりにやってくれません。",
    "『あとで』は時に『決して』になる。今すぐやろう。",
    "成功は自然にやってこない。自分でつかみに行くものだ。",
    "未来は今日あなたがすることにかかっている。",
    "少しずつ、遠くまで行ける。",
    "新しい目標を立てたり、新しい夢を見るのに遅すぎることはない。",
    "自分を高めたければ、他人を高めなさい。",
    "チャンスは自然にやってこない。自分で作るものだ。",
    "良いものを捨てて、偉大なものを目指すことを恐れるな。",
    "夢見ることができれば、それは実現できる。",
    "あなたの行動が違いを生むかのように振る舞いなさい。それは本当に違いを生む。",
    "始める最良の方法は、話すのをやめて行動することだ。"
  ],
  zh: [
    "种树最好的时间是20年前，其次是现在。",
    "在严冬中，我发现自己内心有一个不可征服的夏天。",
    "生活就是当你忙于制定其他计划时发生在你身上的事情。",
    "做出色工作的唯一方法就是热爱你所做的事情。",
    "昨天是历史，明天是谜团，今天是礼物。",
    "做你自己，因为其他人都已经有人做了。",
    "千里之行，始于足下。",
    "幸福不是现成的东西，它来自于你自己的行动。",
    "唯一不可能的旅程是你永远不开始的旅程。",
    "成功不是终点，失败不是致命的：重要的是继续前进的勇气。",
    "我们对明天的实现唯一的限制是今天的怀疑。",
    "敢于梦想，敢于失败。",
    "你今天所做的可以改善所有的明天。",
    "心念即一切。你所想即你所成。",
    "不要等铁热了才打，要靠打铁使其变热。",
    "你为某事付出的努力越多，成功时的成就感就越大。",
    "别看钟表，要像钟表一样继续前进。",
    "伟大的事情从不来自舒适区。",
    "推动自己，因为没有人会替你努力。",
    "有时候\"以后\"就变成了\"永不\"。现在就做。",
    "成功不会自己找上门，你必须主动争取。",
    "未来取决于你今天的行动。",
    "一点一滴，终能走远。",
    "你永远不会太老，无法设定新目标或做新梦。",
    "如果你想提升自己，先提升别人。",
    "机会不会自己出现，你要创造它。",
    "不要害怕放弃好的，去追求伟大的。",
    "只要你能梦想，你就能做到。",
    "要像你的行为能带来改变一样去做。它确实如此。",
    "开始的最好方法就是停止空谈并付诸行动。"
  ],
  ko: [
    "나무를 심기에 가장 좋은 시기는 20년 전이었다. 두 번째로 좋은 시기는 지금이다.",
    "혹독한 겨울 한가운데서, 나는 내 안에 정복할 수 없는 여름이 있음을 발견했다.",
    "인생은 당신이 다른 계획을 세우느라 바쁜 동안 당신에게 일어나는 일이다.",
    "훌륭한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것이다.",
    "어제는 역사이고, 내일은 미스터리이며, 오늘은 선물이다.",
    "자신답게 살아라. 다른 모든 사람들은 이미 존재한다.",
    "천리길도 한 걸음부터.",
    "행복은 기성품이 아니다. 그것은 당신 자신의 행동에서 나온다.",
    "유일하게 불가능한 여행은 시작하지 않는 여행이다.",
    "성공은 최종적이지 않고, 실패는 치명적이지 않다: 계속할 용기가 중요하다.",
    "내일을 실현하는 유일한 한계는 오늘의 의심이다.",
    "크게 꿈꾸고 실패를 두려워하지 마라.",
    "오늘 하는 일이 모든 내일을 더 좋게 만들 수 있다.",
    "마음이 전부다. 당신이 생각하는 것이 곧 당신이 된다.",
    "쇠가 뜨거워질 때까지 기다리지 말고, 두드려서 뜨겁게 하라.",
    "무언가를 위해 더 열심히 노력할수록, 성취했을 때 더 큰 기쁨을 느낀다.",
    "시계를 보지 말고, 시계처럼 계속 나아가라.",
    "위대한 일은 편안한 곳에서 나오지 않는다.",
    "스스로를 밀어붙여라. 아무도 당신을 대신해주지 않는다.",
    "가끔 '나중에'는 '영원히'가 된다. 지금 해라.",
    "성공은 저절로 오지 않는다. 직접 찾아야 한다.",
    "미래는 오늘 당신이 하는 일에 달려 있다.",
    "조금씩, 멀리 간다.",
    "새로운 목표를 세우거나 새로운 꿈을 꾸기에 결코 늦지 않았다.",
    "자신을 높이고 싶다면, 남을 높여라.",
    "기회는 저절로 오지 않는다. 스스로 만들어라.",
    "좋은 것을 포기하고 위대한 것을 추구하는 것을 두려워하지 마라.",
    "꿈꿀 수 있다면, 이룰 수 있다.",
    "당신의 행동이 변화를 만든다고 생각하며 행동하라. 실제로 그렇다.",
    "시작하는 가장 좋은 방법은 말하는 것을 멈추고 행동하는 것이다."
  ]
};

const languageNames = {
  en: 'English',
  vi: 'Tiếng Việt',
  ja: '日本語',
  zh: '中文',
  ko: '한국어'
};

interface SavedThought {
  id: string;
  thought: string;
  language: string;
  timestamp: number;
}

function App() {
  const [currentLanguage, setCurrentLanguage] = useState<keyof typeof thoughts>('en');
  const [currentThought, setCurrentThought] = useState('');
  const [savedThoughts, setSavedThoughts] = useState<SavedThought[]>([]);
  const [showSaved, setShowSaved] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load saved thoughts from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('randomThoughts');
    if (saved) {
      setSavedThoughts(JSON.parse(saved));
    }
    generateRandomThought();
  }, []);

  // Generate a random thought for the current language
  const generateRandomThought = () => {
    setIsAnimating(true);
    setTimeout(() => {
      const languageThoughts = thoughts[currentLanguage];
      const randomIndex = Math.floor(Math.random() * languageThoughts.length);
      setCurrentThought(languageThoughts[randomIndex]);
      setIsAnimating(false);
    }, 200);
  };

  // Save current thought to localStorage
  const saveThought = () => {
    if (!currentThought) return;

    const newThought: SavedThought = {
      id: Date.now().toString(),
      thought: currentThought,
      language: currentLanguage,
      timestamp: Date.now()
    };

    const updatedThoughts = [newThought, ...savedThoughts];
    setSavedThoughts(updatedThoughts);
    localStorage.setItem('randomThoughts', JSON.stringify(updatedThoughts));
  };

  // Remove saved thought
  const removeSavedThought = (id: string) => {
    const updatedThoughts = savedThoughts.filter(thought => thought.id !== id);
    setSavedThoughts(updatedThoughts);
    localStorage.setItem('randomThoughts', JSON.stringify(updatedThoughts));
  };

  // Change language and generate new thought
  const changeLanguage = (lang: keyof typeof thoughts) => {
    setCurrentLanguage(lang);
    setIsLanguageDropdownOpen(false);
    setTimeout(() => {
      generateRandomThought();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 font-sans">
      {/* Google Fonts for better CJK support */}
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600&family=Noto+Sans+CJK+SC:wght@300;400;500;600&family=Noto+Sans+CJK+JP:wght@300;400;500;600&family=Noto+Sans+CJK+KR:wght@300;400;500;600&display=swap" rel="stylesheet" />
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Random Thoughts
          </h1>
          <p className="text-gray-600 text-lg">
            Discover wisdom from around the world
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Language Selector */}
          <div className="flex justify-center">
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 hover:bg-white/90 transition-all duration-200 shadow-sm"
              >
                <Globe className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">
                  {languageNames[currentLanguage]}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg z-10">
                  {Object.entries(languageNames).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => changeLanguage(code as keyof typeof thoughts)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl ${
                        currentLanguage === code ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Thought Display */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-white/20">
            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
              <blockquote className="text-xl md:text-2xl lg:text-3xl text-gray-800 font-medium leading-relaxed text-center mb-8 min-h-[120px] flex items-center justify-center" style={{ fontFamily: 'Noto Sans, Noto Sans CJK SC, Noto Sans CJK JP, Noto Sans CJK KR, system-ui, sans-serif' }}>
                "{currentThought}"
              </blockquote>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={generateRandomThought}
                className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
              >
                <RefreshCw className="w-5 h-5" />
                <span className="font-medium">New Thought</span>
              </button>
              
              <button
                onClick={saveThought}
                className="flex items-center justify-center space-x-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
              >
                <Save className="w-5 h-5" />
                <span className="font-medium">Save</span>
              </button>
            </div>
          </div>

          {/* Saved Thoughts Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
            <button
              onClick={() => setShowSaved(!showSaved)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-white/20 transition-colors duration-200 rounded-2xl"
            >
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-rose-500" />
                <span className="text-xl font-semibold text-gray-800">
                  Saved Thoughts ({savedThoughts.length})
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${showSaved ? 'rotate-180' : ''}`} />
            </button>

            {showSaved && (
              <div className="px-6 pb-6 space-y-4 max-h-96 overflow-y-auto">
                {savedThoughts.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No saved thoughts yet. Save some wisdom!
                  </p>
                ) : (
                  savedThoughts.map((saved) => (
                    <div
                      key={saved.id}
                      className="bg-white/50 rounded-xl p-4 border border-gray-100 hover:bg-white/70 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                          {languageNames[saved.language as keyof typeof languageNames]}
                        </span>
                        <button
                          onClick={() => removeSavedThought(saved.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                          title="Remove thought"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-gray-700 mb-2 leading-relaxed" style={{ fontFamily: 'Noto Sans, Noto Sans CJK SC, Noto Sans CJK JP, Noto Sans CJK KR, system-ui, sans-serif' }}>
                        "{saved.thought}"
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(saved.timestamp).toLocaleDateString()} at {new Date(saved.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Collecting wisdom from across cultures and languages</p>
        </footer>
      </div>
    </div>
  );
}

export default App;