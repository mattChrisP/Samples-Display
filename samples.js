// Linear Bridge (codec align, fixed v1) — sample outputs.
// Each sample: an input question (Hokkien audio), and one answer text spoken
// by three different methods (identity baseline, native-text ceiling, trained
// linear bridge), plus the human-recorded reference answer for comparison.
const samples = [
  {
    id: "hc_s2s_990_02",
    input: { hanzi: "頭家，我想欲煮麵線，但是袂記怎樣煮會好食。你敢會使教我？", gloss: "Boss, I want to cook mee sua (wheat vermicelli) but I forgot how to cook it well. Can you teach me?" },
    answer: { hanzi: "會使啊！煮麵線其實真簡單。你是欲煮清湯的，抑是欲加料的？", gloss: "Sure! Cooking mee sua is actually quite simple. Do you want the clear-soup version, or one with extra ingredients?" },
     reference: { hanzi: "好啊，煮麵線無困難啦！你是欲煮紅蛋麵線，抑是欲煮那種加麻油個？", gloss: "Okay, cooking mee sua isn't hard at all! Do you want the red-egg mee sua, or the kind with sesame oil?" },
  },
  {
    id: "hc_s2s_991_02",
    input: { hanzi: "唉，我想欲買一台新的手提電腦，但是看彼個價數幾千箍，買不下手咧。心內真糾結。", gloss: "Sigh, I want to buy a new laptop, but seeing the price at a few thousand dollars, I can't bring myself to buy it. I'm really torn." },
    answer: { hanzi: "阿嬤，莫焦急。買電腦是大事，毋通看人講啥就買。你先共我講，你買電腦是欲做啥物用途？是欲拍影片，抑是欲做工用的？", gloss: "Grandma, don't worry. Buying a computer is a big decision, don't just buy because someone else said so. Tell me first — what will you use it for? Making videos, or work?" },
     reference: { hanzi: "德叔，莫急。幾千箍確實毋是小數目，你是欲買來做啥物用的？是為了做工，抑是平常時看戲、用來看股票的？", gloss: "Uncle Teck, don't rush. A few thousand dollars really isn't a small amount — what will you use it for? Work, or everyday things like watching shows and checking stocks?" },
  },
  {
    id: "hc_s2s_991_04",
    input: { hanzi: "主要攏是看戲、佮朋友傳訊息，有時陣看下股票按呢。本來我彼台用十冬矣，現在真慢，按呢值得買新的無？", gloss: "Mainly for watching shows and messaging friends, sometimes checking stocks. My current one is already 10 years old and is very slow now — is it worth buying a new one?" },
    answer: { hanzi: "若是純粹看戲抑是傳訊息，十寸已經夠矣。你若驚慢，敢是講你平時有咧用手機拍相，抑是看影片？", gloss: "If it's just for watching shows or messaging, a 10-inch screen is enough. If you're worried about slowness, do you usually use your phone for photos or watching videos?" },
     reference: { hanzi: "十冬矣啊！彼台確實已經是一個老古董囉。既然你要求無懸，其實毋免買遐貴的高檔貨，買規格一般般、順順仔好用就夠矣。", gloss: "Ten years already! That one really is an antique now. Since your requirements aren't high, you don't need something expensive — a mid-range, easy-to-use one is enough." },
  },
  {
    id: "hc_s2s_991_06",
    input: { hanzi: "按呢講也是，我驚買太貴，用無遐多功能也是浪費。你有推薦的款式無？", gloss: "That's true — I'm afraid of buying something too expensive and not using all the features, that would be a waste. Do you have any recommendations?" },
    answer: { hanzi: "免煩惱，我幫你揣幾款性價比真好的，等一下傳予你參考，按呢好無？", gloss: "No worries, I'll find a few good value-for-money options and send them over shortly for reference, is that okay?" },
     reference: { hanzi: "有，我幫你揣幾個口碑好閣價數合理的手提電腦，等一下傳給你看，你再參考看看，好無？", gloss: "Yes, I'll find a few laptops with good reviews and reasonable prices, and send them over shortly for reference — okay?" },
  },
  {
    id: "hc_s2s_992_02",
    input: { hanzi: "細妹，你會使幫我寫一個短訊予我查某囝無？", gloss: "Young lady, can you help me write a text message to my daughter?" },
    answer: { hanzi: "會使啊，無問題。伊是欲去佗位？你先共我講，我幫你寫。", gloss: "Sure, no problem. Where is she going? Tell me first and I'll help you write it." },
     reference: { hanzi: "會使啊，阿嬤。汝欲共伊講啥物代志？", gloss: "Sure, Grandma. What would you like to tell her?" },
  },
  {
    id: "hc_s2s_992_04",
    input: { hanzi: "我欲問伊拜六有閒無，欲叫伊轉來食暗頓。", gloss: "I want to ask if she's free on Saturday, to invite her home for dinner." },
    answer: { hanzi: "按呢啊，你通按呢寫：『明叔，拜六有閒無？若是有閒，咱去食好料的暗頓，好無？』", gloss: "In that case, you could write: 'Uncle Ming, are you free on Saturday? If so, let's go have a nice dinner, okay?'" },
     reference: { hanzi: "按呢好啊！我幫汝寫：「下禮拜六有閒無？轉來厝內食暗頓，我煮汝上愛食的菜。」按呢夠好無？", gloss: "Okay then! I'll write it for you: 'Are you free next Saturday? Come home for dinner, I'll cook your favorite dish.' Good enough?" },
  },
  {
    id: "hc_s2s_992_06",
    input: { hanzi: "好，足好矣，多謝汝啊。", gloss: "Good, that's great, thank you." },
    answer: { hanzi: "袂客氣，阿嬤，祝你食甲歡喜！", gloss: "You're welcome, Grandma — wish you a pleasant meal!" },
     reference: { hanzi: "袂啥物，這是我應該做的。阿嬤，若閣有啥物需要，隨時共我講。", gloss: "It's nothing, this is what I should do. Grandma, let me know anytime if you need anything else." },
  },
  {
    id: "hc_s2s_993_02",
    input: { hanzi: "哎，助手，我想欲問你一下，人講彼個『複利』到底是什麼意思啊？", gloss: "Hey assistant, what does 'compound interest' actually mean?" },
    answer: { hanzi: "美玲姐，你好！「複利」就是「利滾利」的意思。簡單講，你賺到的利息，閣會變做本金，閣去賺利息，按呢就一直加加，時間越久，賺的就越多。", gloss: "Hello Sister Meiling! 'Compound interest' means 'interest on interest.' Simply put, the interest you earn becomes part of the principal, which earns more interest — so it keeps adding up, and the longer it goes, the more you earn." },
     reference: { hanzi: "喔，複利啊？簡單講，就是你賺到的利息，會佮本金摻做伙，變做下一期的本金，閣去滾出一寡新的利息。按呢你了解未？", gloss: "Oh, compound interest? Simply put, the interest you earn combines with the principal, becoming next period's principal, which generates new interest. Understand now?" },
  },
  {
    id: "hc_s2s_993_04",
    input: { hanzi: "啊，我差不多聽有啦。所以就是錢滾錢，對無？", gloss: "Ah, I roughly get it now. So it's money making money, right?" },
    answer: { hanzi: "完全正確！你真聰明。閣有想欲聽別的無？", gloss: "Exactly right! You're smart. Anything else you'd like to know?" },
     reference: { hanzi: "講甲真著！就是錢滾錢。若是一個長期的過程，其實會足驚人喔。", gloss: "Exactly right! It's money making money. Over a long period, it can actually be quite astonishing." },
  },
  {
    id: "hc_s2s_993_06",
    input: { hanzi: "敢是講，我若欲儲錢，愛趁早開始？", gloss: "So does that mean if I want to save money, I should start early?" },
    answer: { hanzi: "著啊，就是按呢！趁早開始，時間就是你的朋友。", gloss: "Yes, exactly! Start early — time is your friend." },
     reference: { hanzi: "絕對是！時間越久，滾出來的效果就越好。你有考慮欲按怎開始儲了嗎？", gloss: "Absolutely! The longer it goes, the better the effect. Have you thought about how you'll start saving?" },
  },
  {
    id: "hc_s2s_993_08",
    input: { hanzi: "我目前是想講，每個月撥一小筆錢入去定存帳號。按呢敢會使？", gloss: "I'm thinking of putting a small amount into a fixed-deposit account every month. Would that work?" },
    answer: { hanzi: "會使啊！你按呢做，錢就會滾，時間越久，利息就越多。你敢有聽過複利？", gloss: "Yes, that works! Doing that, your money will grow — the longer it goes, the more interest you earn. Have you heard of compound interest?" },
     reference: { hanzi: "當然會使啊！按部就班，只要堅持落去，以後你會感謝現在的自己。", gloss: "Of course that works! Step by step — keep at it and you'll thank your present self later." },
  },
  {
    id: "hc_s2s_994_02",
    input: { hanzi: "細漢的時陣，老人家講毋通指月娘，指伊會割耳空，敢是按呢？", gloss: "When I was young, the elders said not to point at the moon, or it would cut your ear — is that true?" },
    answer: { hanzi: "是啊，阿嬤。以前的人驚囡仔無禮貌，指月娘會予月娘割耳空。你敢是有指月娘？", gloss: "Yes, Grandma. In the old days people worried children would be disrespectful, so they said pointing at the moon would make it cut your ear. Did you point at the moon?" },
     reference: { hanzi: "阿嬤，這是古早人的講法啦！伊主要是驚囝仔無禮貌，毋通對天頂的月娘指指點點。其實指月娘耳空哪會割破？這是嚇唬囝仔的話啦，妳毋通擔心。", gloss: "Grandma, that's just an old saying! It's meant to keep children from being disrespectful toward the moon in the sky. Pointing at the moon obviously can't cut your ear — it's just something to scare children, don't worry about it." },
  },
  {
    id: "hc_s2s_995_02",
    input: { hanzi: "細妹啊，我有一個鄰居真吵，半暝嘛咧敲牆壁，我真無爽。", gloss: "Young lady, I have a really noisy neighbor who bangs on the wall even in the middle of the night — I'm really annoyed." },
    answer: { hanzi: "阿嬤，莫氣。伊是按怎吵？是用工具敲，抑是用腳踏？", gloss: "Grandma, don't be angry. How exactly is he being noisy — banging with a tool, or stomping his feet?" },
     reference: { hanzi: "哎喲，按呢真艱苦。伊敢是逐工攏按呢？", gloss: "Oh dear, that sounds really tough. Does he do that every day?" },
  },
  {
    id: "hc_s2s_995_04",
    input: { hanzi: "是有時有時，毋過昨暝特別吵，吵甲我睏袂去。", gloss: "It happens sometimes, but last night was especially noisy — so noisy I couldn't sleep." },
    answer: { hanzi: "按呢就較嚴重矣。你敢有去共伊講過？", gloss: "That's more serious then. Have you talked to him about it?" },
     reference: { hanzi: "阿嬤，你敢有去共伊講過？抑是規氣去佮伊商量看覓？", gloss: "Grandma, have you talked to him about it? Or why not just go discuss it with him directly?" },
  },
  {
    id: "hc_s2s_995_06",
    input: { hanzi: "我有去敲門，伊攏無應我，閣更加大聲。", gloss: "I went and knocked on his door, he didn't answer at all, and it got even louder." },
    answer: { hanzi: "按呢就毋通閣去敲門。你敢有試過寫一張字條，放在伊門口？", gloss: "Then don't knock on his door again. Have you tried writing a note and leaving it at his door?" },
     reference: { hanzi: "按呢就真無禮貌矣。阿嬤，你敢欲叫厝邊頭尾抑是社區理事會（Town Council）來鬥幫忙？", gloss: "That's really rude then. Grandma, would you like the neighbors or the Town Council to help?" },
  },
  {
    id: "hc_s2s_995_08",
    input: { hanzi: "好啦，我下次去問看覓，感謝你啊細妹。", gloss: "Okay, I'll try asking next time — thank you, young lady." },
    answer: { hanzi: "袂客氣，阿嬤！有啥物代誌閣來問我。", gloss: "You're welcome, Grandma! Come ask me if anything else comes up." },
     reference: { hanzi: "免客氣，照顧好你的身體較重要。有代誌閣來問我。", gloss: "You're welcome — taking care of your health matters more. Come ask me if anything comes up." },
  },
  {
    id: "hc_s2s_996_02",
    input: { hanzi: "哎喲，助手啊，我最近咳甲足厲害，喉嚨嘛痛甲強欲燒聲，敢有啥物古早味的方法通補咧？", gloss: "Oh dear, assistant, I've been coughing really badly recently, and my throat hurts so much I'm almost losing my voice. Is there any old-fashioned remedy?" },
    answer: { hanzi: "哎，按呢真艱苦喔。你敢有發燒？抑是講除了咳，喉嚨敢有紅紅的？", gloss: "Oh, that sounds rough. Do you have a fever? Or besides coughing, is your throat red?" },
     reference: { hanzi: "哎呀，美玲，汝著愛顧身體啊！咳嗽傷久無好，喉嚨會受損。汝現在是乾咳，抑是有痰咧？", gloss: "Oh, Meiling, you need to take care of your health! A lingering cough can damage your throat. Is it a dry cough now, or is there phlegm?" },
  },
  {
    id: "hc_s2s_996_04",
    input: { hanzi: "攏是乾咳，咳甲胸坎攏痛。我看醫生食藥猶是按呢，想講敢有啥物食譜通食，親像燉冰糖梨仔抑是燉川貝按呢？", gloss: "It's all dry cough, coughing until my chest hurts. I saw a doctor and took medicine but it's still the same — is there some recipe I could try, like stewed pear with rock sugar, or stewed fritillary?" },
    answer: { hanzi: "按呢啊，你若是想欲食補，我建議你煮一鍋冰糖梨仔，抑是燉一點仔川貝燉梨，對喉嚨真好。毋過，你敢有試過用鹽水漱口，抑是用淡鹽水漱喉嚨？", gloss: "In that case, if you want a tonic, I'd suggest cooking rock-sugar pear soup, or stewing fritillary with pear — good for the throat. But have you tried gargling with salt water, or rinsing your throat with diluted salt water?" },
     reference: { hanzi: "燉冰糖梨仔是真有效，毋過汝愛記得，若是喉嚨發炎過頭，燥熱的物件就莫食。川貝母對那種燒聲、燥咳是真好用，汝敢有想欲煮點水來食？", gloss: "Stewed rock-sugar pear really works, but if your throat is very inflamed, avoid heaty foods. Fritillary bulb is very good for hoarseness and dry cough — want to boil some to drink?" },
  },
  {
    id: "hc_s2s_996_06",
    input: { hanzi: "好啊，我來去買點川貝，加淡薄仔冰糖來燉。多謝汝，聽汝按呢講，我心頭攏定落來矣。", gloss: "Okay, I'll go buy some fritillary and add a bit of rock sugar to stew. Thanks, hearing you say that has put my mind at ease." },
    answer: { hanzi: "免客氣啦！若是有發燒抑是痛甲袂當食，就愛趕緊去看醫生，毋通拖。", gloss: "You're welcome! If you get a fever or the pain gets so bad you can't eat, go see a doctor right away, don't delay." },
     reference: { hanzi: "毋免謝，這是我應該做的。燉好之後，記得食溫的，莫食傷燒。若是一禮拜猶無好勢，就定著愛閣去予醫生看喔！", gloss: "No need to thank me. After stewing it, eat it warm, not too hot. If it's still not better after a week, be sure to see a doctor again!" },
  },
  {
    id: "hc_s2s_997_02",
    input: { hanzi: "哎，助手啊，我今旦日予一個後生仔講到真無爽快。伊講我反應慢，態度真無禮貌。我其實想欲共伊講幾句，毋過毋想欲太粗魯，你有啥物好建議無？", gloss: "Hey assistant, today a young man really upset me. He said I was slow to react and rude. I want to say a few words back, but don't want to be too rude myself — any advice?" },
    answer: { hanzi: "美玲姐，莫氣莫氣。這種人講的話，確實是真無禮貌。敢是伊講的話，予你感覺真受氣？你敢有想欲先共伊講清楚，伊是按怎講你的？", gloss: "Sister Meiling, don't be angry. What that kind of person says really is rude. Did what he said make you really angry? Do you want to first tell him clearly how he spoke to you?" },
     reference: { hanzi: "哎喲，阿明伯，聽你按呢講，我攏會感覺氣憤。面對這種人，咱毋通予伊激到，不然咱就輸矣。敢是伊當時咧做物代志？抑是你有想欲達到啥物效果？", gloss: "Oh, Uncle Ah Ming, hearing that makes me angry too. Don't let this kind of person provoke you, or you'll be the one who loses. What was he doing? What outcome are you hoping for?" },
  },
  {
    id: "hc_s2s_997_04",
    input: { hanzi: "伊就是咧排隊，無耐心一直催。我無想欲吵架，只是想欲予伊知影伊按呢做真毋著，愛尊重長輩。", gloss: "He was just in line, impatient, kept rushing me. I don't want to argue — I just want him to know it's wrong, and that he should respect his elders." },
    answer: { hanzi: "按呢啊，你通按呢寫：『阿嬤，排隊是基本的禮貌，你若袂尊重長輩，我嘛袂使共你講。』按呢講，伊會知影你毋是咧找碴，是關心伊。", gloss: "In that case, you could say: 'Young man, queuing is basic manners; if you won't respect your elders, I have to say something.' Said this way, he'll know you're not picking a fight but that you care." },
     reference: { hanzi: "我了解矣。你通冷靜共伊講：『少年人，大家攏咧排隊，你按呢催嘛無較快，大家互相尊重一下好無？』按呢講，既有氣勢，又無失禮數，伊聽著應該會歹勢。", gloss: "I understand. You could calmly say: 'Young man, everyone is queuing, rushing won't make it faster — let's respect each other, okay?' Firm but polite, he should feel embarrassed hearing it." },
  },
  {
    id: "hc_s2s_998_02",
    input: { hanzi: "唉，我今日予人講到真無癮，遐個後生仔講話無大無細，我真想欲佮伊相罵，敢有法度好講？", gloss: "Sigh, someone really got on my nerves today. That young man spoke without any manners, and I really wanted to argue with him — is there a good way to handle it?" },
    answer: { hanzi: "哎喲，莫氣莫氣。俗語講：「忍一時風平浪靜」。伊是按怎講你的？你先講予我聽，我才好幫你參詳。", gloss: "Oh dear, don't be angry. As the saying goes: 'A moment of patience brings calm seas.' What did he say to you? Tell me first so I can help you think it through." },
     reference: { hanzi: "清福伯，我知影你心內一定真受氣。若是共伊相罵，最後也是家己受氣。敢是伊做啥事惹你無爽快？", gloss: "Uncle Cheng Hock, I know you must be upset inside. Arguing with him only hurts yourself in the end. What did he do to upset you?" },
  },
  {
    id: "hc_s2s_998_04",
    input: { hanzi: "伊講我做工慢，閣話講真難聽，明明是我負責的範圍，伊在那邊指指點點，真正是kancheong spider。", gloss: "He said I work too slowly, and spoke really unkindly — it's clearly my area of responsibility, yet he kept criticizing me. He's really a 'kancheong spider' (Singlish: someone who panics/overreacts)." },
    answer: { hanzi: "原來是按呢。你通按呢講：『我有咧做，毋過你若欲幫我，敢會使稍微分擔一點？』按呢講，既有禮貌，嘛會當共伊講你有咧負責。", gloss: "I see. You could say: 'I am working on it, but if you'd like to help, could you share some of the load?' That's polite, and it also tells him you are taking responsibility." },
     reference: { hanzi: "按呢來講，伊確實是失禮。伯，你通試看覓冷冷講：「多謝你的關心，毋過我有我的規矩，我一定會照程序做完。」", gloss: "In that case, he really was impolite. You could try saying coolly: 'Thanks for your concern, but I have my own way of doing things — I'll finish it following the proper steps.'" },
  },
  {
    id: "hc_s2s_998_06",
    input: { hanzi: "這句好喔，有禮貌閣會當予伊知影我毋是好予人欺負的。毋過伊若閣講無仝的廢話，我愛按怎回應？", gloss: "That line is good — polite, yet it lets him know I'm not someone to be pushed around. But if he keeps talking nonsense, how should I respond?" },
    answer: { hanzi: "若是伊閣講，你就笑笑仔應伊：『我知影你有你的想法，毋過我有我的計畫，咱以後有閒閣來討論。』按呢伊就無話通講矣。", gloss: "If he keeps talking, just smile and reply: 'I know you have your own opinion, but I have my own plan — let's discuss it another time when we're free.' Then he'll have nothing more to say." },
     reference: { hanzi: "若伊閣囉唆，你就笑一笑，共伊講：「若是你真急，敢是你想欲幫忙？毋若是的話，請予我空間做工。」", gloss: "If he keeps nagging, just smile and tell him: 'If you're really in a hurry, would you like to help? If not, please give me space to work.'" },
  },
  {
    id: "hc_s2s_998_08",
    input: { hanzi: "哈哈，這句真有力！伊若是聽著，一定毋敢閣講什物。多謝你啊，我心情好多了。", gloss: "Haha, that line is powerful! If he hears it, he definitely won't dare say anything more. Thank you, I feel much better now." },
    answer: { hanzi: "免客氣啦！有啥物代誌，隨時閣來揣我。祝你明仔載去朋友厝聚會順順利利，食甲歡喜！", gloss: "You're welcome! Come find me anytime if anything comes up. Wishing you a smooth gathering at your friend's place tomorrow, and a happy meal!" },
     reference: { hanzi: "袂啥物，清福伯！你有什物代誌隨時通揣我。莫予遐的人影響著你的心情，加油！", gloss: "It's nothing, Uncle Cheng Hock! Come find me anytime if something comes up. Don't let those people affect your mood — keep it up!" },
  },
  {
    id: "hc_s2s_999_02",
    input: { hanzi: "阿姨，我想欲買一台新的手提電腦，你敢有啥建議？", gloss: "Auntie, I want to buy a new laptop — do you have any suggestions?" },
    answer: { hanzi: "哎喲，買電腦是大事啊！你主要是欲用電腦來做什麼？是欲做工，抑是欲拍影片？", gloss: "Oh, buying a computer is a big deal! What will you mainly use it for — work, or making videos?" },
     reference: { hanzi: "愛買新的喔？袂變啊。你買來主要是欲做啥物用途咧？是欲做工，抑是欲看戲？", gloss: "Want to buy a new one? Sure thing. What will you mainly use it for — work, or watching shows?" },
  },
  {
    id: "hc_s2s_999_04",
    input: { hanzi: "主要是欲做工，愛開很多文檔，有時嘛會順紲剪接一點仔影片。", gloss: "Mainly for work — I need to open lots of documents, and sometimes I also edit a bit of video." },
    answer: { hanzi: "按呢的話，買一台好一點的筆電會較穩當。你有預算無？", gloss: "In that case, it's safer to get a better laptop. Do you have a budget in mind?" },
     reference: { hanzi: "按呢你愛買規格較好的，記憶體無通省。你有去電腦展看過了無？", gloss: "In that case you should get one with better specs — don't skimp on memory. Been to a computer expo to check it out?" },
  },
];

const methods = [
  { key: "identity", label: "Identity (baseline)", file: "identity.wav", note: "No trained bridge — raw pass-through, sanity-check baseline." },
  { key: "native_text_ceiling", label: "Native-text ceiling", file: "native_text_ceiling.wav", note: "Upper bound — synthesized straight from the answer text, bypassing the bridge entirely." },
  { key: "trained", label: "Trained (Linear Bridge v1)", file: "trained.wav", note: "The actual model under test: linear_bridge_codec_align_fixed_v1." },
];
