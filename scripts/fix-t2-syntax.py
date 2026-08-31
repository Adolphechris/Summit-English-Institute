import re

with open("scripts/build-t2.py", "r", encoding="utf-8") as f:
    content = f.read()

# Replace any single-quoted multiline string with triple double-quotes or escaped \n
# Find L(...) calls where the 7th parameter (explanation) has newlines inside single quotes
def fix_explanation(match):
    prefix = match.group(1)
    expl = match.group(2)
    suffix = match.group(3)
    # Replace literal newlines with \n
    fixed_expl = expl.replace("\n", "\\n")
    return f'{prefix}"{fixed_expl}"{suffix}'

# Regex for L(id, mod, lvl, order, title, objective, 'explanation'...)
pattern = re.compile(r'(L\(\d+,\s*\d+,\s*\d+,\s*\d+,\s*"[^"]+",\s*"[^"]+",\s*)\n\s*"([^"]*?)"\s*,', re.DOTALL)

# Let's fix line 1099 specifically
fixed_content = content.replace(
    '''  "Le Troisième Conditionnel (Third Conditional) est utilisé pour parler de situations passées qui ne se sont PAS produites et imaginer leurs résultats dans le passé. C'est le temps roi de l'Analyse de Cause Racine (Root Cause Analysis - RCA) et des retours d'expérience (Post-Mortems).

STRUCTURE : If + Sujet + Past Perfect (had + participe passé) , Sujet + would have (ou could have / might have) + participe passé.
Exemple : 'If we had tested the patch, the outage would not have occurred.' (En réalité : nous ne l'avons pas testé, et la panne s'est produite).

NUANCES DE MODAUX : 
- WOULD HAVE : certitude sur le résultat imaginaire ('would have saved time').
- COULD HAVE : capacité ou possibilité passée imaginaire ('we could have prevented it').
- MIGHT HAVE : incertitude sur le résultat passé imaginaire ('it might have failed anyway').

En contexte IT et Cybersécurité, le Troisième Conditionnel permet d'analyser froidement les défaillances passées pour en tirer des leçons sans chercher de coupable personnel : 'If the backup had been verified, recovery would have taken ten minutes instead of five hours'.",''',
    '''  "Le Troisième Conditionnel (Third Conditional) est utilisé pour parler de situations passées qui ne se sont PAS produites et imaginer leurs résultats dans le passé. C'est le temps roi de l'Analyse de Cause Racine (Root Cause Analysis - RCA) et des retours d'expérience (Post-Mortems).\\n\\nSTRUCTURE : If + Sujet + Past Perfect (had + participe passé) , Sujet + would have (ou could have / might have) + participe passé.\\nExemple : 'If we had tested the patch, the outage would not have occurred.' (En réalité : nous ne l'avons pas testé, et la panne s'est produite).\\n\\nNUANCES DE MODAUX : \\n- WOULD HAVE : certitude sur le résultat imaginaire ('would have saved time').\\n- COULD HAVE : capacité ou possibilité passée imaginaire ('we could have prevented it').\\n- MIGHT HAVE : incertitude sur le résultat passé imaginaire ('it might have failed anyway').\\n\\nEn contexte IT et Cybersécurité, le Troisième Conditionnel permet d'analyser froidement les défaillances passées pour en tirer des leçons sans chercher de coupable personnel : 'If the backup had been verified, recovery would have taken ten minutes instead of five hours'.",'''
)

# Replace any other multiline string issues
fixed_content = re.sub(r'(\n\s*")([^"\n]*\n[^"]*)("\s*,)', lambda m: m.group(1) + m.group(2).replace('\n', '\\n') + m.group(3), fixed_content)

with open("scripts/build-t2.py", "w", encoding="utf-8") as f:
    f.write(fixed_content)

print("Fixed syntax in build-t2.py")
