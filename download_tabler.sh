#!/bin/bash

OUTPUT_DIR="/tmp/tabler_svgs"
mkdir -p "$OUTPUT_DIR"

echo "Reading icon list..."
ICONS=()
while IFS= read -r line; do
  ICONS+=("$line")
done < /tmp/tabler_2000.txt
TOTAL=${#ICONS[@]}
echo "Total: $TOTAL icons"

OK=0
FAIL=0
i=0

for name in "${ICONS[@]}"; do
  svg_file="$OUTPUT_DIR/${name}.svg"
  url="https://api.iconify.design/tabler/${name}.svg"

  if curl -s --max-time 15 -o "$svg_file" "$url" 2>/dev/null; then
    if [ -s "$svg_file" ] && grep -q "^<svg" "$svg_file" 2>/dev/null; then
      ((OK++))
    else
      rm -f "$svg_file"
      ((FAIL++))
    fi
  else
    rm -f "$svg_file"
    ((FAIL++))
  fi

  if [ $(( (i+1) % 100 )) -eq 0 ]; then
    echo "Progress: $((i+1))/$TOTAL - OK: $OK, Fail: $FAIL"
  fi
  ((i++))
done

echo ""
echo "First pass: $OK OK, $FAIL failed"

if [ $FAIL -gt 0 ]; then
  echo "Retrying failed icons..."
  RETRY_OK=0
  STILL_FAIL=0
  for name in "${ICONS[@]}"; do
    svg_file="$OUTPUT_DIR/${name}.svg"
    if [ ! -s "$svg_file" ]; then
      url="https://api.iconify.design/tabler/${name}.svg"
      if curl -s --max-time 20 -o "$svg_file" "$url" 2>/dev/null; then
        if [ -s "$svg_file" ] && grep -q "^<svg" "$svg_file" 2>/dev/null; then
          ((RETRY_OK++))
        else
          rm -f "$svg_file"
          ((STILL_FAIL++))
        fi
      else
        rm -f "$svg_file"
        ((STILL_FAIL++))
      fi
    fi
  done
  echo "Retry recovered: $RETRY_OK, still failed: $STILL_FAIL"
fi

echo "Total downloaded: $(ls "$OUTPUT_DIR"/*.svg 2>/dev/null | wc -l | tr -d ' ')"
echo "Done downloading."