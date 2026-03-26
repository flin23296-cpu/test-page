// 题目数据
const QUESTIONS = [
  {
    id: 1,
    question: "你坐在对面的人，近在咫尺，却好像活在另一个世界。那一刻你：",
    options: [
      { text: "TA的时间好像流得比我的慢……不，一定是我的错觉。", type: "time" },
      { text: "语言明明通了，为什么感觉还是隔着什么。", type: "connection" },
      { text: "TA的身体在动，但TA真的在里面吗？", type: "body" },
      { text: "我说了很多话，但安静下来的那个人是我。", type: "silence" },
      { text: "TA被告知"你不存在"，但我记得TA。", type: "individual" },
      { text: "TA不完整，我不在乎。", type: "acceptance" },
      { text: "所有人都在笑，只有我隐隐觉得哪里不对。", type: "truth" }
    ]
  },
  {
    id: 2,
    question: "最让你想哭的瞬间，是哪一种：",
    options: [
      { text: "等待一个人回应，等了很久很久，像过了一生。", type: "time" },
      { text: "我说的TA都听不懂，但TA做的我全都懂。", type: "connection" },
      { text: "\"你这样就不正常\"——说这话的人，其实不了解我。", type: "body" },
      { text: "我说不出话，但所有人都听见了。", type: "silence" },
      { text: "只有我记得那天。那天很重要，但没人记得。", type: "individual" },
      { text: "TA是残次品。但TA是我的。", type: "acceptance" },
      { text: "\"一直都这样\"——这四个字让我最不安。", type: "truth" }
    ]
  },
  {
    id: 3,
    question: "如果有一个按钮，按下去你会：",
    options: [
      { text: "放慢自己的时间，等TA慢慢追上来。", type: "time" },
      { text: "让我们之间不再需要语言。", type: "connection" },
      { text: "让世界接受那个\"多余\"的我。", type: "body" },
      { text: "让所有人听见，我无法用声音说出的话。", type: "silence" },
      { text: "进入一个只有我能进入的空间，那里存着所有人的记忆。", type: "individual" },
      { text: "让所有\"不被接受\"的存在，拥有一个家。", type: "acceptance" },
      { text: "看见那些所有人都不怀疑、但其实是假的规则。", type: "truth" }
    ]
  },
  {
    id: 4,
    question: "你更愿意相信什么：",
    options: [
      { text: "时间不是公平的，但爱可以同步。", type: "time" },
      { text: "懂一个人，不需要共同的语言。", type: "connection" },
      { text: "被说\"多余\"的那部分，是我自己。", type: "body" },
      { text: "真正的声音，耳朵听不见。", type: "silence" },
      { text: "集体忘了没关系，我还记得。", type: "individual" },
      { text: "爱一个人，不需要TA是完整的。", type: "acceptance" },
      { text: "大家都相信的，可能恰恰是错的。", type: "truth" }
    ]
  },
  {
    id: 5,
    question: "你最害怕失去什么：",
    options: [
      { text: "和TA同步的时间。", type: "time" },
      { text: "那种没有语言却彼此懂得的瞬间。", type: "connection" },
      { text: "那个被世界说不正常的自己。", type: "body" },
      { text: "安静下来才能听见的自己。", type: "silence" },
      { text: "只有我还在记得的那个人、那段过去。", type: "individual" },
      { text: "那个别人都不要、只有我要的存在。", type: "acceptance" },
      { text: "追问真相的勇气。", type: "truth" }
    ]
  },
  {
    id: 6,
    question: "你怎样定义\"陪伴\"：",
    options: [
      { text: "不是一起变老，而是一起感受同一段时间。", type: "time" },
      { text: "我们没有共同的过去，但有一生的默契。", type: "connection" },
      { text: "你奇怪的部分，我不打算修好它。", type: "body" },
      { text: "在所有人都失聪的世界里，我为你起舞。", type: "silence" },
      { text: "你是唯一记得那段历史的人，你的记忆就是证明。", type: "individual" },
      { text: "就算全世界说TA不该存在，我也要。", type: "acceptance" },
      { text: "陪你一起，把大家都相信的那个\"真相\"翻出来看看。", type: "truth" }
    ]
  }
];

// 结果数据
const RESULTS = {
  time: {
    name: "时间感知型",
    slogan: "有些人的一天，像另外一些人的半天那样流逝。但你们依然可以陪彼此走完。",
    keywords: ["时间感", "耐心", "等待"],
    story: "摩天轮方程式",
    quote: "时间借由人类的大脑得以解读。有些人的一天就像另外一些人的半天那样流逝。",
    description: "在那个故事里，有两个人坐在同一节摩天轮座舱里，却可能正在看着完全不同的风景。一个人觉得那一圈漫长得像永恒，另一个人觉得眨眼就过去了。但她们还是坐在一起。这大概是你也懂的事：爱不是让彼此同步，而是愿意陪着对方，走完各自的时间。"
  },
  connection: {
    name: "非语言连接型",
    slogan: "语言不通的两个人，却用一生读懂了彼此。",
    keywords: ["感知", "默契", "超越语言"],
    story: "息之影",
    quote: "让我爱上这里的那些东西，并没有减少我对这里的厌恶。这两者只是同时存在着，就像其他的所有事物一样。",
    description: "在那个故事里，有人无法用声音说话，有人无法用眼睛回应。但某种东西还是发生了——不是翻译，是比翻译更深的东西。你大概也遇见过那种人：你们的过去完全不同，语言甚至都不通，但某个瞬间，你就是知道TA在想什么。粒子与粒子相遇，不需要理由。"
  },
  body: {
    name: "身体认知型",
    slogan: "那些让你觉得自己奇怪的部分，恰恰是你最完整的地方。",
    keywords: ["接纳", "完整", "勇气"],
    story: "劳拉",
    quote: "您不是也拥有虽然深爱却终究无法理解的东西吗？",
    description: "在那个故事里，有人问：为什么我明明爱着TA，却始终无法理解TA？后来才明白——有些东西，不是用来理解的，是用来接受的。不是修复，不是解释，只是在那里，承认它就是你的一部分。你大概也是这样走过来的：从藏起那部分，到终于不打算修好它。"
  },
  silence: {
    name: "沉默表达型",
    slogan: "当世界安静下来，你才听见自己真正想说的话。",
    keywords: ["沉默", "身体", "反抗"],
    story: "玛丽之舞",
    quote: "迄今为止，一直在单方面努力迎合这个世界的是我们默格，不是你们。",
    description: "在那个故事里，有人用舞蹈说话——在所有人都失聪的世界里，用身体表达一切。那些动作不是为了被看见，而是因为不说出来就会窒息。你大概也知道那种感觉：语言太慢了，太轻了，太容易被听见又太容易被误解。真正的表达，从来不需要声音。"
  },
  individual: {
    name: "个体叙事型",
    slogan: "你的记忆不只是过去，它是你存在的证明。",
    keywords: ["记忆", "个体", "独特"],
    story: "认知空间",
    quote: "我不会忘记第三个月亮的，还有你。",
    description: "在那个故事里，有人被告知\"你的记忆不重要\"。但知道它存在的人，只有你自己。你是这个世界上唯一一个记得那件事的人——那份记忆是你的，也是它自己存在的理由。你大概也执着地记着什么：别人已经忘了，但你还在。因为那件事不是\"过去\"，是\"你是谁\"的证明。"
  },
  acceptance: {
    name: "无条件接纳型",
    slogan: "爱一个人，从来不需要前提。",
    keywords: ["无条件", "接纳", "承诺"],
    story: "最后的拉伊奥妮",
    quote: "我这一生都在彷徨着，寻找自身缺陷的根源。",
    description: "在那个故事里，有人被制造出来，然后被判定为\"不合格品\"。但有人握着那个不完整的手，说：你不是拉伊奥妮，但你和拉伊奥妮一样，值得被爱。那种爱不是因为我够好，而是因为TA要。你大概也懂这件事：真正珍贵的东西，从来不是因为它\"合格\"。"
  },
  truth: {
    name: "质疑真相型",
    slogan: "所有人都相信的，未必就是真的。",
    keywords: ["质疑", "真相", "追问"],
    story: "久远的契约",
    quote: "我们被赋予的生命的时间，只不过是暂时借来的这颗行星的时间而已。",
    description: "在那个故事里，所有人都接受了那个规则——它一直是这样，所以它是对的。但有人站在原地，问出了所有人都在回避的那个问题。你大概也有过这种时刻：周围的人都说\"别多想\"，但你没法不问。有些规则不是自然形成的，它只是从来没有人去质疑过。"
  }
};

// 书名
const BOOK_NAME = "";

// 购书链接
const BUY_LINK = "https://product.dangdang.com/30023084.html";

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTIONS, RESULTS, BOOK_NAME, BUY_LINK };
}
