#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
apply-t1.py — Applique la Tranche 1 de remédiation au seed Firestore.

Actions :
  1. Backup horodaté de database/firestore-seed-data.json
  2. Déduplique les modules N1-N2 (garde l'id le plus petit, déplace les leçons)
  3. Supprime les leçons N1-N2 existantes (pauvres/dupliquées) et leurs questions
  4. Ajoute les 20 leçons riches de database/remediation-t1.json (ids 101-120)
  5. Génère 100 questions (5/leçon, ids 1001+) rattachées leçon + skill
  6. Réécrit le seed et affiche le récapitulatif
"""
import json
import shutil
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SEED = ROOT / "database" / "firestore-seed-data.json"
T1 = ROOT / "database" / "remediation-t1.json"
BACKUP_DIR = ROOT / "database" / "backups"

NOW = datetime.now(timezone.utc).isoformat()

# Mapping leçon (id) → skill (id) — arrêté lors de l'audit des 41 skills
LESSON_SKILL = {
    101: 1, 102: 19, 103: 1, 104: 9, 105: 21,
    106: 11, 107: 17, 108: 8, 109: 38, 110: 9,
    111: 2, 112: 2, 113: 3, 114: 5, 115: 6,
    116: 14, 117: 8, 118: 4, 119: 12, 120: 40,
}

def main() -> None:
    # --- 1. Backup -----------------------------------------------------------
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup = BACKUP_DIR / f"firestore-seed-data.pre-t1-{stamp}.json"
    shutil.copy2(SEED, backup)
    print(f"📦 Backup → {backup.name}")

    seed = json.loads(SEED.read_text(encoding="utf-8"))
    t1 = json.loads(T1.read_text(encoding="utf-8"))
    new_lessons = t1["lessons"]
    assert len(new_lessons) == 20, f"attendu 20 leçons T1, trouvé {len(new_lessons)}"

    # --- 2. Dédoublonnage modules N1-N2 --------------------------------------
    scope_modules = [m for m in seed["modules"] if m["levelId"] <= 2]
    groups: dict[str, list] = {}
    for m in scope_modules:
        groups.setdefault(m["title"].strip().lower(), []).append(m)

    drop_modules = []
    remap = {}
    for title, mods in groups.items():
        mods.sort(key=lambda m: m["id"])
        keeper = mods[0]
        for dup in mods[1:]:
            drop_modules.append(dup["id"])
            remap[dup["id"]] = keeper["id"]
            print(f"  🧹 module dupliqué mod{dup['id']} « {dup['title']} » (N{dup['levelId']}) → fusionne dans mod{keeper['id']}")
    seed["modules"] = [m for m in seed["modules"] if m["id"] not in drop_modules]

    # Déplace les leçons des modules supprimés vers le module gardé
    for lesson in seed["lessons"]:
        if lesson["moduleId"] in remap:
            lesson["moduleId"] = remap[lesson["moduleId"]]

    # --- 3. Suppression leçons N1-N2 + leurs questions -------------------------
    old_scope_ids = {l["id"] for l in seed["lessons"] if l["levelId"] <= 2}
    before_q = len(seed["questions"])
    seed["questions"] = [q for q in seed["questions"] if q.get("lessonId") not in old_scope_ids]
    removed_q = before_q - len(seed["questions"])
    seed["lessons"] = [l for l in seed["lessons"] if l["levelId"] > 2]
    print(f"  🧹 {len(old_scope_ids)} leçons N1-N2 pauvres supprimées, {removed_q} questions liées retirées")

    # --- 4. Ajout des 20 leçons riches -----------------------------------------
    assert max(l["id"] for l in new_lessons) <= 120
    for lesson in new_lessons:
        lesson["status"] = "active"
        lesson["version"] = 1
        lesson.setdefault("createdAt", NOW)
        lesson["updatedAt"] = NOW
        lesson.setdefault("itContext", lesson.get("summary", ""))
    seed["lessons"].extend(new_lessons)


    # --- 5. Génération des 100 questions ----------------------------------------
    assert max(q["id"] for q in seed["questions"]) < 1000, "collision plage 1001+"
    questions, qid = [], 1000
    for lesson in new_lessons:
        lid, level = lesson["id"], lesson["levelId"]
        skill = LESSON_SKILL[lid]
        # 4 items de quiz + 1 pratique = 5 questions par leçon
        items = [dict(it, type="multiple_choice" if len(it.get("options", [])) >= 3 else "fill_blank")
                 for it in lesson["quiz"][:4]]
        practice = [p for p in lesson["practice"]
                    if p.get("type") == "multiple_choice" and len(p.get("options", [])) >= 3]
        if practice:
            items.append(dict(practice[0]))
        else:  # filet de sécurité : 5e question depuis le quiz
            items.append(dict(lesson["quiz"][3], type="multiple_choice"))
        for it in items:
            qid += 1
            questions.append({
                "id": qid,
                "type": it["type"],
                "questionText": it["question"],
                "context": None,
                "difficulty": "A" if level == 1 else ("B" if qid % 2 == 0 else "A"),
                "skillId": skill,
                "lessonId": lid,
                "explanation": it["explanation"],
                "options": it.get("options", []),
                "correctAnswer": it["correctAnswer"],
                "tags": [f"lesson-{lid}", f"level-{level}", "tranche-1"],
                "isActive": True,
                "version": 1,
                "createdAt": NOW,
                "updatedAt": NOW,
            })
    seed["questions"].extend(questions)

    # --- 6. Écriture + récap ------------------------------------------------------
    SEED.write_text(json.dumps(seed, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    lvl1 = sum(1 for l in seed["lessons"] if l["levelId"] == 1)
    lvl2 = sum(1 for l in seed["lessons"] if l["levelId"] == 2)
    print(f"✅ Seed réécrit : {len(seed['modules'])} modules | {len(seed['lessons'])} leçons "
          f"(N1={lvl1}, N2={lvl2}) | {len(seed['questions'])} questions (+{len(questions)})")

if __name__ == "__main__":
    main()
