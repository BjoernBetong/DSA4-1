// Skript für das Brauen eines Trankes nach WdA


main();
async function main() {
    //Überprüfe, ob ein Held ausgewählt wurde
    if (canvas.tokens.controlled.length === 0 || canvas.tokens.controlled.length > 1) {
        ui.notifications.error("Bitte einen Helden auswählen.");
        return;
    };
    if (game.user.targets.size > 1) {
        ui.notifications.error("Bitte nur einen Helden anvisieren.");
        return;
    };
    
	//gewählter Held
    if(game.user.targets.size === 1){
        targetActor = game.user.targets.values().next().value.actor;
        targetName = targetActor.name;
    }else{
        targetActor = "";
        targetName = "";
	};

	
	//Abrufen des hinterlegten Würfelsystems
    const rollMode = game.settings.get('core', 'rollMode');


//###############################################################################################################################################################################################################################################

	//Name des gewählten Helden
		const tokenName = token.actor.name;

	//Eigenschaften des Helden	
		const courage = token.actor.system.base.basicAttributes.courage.value;																														//Mut				MU
		const cleverness = token.actor.system.base.basicAttributes.cleverness.value;																												//Klugheit			KL
		const intuition = token.actor.system.base.basicAttributes.intuition.value;																													//Intuition			IN
		const charisma = token.actor.system.base.basicAttributes.charisma.value;																													//Charisma			CH
		const dexterity = token.actor.system.base.basicAttributes.dexterity.value;																													//Fingerfertigkeit	FF
		const agility = token.actor.system.base.basicAttributes.agility.value;																														//Gewandheit		GE
		const constitution = token.actor.system.base.basicAttributes.constitution.value;																											//Konstitution		KO
		const strength = token.actor.system.base.basicAttributes.strength.value;																													//Körperkraft		KK
		const magicResistance = token.actor.system.base.combatAttributes.passive.magicResistance.value; 																							//Magieresistenz	MR
		const astralEnergy = token.actor.system.base.resources.astralEnergy.value;																													//Astralenergie		AE

	//Talente des Helden
		const Alchimie = token.actor.items.find(item => item.name === "Alchimie");																													//Suche nach dem Talent "Alchimie"
		const AlchimieValue = (Alchimie === undefined)? isNaN : (Alchimie.system.value === null)? 0 : Alchimie.system.value;																		//Abrufen des TaW des Talents "Alchimie"
		const Kochen = token.actor.items.find(item => item.name === "Kochen");																														//Suche nach dem Talent "Kochen"
		const KochenValue = (Kochen === undefined)? isNaN : (Kochen.system.value === null)? 0 : Kochen.system.value;																				//Abrufen des TaW des Talents "Kochen"

//###############################################################################################################################################################################################################################################

    //allgemeine Dialogoptionen
		const hr = "<hr>";
		const divFlexStart = "<div style='display:flex'><span style='flex:1'>";
		const divFlexEnd = "</span></div>";
		const divInputNumber = "type='number' style='width:50px;float:right' value='";
		const divInputBox = "type='checkbox' style='width:70px;float:right' ";
		const divInputUnchecked = "/>";
		const divInputChecked = "checked />";
	
//###############################################################################################################################################################################################################################################    

//Dialoge
	//Das brauen von Tränken
	headerDialog = "<h2><b><i>" + tokenName + "</b></i><br>braut einen Trank" + "</h2>";
    inputDialog = headerDialog;
	inputDialog += divFlexStart + `
			<form action"#">
                 <label for="SelectSkill">Talent:</label>
                 <select name="SelectSkill" id="SelectSkill" style="float:right">
					<option value="0">Alchimie</option>
					<option value="1">Kochen mit TS Tränke</option>
					</select>
            </form>
        `+ divFlexEnd
if(tokenName === "Ragnar 'Stormfödd' Wulfgardson" || tokenName === "Ragnar Wulfgardson" || tokenName === "Ragnar"){	//Hier könnte man persönliche Rezepte, die nur bestimmte Helden sehen könnte hinterlegen
//	inputDialog += divFlexStart + `
//			<form action"#">
//                <label for="SelectPotion">bekannte Tränke:</label>
//                 <select name="SelectPotion" id="SelectPotion" style="float:right">
//					<option value="99">----Alchimie aus dem Handgelenk----</option>
//					<option value="3">Eulentränen</option>
//					<option value="6">Wundpulver</option>
//					<option value="99">----------Elixiere der Tugenden---------</option>
//					<option value="99">-----------Gegenstands-Elixiere---------</option>
//					<option value="99">--------------------Gifte----------------------</option>
//					<option value="99">-----------------Heilmittel-------------------</option>
//					<option value="99">---------------Rauschmittel----------------</option>
//					<option value="99">------------Wandlungselixiere------------</option>
//					<option value="99">----------------Zaubermittel----------------</option>
//					<option value="11">Zauberkreide</option>
//					<option value="2">Zaubertrank</option>
//					<option value="0">eigenes Rezept</option>
//					</select>
//           </form>
//        `+ divFlexEnd
}else{
	inputDialog += divFlexStart + `
			<form action"#">
                 <label for="SelectPotion">bekannte Tränke:</label>
                 <select name="SelectPotion" id="SelectPotion" style="float:right">
					<option value="99">----Alchimie aus dem Handgelenk----</option>
					<option value="3">Eulentränen</option>
					<option value="4">Schwadenbeutel</option>
					<option value="5">Stinktöpfen</option>
					<option value="6">Wundpulver</option>
					<option value="99">----------Elixiere der Tugenden---------</option>
					<option value="7">Kraftelixier</option>
					<option value="99">-----------Gegenstands-Elixiere---------</option>
					<option value="99">--------------------Gifte----------------------</option>
					<option value="8">Schlafgift</option>
					<option value="99">-----------------Heilmittel-------------------</option>
					<option value="9">Antidot</option>
					<option value="1">Heiltrank</option>
					<option value="99">---------------Rauschmittel----------------</option>
					<option value="99">------------Wandlungselixiere------------</option>
					<option value"10">Verwandlungselixier</option>
					<option value="99">----------------Zaubermittel----------------</option>
					<option value="11">Zauberkreide</option>
					<option value="2">Zaubertrank</option>
					<option value="0">eigenes Rezept</option>
					</select>
            </form>
        `+ divFlexEnd
}
		inputDialog += divFlexStart + "Brau-Schwierigkeit<input id='Difficulty'" + divInputNumber  + "0'/>" + divFlexEnd;
		inputDialog += divFlexStart + `
			<form action"#">
                 <label for="RequiredLab">benötigte Laborstufe:</label>
                 <select name="RequiredLab" id="RequiredLab" style="float:right">
					<option value="0">archaisches Labor/Analyse-Koffer</option>
					<option value="1">Hexenküche</option>
					<option value="2">Alchimistenlabor</option>
					</select>
            </form>
        `+ divFlexEnd		
		inputDialog += divFlexStart + `
			<form action"#">
                 <label for="ActualLab">verfügbare Laborstufe:</label>
                 <select name="ActualLab" id="ActualLab" style="float:right">
					<option value="0">archaisches Labor/Analyse-Koffer</option>
					<option value="1">Hexenküche</option>
					<option value="2">Alchimistenlabor</option>
					</select>
            </form>
        `+ divFlexEnd
		inputDialog += divFlexStart + "Meisterhandwerk: <i>Alchimie</i> oder <i>Kochen</i><input id='Mhw'" + divInputNumber  + "0'/>" + divFlexEnd + hr;	
		inputDialog += "Qualität des Gebräus verbessern";
		inputDialog += divFlexStart + "TaW zurückhalten<input id='TaWboost'" + divInputNumber  + "0'/>" + divFlexEnd;
		inputDialog += divFlexStart + `
			<form action"#">
                 <label for="astralboost">Trank astral aufladen:</label>
                 <select name="astralboost" id="astralboost" style="float:right">
					<option value="0">keine Aufladung</option>
					<option value="1">Qualität: +1 / 1 AsP</option>
					<option value="2">Qualität: +2 / 2 AsP</option>
					<option value="3">Qualität: +3 / 4 AsP</option>
					<option value="4">Qualität: +4 / 8 AsP</option>
					<option value="5">Qualität: +5 / 16 AsP</option>
					<option value="6">Qualität: +6 / 32 AsP</option>
					<option value="7">Qualität: +7 / 64 AsP</option>
					<option value="8">Qualität: +8 / 128 AsP</option>
					</select>
            </form>
        `+ divFlexEnd + hr;
		inputDialog += "Analyse des Gebräus";
		inputDialog += divFlexStart + "Analyse-Schwierigkeit<input id='Analytic'" + divInputNumber  + "0'/>" + divFlexEnd;		
//###############################################################################################################################################################################################################################################	
//Misslungene Tränke:
const M1 = "- Das Mittel hat keinerlei Wirkung.";
const M2 = "- Die Mixtur verdampft völlig und ohne jeden Rückstand.";
const M3 = "- Vom Braugut bleibt nichts zurück als ein Klumpen unmagischer Schlacke oder Asche.";
const M4 = "- Das fertige Elixier hat genau die gegenteilige Wirkung eines gelungenen. Würfeln Sie 1W20, um die ‘Qualität’ zu bestimmen (1–5: A; 6–10: B; 11–14: C; 15–17: D; 18–19: E; 20: F) und drehen Sie die Wirkung um. Würde ein Trunk beispielsweise 3W6 LeP zurückbringen, so verursacht der misslungene Trank dieselbe Anzahl SP.";
const M5 = "- Das Gebräu neutralisiert jegliches andere im Moment wirkende oder binnen der nächsten 1W6 Stunden eingenommene Elixier – sei es ein alchimistisch hergestelltes (nicht aber natürliches) Gift oder ein magischer Heiltrank.";
const M6 = "- Eine Explosion während der Zubereitung steckt das Labor in Brand (5W6 SP; je zwei Schritt Entfernung fällt der Schaden um 1W6 niedriger aus; vorübergehende Taubheit).";
const M7 = "- Die fertige Mixtur explodiert mit einer Wahrscheinlichkeit von 1 bis 4 auf 1W6 beim Lagern, mit Sicherheit aber beim Entzünden oder einer nahen Hitzequelle, und verursacht je nach gelagerter Menge bis zu 5W20 SP im Umkreis von 3 Schritt (je weitere 3 Schritt Entfernung fällt die Schadenswirkung um 1W20 niedriger aus; vorübergehende Taubheit).";
const M8 = "- Während der Zubereitung spritzt die Mixtur in alle Richtungen, entzündet sich und steckt das Labor in Brand.";
const M9 = "- Bei der Herstellung kocht die Substanz über und macht alle nicht hitze- und feuchtigkeitsbeständigen Materialien in der Nähe unbrauchbar.";
const M10 = "- Die Mixtur spritzt während der Zubereitung in alle Richtungen und frisst Löcher in alle nicht säure- oder hitzebeständigen Materialien (bis 3W6 SP und zurückbleibende Narben, wenn der Alchimist nicht ausreichend geschützt ist).";
const M11 = "- Eine große Wolke aus Gasen breitet sich aus und lässt alle Lebewesen im Umkreis von 50 Schritt für 3W6 Stunden erblinden.";
const M12 = "- Beim Brauen entwickeln sich giftige Dämpfe, der Alchimist erleidet 3W20 SP.";
const M13 = "- Auf Grund austretender Dämpfe erleidet der Alchimist mehrere Tage lang Albträume (keine Regeneration).";
const M14 = "- Das Gebräu stößt Dämpfe aus, die beim Alchimisten eine mehrtägige Geistesverwirrung auslösen.";
const M15 = "- Beim Brauen kommt es zu einer Verpuffung, bei der eine farbige Wolke freigesetzt wird, die alles verfärbt, was mit ihr in Berührung kommt (also vermutlich auch den Alchimisten selbst). Die Farbe verblasst auch nach hartnäckigen Bürsten nur langsam und ist noch wenigstens 1W20 Tage lang zu sehen. Haare und Stoffe behalten die neue Farbe dauerhaft, wobei die Haare jedoch mit der tatsächlichen Farbe normal weiterwachsen. Insbesondere schmutzige oder giftige Farben wie Blutrot, Grasgrün, Purpur oder Zitronengelb kommen bei den Wolken sehr häufig vor.";
const M16 = "- Der nach dem Entzünden des fertigen Mittels entstehende Rauch ist giftig und verursacht bei allen Anwesenden im Umkreis von drei Schritt minutenlangen Hustenreiz und 2W20 SP(A).";
const M17 = "- Das Mittel verbrennt mit verschiedenen leuchtenden Farben, zeigt sonst aber keine Wirkung.";
const M18 = "- Die Anwendung führt zu 2W6 SP mit starken Nebenwirkungen (2W6 Stunden lang z.B. häufiges Erbrechen, arger Juckreiz, Schlieren vor den Augen, schmerzender Ausschlag, starkes Brennen im Mundraum, Haarausfall, heftiges Bauchgrimmen, pochende Kopfschmerzen, sprießende Warzen etc.).";
const M19 = "- Es entstand ein alchimistisches Einnahmegift der Stufe 10, der Anwender erleidet für 2W6+2 Stunden jeweils 1W6+1 SP.";
const M20 = "- Der Anwender verliert 2W6 AsP (sinkt die AE dadurch unter 0, so werden die überzähligen Punkte von der LE abgezogen – beispielsweise bei Personen, die keine AsP besitzen).";
const M21 = "- Die Einnahme führt zu völliger Entkräftung (Ausdauer auf 0, 3W6 Punkte Erschöpfung).";
const M22 = "- Die Anwendung bringt für 2W6 Stunden starke Kopfschmerzen mit sich (KL, IN, GE, FF je –2).";
const M23 = "- Der Anwender ist für einen Tag vollkommen desorientiert (AT/PA/Fernkampf –4, KL/FF/GE –2; keine weiteren Auswirkungen auf die abgeleiteten Grundwerte).";
const M24 = "- Der Anwender fällt für 5W6 Stunden in einen Tiefschlaf ohne jede Heilwirkung (Regeneration entfällt).";
const M25 = "- Nach der Anwendung vermag der Betroffene selbst bei größter Müdigkeit für 1W6 Nächte keinen Schlaf zu finden (in der ersten Nacht zwei Punkte Erschöpfung, in der zweiten drei Punkte, in der dritten vier Punkte usw.).";
const M26 = "- Der Betroffene wird für 1W20 KR zum Berserker (siehe Qualität C des Berserkerelixiers, Seite 59).";
const M27 = "- Nach der Einnahme beginnt der Anwender für 1W20 Minuten unkontrolliert zu zucken, umher zu springen und ungezielt mit den Armen zu fuchteln (die AU sinkt dabei um den W20-Wurf x5 in Prozent).";
const M28 = "- Eine (oder mehrere) passende Schlechte Eigenschaft steigt für 3W6 Stunden um 2W6 Punkte (anschließend besteht eine Chance von 10 % (19 bis 20 auf 1W20), dass die Schlechte Eigenschaft permanent um einen Punkt steigt).";
const M29 = "- Die Anwendung führt für 2W6 Stunden zu einer gichtartigen Lähmung der Finger (FF halbiert, min. –7).";
const M30 = "- Der Anwender wird für 2W6 Stunden so gewandt, als wenn er sich in Thorwaler Rübenbrei bewegen würde (GE halbiert, min. –7).";
const M31 = "- Der Anwender erhält für 3W6 Stunden das Einfühlungs- und Reaktionsvermögen eines Stalagmiten (IN halbiert, min. –7).";
const M32 = "- Für kurze Zeit (3W6 SR) verfügt der Anwender über die unvergleichliche Intelligenz einer Riesenamöbe und ist zu wirklich nichts fähig (KL 0).";
const M33 = "- Der Anwender ist für 1W20 Stunden schlapp wie tulamidischer Weichkäse, reagiert auf körperliche Beanspruchung überempfindlich und bekommt bereits blaue Flecken, wenn man ihn nur anstupst (KO halbiert, min. –7, AU auf 0).";
const M34 = "- Der Benutzer erleidet einen W6 Stunden andauernden Schwächeanfall (KK halbiert, min. –7, KO –3) und mag sich überlegen, sein geliebtes Runenschwert vielleicht zu profaneren Zwecken – als Krücke – zu benutzen.";
const M35 = "- Für 2W6 Stunden bekommt der Anwender eine ungesunde Hautfarbe und gelb angelaufene Augen und stinkt fürchterlich aus allen Poren (Nachteile Übler Geruch und Widerwärtiges Aussehen sowie CH halbiert, min. –7).";
const M36 = "- Der Anwender ist 1W6 Stunden lang mutlos, von Selbstzweifeln geplagt und zu nichts zu bewegen (alle vorhandenen Ängste aus Nachteilen werden verdoppelt, MU halbiert, min. –7).";
const M37 = "- Der Benutzer beginnt unverständlich zu lallen, lässt sich zu fast jeder Schandtat überreden und ist ständig unentschlossen – kein Wunder bei einem MU- und KL-Wert von jeweils 6. Zum Glück hält dieser Zustand nur 3W6 Stunden lang an.";
const M38 = "- Das Mittel hat keinerlei Wirkung – außer der, dass der unglückliche Anwender für die nächsten 1W6 Tage irgendetwas ausströmt, das Kobolde, Feen, Wichtel und andere Feenwesen regelrecht anzuziehen scheint. In der Folgezeit ist der Arme sicherlich einigen derben Späßen ausgesetzt, die ihn Ansehen, Geld und Ruhm kosten könnten, jedoch niemals zu Lasten der Gesundheit gehen.";
const M39 = "- Das betroffene Objekt oder Körperteil beginnt, binnen 1W6 Tagen völlig zu verrosten, verrotten, zerfallen oder verkümmern.";
const M40 = "- Alles, was mit dem alchimistischen Produkt in Berührung kommt (oder jedes Wesen, das es einnimmt), fängt für 1W6 SR an, mystisch zu schimmern";
//###############################################################################################################################################################################################################################################	

//Probenwurf
	new Dialog({
        title: "Talentprobe",
        content: inputDialog + hr,
        buttons: {
            close: {
                icon: '<i class="fas fa-times"></i>', label: "Schließen"
            }, 
            accept: {
                icon: '<i class="fas fa-check"></i>', label: "Würfeln", callback: htmlCallback
            }  
        },
		default: "accept",
        render: () => console.log(),
        close: () => console.log()
    }).render(true);
	
    async function htmlCallback(html){
		
		//Input Boxes
		const TalentInput = Number(html.find("#SelectSkill")[0]?.value || 0);			//Auswahl eines Wertes für das Dropdown-Menü
		const PotionInput = Number(html.find("#SelectPotion")[0]?.value || 0);			//Auswahl eines Wertes für das Dropdown-Menü
		const RequiredLabInput = Number(html.find("#RequiredLab")[0]?.value || 0);		//Auswahl eines Wertes für das Dropdown-Menü
		const ActualLabInput = Number(html.find("#ActualLab")[0]?.value || 0);			//Auswahl eines Wertes für das Dropdown-Menü
		const astralboostInput = Number(html.find("#astralboost")[0]?.value || 0);		//Auswahl eines Wertes für das Dropdown-Menü

		const DifficultyInput = Number(html.find("#Difficulty")[0]?.value || 0);		//Brau-Schwierigkeit
		const AnalyticInput = Number(html.find("#Analytic")[0]?.value || 0);			//Analyse-Schwierigkeit
		const MhwInput = Number(html.find("#Mhw")[0]?.value || 0);						//Meisterhandwerk: Alchimie oder Kochen
		const TaWboostInput = Number(html.find("#TaWboost")[0]?.value || 0);			//TaW zurückhalten um die Qualität zu verbessern
		
		//Checkboxes

		//Dropdown-Menü
		
		switch(RequiredLabInput){
			case 0://archaisches Labor/Analyse-Koffer
				ReqLabInput = 0;
				break;
			case 1://Hexenküche
				ReqLabInput = 1;
				break;
			case 2://Alchimistenlabor
				ReqLabInput = 2;
				break;
		}

		switch(ActualLabInput){
			case 0://archaisches Labor/Analyse-Koffer
				actLabInput = 0;
				break;
			case 1://Hexenküche
				actLabInput = 1;
				break;
			case 2://Alchimistenlabor
				if(TalentInput === 0){
					actLabInput = 2;
				}else{
					actLabInput = 1;	//mit dem Talent "Kochen" hat das Alchimistenlabor nur den Wert einer Hexenküche
				}
				break;
		}

		switch(astralboostInput){
			case 0:
				astralCost = 0;
				astralBoost = 0;
				break;
			case 1:
				astralCost = 1;
				astralBoost = 1;
				break;
			case 2:
				astralCost = 2;
				astralBoost = 2;
				break;
			case 3:
				astralCost = 4;
				astralBoost = 3;
				break;
			case 4:
				astralCost = 8;
				astralBoost = 4;
				break;
			case 5:
				astralCost = 16;
				astralBoost = 5;
				break;
			case 6:
				astralCost = 32;
				astralBoost = 6;
				break;
			case 7:
				astralCost = 64;
				astralBoost = 7;
				break;
			case 8:
				astralCost = 128;
				astralBoost = 8;
				break;
		}

		
		switch(PotionInput){
			case 0://eigenes Rezept
				Potionname = "einen Trank";
				DifficultyMod = DifficultyInput;
				AnalyticMod = AnalyticInput;
				ReqLabMod = ReqLabInput;
				actLabMod = actLabInput;
				IngredientCosts = "";
				EffectA = "";
				EffectB = "";
				EffectC = "";
				EffectD = "";
				EffectE = "";
				EffectF = "";
				break;
			case 1://Heiltrank
				Potionname = "einen Heiltrank";
				DifficultyMod = 2;
				AnalyticMod = 1;
				ReqLabMod = 0;
				actLabMod = actLabInput;
				IngredientCosts = "14 D";
				Failedpotion = M1 + "<br>" + M5 + "<br>" + M18 + "<br>" + M19 + "<br>" + M21 + "<br>" + M22 + "<br>" + M24 + "<br>das Gebräu erzeugt 2W6 SP bei heftigem Erbrechen";
				EffectA = "Der Anwender regeneriert augenblicklich 1W6 LeP, erleidet jedoch eine leichte Sinnestrübung (KL, GE –1 für 1 Stunde)";
				EffectB = "augenblickliche Regeneration von 1W6+2 LeP";
				EffectC = "2W6+4 LP";
				EffectD = "3W6+6 LP";
				EffectE = "Alle LP";
				EffectF = "Der Trank bringt 3W6+25 LeP zurück, auch über das Maximum hinaus, neutralisiert jedoch die Wirkung aller anderen alchimistisch-magischen Tränke, Gifte und Elixiere für eine Woche (also auch alle weiteren Heiltränke, die innerhalb der nächsten Woche genossen werden)";
				break;
			case 2://Zaubertrank
				Potionname = "einen Zaubertrank";
				DifficultyMod = 8;
				AnalyticMod = 4;
				ReqLabMod = 1;
				actLabMod = actLabInput;
				IngredientCosts = "30 D";
				Failedpotion = M1 + "<br>" + M2 + "<br>" + M3 + "<br>" + M4 + "<br>" + M8 + "<br>" + M9 + "<br>" + M13 + "<br>" + M14 + "<br>" + M18 + "<br>" + M19 + "<br>" + M20 + "<br>" + M22 + "<br>" + M38 + "<br>" + M40 + "<br>der Anwender verliert W6 ASP (sinkt der Wert unter 0, werden die überzähligen von der LE abgezogen) und leidet 2W6 Stunden unter starken Kopfschmerzen (KL, IN, GE, FF je –2).";
				EffectA = "Regeneration von 1W6 AsP bei leichter Geistesverwirrung (KL –2 für 1 Stunde)";
				EffectB = "Der Anwender erhält 2W6 verlorene AsP zurück, die er jedoch binnen der nächsten Stunde verbrauchen muss, sonst droht ihm schwerer Kopfschmerz (KL, IN, GE, FF je –4 für 7 Stunden)";
				EffectC = "Der Anwender erhält 3W6 AsP zurück";
				EffectD = "Der Anwender erhält 3W6+6 AsP, auch wenn dadurch die AsP-Zahl über den Grundwert steigt, jedoch werden die überschüssigen Punkte von den LeP abgezogen";
				EffectE = "Der Anwender erhält 5W6+6 AsP, auch wenn dadurch die AsP-Zahl über den Grundwert steigt, jedoch werden die überschüssigen Punkte von den LeP abgezogen";
				EffectF = "Der Anwender erhält 2W20+5 AsP, auch über den Grundwert hinaus, ohne Abzug von LeP";
				break;
			case 3://Eulentränen
				Potionname = "Eulentränen";
				DifficultyMod = 1;
				AnalyticMod = 3;
				ReqLabMod = 1;
				actLabMod = actLabInput;
				IngredientCosts = "5 H";
				Failedpotion = M1 + "<br>" + M2 + "<br>" + M3 + "<br>" + M4 + "<br>" + M8;
				EffectA = "In die Augen geträufelt, bekommen diese nicht nur Glanz und erweiterte Pupillen (ein beliebter Effekt bei Frauen, weshalb die Tollkirsche auch Belladonna genannt wird), sondern lassen den Anwender im Dunkeln auch besser sehen: Die Stufe der Dunkelheit sinkt um einen Punkt pro 4 TaP*, damit einher geht allerdings auch eine höhere Lichtempfindlichkeit. Die Angaben beim Zauber KATZENAUGEN (LCD 137) sind sinngemäß auch hier anzuwenden, wobei die Blendung TaP*/2 KR und der Lichtertanz TaP*/4 SR andauern. Je Stunde sinkt die Wirkung um 2 TaP*, bis sie ganz verflogen ist. Durch das Gift der Tollkirsche erleidet der Anwender 1 SP";
				EffectB = "In die Augen geträufelt, bekommen diese nicht nur Glanz und erweiterte Pupillen (ein beliebter Effekt bei Frauen, weshalb die Tollkirsche auch Belladonna genannt wird), sondern lassen den Anwender im Dunkeln auch besser sehen: Die Stufe der Dunkelheit sinkt um einen Punkt pro 4 TaP*, damit einher geht allerdings auch eine höhere Lichtempfindlichkeit. Die Angaben beim Zauber KATZENAUGEN (LCD 137) sind sinngemäß auch hier anzuwenden, wobei die Blendung TaP*/2 KR und der Lichtertanz TaP*/4 SR andauern. Je Stunde sinkt die Wirkung um 2 TaP*, bis sie ganz verflogen ist. Durch das Gift der Tollkirsche erleidet der Anwender 1 SP";
				EffectC = "In die Augen geträufelt, bekommen diese nicht nur Glanz und erweiterte Pupillen (ein beliebter Effekt bei Frauen, weshalb die Tollkirsche auch Belladonna genannt wird), sondern lassen den Anwender im Dunkeln auch besser sehen: Die Stufe der Dunkelheit sinkt um einen Punkt pro 4 TaP*, damit einher geht allerdings auch eine höhere Lichtempfindlichkeit. Die Angaben beim Zauber KATZENAUGEN (LCD 137) sind sinngemäß auch hier anzuwenden, wobei die Blendung TaP*/2 KR und der Lichtertanz TaP*/4 SR andauern. Je Stunde sinkt die Wirkung um 2 TaP*, bis sie ganz verflogen ist. Durch das Gift der Tollkirsche erleidet der Anwender 1 SP";
				EffectD = "In die Augen geträufelt, bekommen diese nicht nur Glanz und erweiterte Pupillen (ein beliebter Effekt bei Frauen, weshalb die Tollkirsche auch Belladonna genannt wird), sondern lassen den Anwender im Dunkeln auch besser sehen: Die Stufe der Dunkelheit sinkt um einen Punkt pro 4 TaP*, damit einher geht allerdings auch eine höhere Lichtempfindlichkeit. Die Angaben beim Zauber KATZENAUGEN (LCD 137) sind sinngemäß auch hier anzuwenden, wobei die Blendung TaP*/2 KR und der Lichtertanz TaP*/4 SR andauern. Je Stunde sinkt die Wirkung um 2 TaP*, bis sie ganz verflogen ist. Durch das Gift der Tollkirsche erleidet der Anwender 1 SP";
				EffectE = "In die Augen geträufelt, bekommen diese nicht nur Glanz und erweiterte Pupillen (ein beliebter Effekt bei Frauen, weshalb die Tollkirsche auch Belladonna genannt wird), sondern lassen den Anwender im Dunkeln auch besser sehen: Die Stufe der Dunkelheit sinkt um einen Punkt pro 4 TaP*, damit einher geht allerdings auch eine höhere Lichtempfindlichkeit. Die Angaben beim Zauber KATZENAUGEN (LCD 137) sind sinngemäß auch hier anzuwenden, wobei die Blendung TaP*/2 KR und der Lichtertanz TaP*/4 SR andauern. Je Stunde sinkt die Wirkung um 2 TaP*, bis sie ganz verflogen ist. Durch das Gift der Tollkirsche erleidet der Anwender 1 SP";
				EffectF = "In die Augen geträufelt, bekommen diese nicht nur Glanz und erweiterte Pupillen (ein beliebter Effekt bei Frauen, weshalb die Tollkirsche auch Belladonna genannt wird), sondern lassen den Anwender im Dunkeln auch besser sehen: Die Stufe der Dunkelheit sinkt um einen Punkt pro 4 TaP*, damit einher geht allerdings auch eine höhere Lichtempfindlichkeit. Die Angaben beim Zauber KATZENAUGEN (LCD 137) sind sinngemäß auch hier anzuwenden, wobei die Blendung TaP*/2 KR und der Lichtertanz TaP*/4 SR andauern. Je Stunde sinkt die Wirkung um 2 TaP*, bis sie ganz verflogen ist. Durch das Gift der Tollkirsche erleidet der Anwender 1 SP";
				break;
			case 4://Schwadenbeutel
				Potionname = "einen Schwadenbeutel";
				DifficultyMod = 4;
				AnalyticMod = 1;
				ReqLabMod = 0;
				actLabMod = actLabInput;
				IngredientCosts = "1 D";
				Failedpotion = M1 + "<br>" + M2 + "<br>" + M3 + "<br>" + M4;
				EffectA = "Ähnlich dem Pyrophor entwickelt der Inhalt des Schwadenbeutels bei Kontakt mit der Luft seine Wirkung: ein dichter grauer Qualm (regeltechnisch wie eine Dunkelheit mit Abzügen von –5/–5 auf AT und PA). Ein Beutel kann ein Gebiet von etwa 3 Schritt Radius wirksam vernebeln, dass man nur noch auf kürzeste Entfernung etwas erkennen kann";
				EffectB = "Ähnlich dem Pyrophor entwickelt der Inhalt des Schwadenbeutels bei Kontakt mit der Luft seine Wirkung: ein dichter grauer Qualm (regeltechnisch wie eine Dunkelheit mit Abzügen von –5/–5 auf AT und PA). Ein Beutel kann ein Gebiet von etwa 3 Schritt Radius wirksam vernebeln, dass man nur noch auf kürzeste Entfernung etwas erkennen kann";
				EffectC = "Ähnlich dem Pyrophor entwickelt der Inhalt des Schwadenbeutels bei Kontakt mit der Luft seine Wirkung: ein dichter grauer Qualm (regeltechnisch wie eine Dunkelheit mit Abzügen von –5/–5 auf AT und PA). Ein Beutel kann ein Gebiet von etwa 3 Schritt Radius wirksam vernebeln, dass man nur noch auf kürzeste Entfernung etwas erkennen kann";
				EffectD = "Ähnlich dem Pyrophor entwickelt der Inhalt des Schwadenbeutels bei Kontakt mit der Luft seine Wirkung: ein dichter grauer Qualm (regeltechnisch wie eine Dunkelheit mit Abzügen von –5/–5 auf AT und PA). Ein Beutel kann ein Gebiet von etwa 3 Schritt Radius wirksam vernebeln, dass man nur noch auf kürzeste Entfernung etwas erkennen kann";
				EffectE = "Ähnlich dem Pyrophor entwickelt der Inhalt des Schwadenbeutels bei Kontakt mit der Luft seine Wirkung: ein dichter grauer Qualm (regeltechnisch wie eine Dunkelheit mit Abzügen von –5/–5 auf AT und PA). Ein Beutel kann ein Gebiet von etwa 3 Schritt Radius wirksam vernebeln, dass man nur noch auf kürzeste Entfernung etwas erkennen kann";
				EffectF = "Ähnlich dem Pyrophor entwickelt der Inhalt des Schwadenbeutels bei Kontakt mit der Luft seine Wirkung: ein dichter grauer Qualm (regeltechnisch wie eine Dunkelheit mit Abzügen von –5/–5 auf AT und PA). Ein Beutel kann ein Gebiet von etwa 3 Schritt Radius wirksam vernebeln, dass man nur noch auf kürzeste Entfernung etwas erkennen kann";
				break;
			case 5://Stinktöpfen
				Potionname = "ein Stinktöpfen";
				DifficultyMod = 0;
				AnalyticMod = 1;
				ReqLabMod = 0;
				actLabMod = actLabInput;
				IngredientCosts = "15 H";
				Failedpotion = M1 + "<br>" + M2 + "<br>" + M3 + "<br>" + M4;
				EffectA = "Wird das Gefäß zerschlagen, breitet sich sogleich abscheulicher Gestank aus, der starke Übelkeit und Schwindelgefühl auslöst. Im Umkreis von 3 Schritt müssen Betroffene Selbstbeherrschungs-Proben bestehen, erschwert um TaP*/2 und den Nachteil Sensibler Geruchssinn, um sich nicht zu übergeben oder gar (bei einem Scheitern um 7 und mehr Punkte) in Ohnmacht zu fallen. Abhängig von der Grundsubstanz kann der Gestank weiträumiger wirken und zwischen wenigen KR und mehreren Stunden anhalten (Meisterentscheid). Wer von der Flüssigkeit benetzt wird, der erhält für bis zu eine Woche (oder einem gründlichen Bad) den Nachteil Abartiger Gestank(wie Übler Geruch in WdH 271, jedoch sind alle Proben im Umgang mit Personen in Riechweite um 6 Punkte erschwert)";
				EffectB = "Wird das Gefäß zerschlagen, breitet sich sogleich abscheulicher Gestank aus, der starke Übelkeit und Schwindelgefühl auslöst. Im Umkreis von 3 Schritt müssen Betroffene Selbstbeherrschungs-Proben bestehen, erschwert um TaP*/2 und den Nachteil Sensibler Geruchssinn, um sich nicht zu übergeben oder gar (bei einem Scheitern um 7 und mehr Punkte) in Ohnmacht zu fallen. Abhängig von der Grundsubstanz kann der Gestank weiträumiger wirken und zwischen wenigen KR und mehreren Stunden anhalten (Meisterentscheid). Wer von der Flüssigkeit benetzt wird, der erhält für bis zu eine Woche (oder einem gründlichen Bad) den Nachteil Abartiger Gestank(wie Übler Geruch in WdH 271, jedoch sind alle Proben im Umgang mit Personen in Riechweite um 6 Punkte erschwert)";
				EffectC = "Wird das Gefäß zerschlagen, breitet sich sogleich abscheulicher Gestank aus, der starke Übelkeit und Schwindelgefühl auslöst. Im Umkreis von 3 Schritt müssen Betroffene Selbstbeherrschungs-Proben bestehen, erschwert um TaP*/2 und den Nachteil Sensibler Geruchssinn, um sich nicht zu übergeben oder gar (bei einem Scheitern um 7 und mehr Punkte) in Ohnmacht zu fallen. Abhängig von der Grundsubstanz kann der Gestank weiträumiger wirken und zwischen wenigen KR und mehreren Stunden anhalten (Meisterentscheid). Wer von der Flüssigkeit benetzt wird, der erhält für bis zu eine Woche (oder einem gründlichen Bad) den Nachteil Abartiger Gestank(wie Übler Geruch in WdH 271, jedoch sind alle Proben im Umgang mit Personen in Riechweite um 6 Punkte erschwert)";
				EffectD = "Wird das Gefäß zerschlagen, breitet sich sogleich abscheulicher Gestank aus, der starke Übelkeit und Schwindelgefühl auslöst. Im Umkreis von 3 Schritt müssen Betroffene Selbstbeherrschungs-Proben bestehen, erschwert um TaP*/2 und den Nachteil Sensibler Geruchssinn, um sich nicht zu übergeben oder gar (bei einem Scheitern um 7 und mehr Punkte) in Ohnmacht zu fallen. Abhängig von der Grundsubstanz kann der Gestank weiträumiger wirken und zwischen wenigen KR und mehreren Stunden anhalten (Meisterentscheid). Wer von der Flüssigkeit benetzt wird, der erhält für bis zu eine Woche (oder einem gründlichen Bad) den Nachteil Abartiger Gestank(wie Übler Geruch in WdH 271, jedoch sind alle Proben im Umgang mit Personen in Riechweite um 6 Punkte erschwert)";
				EffectE = "Wird das Gefäß zerschlagen, breitet sich sogleich abscheulicher Gestank aus, der starke Übelkeit und Schwindelgefühl auslöst. Im Umkreis von 3 Schritt müssen Betroffene Selbstbeherrschungs-Proben bestehen, erschwert um TaP*/2 und den Nachteil Sensibler Geruchssinn, um sich nicht zu übergeben oder gar (bei einem Scheitern um 7 und mehr Punkte) in Ohnmacht zu fallen. Abhängig von der Grundsubstanz kann der Gestank weiträumiger wirken und zwischen wenigen KR und mehreren Stunden anhalten (Meisterentscheid). Wer von der Flüssigkeit benetzt wird, der erhält für bis zu eine Woche (oder einem gründlichen Bad) den Nachteil Abartiger Gestank(wie Übler Geruch in WdH 271, jedoch sind alle Proben im Umgang mit Personen in Riechweite um 6 Punkte erschwert)";
				EffectF = "Wird das Gefäß zerschlagen, breitet sich sogleich abscheulicher Gestank aus, der starke Übelkeit und Schwindelgefühl auslöst. Im Umkreis von 3 Schritt müssen Betroffene Selbstbeherrschungs-Proben bestehen, erschwert um TaP*/2 und den Nachteil Sensibler Geruchssinn, um sich nicht zu übergeben oder gar (bei einem Scheitern um 7 und mehr Punkte) in Ohnmacht zu fallen. Abhängig von der Grundsubstanz kann der Gestank weiträumiger wirken und zwischen wenigen KR und mehreren Stunden anhalten (Meisterentscheid). Wer von der Flüssigkeit benetzt wird, der erhält für bis zu eine Woche (oder einem gründlichen Bad) den Nachteil Abartiger Gestank(wie Übler Geruch in WdH 271, jedoch sind alle Proben im Umgang mit Personen in Riechweite um 6 Punkte erschwert)";
				break;
			case 6://Wundpulver
				Potionname = "ein Wundpulver";
				DifficultyMod = 0;
				AnalyticMod = 2;
				ReqLabMod = 0;
				actLabMod = actLabInput;
				IngredientCosts = "5 bis 25 H";
				Failedpotion = M1 + "<br>" + M2 + "<br>" + M3 + "<br>" + M4;
				EffectA = "Auf kleinere Verletzungen von bis zu 3 SP gestreut, stoppt das Wundpulver die Blutung binnen weniger Momente und lässt sie innerhalb einer Nacht verheilen. Bei größeren Verletzungen wird immerhin der Blutfluss eingedämmt. Die Wirkung ist nicht kumulativ";
				EffectB = "Auf kleinere Verletzungen von bis zu 3 SP gestreut, stoppt das Wundpulver die Blutung binnen weniger Momente und lässt sie innerhalb einer Nacht verheilen. Bei größeren Verletzungen wird immerhin der Blutfluss eingedämmt. Die Wirkung ist nicht kumulativ";
				EffectC = "Auf kleinere Verletzungen von bis zu 3 SP gestreut, stoppt das Wundpulver die Blutung binnen weniger Momente und lässt sie innerhalb einer Nacht verheilen. Bei größeren Verletzungen wird immerhin der Blutfluss eingedämmt. Die Wirkung ist nicht kumulativ";
				EffectD = "Auf kleinere Verletzungen von bis zu 3 SP gestreut, stoppt das Wundpulver die Blutung binnen weniger Momente und lässt sie innerhalb einer Nacht verheilen. Bei größeren Verletzungen wird immerhin der Blutfluss eingedämmt. Die Wirkung ist nicht kumulativ";
				EffectE = "Auf kleinere Verletzungen von bis zu 3 SP gestreut, stoppt das Wundpulver die Blutung binnen weniger Momente und lässt sie innerhalb einer Nacht verheilen. Bei größeren Verletzungen wird immerhin der Blutfluss eingedämmt. Die Wirkung ist nicht kumulativ";
				EffectF = "Auf kleinere Verletzungen von bis zu 3 SP gestreut, stoppt das Wundpulver die Blutung binnen weniger Momente und lässt sie innerhalb einer Nacht verheilen. Bei größeren Verletzungen wird immerhin der Blutfluss eingedämmt. Die Wirkung ist nicht kumulativ";
				break;
			case 7://Kraftelixier
				Potionname = "ein Kraftelixier";
				DifficultyMod = 7;
				AnalyticMod = 3;
				ReqLabMod = 0;
				actLabMod = actLabInput;
				IngredientCosts = "25 D";
				Failedpotion = M1 + "<br>" + M2 + "<br>" + M3 + "<br>" + M4 + "<br>" + M12 + "<br>" + M13 + "<br>" + M14 + "<br>" + M18 + "<br>" + M19 + "<br>" + M21 + "<br>" + M33 + "<br>" + M34;
				EffectA = "1 KK-Punkt für 1 SR, peinliches Imponiergehabe (CH–1 für 1 Stunde)";
				EffectB = "2 KK-Punkte für 2 SR";
				EffectC = "3 KK-Punkte für 3 SR";
				EffectD = "7 KK-Punkte für 7 Spielrunden";
				EffectE = "Ein Tag lang KK +3, und alles ohne Nebenwirkungen – wenn man von dem ab und zu auftretenden Blutrausch einmal absieht: In jedem Kampf besteht eine 20 %-Chance (17 bis 20 auf W20), dass der Anwender wild um sich schlägt – siehe den Nachteil Blutrausch (WdH 261), jedoch mit nur jeweils 2 statt 5 Punkten";
				EffectF = "Ein Tag lang KK +5 und KO+2, und alles ohne Nebenwirkungen – wenn man von dem ab und zu auftretenden Blutrausch einmal absieht: In jedem Kampf besteht eine 20 %-Chance (17 bis 20 auf W20), dass der Anwender wild um sich schlägt – siehe den Nachteil Blutrausch (WdH 261), jedoch mit nur jeweils 2 statt 5 Punkten. Auf diesen Tag der wunderbaren Kraft ein Tag erbärmlicher Schwäche (KK –5)";
				break;
			case 8://Schlafgift
				Potionname = "ein Schlafgift";
				DifficultyMod = 5;
				AnalyticMod = 4;
				ReqLabMod = 1;
				actLabMod = actLabInput;
				IngredientCosts = "18 D";
				Failedpotion = M1 + "<br>" + M3 + "<br>" + M4 + "<br>" + M18 + "<br>"  + M25;
				EffectA = "Das Opfer ist für 3 SR leicht benebelt (KL, GE, AT/PA –2)";
				EffectB = "Das Opfer ist für 1 SR betäubt und kann sich nicht mehr bewegen";
				EffectC = "Das Opfer fällt nach 3 KR in einen Tiefschlaf von 3 SR Dauer";
				EffectD = "Das Opfer fällt schlagartig in einen sieben Spielrunden dauernden Tiefschlaf";
				EffectE = "Das Opfer fällt schlagartig in einen sieben Stunden dauernden Tiefschlaf";
				EffectF = "Das Opfer kann aus seinem Schlaf nur noch mit Zauberei – wie einem REVERSALIS [SOMNIGRAVIS] – geweckt werden (Märchen berichten von Prinzen, die ein Jahrhundert geschlafen hätten)";
				break;
			case 9://Antidot
				Potionname = "ein Antidot";
				DifficultyMod = 5;
				AnalyticMod = 4;
				ReqLabMod = 1;
				actLabMod = actLabInput;
				IngredientCosts = "25 D";
				Failedpotion = M1 + "<br>" + M3 + "<br>" + M12 + "<br>" + M18 + "<br>" + M19 + "<br>" + M24 + "<br>" + M33 + "<br>" + M35;
				EffectA = "Keine direkte Wirkung, der Genuss bildet jedoch Abwehrkräfte gegen Schwarzen Lotos, so dass das Opfer – wenn es die momentane Vergiftung überlebt – in Zukunft durch Schwarzem Lotos (siehe auch Zoo-Botanica) nur noch 4 SR lang je 1W+1 SP erleidet";
				EffectB = "Stoppt die Wirkung von Giften bis zur 2. Stufe";
				EffectC = "Stoppt die Wirkung von Giften bis zur 4. Stufe";
				EffectD = "Stoppt die Wirkung von Giften bis zur 9. Stufe";
				EffectE = "Stoppt die Wirkung von Giften bis zur 15. Stufe";
				EffectF = "Stoppt die Wirkung aller Gifte innerhalb von 1W6 KR";
				break;
			case 10://Verwandlungselixier
				Potionname = "ein Verwandlungselixier";
				DifficultyMod = 8;
				AnalyticMod = 5;
				ReqLabMod = 1;
				actLabMod = actLabInput;
				IngredientCosts = "38 D";
				Failedpotion = M1 + "<br>" + M3 + "<br>" + M13 + "<br>" + M14 + "<br>" + M18 + "<br>" + M22 + "<br>" + M27 + "<br>" + M38 + "<br>das Gebräu stößt Dämpfe aus, die beim Alchimisten eine W6-tägige Geistesverwirrung auslösen";
				EffectA = "Dem Anwender wächst für 1W6 Stunden ein Mäusefell oder Vogelflaum und er kann die Laute dieser Tiere korrekt nachahmen";
				EffectB = "Der Anwender erhält ein Fell oder Federn und schrumpft für 1 Stunde auf ein Zehntel seiner Größe";
				EffectC = "Der Benutzer verwandelt sich für genau 1 Spielrunde in ein kleines Nagetier oder einen kleinen Vogel (je nach Art des SALANDER)";
				EffectD = "Der Benutzer verwandelt sich für genau 1W6 Spielrunden in ein kleines Nagetier oder einen kleinen Vogel (je nach Art des SALANDER)";
				EffectE = "Der Anwender verwandelt sich für maximal 1 Stunde in ein kleines Nagetier oder einen kleinen Vogel (je nach Art des SALANDER), kann die Verwandlung jedoch willentlich vorzeitig beenden";
				EffectF = "Der Anwender verwandelt sich für maximal 1 Stunde in ein kleines Nagetier oder einen kleinen Vogel (je nach Art des SALANDER), kann die Verwandlung jedoch willentlich vorzeitig beenden, jedoch besteht eine fünfprozentige Gefahr (bei 20 auf W20), dass die Verwandlung permanent wirkt (und dann mit einem VERWANDLUNGEN BEENDEN aufgehoben werden muss)";
				break;
			case 11://Zauberkreide
				Potionname = "Zauberkreide";
				DifficultyMod = 2;
				AnalyticMod = 1;
				ReqLabMod = 0;
				actLabMod = actLabInput;
				IngredientCosts = "5 D";
				Failedpotion = M1 + "<br>" + M3 + "<br>" + M4 + "<br>" + M40 + "<br>bei einem mit misslungener Kreide gezeichneten Beschwörungszirkel sind sowohl alle Beschwörungs- als auch alle Beherrschungsproben gegenüber der gerufenen Wesenheit um 3 Punkte erschwert, selbiges gilt für die Proben bei Austreibungen (PENTAGRAMMA, GEISTERBANN ...).";
				EffectA = "Beschwörungsprobe –1";
				EffectB = "Exorzismusprobe –1";
				EffectC = "Beschwörungsprobe und Exorzismusprobe je –1";
				EffectD = "Beschwörungs-, Beherrschungs- und Exorzismusprobe je –1";
				EffectE = "Beschwörungsprobe und Exorzismusprobe je –2, Beherrschungsprobe –1";
				EffectF = "Beschwörungsprobe und Exorzismusprobe je –3, Beherrschungsprobe –2, jedoch steigt auch die Wahrscheinlichkeit, bei einer misslungenen Beschwörung versehentlich einen Dämonen aus der nächshöheren Gruppe zu beschwören auf 50%";
				break;
		}		
				
		switch(TalentInput){
			case 0:
				TalentName = "Alchimie";
				TalentValue = AlchimieValue;
				Att1 = courage;
				Att2 = cleverness;
				Att3 = intuition;
				Eigenschaft1 = "MU";
				Eigenschaft2 = "KL";
				Eigenschaft3 = "IN";
				Time = 1;
				break;
			case 1:
				TalentName = "Kochen";
				TalentValue = KochenValue;
				Att1 = cleverness;
				Att2 = intuition;
				Att3 = dexterity;
				Eigenschaft1 = "KL";
				Eigenschaft2 = "IN";
				Eigenschaft3 = "FF";
				Time = 1;
				break;
		}			

		if((ReqLabMod - actLabMod) === (ReqLabMod - 2)){
			LabMod = -3;
		}if((ReqLabMod - actLabMod) === (ReqLabMod - 1)){
			LabMod = 0;
		}if((ReqLabMod - actLabMod) === ReqLabMod){
			LabMod = 0;
		}if((ReqLabMod - actLabMod) === (ReqLabMod + 1)){
			LabMod = 7;
		}if((ReqLabMod - actLabMod) === (ReqLabMod + 2)){
			LabMod = isNaN;
		}
	
		//Roll the dice
        let talentRoll = new Roll("6d20").roll({async: true});
        talentRoll.then(roll =>{
			let w1 = roll.terms[0].results[0].result;
			let w2 = roll.terms[0].results[1].result;
			let w3 = roll.terms[0].results[2].result;
			let w4 = roll.terms[0].results[3].result;
			let w5 = roll.terms[0].results[4].result;
			let w6 = roll.terms[0].results[5].result;
		QualityDice = "2d6";
        QualityRoll = new Roll(QualityDice).roll({async:true})
        QualityRoll.then(roll =>{
			let w7 = roll.total;

 
		TaW = TalentValue;
		
			mod = DifficultyMod + LabMod + TaWboostInput
			modOutput = (mod >=0)? "+" + mod: mod;
		
			eTaW = TaW;
			eTaWMod = eTaW - mod;
			resOne = Att1 - w1;
			resOne += (eTaWMod < 0)? eTaWMod: 0;
			resTwo = Att2 - w2;
			resTwo += (eTaWMod < 0)? eTaWMod: 0;
			resThree = Att3 - w3;
			resThree += (eTaWMod < 0)? eTaWMod: 0;
			TalentResult = (eTaWMod > 0)? eTaWMod : 0;
			TalentResult += (resOne < 0)? resOne : 0;
			TalentResult += (resTwo < 0)? resTwo : 0;
			TalentResult += (resThree < 0)? resThree : 0;
			TalentResult = (TalentResult == 0)? 1 : TalentResult;
			TalentResult = Math.min(TalentResult,eTaW);

            luck = (TalentResult >= 0)? "Erfolg":"Misserfolg";
            wSum1 = w1 + w2
            wSum2 = w1 + w3
            wSum3 = w2 + w3
            wSum4 = w1 + w2 + w3
            if(wSum1 == 2 || wSum2 == 2 || wSum3 == 2){
                if(wSum4 == 3){
                    luck = "Spektakulärer Erfolg";
                }else{
                    luck = "Glücklicher Erfolg";
                };
            };
            if(wSum1 == 40 || wSum2 == 40 || wSum3 == 40){
                if(wSum4 == 60){
                    luck = "Spektakulärer Patzer";
                }else{
                    luck = "Patzer";
                };
            };

			QualityNr = w7 + TalentResult + (2 * TaWboostInput) + astralBoost;
				if(QualityNr < 0){
					QualityLvl = "M";
					Effect = Failedpotion;
				}else{
					if(QualityNr == 0 || QualityNr == 1 || QualityNr == 2 || QualityNr == 3 || QualityNr == 4 || QualityNr == 5 || QualityNr == 6){
					QualityLvl = "A";
					Effect = EffectA;
					}else{
						if(QualityNr == 7 || QualityNr == 8 || QualityNr == 9 || QualityNr == 10 || QualityNr == 11 || QualityNr == 12){
						QualityLvl = "B";
						Effect = EffectB;
						}else{
							if(QualityNr == 13 || QualityNr == 14 || QualityNr == 15 || QualityNr == 16 || QualityNr == 17 || QualityNr == 18){
							QualityLvl = "C";
							Effect = EffectC;
							}else{
								if(QualityNr == 19 || QualityNr == 20 || QualityNr == 21 || QualityNr == 22 || QualityNr == 23 || QualityNr == 24){
								QualityLvl = "D";
								Effect = EffectD;
								}else{
									if(QualityNr == 25 || QualityNr == 26 || QualityNr == 27 || QualityNr == 28 || QualityNr == 29 || QualityNr == 30){
									QualityLvl = "E";
									Effect = EffectE;
									}else{
										QualityLvl = "F";
										Effect = EffectF;
		}}}}}}

		AnalyticTaW = TalentValue;
		
			Analyticmod = AnalyticMod
			AnalyticmodOutput = (mod >=0)? "+" + Analyticmod: Analyticmod;
		
			eAnalyticTaW = AnalyticTaW;
			eAnalyticTaWMod = eAnalyticTaW - Analyticmod;
			resSix = Att1 - w4;
			resSix += (eAnalyticTaWMod < 0)? eAnalyticTaWMod: 0;
			resSeven = Att2 - w5;
			resSeven += (eAnalyticTaWMod < 0)? eAnalyticTaWMod: 0;
			resEight = Att3 - w6;
			resEight += (eAnalyticTaWMod < 0)? eAnalyticTaWMod: 0;
			AnalyticResult = (eAnalyticTaWMod > 0)? eAnalyticTaWMod : 0;
			AnalyticResult += (resSix < 0)? resSix : 0;
			AnalyticResult += (resSeven < 0)? resSeven : 0;
			AnalyticResult += (resEight < 0)? resEight : 0;
			AnalyticResult = (AnalyticResult == 0)? 1 : AnalyticResult;
			AnalyticResult = Math.min(AnalyticResult,eAnalyticTaW);

            luck = (AnalyticResult >= 0)? "Erfolg":"Misserfolg";
            wSum5 = w4 + w5
            wSum6 = w4 + w6
            wSum7 = w5 + w6
            wSum8 = w4 + w5 + w6
            if(wSum5 == 2 || wSum6 == 2 || wSum7 == 2){
                if(wSum8 == 3){
                    luck2 = "Spektakulärer Erfolg";
                }else{
                    luck2 = "Glücklicher Erfolg";
                };
            };
            if(wSum5 == 40 || wSum6 == 40 || wSum7 == 40){
                if(wSum8 == 60){
                    luck2 = "Spektakulärer Patzer";
                }else{
                    luck2 = "Patzer";
                };
            };


			fail = "<b>" + tokenName + "</b> braut " + Potionname + " der Stufe <b>M</b>";
			win = "<b>" + tokenName + "</b> braut " + Potionname + " der Stufe <b>" + QualityLvl + "</b>";
			
			if(TalentResult < 0){
				failOut = fail;
			}else{
				failOut = win;
			}
			
			Analyticfail = ", kann aber die Stufe nicht analysieren";
			Analyticwin = " und kann die Qualität des Tranks analysieren";
			
			if(AnalyticResult < 0){
				failOut2 = Analyticfail;
			}else{
				failOut2 = Analyticwin;
			}

		//Chat Output: Player
			flavor = "<i>" + TalentName + ":</i>"; 
			flavor += "<br><b>" + tokenName + "</b> braut " + Potionname;
			if(TalentResult < 0 && AnalyticResult > 0 ){
				flavor += " der Stufe <b>M</b>" + hr;
			}if(TalentResult < 0 && AnalyticResult < 0 ){
				flavor += ", kann die Qualität aber nicht bestimmen" + hr;
			}else{
				flavor += " der Stufe <b>" + QualityLvl + "</b>" + hr;
				flavor += "<h3>Effekt</h3>" + Effect + hr;
			}
			flavor += "Kosten: " + IngredientCosts;
			
		
            roll.toMessage ({
                flavor: flavor,
                speaker: ChatMessage.getSpeaker({token: token.document})
            },
            {rollMode}
            );
			
		//Chat Output: GM
			flavorGM = "<i>" + TalentName + ":</i>"; 
			flavorGM += "<br>" + Eigenschaft1 + ": " + w1 + "/" + "<b>" + Att1 + "</b>" + " (" + resOne + ")";
			flavorGM += "<br>" + Eigenschaft2 + ": " + w2 + "/" + "<b>" + Att2 + "</b>" + " (" + resTwo + ")";
			flavorGM += "<br>" + Eigenschaft3 + ": " + w3 + "/" + "<b>" + Att3 + "</b>" + " (" + resThree + ")";
			flavorGM += "<br>TaW/Modifikation: " + eTaW + "/" + modOutput;
			flavorGM += "<br>TaP*: " + TalentResult;
			flavorGM += "<br>Kosten: " + IngredientCosts + hr;
			flavorGM += failOut + failOut2;
			if(TalentResult < 0){
				flavorGM += "<br><h3>Misslungene Elixiere</h3>" + "Auswahl an möglichen Effekten (Meisterentscheid): <br>" + Failedpotion;
			}else{
				flavorGM += "<br><h3>Effekt</h3>" + Effect;
			}

            roll.toMessage ({
                flavor: flavorGM,
                speaker: ChatMessage.getSpeaker({token: token.document})
            },
            {rollMode: CONST.DICE_ROLL_MODES.BLIND}
            );
        })})};
}
