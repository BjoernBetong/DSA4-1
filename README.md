Die Skripte "Belohnung" und "Geldbörse" nutzen die Pfade system.base.appearance.height und system.base.appearance.weight als Depot für das Vermögen bzw. Abenteuerpunkte.




"Zwischen den Abenteuern"

Voraussetzungen:
•	Der Sozialstatus muss in token.actor.system.base.social.social_status.value hinterlegt sein (am besten die Werte über das Skript "Belohnungen" einfügen)
•	Für Magier: Ritualkenntnis: Gildenmagie, Ritualkenntnis: Runenzauberei oder Ritualkenntnis: Scharlatan muss als Talent angelegt sein

•	Zwischen den Abenteuern wählt ein Held eine Tätigkeit, der er/sie in der Zwischenzeit nachgehen will. Wird keine Tätigkeit gewählt, bekommt der/die Held*in auch kein Lohn
•	Mögliche Tätigkeiten sind:
o	illegale Arbeit:
-	Dieb*in 
TaW: Taschendiebstahl
- Einbrecher*in 
TaW: Schlösser Knacken
-	Schmuggler*in
TaW: (Sich Verstecken + Boote Fahren oder Fahrzeug Lenken + Handel) /3
o billige Arbeitskraft
-	Tagelöhner*in (SO: 1 - 4) 
TaW: (KO + KK) /2
-	Schankgehilfe/Schankgehilfin (SO: 1 - 4)
TaW: (CH + GE) /2
-	Stallknecht/Magd (SO: 1 - 4)
TaW: (FF + KO) /2
o	Einfache Arbeiten
-	Barde/Bardin (SO: 5 - 10)
TaW: (Musizieren + Singen)/2
-	Bogenbauer*in/Armbruster*in (SO: 5 - 10)
TaW: (2x Bogenbau + Armbrust oder Bogen)/3
-	Fischer*in (SO: 3 - 8)
Fischen/Angeln
-	Goldschmied*in (SO: 5 - 10)
TaW: Steinschneider/Juwelier
-	Jäger*in (SO: 3 - 7)
TaW: (Sich Verstecken + Tierkunde + Armbrust oder Bogen der Wurfspeer)/3
-	Koch/Köchin (SO: 5 - 10)
TaW: Kochen
-	Kräutersammler*in (SO: 5 - 10)
TaW: (Wildnisleben + Sinnenschärfe + Pflanzenkunde)/3  Metatalent: Kräutersuchen
-	Schreiner*in/Tischler*in (SO: 5 - 10)
TaW: Holzbearbeitung
-	Schaukämpfer*in (SO: 5 - 10)
TaW: (Schauspielerei + 2x Nahkampftalent)/3
- Söldner*in (SO: 5 - 10)
TaW: Kampftalent
-	Tierbändiger*in (SO: 5 - 10)
TaW: Abrichten
-	Matrose/Matrosin (SO: 1 - 10)
TaW: (2x Boote Fahren + Seefahrt)/3
-	Nachtwächter*in (SO: 5 - 8)
TaW: (2x Sinnenschärfe + Selbstbeherrschung)/3  Metatalent: Wachehalten
o	Qualifizierte Arbeiten
-	Mechanicus/Mechanica (SO: 7-12)
TaW: Feinmechanik oder Mechanik
-	Privatlehrer*in (SO: 7 - 10)
TaW: Lehren
-	Schiffsbauer*in (SO: 7 - 10)
TaW: (Zimmermann + Holzbearbeitung)/2
-	Zureiter*in (SO: 7 - 10)
TaW: (2x Abrichten + Reiten)/3
o	Hochqualifizierte Arbeiten
-	Apotheker*in (SO: 8 -12)
TaW: (Alchimie + HK: Wunden + HK: Gift)/3
-	Alchimist*in (SO: 6 - 10)
TaW: Alchimie
-	Magier*in (SO: 8 - 12)
TaW: (Magiekunde + 2x Ritualkenntnis: Gildenmagie oder Runenzauberei oder Scharlatan)/3
-	Medicus/Medica (SO: 7 - 12)
TaW: (HK: Wunden + HK: Krankheiten)/2
-	Schwertmeister*in (SO: 10 - 14)
TaW: (2x Kriegskunst + Lehren + 2x Nahkampftalent einer Klingenwaffe)/5
-	Söldnerführer*in (SO: 7 - 12)
TaW: (2x Kriegskunst + Kampftalent)
•	Alchimisten und Magier gelten in manchen Gegenden als illegale Arbeiten
•	Ist eine Arbeit illegal wird mit einem W20 auf einen Wert von (20 – TaW/2 – SO/2) gewürfelt
o	Ist der Wurf kleiner als der Wert, wird er/sie ertappt und erhält keinen Lohn und muss einen zweiten W20 würfeln:
-	Fällt bei diesem Wurf eine 20 wird er/sie eingesperrt und muss SOx 10 Dukaten
•	Löhne:
o	Bei einem TaW zwischen 7 und 12 und einem passenden Sozialstatus betragen die Löhne:
-	Illegale Arbeiten – 1W20 Heller pro Tag
-	Billige Arbeitskräfte – 1W8 Heller pro Tag
-	Einfache Arbeitskräfte – 1W4 Silber pro Tag
-	Qualifizierte Arbeitskräfte – 5 + 1W4 Silber pro Tag
-	Hochqualifizierte Arbeitskräfte – 1W4 Dukaten pro Tag
o	Bei einem TaW < 7 reduziert sich der Lohn und jeweils 25% pro Punkt
o	Bei einem TaW < 4 findet der Held/die Heldin keine Arbeit (und verdient auch dementsprechend nichts)
o	Bei einem TaW > 12 steigt das Einkommen um 25% pro Talentpunkt
o	Liegt der SO unterhalb der Grenze, reduziert sich der Lohn um 10% pro Punkt
o	Liegt der SO oberhalb der Grenze, steigt der Lohn um 10% pro Punkt
•	Lebenshaltungskosten
o	Während die Helden arbeiten müssen sie auch für ihren Lebensunterhalt sorgen:
-	Elend (SO: 1 – 3): 1 Dukate pro Monat
-	Karg (SO: 4 – 6): 5 Dukaten pro Monat
- Annehmbar (SO: 7 – 9): 15 Dukaten pro Monat
-	Reichlich (SO: 10 – 12): 50 Dukaten pro Monat
-	Üppig (SO: 13 – 15): 150 Dukaten pro Monat
- Prachtvoll (SO: 16+): 500+ Dukaten pro Monat
o	Lebt ein Held/eine Heldin während der Zeit zwischen den Abenteuern über oder unter seinen Verhältnissen, so steigt bzw. sinkt der SO um einen Punkt
•	Wie lange der Held/die Heldin Arbeit findet, wird mit 1W6 Tag pro Woche bestimmt

