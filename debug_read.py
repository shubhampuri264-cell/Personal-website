
import sys

try:
    with open(r'c:\me files\Coding Projects\Personal Website\css\style.css', 'r', encoding='latin-1') as f:
        content = f.read()
        print(content)
except Exception as e:
    print(f"Latin-1 failed: {e}")
