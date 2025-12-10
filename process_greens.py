import re
import json
import sys

# Read HTML from stdin or command line argument
if len(sys.argv) > 1:
    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        html = f.read()
else:
    html = sys.stdin.read()

# Read existing JSON file
with open('src/data/colors/shalimar_colors.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Parse HTML to extract Greens colors
greens_colors = []

# Pattern to match: title="Color Name:  CODE" and style="...background:#HEX;" or "background:#HEX"
pattern = r'title="([^:]+):\s+([^"]+)"[^>]*><div[^>]*style="[^"]*background:(#[0-9A-Fa-f]+);?'

matches = re.findall(pattern, html)

for color_name, color_code, hex_code in matches:
    greens_colors.append({
        "colorName": color_name.strip().lower(),
        "colorCode": color_code.strip(),
        "colorHex": hex_code.upper()
    })

# Add Greens category to existing data
data['colorTypes']['Greens'] = greens_colors

# Update total colors count - sum all categories
total = sum(len(colors) for colors in data['colorTypes'].values())
data['totalColors'] = total

# Write back to file
with open('src/data/colors/shalimar_colors.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully added {len(greens_colors)} Greens colors to Shalimar")
print(f"Total colors now: {data['totalColors']}")
print(f"Categories: {list(data['colorTypes'].keys())}")

