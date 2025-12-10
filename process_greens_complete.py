import re
import json
import sys

# Read HTML from stdin
html = sys.stdin.read()

# Read existing JSON
with open('src/data/colors/shalimar_colors.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Extract all Greens colors
pattern = r'title="([^:]+):\s+([^"]+)"[^>]*><div[^>]*style="[^"]*background:(#[0-9A-Fa-f]+);?'
matches = re.findall(pattern, html, re.DOTALL)

greens_colors = []
for color_name, color_code, hex_code in matches:
    greens_colors.append({
        "colorName": color_name.strip().lower(),
        "colorCode": color_code.strip(),
        "colorHex": hex_code.upper()
    })

# Update JSON
data['colorTypes']['Greens'] = greens_colors
data['totalColors'] = sum(len(colors) for colors in data['colorTypes'].values())

with open('src/data/colors/shalimar_colors.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully processed {len(greens_colors)} Greens colors")
print(f"Total colors: {data['totalColors']}")
