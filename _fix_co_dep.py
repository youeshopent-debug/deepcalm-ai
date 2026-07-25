"""
co-dependency.json 专用修复脚本 - 修复 TRAE 损坏的 FAQ 条目
"""
import json
import os
import sys

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                        'src', 'content', 'custom-content', 'data')
FP = os.path.join(DATA_DIR, 'co-dependency.json')

STDOUT_ENC = sys.stdout.encoding or 'utf-8'

def sp(text):
    try:
        print(text)
    except UnicodeEncodeError:
        print(text.encode(STDOUT_ENC, errors='replace').decode(STDOUT_ENC))

with open(FP, 'r', encoding='utf-8') as f:
    lines = f.readlines()

line8 = lines[7]

# 构造正确的第8行
question = '如何判断自己是否在共依赖关系中？'
answer = '三个自检问题：1) 你是否在对方情绪不好时感到焦虑？2) 你是否经常牺牲自己的需求来照顾对方？3) 你是否觉得\\"如果我不做，没人会做\\"？如果三个回答都是\\"是\\"，需要关注边界重建'
correct_line = '      ["' + question + '", "' + answer + '"]\n'

# 验证片段
test_json = '[' + correct_line.strip() + ']'
try:
    json.loads(test_json)
    sp('[OK] JSON 片段验证通过')
    
    lines[7] = correct_line
    with open(FP, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    # 完整验证
    with open(FP, 'r', encoding='utf-8') as f:
        content = f.read()
    try:
        json.loads(content)
        sp('[OK] 完整文件验证通过')
    except json.JSONDecodeError as e:
        sp('[FAIL] 完整文件验证失败: ' + str(e))
except json.JSONDecodeError as e:
    sp('[FAIL] JSON 片段验证失败: ' + str(e))
