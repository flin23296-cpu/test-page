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
  // 统计各类型得分（Q1-Q6）
  const scores = {
    time: 0,
    connection: 0,
    body: 0,
    silence: 0,
    individual: 0,
    acceptance: 0,
    truth: 0
  };
  
  // Q7的I/E得分（仅用于平分决胜）
  let ieScore = 0; // 正数=I，负数=E
  
  // 每答对一题给1分
  answers.forEach((answer, index) => {
    const q = QUESTIONS[index];
    if (q.id <= 6) {
      scores[answer.type]++;
    } else {
      // Q7: I=+1, E=-1
      if (answer.type === 'I') ieScore++;
      else ieScore--;
    }
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
  
  // 处理平分：用Q7的I/E来决定
  const tiedTypes = Object.keys(scores).filter(type => scores[type] === maxScore);
  if (tiedTypes.length > 1) {
    if (ieScore > 0) {
      // I倾向：优先time
      maxType = tiedTypes.includes('time') ? 'time' : tiedTypes[0];
    } else {
      // E倾向：优先connection
      maxType = tiedTypes.includes('connection') ? 'connection' : tiedTypes[0];
    }
  }
  
  userResult = RESULTS[maxType];
  
  // 模拟加载效果
  setTimeout(() => {
    showResult();
  }, 1500);
}

// 显示结果
function showResult() {
  document.getElementById('resultType').textContent = `你是「${userResult.name}」`;
  document.getElementById('resultSlogan').textContent = userResult.slogan;
  // 描述有两段，用换行分隔
  const descParts = userResult.description.split('\n');
  document.getElementById('resultDescription').innerHTML = descParts.map(p => `<span>${p}</span>`).join('<br>');
  document.getElementById('resultQuote').textContent = userResult.quote;
  
  // 渲染故事简介
  const storyIntroContainer = document.getElementById('resultStoryIntro');
  storyIntroContainer.innerHTML = `
    <p class="result-intro-label">故事简介</p>
    <p class="result-story-intro-text">${userResult.storyIntro}</p>
  `;
  
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
  
  // 添加购书链接
  document.getElementById('buyLink').href = BUY_LINK;
  
  showPage('result');
}

// 生成分享图 - 简洁科幻风格
function generateShareImage() {
  showLoadingForShare();
  
  setTimeout(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 750;
    canvas.height = 1150;
    const ctx = canvas.getContext('2d');
    
    // 纯深色背景
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, 750, 1150);
    
    let y = 80;
    
    // 书名
    ctx.font = '28px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText('《刚刚离开的世界》', 375, y);
    y += 50;
    
    // 测试标题
    ctx.font = '32px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#00d4ff';
    ctx.fillText('属于你的故事测试', 375, y);
    y += 70;
    
    // 分隔线
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.moveTo(100, y);
    ctx.lineTo(650, y);
    ctx.stroke();
    y += 60;
    
    // 类型名
    ctx.font = 'bold 56px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(`「${userResult.name}」`, 375, y);
    y += 80;
    
    // 引用语
    ctx.font = 'italic 26px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#94a3b8';
    const quote = `"${userResult.quote}"`;
    const quoteLines = wrapTextCenter(ctx, quote, 600);
    quoteLines.forEach(line => {
      ctx.fillText(line, 375, y);
      y += 45;
    });
    y += 40;
    
    // 分隔线
    ctx.beginPath();
    ctx.moveTo(100, y);
    ctx.lineTo(650, y);
    ctx.stroke();
    y += 50;
    
    // 关键词
    ctx.font = '28px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#00d4ff';
    ctx.textAlign = 'center';
    const keywordsText = userResult.keywords.join('  |  ');
    ctx.fillText(keywordsText, 375, y);
    y += 60;
    
    // 解读
    ctx.font = '24px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#cbd5e1';
    const descLines = wrapTextCenter(ctx, userResult.description, 600);
    descLines.forEach(line => {
      ctx.fillText(line, 375, y);
      y += 40;
    });
    y += 40;
    
    // 分隔线
    ctx.beginPath();
    ctx.moveTo(100, y);
    ctx.lineTo(650, y);
    ctx.stroke();
    y += 50;
    
    // 故事名
    ctx.font = '26px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.fillText('你可能喜欢的故事是', 375, y);
    y += 55;
    ctx.font = 'bold 48px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#00d4ff';
    ctx.fillText(`《${userResult.story}》`, 375, y);
    y += 80;
    
    // 标签
    ctx.font = '24px "PingFang SC", "Microsoft YaHei", sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('#韩女文学  #金草叶  #科幻小说', 375, y);
    y += 15;
    
    // 底部装饰
    ctx.fillStyle = '#00d4ff';
    ctx.fillRect(320, 1060, 110, 4);
    
    // 显示预览
    const img = document.getElementById('shareImagePreview');
    img.src = canvas.toDataURL('image/png');
    
    ctx.textAlign = 'left';
    showPage('sharePreview');
  }, 500);
}

// 居中文字换行
function wrapTextCenter(ctx, text, maxWidth) {
  const lines = [];
  let currentLine = '';
  
  for (let char of text) {
    const testLine = currentLine + char;
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth) {
      lines.push(currentLine);
      currentLine = char;
    } else {
      currentLine = testLine;
    }
  }
  
  if (currentLine) {
    lines.push(currentLine);
  }
  
  return lines;
}

// 显示加载（用于分享图）
function showLoadingForShare() {
  showPage('loading');
  document.querySelector('#loading p').textContent = '正在生成分享图...';
}

// 下载分享图
async function downloadShareImage() {
  const img = document.getElementById('shareImagePreview');
  
  // 尝试使用原生分享/保存
  if (navigator.share && navigator.canShare) {
    const blob = await (await fetch(img.src)).blob();
    const file = new File([blob], `性格测试_${userResult.name}.png`, { type: 'image/png' });
    if (navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: '性格测试结果',
          text: `我是「${userResult.name}」，${userResult.slogan}`
        });
        return;
      } catch (e) {}
    }
  }
  
  // Android: 保存到相册
  if (/Android/i.test(navigator.userAgent)) {
    try {
      const blob = await (await fetch(img.src)).blob();
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result.split(',')[1];
        // 通过 a 标签下载
        const link = document.createElement('a');
        link.download = `性格测试_${userResult.name}.png`;
        link.href = img.src;
        link.click();
      };
      reader.readAsDataURL(blob);
      return;
    } catch (e) {}
  }
  
  // 兜底：普通下载
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
