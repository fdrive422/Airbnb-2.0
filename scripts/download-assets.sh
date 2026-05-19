#!/usr/bin/env bash
# Downloads all project image assets to /public/images/
# Run from repo root: bash scripts/download-assets.sh
set -e
BASE="https://images.unsplash.com"
CITIES="public/images/cities"
PROPS="public/images/properties"
FEAT="public/images"
mkdir -p "$CITIES" "$PROPS" "$FEAT"

dl() {
  local out="$1" url="$2"
  if [ -f "$out" ]; then echo "  skip  $out (exists)"; return; fi
  if curl -L -k -s -f -o "$out" "$url"; then
    echo "  ok    $out"
  else
    echo "  FAIL  $out — $url" >&2
  fi
}

echo "=== Feature images ==="
dl "$FEAT/banner.jpg"   "$BASE/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1920&q=80"
dl "$FEAT/outdoors.jpg" "$BASE/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80"

echo "=== City thumbnails ==="
dl "$CITIES/new-york.jpg"      "$BASE/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/miami.jpg"         "$BASE/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/los-angeles.jpg"   "$BASE/photo-1579963333765-b4129b3250fc?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/chicago.jpg"       "$BASE/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/san-francisco.jpg" "$BASE/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/austin.jpg"        "$BASE/photo-1531218150217-54595bc2b934?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/nashville.jpg"     "$BASE/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/seattle.jpg"       "$BASE/photo-1438401171849-74ac270044ee?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/london.jpg"        "$BASE/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/paris.jpg"         "$BASE/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/dubai.jpg"         "$BASE/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/manchester.jpg"    "$BASE/photo-1567696153798-9111f9cd3d0d?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/liverpool.jpg"     "$BASE/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/york.jpg"          "$BASE/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/cardiff.jpg"       "$BASE/photo-1579541671172-43429ce17aca?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/birkenhead.jpg"    "$BASE/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/newquay.jpg"       "$BASE/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=75"
dl "$CITIES/hove.jpg"          "$BASE/photo-1467226632440-65f0b4957563?auto=format&fit=crop&w=300&q=75"

echo "=== Property images (search results) ==="
dl "$PROPS/p01.jpg" "$BASE/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p02.jpg" "$BASE/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p03.jpg" "$BASE/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p04.jpg" "$BASE/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p05.jpg" "$BASE/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p06.jpg" "$BASE/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p07.jpg" "$BASE/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p08.jpg" "$BASE/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p09.jpg" "$BASE/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p10.jpg" "$BASE/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p11.jpg" "$BASE/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p12.jpg" "$BASE/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p13.jpg" "$BASE/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p14.jpg" "$BASE/photo-1543489822-c49534f3271f?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p15.jpg" "$BASE/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p16.jpg" "$BASE/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p17.jpg" "$BASE/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p18.jpg" "$BASE/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p19.jpg" "$BASE/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=75"
dl "$PROPS/p20.jpg" "$BASE/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=600&q=75"

echo "=== Done ==="
