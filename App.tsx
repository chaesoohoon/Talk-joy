import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Users, Settings, HelpCircle, 
  Trophy, Share2, RefreshCw, X, Check, 
  Eye, EyeOff, Star, Clock, Crown, Zap, Info, ChevronRight, ExternalLink, ArrowRight
} from 'lucide-react';

import { 
  GamePhase, GameState, Player, Card, CardType, GameSettings 
} from './types';
import { ALL_CARDS, getRandomForbiddenWords } from './constants';

// ------------------------------------------------------------------
// UI COMPONENTS
// ------------------------------------------------------------------

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob"></div>
    <div className="absolute top-[20%] right-[-20%] w-[400px] h-[400px] bg-secondary-500/30 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-accent-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>
    <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
  </div>
);

const Button = ({ 
  children, onClick, variant = 'primary', className = '', size = 'md', disabled = false 
}: { 
  children?: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass'; 
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}) => {
  const base = "font-bold rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 backdrop-blur-sm";
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-4 text-base",
    lg: "px-8 py-5 text-lg w-full"
  };

  const variants = {
    primary: "btn-primary text-white shadow-lg shadow-primary-500/20 hover:brightness-110 border border-white/10",
    secondary: "bg-white/10 text-white border border-white/10 hover:bg-white/20",
    outline: "border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10",
    ghost: "text-neutral-400 hover:text-white hover:bg-white/5",
    glass: "glass text-white hover:bg-white/10"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled} 
      className={`${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

// ------------------------------------------------------------------
// RULE MODAL
// ------------------------------------------------------------------

const RuleModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-sm glass-card rounded-3xl p-6 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
                게임 규칙
              </h2>
              <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10">
                <X size={20} className="text-white/70" />
              </button>
            </div>

            <div className="space-y-6 text-neutral-200 overflow-y-auto max-h-[60vh] pr-2">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0 text-primary-400 font-bold">1</div>
                <div>
                  <h3 className="font-bold text-white mb-1">카드 뽑기 & 미션</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    화면에 나온 주제로 이야기를 하거나 미션을 수행하세요. 솔직할수록 게임이 더 재밌어집니다!
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center shrink-0 text-accent-400 font-bold">2</div>
                <div>
                  <h3 className="font-bold text-white mb-1">금지어 주의 (옵션)</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    설명자가 되면 '금지어'를 볼 수 있습니다. 설명하는 동안 절대 이 단어를 쓰면 안 됩니다!
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary-500/20 flex items-center justify-center shrink-0 text-secondary-400 font-bold">3</div>
                <div>
                  <h3 className="font-bold text-white mb-1">액션 & 이벤트</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    가끔씩 등장하는 액션 카드나 이벤트 카드는 즉시 수행해야 합니다. 거부하면 벌칙(원샷 등)!
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={onClose} className="w-full mt-8" variant="primary">
              알겠어요!
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ------------------------------------------------------------------
// SCREENS
// ------------------------------------------------------------------

// 1. HOME
const HomeScreen = ({ onStart }: { onStart: () => void }) => {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 relative z-10 pb-24">
      <BackgroundEffect />
      <RuleModal isOpen={showRules} onClose={() => setShowRules(false)} />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xs"
      >
        <div className="mb-4 inline-block px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-300 text-xs font-bold uppercase tracking-wider">
          Premium Party Game
        </div>
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-primary-200 to-primary-400 mb-6 tracking-tight text-glow" style={{ fontFamily: 'Pretendard' }}>
          TALK<br/>& JOY
        </h1>
        <p className="text-neutral-400 mb-12 text-sm leading-relaxed">
          어색한 분위기는 끝.<br/>
          지금 가장 힙한 파티를 시작해보세요.
        </p>

        <div className="flex flex-col gap-4 w-full">
          <Button onClick={onStart} size="lg" variant="primary">
            <Play size={20} className="fill-white" />
            GAME START
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
             <Button variant="glass" size="md" className="text-sm" onClick={() => setShowRules(true)}>
               <Info size={18} /> 룰 설명
             </Button>
             <Button variant="glass" size="md" className="text-sm">
               <Settings size={18} /> 설정
             </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// 2. SETUP
const SetupScreen = ({ onNext }: { onNext: (settings: GameSettings) => void }) => {
  const [playerCount, setPlayerCount] = useState(3);
  const [roundCount, setRoundCount] = useState(10);
  const [categories, setCategories] = useState<CardType[]>([
    CardType.TALK_LIGHT, 
    CardType.TALK_FUNNY,
    CardType.TALK_DEEP
  ]);
  const [useForbidden, setUseForbidden] = useState(true);
  const [useAction, setUseAction] = useState(true);

  const toggleCategory = (cat: CardType) => {
    setCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleNext = () => {
    if (categories.length === 0) {
      alert("최소 하나의 카테고리를 선택해주세요.");
      return;
    }
    const finalCategories = [...categories];
    if (useAction) finalCategories.push(CardType.ACTION);
    finalCategories.push(CardType.EVENT); // Always include events for fun

    onNext({
      playerCount,
      isTeamMode: false,
      categories: finalCategories,
      useForbidden,
      useAction,
      roundCount
    });
  };

  return (
    <div className="h-full relative z-10">
      <div className="h-full overflow-y-auto px-6 py-8 scrollbar-hide pb-48">
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-bold text-white">게임 설정</h2>
        </div>
        
        <div className="space-y-8">
          {/* Player Count */}
          <section>
            <label className="block text-sm font-bold text-neutral-400 mb-3 uppercase tracking-wider">참가 인원</label>
            <div className="glass rounded-2xl p-2 flex justify-between items-center">
              <Button variant="ghost" className="w-12 h-12 rounded-xl" onClick={() => setPlayerCount(Math.max(1, playerCount - 1))}>-</Button>
              <div className="flex items-center gap-2">
                  <Users size={20} className="text-primary-400"/>
                  <span className="text-2xl font-bold text-white">{playerCount}</span>
              </div>
              <Button variant="ghost" className="w-12 h-12 rounded-xl" onClick={() => setPlayerCount(Math.min(20, playerCount + 1))}>+</Button>
            </div>
          </section>

          {/* Categories */}
          <section>
            <label className="block text-sm font-bold text-neutral-400 mb-3 uppercase tracking-wider">카드 테마</label>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: CardType.TALK_LIGHT, label: "🎈 가벼운 토크", desc: "일상, 취향, TMI" },
                { id: CardType.TALK_FUNNY, label: "🔥 매운맛/폭로", desc: "흑역사, 밸런스 게임, 마라맛" },
                { id: CardType.TALK_DEEP, label: "🌙 감성/진지", desc: "가치관, 고민, 미래" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group
                    ${categories.includes(cat.id) 
                      ? 'bg-gradient-to-r from-primary-600/20 to-secondary-600/20 border-primary-500/50' 
                      : 'bg-white/5 border-white/5 opacity-70'}`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <div className={`font-bold text-lg ${categories.includes(cat.id) ? 'text-white' : 'text-neutral-400'}`}>{cat.label}</div>
                      <div className="text-xs text-neutral-500 mt-1">{cat.desc}</div>
                    </div>
                    {categories.includes(cat.id) && <Check size={20} className="text-secondary-400" />}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Options */}
          <section>
            <label className="block text-sm font-bold text-neutral-400 mb-3 uppercase tracking-wider">추가 규칙</label>
            <div className="space-y-3">
              <button 
                onClick={() => setUseForbidden(!useForbidden)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all
                ${useForbidden ? 'bg-accent-500/10 border-accent-500/40' : 'bg-white/5 border-white/5'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${useForbidden ? 'bg-accent-500 text-white' : 'bg-neutral-800 text-neutral-500'}`}>
                    <EyeOff size={20} />
                  </div>
                  <div className="text-left">
                    <div className={`font-bold ${useForbidden ? 'text-white' : 'text-neutral-400'}`}>금지어 모드</div>
                    <div className="text-xs text-neutral-500">설명 중 특정 단어 사용 금지</div>
                  </div>
                </div>
                {useForbidden && <div className="w-2 h-2 rounded-full bg-accent-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]"></div>}
              </button>

              <button 
                onClick={() => setUseAction(!useAction)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all
                ${useAction ? 'bg-primary-500/10 border-primary-500/40' : 'bg-white/5 border-white/5'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${useAction ? 'bg-primary-500 text-white' : 'bg-neutral-800 text-neutral-500'}`}>
                    <Zap size={20} />
                  </div>
                  <div className="text-left">
                    <div className={`font-bold ${useAction ? 'text-white' : 'text-neutral-400'}`}>액션/미션 카드</div>
                    <div className="text-xs text-neutral-500">몸으로 말해요, 즉석 벌칙 등</div>
                  </div>
                </div>
                {useAction && <div className="w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>}
              </button>
            </div>
          </section>

          {/* Rounds */}
          <section>
            <label className="block text-sm font-bold text-neutral-400 mb-3 uppercase tracking-wider">라운드</label>
            <div className="glass rounded-2xl p-1 flex">
              {[10, 20, 999].map(r => (
                <button 
                  key={r}
                  onClick={() => setRoundCount(r)}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all
                    ${roundCount === r ? 'bg-white/10 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  {r === 999 ? '무제한' : `${r}회`}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 w-full p-6 pt-0 bg-gradient-to-t from-dark-900 via-dark-900 to-transparent z-20 pointer-events-none flex justify-center">
         <div className="w-full max-w-lg pointer-events-auto">
            <Button onClick={handleNext} size="lg">
              다음 단계 <ChevronRight size={20} />
            </Button>
         </div>
      </div>
    </div>
  );
};

// 3. NAMES (NEW SCREEN)
const NamesScreen = ({ count, onStart }: { count: number, onStart: (names: string[]) => void }) => {
  const [names, setNames] = useState<string[]>(Array(count).fill(''));

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleSubmit = () => {
    onStart(names);
  };

  return (
    <div className="h-full relative z-10 flex flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-8 scrollbar-hide pb-48">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">플레이어 등록</h2>
          <p className="text-neutral-400 text-sm">참가자의 이름을 입력해주세요.</p>
        </div>

        <div className="space-y-3">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
               <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-neutral-400">
                 {i + 1}
               </div>
               <input
                 type="text"
                 placeholder={`플레이어 ${i + 1}`}
                 value={names[i]}
                 onChange={(e) => handleNameChange(i, e.target.value)}
                 className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-500 focus:bg-white/10 transition-all placeholder-neutral-600"
               />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-0 w-full p-6 pt-0 bg-gradient-to-t from-dark-900 via-dark-900 to-transparent z-20 pointer-events-none flex justify-center">
         <div className="w-full max-w-lg pointer-events-auto">
            <Button onClick={handleSubmit} size="lg" variant="primary">
              <Play size={20} className="fill-white" />
              게임 시작하기
            </Button>
         </div>
      </div>
    </div>
  );
};

// 4. PLAY
const PlayScreen = ({ 
  state, 
  onNext, 
  onEndGame 
}: { 
  state: GameState; 
  onNext: (scoreDelta: number) => void;
  onEndGame: () => void;
}) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isForbiddenRevealed, setForbiddenRevealed] = useState(false);
  const [isActive, setIsActive] = useState(true);
  
  const currentCard = state.deck[state.currentCardIndex];
  const currentPlayer = state.players[state.currentPlayerIndex];

  // Reset state when card changes
  useEffect(() => {
    setTimeLeft(60);
    setForbiddenRevealed(false);
    setIsActive(true);
  }, [state.currentCardIndex]);

  // Timer
  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const progress = (state.currentRound / (state.settings.roundCount === 999 ? 100 : state.settings.roundCount)) * 100;
  
  const isAction = currentCard?.type === CardType.ACTION;
  const isEvent = currentCard?.type === CardType.EVENT;

  return (
    <div className="h-full flex flex-col relative px-4 py-2 z-10 pb-16">
      
      {/* 1. Header Section (Fixed Height) */}
      <div className="shrink-0 space-y-2 mb-2">
        {/* Top Info Bar */}
        <div className="flex items-center justify-between glass rounded-full px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-xs shadow-lg">
               {currentPlayer.name.charAt(0)}
            </div>
            <span className="font-bold text-white text-sm truncate max-w-[120px]">
               {currentPlayer.name}
            </span>
          </div>
          <div className="font-mono font-bold text-white/80 text-sm">
             Round {state.currentRound}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      {/* 2. Main Content Area (Flexible Height) */}
      <div className="flex-1 min-h-0 flex flex-col gap-2 relative perspective-1000 mb-2">
         {/* Main Card */}
         <motion.div 
            key={currentCard?.id}
            initial={{ rotateX: 20, opacity: 0, scale: 0.95 }}
            animate={{ rotateX: 0, opacity: 1, scale: 1 }}
            exit={{ rotateX: -20, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`flex-1 w-full rounded-[24px] p-6 flex flex-col items-center justify-between shadow-2xl border overflow-hidden
              ${isAction ? 'bg-gradient-to-br from-primary-900/80 to-primary-600/50 border-primary-500/30' : 
                isEvent ? 'bg-gradient-to-br from-accent-900/80 to-accent-600/50 border-accent-500/30' : 
                'glass-card border-white/10'} 
            `}
          >
            {/* Tag */}
            <div className="w-full flex justify-center shrink-0">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md border shadow-md
                ${isAction ? 'bg-primary-500/20 border-primary-500/30 text-primary-200' : 
                  isEvent ? 'bg-accent-500/20 border-accent-500/30 text-accent-200' : 
                  'bg-white/10 border-white/10 text-white/70'}`}>
                {currentCard?.type.replace('TALK_', '').replace('_', ' ')}
              </span>
            </div>

            {/* Content (Scrollable internally) */}
            <div className="flex-1 flex flex-col items-center justify-center text-center w-full overflow-y-auto my-2 scrollbar-hide px-2">
              {isAction && <div className="text-4xl mb-4 animate-bounce">⚡️</div>}
              {isEvent && <div className="text-4xl mb-4 animate-pulse">🎁</div>}
              <h3 className="text-xl md:text-3xl font-bold text-white leading-relaxed break-keep drop-shadow-lg">
                {currentCard?.content}
              </h3>
              {isAction && <p className="mt-4 text-primary-200 text-xs md:text-sm">* 즉시 수행하세요! *</p>}
            </div>

            {/* Timer Dots */}
             <div className="w-full shrink-0 mt-2 flex items-center justify-center gap-2 opacity-50">
               <div className={`w-2 h-2 rounded-full ${timeLeft % 2 === 0 ? 'bg-white' : 'bg-transparent'}`}></div>
             </div>
         </motion.div>

         {/* Forbidden Word Peek (Fixed height, pushed below card) */}
         {state.settings.useForbidden && currentCard?.forbiddenWords && (
           <motion.div className="shrink-0 w-full">
              <button 
                onTouchStart={() => setForbiddenRevealed(true)}
                onTouchEnd={() => setForbiddenRevealed(false)}
                onMouseDown={() => setForbiddenRevealed(true)}
                onMouseUp={() => setForbiddenRevealed(false)}
                className={`w-full p-3 rounded-2xl border transition-all duration-200 flex flex-col items-center gap-1
                  ${isForbiddenRevealed 
                    ? 'bg-accent-900/80 border-accent-500 text-white' 
                    : 'glass text-neutral-400 hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-2 text-sm font-bold">
                  {isForbiddenRevealed ? <EyeOff size={16}/> : <Eye size={16}/>}
                  <span>{isForbiddenRevealed ? '놓으면 숨겨집니다' : '금지어 확인 (꾹 누르세요)'}</span>
                </div>
                
                {isForbiddenRevealed && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-wrap gap-2 justify-center mt-1"
                  >
                    {currentCard.forbiddenWords.map((word, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-accent-500 text-white text-xs rounded-md font-bold shadow-sm">
                        {word}
                      </span>
                    ))}
                  </motion.div>
                )}
              </button>
           </motion.div>
         )}
      </div>

      {/* 3. Footer Controls (Fixed Height) */}
      <div className="shrink-0 mt-1">
        <div className="grid grid-cols-4 gap-2">
          {state.settings.useForbidden && (
            <Button variant="glass" className="col-span-1 bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 border-accent-500/30 py-3" onClick={() => onNext(0)}>
              <div className="flex flex-col items-center">
                 <X size={20} />
                 <span className="text-[10px] mt-1 font-bold">실패</span>
              </div>
            </Button>
          )}
          <Button variant="glass" className={`${state.settings.useForbidden ? 'col-span-1' : 'col-span-2'} py-3`} onClick={() => onNext(0)}>
             <div className="flex flex-col items-center">
               <RefreshCw size={20} />
               <span className="text-[10px] mt-1 font-bold">패스</span>
             </div>
          </Button>
          <Button variant="primary" className="col-span-2 py-3" onClick={() => onNext(1)}>
            <div className="flex flex-col items-center">
               <Check size={20} />
               <span className="text-[10px] mt-1 font-bold">성공 (+1)</span>
            </div>
          </Button>
        </div>
        
         <div className="flex justify-center mt-2">
            <button onClick={onEndGame} className="text-xs text-white/30 underline hover:text-white/60 transition-colors p-2">
              게임 종료하기
            </button>
         </div>
      </div>
    </div>
  );
};

// 5. RESULT
const ResultScreen = ({ state, onRestart }: { state: GameState; onRestart: () => void }) => {
  const sortedPlayers = [...state.players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  const shareResult = async () => {
    const text = `🏆 Talk & Joy 결과 🏆\n\n1등: ${winner.name} (${winner.score}점)\n\n오늘의 토크: "${state.bestMoments[0]?.content || '재밌었다!'}"\n\n#TalkAndJoy #파티게임`;
    
    const shareData = {
      title: 'Talk & Joy 결과',
      text: text,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share failed or canceled", err);
      }
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert("결과가 클립보드에 복사되었습니다!");
      });
    }
  };

  return (
    <div className="h-full overflow-y-auto px-6 py-8 flex flex-col relative z-10 pb-24">
       <div className="text-center mb-8 mt-4">
         <motion.div 
           initial={{ scale: 0, rotate: -180 }}
           animate={{ scale: 1, rotate: 0 }}
           transition={{ type: "spring", stiffness: 200 }}
           className="w-24 h-24 bg-gradient-to-tr from-primary-400 to-secondary-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(168,85,247,0.5)]"
         >
           <Trophy size={48} className="text-white drop-shadow-md" />
         </motion.div>
         <h2 className="text-4xl font-black text-white mb-2 italic tracking-tighter">GAME OVER</h2>
         <p className="text-neutral-400">오늘의 MVP는 누구?</p>
       </div>

       {/* Scoreboard */}
       <div className="glass-card rounded-3xl p-6 mb-8">
         {sortedPlayers.map((player, idx) => (
           <motion.div 
             initial={{ x: -20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: idx * 0.1 }}
             key={player.id} 
             className="flex items-center justify-between py-4 border-b border-white/10 last:border-0"
           >
             <div className="flex items-center gap-4">
               <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-lg
                 ${idx === 0 ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/50' : 'bg-white/10 text-neutral-400'}`}>
                 {idx + 1}
               </div>
               <span className={`text-lg ${idx === 0 ? 'text-white font-bold' : 'text-neutral-300'}`}>
                 {player.name}
               </span>
               {idx === 0 && <Crown size={18} className="text-yellow-400 animate-pulse" />}
             </div>
             <span className="font-mono font-bold text-2xl text-white">{player.score}</span>
           </motion.div>
         ))}
       </div>

       {/* Best Moments */}
       {state.bestMoments.length > 0 && (
         <div className="mb-8">
           <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4 text-center">오늘의 하이라이트</h3>
           <div className="space-y-3">
             {state.bestMoments.map((card, idx) => (
               <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                 <p className="text-sm text-neutral-200 text-center">"{card.content}"</p>
               </div>
             ))}
           </div>
         </div>
       )}

       <div className="mt-auto flex flex-col gap-3">
         <Button onClick={shareResult} variant="secondary">
           <Share2 size={18} /> 공유하기
         </Button>
         <Button onClick={onRestart} variant="primary">
           <RefreshCw size={18} /> 다시 하기
         </Button>
       </div>
    </div>
  );
};


// ------------------------------------------------------------------
// MAIN APP COMPONENT
// ------------------------------------------------------------------

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    phase: GamePhase.HOME,
    settings: {
      playerCount: 3,
      isTeamMode: false,
      categories: [],
      useForbidden: true,
      useAction: true,
      roundCount: 10
    },
    players: [],
    currentPlayerIndex: 0,
    currentRound: 1,
    deck: [],
    currentCardIndex: 0,
    scores: {},
    bestMoments: []
  });

  const [tempSettings, setTempSettings] = useState<GameSettings | null>(null);

  // Prepare Deck & Players
  const initializeGame = (settings: GameSettings, names: string[]) => {
    // 1. Create Players with names
    const players: Player[] = Array.from({ length: settings.playerCount }, (_, i) => ({
      id: i + 1,
      name: names[i].trim() || `플레이어 ${i + 1}`,
      score: 0
    }));

    // 2. Build Deck
    let deck: Card[] = [];
    settings.categories.forEach(cat => {
      if (ALL_CARDS[cat]) {
        deck = [...deck, ...ALL_CARDS[cat]];
      }
    });

    // Shuffle Deck
    deck = deck.sort(() => Math.random() - 0.5);

    // Apply Forbidden words dynamically to Talk cards if enabled
    if (settings.useForbidden) {
      deck = deck.map(card => {
        if (card.type.toString().startsWith('TALK')) {
          return { ...card, forbiddenWords: getRandomForbiddenWords() };
        }
        return card;
      });
    }

    setGameState({
      phase: GamePhase.PLAY,
      settings,
      players,
      currentPlayerIndex: 0,
      currentRound: 1,
      deck,
      currentCardIndex: 0,
      scores: players.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}),
      bestMoments: []
    });
  };

  const handleNextTurn = (scoreDelta: number) => {
    setGameState(prev => {
      const currentPlayerId = prev.players[prev.currentPlayerIndex].id;
      const newScores = { 
        ...prev.scores, 
        [currentPlayerId]: (prev.scores[currentPlayerId] || 0) + scoreDelta 
      };

      const newPlayers = prev.players.map(p => 
        p.id === currentPlayerId ? { ...p, score: newScores[currentPlayerId] } : p
      );
      
      let newBestMoments = [...prev.bestMoments];
      // Logic: Save card if it was an action or got a point, up to 3
      if ((scoreDelta > 0 || prev.deck[prev.currentCardIndex].type === CardType.ACTION) && newBestMoments.length < 3) {
         newBestMoments.push(prev.deck[prev.currentCardIndex]);
      } else if (scoreDelta > 0 && Math.random() > 0.8) {
         newBestMoments[Math.floor(Math.random() * 3)] = prev.deck[prev.currentCardIndex];
      }

      const nextCardIndex = prev.currentCardIndex + 1;
      const nextPlayerIndex = (prev.currentPlayerIndex + 1) % prev.settings.playerCount;
      const nextRound = nextPlayerIndex === 0 ? prev.currentRound + 1 : prev.currentRound;

      if (nextCardIndex >= prev.deck.length || (prev.settings.roundCount !== 999 && nextRound > prev.settings.roundCount)) {
        return {
          ...prev,
          phase: GamePhase.RESULT,
          scores: newScores,
          players: newPlayers,
          bestMoments: newBestMoments
        };
      }

      return {
        ...prev,
        players: newPlayers,
        scores: newScores,
        currentCardIndex: nextCardIndex,
        currentPlayerIndex: nextPlayerIndex,
        currentRound: nextRound,
        bestMoments: newBestMoments
      };
    });
  };

  const forceEndGame = () => {
    setGameState(prev => ({ ...prev, phase: GamePhase.RESULT }));
  };

  const restartGame = () => {
    setTempSettings(null);
    setGameState(prev => ({ ...prev, phase: GamePhase.HOME }));
  };

  return (
    <div className="w-full h-[100dvh] bg-dark-950 text-white font-sans overflow-hidden flex justify-center selection:bg-primary-500 selection:text-white">
      {/* Background container handled inside components or here globally */}
      <div className="w-full max-w-lg h-full relative shadow-2xl overflow-hidden bg-dark-900">
        <BackgroundEffect />

        {/* Content Container */}
        <div className="relative z-10 w-full h-full">
          <AnimatePresence mode="wait">
            {gameState.phase === GamePhase.HOME && (
              <motion.div 
                key="home"
                className="h-full"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <HomeScreen onStart={() => setGameState(prev => ({ ...prev, phase: GamePhase.SETUP }))} />
              </motion.div>
            )}

            {gameState.phase === GamePhase.SETUP && (
              <motion.div 
                key="setup"
                className="h-full"
                initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
              >
                <SetupScreen onNext={(settings) => {
                  setTempSettings(settings);
                  setGameState(prev => ({...prev, phase: GamePhase.NAMES}));
                }} />
              </motion.div>
            )}

            {gameState.phase === GamePhase.NAMES && tempSettings && (
              <motion.div 
                key="names"
                className="h-full"
                initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}
              >
                <NamesScreen 
                  count={tempSettings.playerCount} 
                  onStart={(names) => initializeGame(tempSettings, names)} 
                />
              </motion.div>
            )}

            {gameState.phase === GamePhase.PLAY && (
              <motion.div 
                key="play"
                className="h-full"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                <PlayScreen state={gameState} onNext={handleNextTurn} onEndGame={forceEndGame} />
              </motion.div>
            )}

            {gameState.phase === GamePhase.RESULT && (
              <motion.div 
                key="result"
                className="h-full"
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              >
                <ResultScreen state={gameState} onRestart={restartGame} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Banner */}
        <a 
          href="https://forms.gle/SgXu6racBQMffgw6A" 
          target="_blank" 
          rel="noreferrer"
          className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-primary-900/90 to-secondary-900/90 backdrop-blur-md z-50 flex items-center justify-center gap-2 border-t border-white/10 hover:brightness-110 transition-all text-decoration-none group cursor-pointer"
        >
          <span className="text-xs font-bold text-white/90 group-hover:text-white tracking-wide">
            🚀 초등학생도 가능한 앱개발
          </span>
          <ChevronRight size={12} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all"/>
        </a>

      </div>
    </div>
  );
}