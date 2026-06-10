import re

with open(r'c:\Users\User\code\deepcalm-ai\src\content\custom-content\index.ts', 'rb') as f:
    data = f.read()

lines = data.split(b'\n')
total_lines = len(lines)
print(f'Total lines: {total_lines}')

# 1. Check for zero-width spaces (U+200B, U+200C, U+200D, U+FEFF)
zw_chars = {b'\xe2\x80\x8b': 'U+200B ZWSP', b'\xe2\x80\x8c': 'U+200C ZWNJ', 
            b'\xe2\x80\x8d': 'U+200D ZWJ', b'\xef\xbb\xbf': 'U+FEFF BOM'}
for i, line in enumerate(lines, 1):
    for zw_bytes, zw_name in zw_chars.items():
        if zw_bytes in line:
            print(f'  ⚠️  L{i}: Found {zw_name}! pos={line.index(zw_bytes)}')

# 2. Check lines 28-31 specifically (around the error)
print('\n--- Hex dump of lines 28-31 ---')
for i in range(27, 32):
    line = lines[i]
    # Show first 80 bytes and last 80 bytes
    print(f'\nL{i+1} ({len(line)} bytes):')
    prefix = line[:80]
    suffix = line[-80:] if len(line) > 80 else b''
    print(f'  start: {" ".join(f"{b:02x}" for b in prefix)}')
    print(f'  start_text: {prefix[:120]}')
    if suffix:
        print(f'  end:   {" ".join(f"{b:02x}" for b in suffix)}')
        print(f'  end_text:   {suffix}')

# 3. Check template literal balance per line
print('\n--- Template literal tracking ---')
for i in range(26, 50):
    line = lines[i]
    backtick_positions = [j for j, b in enumerate(line) if b == 0x60]  # backtick
    if backtick_positions:
        print(f'L{i+1}: backticks at positions {backtick_positions}')

# 4. Check for unescaped ${} inside template literals
print('\n--- ${} pattern check across whole file ---')
in_template = False
template_start_line = 0
for i, line in enumerate(lines, 1):
    for j, b in enumerate(line):
        if b == 0x60:  # backtick
            if not in_template:
                in_template = True
                template_start_line = i
            else:
                in_template = False
    if in_template:
        # Check for ${} inside this template
        dollar_idx = [j for j in range(len(line)) if line[j:j+2] == b'${']
        if dollar_idx:
            # Print context around each ${}
            for idx in dollar_idx:
                ctx = line[max(0,idx-10):idx+30]
                print(f'  Found ${{}} in template at L{i}, pos {idx}: {ctx}')

# 5. Check the overall backtick balance
total_backticks = data.count(b'`')
print(f'\nTotal backticks in file: {total_backticks} (should be even: {total_backticks % 2 == 0})')

# 6. Check for Unicode curly vs straight quotes near the error area
print('\n--- Unicode quoting check around lines 28-31 ---')
for i in range(27, 32):
    line = lines[i]
    # Check for Chinese-style fullwidth punctuation that might confuse parser
    for j, b in enumerate(line):
        if b >= 0x80:  # multi-byte start
            pass
