// 获取DOM元素
const textInput = document.getElementById('text-input');
const wordCount = document.getElementById('word-count');
const copyButton = document.getElementById('copy-button');

// 添加输入事件监听器
textInput.addEventListener('input', function() {
    // 获取输入的文本
    const text = this.value;
    
    // 分析文本并生成结果
    const result = analyzeText(text);
    
    // 更新显示
    wordCount.textContent = result;
});

// 添加复制按钮点击事件
copyButton.addEventListener('click', async function() {
    try {
        // 获取统计结果文本
        const textToCopy = wordCount.textContent;
        
        // 复制到剪贴板
        await navigator.clipboard.writeText(textToCopy);
        
        // 更新按钮文本和样式
        this.textContent = '复制成功！';
        this.classList.add('success');
        
        // 2秒后恢复按钮状态
        setTimeout(() => {
            this.textContent = '复制结果';
            this.classList.remove('success');
        }, 2000);
    } catch (err) {
        console.error('复制失败:', err);
        this.textContent = '复制失败';
        
        // 2秒后恢复按钮状态
        setTimeout(() => {
            this.textContent = '复制结果';
        }, 2000);
    }
});

// 文本分析函数
function analyzeText(text) {
    // 按行分割文本，并移除空行
    const lines = text.split('\n').filter(line => line.trim());
    
    // 存储处理后的段落
    let processedParagraphs = [];
    
    // 计算总字数
    let totalCount = 0;
    
    // 处理每一行
    lines.forEach((line) => {
        // 去除行尾的句号和空格
        const cleanLine = line.replace(/。\s*$/, '').trim();
        
        if (cleanLine) {
            // 计算当前段落的字数
            const count = countChars(cleanLine);
            // 累加到总字数
            totalCount += count;
            // 添加字数统计，并在末尾加上句号
            processedParagraphs.push(`${cleanLine}。（${count}字）`);
        }
    });
    
    // 组合最终结果
    return `总字数：${totalCount}字\n\n${processedParagraphs.join('\n\n')}`;
}

// 字符计数函数
function countChars(text) {
    // 匹配中文字符和英文字母
    const matches = text.match(/[\u4e00-\u9fa5]|[a-zA-Z]/g) || [];
    return matches.length;
}