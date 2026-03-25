// 测试状态
let currentQuestion = 0;
let answers = [];
let userResult = null;

// DOM 元素
const pages = {
  cover: document.getElementById('cover'),
  test: document.getElementById('test'),
  loading: document.getElementById('loading'),
  result: document.getElementById('result'),
  sharePreview: document.getElementById('sharePreview')
};

// 显示指定页面
function showPage(pageName) {
  Object.values(pages).forEach(page => page.classList.remove('active'));
  pages[pageName].classList.add('active');
}

// 开始测试
function startTest() {
  currentQuestion = 0;
  answers = [];
  showPage('test');
  renderQuestion();
}

// 渲染题目
function renderQuestion() {
  const question = QUESTIONS[currentQuestion];
  
  // 更新进度
  const progress = ((currentQuestion) / QUESTIONS.length) * 100;
  document.getElementById('progress').style.width = progress + '%';
  
  // 更新题目
  document.getElementById('questionNumber').textContent = `第 ${currentQuestion + 1} 题`;
  document.getElementById('questionText').textContent = question.question;
  
  // 渲染选项
  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = '';
  
  question.options.forEach((option, index) => {
    const optionEl = document.createElement('div');
    optionEl.className = 'option';
    optionEl.textContent = option.text;
    optionEl.onclick = () => selectOption(index, option.type);
    optionsContainer.appendChild(optionEl);
  });
}

// 选择选项
function selectOption(index, type) {
  answers.push({ index, type });
  
  // 视觉反馈
  const options = document.querySelectorAll('.option');
  options.forEach((opt, i) => {
    if (i === index) {
      opt.classList.add('selected');
    }
  });
  
  // 延迟进入下一题
  setTimeout(() => {
    currentQuestion++;
    
    if (currentQuestion < QUESTIONS.length) {
      renderQuestion();
    } else {
      showLoading();
    }
  }, 300);
}

// 显示加载
function showLoading() {
  showPage('loading');
  calculateResult();
}

// 计算结果
function calculateResult() {
  // 统计各类型得分
  const scores = {
    time: 0,
    connection: 0,
    body: 0,
    silence: 0,
    individual: 0,
    acceptance: 0,
    truth: 0
  };
  
  // 每答对一题给1分
  answers.forEach(answer => {
    scores[answer.type]++;
  });
  
  // 找出最高分
  let maxType = 'time';
  let maxScore = 0;
  
  Object.keys(scores).forEach(type => {
    if (scores[type] > maxScore) {
      maxScore = scores[type];
      maxType = type;
    }
  });
  
  userResult = RESULTS[maxType];
  
  // 模拟加载效果
  setTimeout(() => {
    showResult();
  }, 1500);
}

// 显示结果
function showResult() {
  document.getElementById('resultType').textContent = `你是「${userResult.name}」`;
  document.getElementById('resultDescription').textContent = userResult.description;
  document.getElementById('resultQuote').textContent = userResult.quote;
  
  // 渲染关键词
  const keywordsContainer = document.getElementById('keywords');
  keywordsContainer.innerHTML = '';
  userResult.keywords.forEach(keyword => {
    const span = document.createElement('span');
    span.className = 'keyword';
    span.textContent = keyword;
    keywordsContainer.appendChild(span);
  });
  
  // 渲染故事
  const storyContainer = document.getElementById('resultStory');
  storyContainer.innerHTML = `
    <p class="result-story-label">你可能喜欢的故事是</p>
    <p class="result-story-name">《${userResult.story}》</p>
  `;
  
  showPage('result');
}

// 生成分享图
function generateShareImage() {
  showLoadingForShare();
  
  setTimeout(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 750;
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    
    // 渐变背景
    const gradient = ctx.createLinearGradient(0, 0, 750, 1000);
    gradient.addColorStop(0, '#fafafa');
    gradient.addColorStop(1, '#e8e8e8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 750, 1000);
    
    // 顶部装饰线
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(50, 80, 60, 3);
    
    // 类型名
    ctx.fillStyle = '#2d3748';
    ctx.font = 'bold 36px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(`「${userResult.name}」`, 50, 150);
    
    // 引用语
    ctx.font = 'italic 22px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#4a5568';
    
    // 拆分引用语为多行
    const quote = `"${userResult.quote}"`;
    const quoteLines = wrapText(ctx, quote, 650);
    let y = 260;
    quoteLines.forEach(line => {
      ctx.fillText(line, 50, y);
      y += 40;
    });
    
    // 分隔线
    ctx.strokeStyle = '#d4d4d4';
    ctx.beginPath();
    ctx.moveTo(50, y + 20);
    ctx.lineTo(700, y + 20);
    ctx.stroke();
    
    // 关键词
    ctx.font = '20px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#718096';
    const keywordsText = userResult.keywords.join('  |  ');
    ctx.fillText(keywordsText, 50, y + 80);
    
    // 分隔线
    ctx.beginPath();
    ctx.moveTo(50, y + 120);
    ctx.lineTo(700, y + 120);
    ctx.stroke();
    
    // 故事名
    ctx.font = '24px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#2d3748';
    ctx.fillText(`你可能喜欢的故事是`, 50, y + 180);
    ctx.font = 'bold 32px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillText(`《${userResult.story}》`, 50, y + 230);
    
    // 书名
    ctx.font = '18px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#718096';
    ctx.fillText(BOOK_NAME, 50, y + 290);
    
    // 标签
    ctx.font = '16px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#a0aec0';
    ctx.fillText('#性格测试  #读书推荐  #韩女文学', 50, y + 340);
    
    // 底部装饰
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(50, 920, 60, 3);
    
    // 显示预览
    const img = document.getElementById('shareImagePreview');
    img.src = canvas.toDataURL('image/png');
    
    showPage('sharePreview');
  }, 500);
}

// 显示加载（用于分享图）
function showLoadingForShare() {
  showPage('loading');
  document.querySelector('#loading p').textContent = '正在生成分享图...';
}

// 下载分享图
function downloadShareImage() {
  const img = document.getElementById('shareImagePreview');
  const link = document.createElement('a');
  link.download = `性格测试_${userResult.name}.png`;
  link.href = img.src;
  link.click();
}

// 返回结果页
function goToResult() {
  showPage('result');
}

// 文字换行辅助函数
function wrapText(ctx, text, maxWidth) {
  const words = text.split('');
  const lines = [];
  let currentLine = '';
  
  words.forEach(char => {
    const testLine = currentLine + char;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth) {
      lines.push(currentLine);
      currentLine = char;
    } else {
      currentLine = testLine;
    }
  });
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
}

// 页面加载完成
document.addEventListener('DOMContentLoaded', () => {
  // 可以在这里添加初始化逻辑
});
