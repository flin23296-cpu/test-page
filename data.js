// 题目数据
const QUESTIONS = [
  {
    id: 1,
    question: "你最害怕哪种「不理解」？",
    options: [
      { text: "爱的人突然变得陌生，像生活在不同的时间维度里", type: "time" },
      { text: "明明面对面，却永远无法真正听懂对方", type: "connection" },
      { text: "自己的身体或想法，和「正常人」不一样", type: "body" },
      { text: "自己的声音无法被世界听见", type: "silence" },
      { text: "被告知「你的记忆不重要，集体叙事才是真的」", type: "individual" },
      { text: "别人因为你是「缺陷品」而离开你", type: "acceptance" },
      { text: "一群人遵循着没人质疑的传统，而你感到不安", type: "truth" }
    ]
  },
  {
    id: 2,
    question: "以下哪种「连接」最打动你？",
    options: [
      { text: "即使时间流速不同，我们依然能陪彼此到最后", type: "time" },
      { text: "没有共同语言，却成了最好的朋友", type: "connection" },
      { text: "接纳自己最奇怪的那部分，依然被爱着", type: "body" },
      { text: "一个沉默的舞蹈，却说出了千言万语", type: "silence" },
      { text: "你是唯一记得某段历史的人，你的记忆很重要", type: "individual" },
      { text: "「就算你是克隆人，我也爱你」", type: "acceptance" },
      { text: "一个被所有人遗忘的角落，真相等待被挖掘", type: "truth" }
    ]
  },
  {
    id: 3,
    question: "你想拥有哪种能力？",
    options: [
      { text: "看到时间的不同层次（慢放、快进、静止）", type: "time" },
      { text: "用意念传递情绪，不需要语言", type: "connection" },
      { text: "多一双手，同时做更多事", type: "body" },
      { text: "在完全安静的世界里，用身体表达一切", type: "silence" },
      { text: "拥有只属于自己的秘密空间，外人无法进入", type: "individual" },
      { text: "陪一个「不被世界接受」的存在，建立新世界", type: "acceptance" },
      { text: "看穿虚假传统背后的真相", type: "truth" }
    ]
  },
  {
    id: 4,
    question: "面对「不同」，你更认同？",
    options: [
      { text: "「不同只是感知不同，爱可以跨越」", type: "time" },
      { text: "「不同语言的人，也能成为朋友」", type: "connection" },
      { text: "「接受自己的『多余』，那才是真实的你」", type: "body" },
      { text: "「当世界变安静，内心会告诉你真相」", type: "silence" },
      { text: "「个人记忆和集体历史同样重要」", type: "individual" },
      { text: "「没有『正常』和『异常』，只有不同」", type: "acceptance" },
      { text: "「质疑传统，才能找到真相」", type: "truth" }
    ]
  },
  {
    id: 5,
    question: "你更想探索什么？",
    options: [
      { text: "时间的本质——为什么同一空间里，时间流速不同？", type: "time" },
      { text: "沟通的本质——除了语言，还有什么能连接人心？", type: "connection" },
      { text: "身体的本质——什么才是「正常」的身体？", type: "body" },
      { text: "表达的本质——不用声音，还能怎么说话？", type: "silence" },
      { text: "记忆的本质——个人叙事vs集体叙事，谁更重要？", type: "individual" },
      { text: "爱的本质——爱一个人，需要理由吗？", type: "acceptance" },
      { text: "规则的本质——我们遵守的，真的是对的吗？", type: "truth" }
    ]
  },
  {
    id: 6,
    question: "你被哪种叙事打动？",
    options: [
      { text: "缓慢的时间里，藏着最温柔的爱", type: "time" },
      { text: "两个语言不通的人，却成了灵魂伴侣", type: "connection" },
      { text: "「接纳你最奇怪的部分」的勇气", type: "body" },
      { text: "无声世界里，一支孤独的舞蹈", type: "silence" },
      { text: "「你不是主流，但你很重要」", type: "individual" },
      { text: "「就算全世界不要你，我要」", type: "acceptance" },
      { text: "一个星球命运的谎言，等待被揭穿", type: "truth" }
    ]
  }
];

// 结果数据
const RESULTS = {
  time: {
    name: "时间感知型",
    keywords: ["时间感", "温柔", "耐心", "等待"],
    story: "摩天轮方程式",
    quote: "时间借由人类的大脑得以解读。有些人的一天就像另外一些人的半天那样流逝。",
    description: "你理解世界的方式，是承认「不同」的存在。你爱的人，可能活在和你不同的时间流里。但你相信，爱是同步的。你不急于被理解，也不急于理解一切。你愿意等待，像摩天轮慢慢转完那一圈。"
  },
  connection: {
    name: "非语言连接型",
    keywords: ["感知", "连接", "超越语言"],
    story: "息之影",
    quote: "让我爱上这里的那些东西，并没有减少我对这里的厌恶。这两者只是同时存在着，就像其他的所有事物一样。",
    description: "你相信人与人之间有比语言更深的东西。你们可能说着不同的「母语」，甚至来自完全不同的世界，但某个瞬间，粒子与粒子相遇，你懂了，不需要翻译。你不依赖言语表达，但你的感知力惊人。"
  },
  body: {
    name: "身体认知型",
    keywords: ["接纳", "完整", "勇气"],
    story: "劳拉",
    quote: "您不是也拥有虽然深爱却终究无法理解的东西吗？",
    description: "你一直觉得自己有「多余的」部分——别人看不见，但它在那里。你花了很久学会，不把它藏起来。接纳那个「不正常的自己」，不是选择，而是终于成为完整的自己。你懂：奇怪≠不正常。"
  },
  silence: {
    name: "沉默表达型",
    keywords: ["沉默", "表达", "反抗"],
    story: "玛丽之舞",
    quote: "迄今为止，一直在单方面努力迎合这个世界的是我们默格，不是你们。",
    description: "当世界变得安静，你反而听见了更多。你用身体说话，用沉默表达。在所有人都「失聪」之后，你依然起舞——那是一种反抗。你相信：真正的声音，不需要耳朵。"
  },
  individual: {
    name: "个体叙事型",
    keywords: ["记忆", "个体", "独特"],
    story: "认知空间",
    quote: "「我不会忘记第三个月亮的，还有你。」",
    description: "你被告知「你的记忆不重要」，但你知道那是谎言。属于个人的「无用」记忆，和「集体」的叙事同样重要。你是那个不被主流理解的人，但你拥有独一无二的认知空间。边缘不是缺陷，是另一种中心。"
  },
  acceptance: {
    name: "无条件接纳型",
    keywords: ["无条件爱", "接纳", "承诺"],
    story: "最后的拉伊奥妮",
    quote: "我这一生都在彷徨着，寻找自身缺陷的根源。",
    description: "你爱一个人，不需要「正常」作为前提。克隆人、缺陷品、被世界抛弃的存在——这些标签在你眼里都不重要。你愿意陪一个人去建造一个新世界，在那里，异常不再被当作异常。你的爱是：我接受你，不是因为你「够好」。"
  },
  truth: {
    name: "质疑真相型",
    keywords: ["质疑", "真相", "勇敢"],
    story: "久远的契约",
    quote: "我们被赋予的生命的时间，只不过是暂时借来的这颗行星的时间而已。",
    description: "你不盲从传统，哪怕所有人都在遵守。一个「规则」延续了几代人，你就质疑了几代人。在所有人都接受命运的世界里，你选择追问：为什么？你相信：真相值得被挖掘，哪怕那意味着打破安宁。"
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
