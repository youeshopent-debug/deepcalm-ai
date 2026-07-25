"""
JSON 修复脚本 v4 — Python 实现，精确状态机

算法核心：
1. 字符级遍历，追踪是否在字符串内部 (in_string)
2. 字符串内遇到 " 时，检查后向非空白字符：
   - 后跟 , } ] → 结构闭合引号，结束字符串
   - 后跟 : → 再查冒号后是否跟 "（JSON key: value 模式），是则结构闭合，否则文本冒号→转义
   - 其他字符 → 内嵌引号，转义为 \"
3. 预处理：移除 TRAE 残留语法碎片
4. 最终用 json.loads() 验证
"""
import json
import os
import re
import sys

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                        'src', 'content', 'custom-content', 'data')
FILES = [
    'co-dependency.json',
    'dark-thoughts.json',
    'dependent-personality.json',
    'emotional-numbness.json',
    'panic-attack.json',
    'sleep-paralysis.json',
]

# Windows CP1252 终端兼容
STDOUT_ENC = sys.stdout.encoding or 'utf-8'


def safe_print(text: str):
    """安全打印，绕过 emoji 编码问题"""
    try:
        print(text)
    except UnicodeEncodeError:
        printable = text.encode(STDOUT_ENC, errors='replace').decode(STDOUT_ENC)
        print(printable)


def preprocess_trae(raw: str) -> str:
    """移除 TRAE 引入的语法碎片"""
    # 模式1: ["问题", ["答案"][],[""]] -> ["问题", "答案"]
    result = re.sub(
        r'\[\s*"([^"]*?)"\s*,\s*\[\s*"([^"]*?)"\s*\]\s*\[\]\s*,\s*\[""\]\s*\]',
        r'["\1", "\2"]',
        raw
    )
    # 模式2: 孤立的 ][],[""] 残留
    result = re.sub(r'\]\s*\[\]\s*,\s*\[""\]\s*', '', result)
    return result


def is_whitespace(ch: str) -> bool:
    return ch in ' \t\n\r'


def fix_json_content(raw: str) -> str:
    """修复 JSON 中的内嵌未转义引号"""
    n = len(raw)
    result = []
    i = 0
    in_string = False

    while i < n:
        ch = raw[i]

        # 转义序列：保持原样
        if ch == '\\' and i + 1 < n and in_string:
            result.append(ch)
            i += 1
            result.append(raw[i])
            i += 1
            continue

        if ch == '"':
            if not in_string:
                # 进入字符串
                in_string = True
                result.append(ch)
                i += 1
                continue
            else:
                # 在字符串内部遇到 " -> 判断是否为结构闭合
                # 查找后向非空白字符
                j = i + 1
                while j < n and is_whitespace(raw[j]):
                    j += 1
                next_nonws = raw[j] if j < n else '\0'

                if next_nonws in ',}]':
                    # 结构闭合：后跟 , } ]
                    in_string = False
                    result.append(ch)
                elif next_nonws == ':':
                    # 冒号情况：进一步判断是否为 JSON key: 分隔符
                    # JSON 值起始符有: " { [ t f n - 0-9
                    # 查冒号后的非空白字符是否是合法的 JSON 值起始符
                    k = j + 1
                    while k < n and is_whitespace(raw[k]):
                        k += 1
                    if k < n and raw[k] in '"{[-0123456789tf':
                        # "key": <value> 模式 -> 结构闭合
                        in_string = False
                        result.append(ch)
                    else:
                        # 文本冒号 -> 内嵌引号，转义
                        result.append('\\')
                        result.append(ch)
                else:
                    # 其他情况 -> 内嵌引号，转义
                    result.append('\\')
                    result.append(ch)
                i += 1
                continue

        # 普通字符
        result.append(ch)
        i += 1

    return ''.join(result)


def main():
    fixed = 0
    failed = 0
    clean = 0

    for file in FILES:
        fp = os.path.join(DATA_DIR, file)
        with open(fp, 'r', encoding='utf-8') as f:
            original = f.read()

        # 跳过已合法的
        try:
            json.loads(original)
            safe_print(f'[SKIP] {file}: 已合法，跳过')
            clean += 1
            continue
        except json.JSONDecodeError:
            pass

        safe_print(f'\n[FIX] {file}: 修复中...')

        # Step 1: 预处理 TRAE 碎片
        content = preprocess_trae(original)
        if content != original:
            safe_print('  -> TRAE 碎片已清理')

        # Step 2: 转义内嵌引号
        content = fix_json_content(content)

        # Step 3: 验证
        try:
            json.loads(content)
            with open(fp, 'w', encoding='utf-8') as f:
                f.write(content)
            safe_print('  [OK] 修复成功')
            fixed += 1
        except json.JSONDecodeError as e:
            safe_print(f'  [FAIL] 验证失败: {e}')
            pos = e.pos
            before = content[max(0, pos - 60):pos]
            after = content[pos:pos + 60]
            line_num = content[:pos].count('\n') + 1
            safe_print(f'   错误位置 {pos} (行 {line_num})')
            safe_print(f'   前文: {repr(before)}')
            safe_print(f'   后文: {repr(after)}')
            # 回滚
            with open(fp, 'w', encoding='utf-8') as f:
                f.write(original)
            failed += 1

    safe_print(f'\n{"=" * 30}')
    safe_print(f'结果: {clean} 干净, {fixed} 修复, {failed} 失败')


if __name__ == '__main__':
    main()
